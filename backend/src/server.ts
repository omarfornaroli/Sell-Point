import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { IndexRouter } from './routes/index';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
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

let usersConmected = 0;

const server = createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
    usersConmected++;
    console.log('A user connected amount:' + usersConmected);

    socket.on('cmd', (msg) => {
        console.log('Message: ' + msg);
        // io.emit('chat message', "msg received");
    });

    socket.on('disconnect', () => {
        usersConmected--;
        console.log('User disconnected amount:' + usersConmected);
    });
});

BootHelper.init(server);

export default app;
