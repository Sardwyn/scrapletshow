import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const dbDir = path.resolve('db');
const guessesPath = path.join(dbDir, 'guesses.json');

// Ensure db dir/file exist
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
if (!fs.existsSync(guessesPath)) fs.writeFileSync(guessesPath, '[]');

router.post('/', (req, res) => {
  const { userId, username, episode, clueId, guess } = req.body;

  if (!userId || !episode || !clueId || !guess) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Load current guesses (tolerate malformed file)
  let guesses = [];
  try {
    guesses = JSON.parse(fs.readFileSync(guessesPath, 'utf-8') || '[]');
  } catch {
    guesses = [];
  }

  // 🔒 Limit: one guess per *card* (clueId) per episode per user
  const existing = guesses.find(
    g => g.userId === userId && g.episode === episode && g.clueId === clueId
  );
  if (existing) {
    return res.status(409).json({ error: 'Already guessed for this card.' });
  }

  // Persist new guess
  guesses.push({
    userId,
    username: username || null,
    episode,
    clueId,
    guess,
    timestamp: Date.now()
  });

  fs.writeFileSync(guessesPath, JSON.stringify(guesses, null, 2));
  return res.status(200).json({ success: true });
});

export default router;
