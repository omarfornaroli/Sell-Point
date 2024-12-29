import express, { Request, Response } from 'express';
import { DALController } from '../controllers/dal.controller';
import { ensureAuthenticated } from '../middleware';
import { SCHEMA_PREFIX } from '../../../shared/constants';
import { SecurityController } from '../controllers/securit.controller';
const app = express();

app.get('/ping', (req: Request, res: Response) => {
    res.send({ result: 'ok' });
});

/* DAL */
app.put('/dal/:schema/:id', ensureAuthenticated, (req: Request, res: Response) => ServerRequest(req, res, DALController.update));
app.get('/dal/:schema/:id', ensureAuthenticated, (req: Request, res: Response) => ServerRequest(req, res, DALController.getById));
app.get('/dal/:schema', ensureAuthenticated, (req: Request, res: Response) => ServerRequest(req, res, DALController.getMany));
app.post('/dal/:schema', ensureAuthenticated, (req: Request, res: Response) => ServerRequest(req, res, DALController.insert));

/* SECURITY */
app.post('/login', SecurityController.loginUser);

function ServerRequest(req: Request, res: Response, cb: Function) {
    if (!req.params?.schema) return;
    const schemaID = `${SCHEMA_PREFIX}:${req.params.schema}`;
    const _id = req.params.id;
    const entOrId = _id ? _id : req.params.ent
    cb(schemaID, entOrId)
        .then(() => res.send({ result: 'ok' }))
        .catch((err: any) => res.send(err));
};

export const IndexRouter = app;