import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import mainRouter from './routes/index.js';
import cookieParser from 'cookie-parser';

dotenv.config({
    path: './.env' 
});
const app = express();

connectDB();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://earning-website-ashen.vercel.app',
    'https://www.veranix-ai.com',
    'https://api.veranix-ai.com',
  ],
  credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1', mainRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
