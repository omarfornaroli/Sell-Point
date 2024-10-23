import { decode } from 'jwt-simple';
import moment from 'moment';
import { Types } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from './models/user';

export let TOKEN = '';
const JWTSecret = process.env.JWTSecret

export const ensureAuthenticated = function (req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: 'Tu petición no tiene cabecera de autorización' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = decode(token, JWTSecret as string);
    if (payload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({ message: 'El token ha expirado' });
    }

    (req as any).user = payload;
    UserModel.find({ documentId: payload.documentId })
        .then(([data]) => {
            (req as any).user._id = new Types.ObjectId(data._id);
            TOKEN = token;
            next();
        });
};