import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const guessesPath = path.resolve('db', 'guesses.json');
const cluesPath = path.resolve('db', 'prophecy-clues.json'); // must exist!

router.get('/', (req, res) => {
  if (!fs.existsSync(guessesPath) || !fs.existsSync(cluesPath)) {
    return res.json([]);
  }

  const guesses = JSON.parse(fs.readFileSync(guessesPath));
  const cluesByEpisode = JSON.parse(fs.readFileSync(cluesPath));

  const clueAnswerMap = {};
  for (const [episode, clues] of Object.entries(cluesByEpisode)) {
    for (const clue of clues) {
      clueAnswerMap[`${episode}-${clue.id}`] = {
        answer: clue.answer,
        points: clue.points,
      };
    }
  }

  const scores = {};

  for (const guess of guesses) {
    const key = `${guess.episode}-${guess.clueId}`;
    const clueData = clueAnswerMap[key];

    if (!clueData) continue;

    const isCorrect = guess.guess === clueData.answer;
    if (!isCorrect) continue;

    if (!scores[guess.userId]) {
	userId: guess.userId, 
      	scores[guess.userId] = {
        username: guess.username,
        points: 0
      };
    }

    scores[guess.userId].points += clueData.points;
  }

  const leaderboard = Object.values(scores).sort((a, b) => b.points - a.points);
  res.json(leaderboard);
});

export default router;
