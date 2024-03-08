import { Logger } from 'logger-ts-node';
import loginRouter from './routes/auth/login.mjs';
import registerRouter from './routes/auth/register.mjs';
import express from 'express';

const app = express();
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Auth Routes
app.use(loginRouter);
app.use(registerRouter);

app.listen(
    PORT,
    () => Logger.info(`Server is listening on port ${PORT}`)
)