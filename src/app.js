import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import {refreshJwtMiddleware} from './utils/refreshToken.js';
import { createTables } from './config/mysql.config.js';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(refreshJwtMiddleware);

app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await createTables(); // 테이블 생성 함수 호출
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();