import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import submitGuess from './routes/submitGuess.js';
import leaderboard from './routes/leaderboard.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ No /api prefix here — Nginx already strips /api
app.use('/submit-guess', submitGuess);
app.use('/leaderboard', leaderboard);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
