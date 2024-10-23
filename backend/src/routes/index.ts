import express, { Request, Response } from 'express';
const app = express();

app.get('/ping', (req: Request, res: Response) => {
    res.send({ result: 'ok' });
});

/* DAL */
// app.put('/dal/:schema/:id', ensureAuthenticated, DALController.updateOne);
// app.get('/dal/:schema/:id', ensureAuthenticated, DALController.getOne);
// app.get('/dal/:schema', ensureAuthenticated, DALController.getMany);
// app.post('/dal/:schema', ensureAuthenticated, DALController.insert);
// app.delete('/dal/:schema/:id', ensureAuthenticated, DALController.delete);

export const IndexRouter = app;