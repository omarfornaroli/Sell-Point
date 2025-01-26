import jwt from 'jwt-simple';
import moment from 'moment';
import { JWTSecret } from '../config';
import md5 from 'md5';
import CryptoJS from 'crypto-js';
import { DALController } from './dal.controller';
import { SchemaConstants } from '../../../shared/constants';
import { UserEnt } from '../../../shared/contracts';
import { Request, Response } from 'express';


export class SecurityController {
    static async loginUser(req: Request, res: Response) {
        try {
            const decodedPassword = CryptoJS.AES.decrypt(req.body?.password, 'secret key 123').toString(CryptoJS.enc.Utf8);
            const dbPrePassword = decodedPassword + ' - ' + req.body.email + ' - ' + decodedPassword;

            const user = await DALController.get(`${SchemaConstants.User}`, { email: req.body.email }) as UserEnt;
            console.log(user)
            console.log(decodedPassword)
            console.log(md5(dbPrePassword), user.password)

            if (user && user.password === md5(dbPrePassword)) {
                const token = SecurityController.createToken(user, req.body.sessionTime);
                res.json({ ...user, token });
            } else {
                res.status(401).send('Credenciales inválidas');
            }
        } catch (error) {
            res.send(error);
        }
    }

    static async getUserByToken(req: Request, res: Response) {
        if (!SecurityController.validateToken(req.params.token)) {
            res.status(401).send('Token inválido');
        } else {
            try {
                const payload = jwt.decode(req.params.token, JWTSecret);
                const user = await DALController.getById(`${SchemaConstants.User}`, payload._id) as UserEnt;

                if (user) {
                    res.json(user);
                } else {
                    res.send(false);
                }
            } catch (error) {
                res.send(false);
            }
        }
    }

    static validateToken(token: string): boolean {
        return token.length > 10;
    }

    static createToken(user: UserEnt, sessionExpiration?: number): string {
        const payload = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            documentId: user.documentId,
            loginTime: moment().unix(),
            exp: sessionExpiration
        };
        return jwt.encode(payload, JWTSecret);
    }
}