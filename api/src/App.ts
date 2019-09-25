import express from 'express';
import spotifyRouter from './routes/spotify';

const app = express();

app.use('/spotify', spotifyRouter);

export default app;
