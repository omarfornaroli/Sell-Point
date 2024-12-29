import { decode } from 'jwt-simple';
import moment from 'moment';
import { Types } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { DALController } from './controllers/dal.controller';
import { SCHEMA_PREFIX } from '../../shared/constants';

export let TOKEN = '';
const JWTSecret = process.env.JWTSecret

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.headers.authorization) {
        res.status(403).send({ message: 'Tu petición no tiene cabecera de autorización' });
        return
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = decode(token, JWTSecret as string);
    if (payload.exp <= moment().unix()) {
        res.status(401).send({ message: 'El token ha expirado' });
        return
    }

    (req as any).user = payload;
    const data = await DALController.getById(`${SCHEMA_PREFIX}:User`, payload._id);
    (req as any).user._id = new Types.ObjectId(data._id);
    TOKEN = token;
    next();
};