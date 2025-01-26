import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { IndexRouter } from './routes/index';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { BootHelper } from './boot';

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

const app = express();
app.use(compression());
app.use(cors(corsOptions));
app.use(function (req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', IndexRouter);

const server = createServer(app);
BootHelper.init(server);

export default app;
