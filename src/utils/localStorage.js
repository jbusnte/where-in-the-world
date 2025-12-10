const HIGH_SCORE_PREFIX = 'whereInTheWorld_highScore';

// Difficulty-specific high score functions
export const getHighScore = (difficultyId = 'easy') => {
  try {
    const key = `${HIGH_SCORE_PREFIX}_${difficultyId}`;
    const highScore = localStorage.getItem(key);
    return highScore ? parseInt(highScore, 10) : 0;
  } catch (error) {
    console.error('Error reading high score from localStorage:', error);
    return 0;
  }
};

export const setHighScore = (score, difficultyId = 'easy') => {
  try {
    const key = `${HIGH_SCORE_PREFIX}_${difficultyId}`;
    localStorage.setItem(key, score.toString());
  } catch (error) {
    console.error('Error saving high score to localStorage:', error);
  }
};

export const updateHighScore = (currentScore, difficultyId = 'easy') => {
  const highScore = getHighScore(difficultyId);
  if (currentScore > highScore) {
    setHighScore(currentScore, difficultyId);
    return true; // New high score!
  }
  return false;
};

// Get all high scores for display
export const getAllHighScores = () => {
  return {
    easy: getHighScore('easy'),
    medium: getHighScore('medium'),
    hard: getHighScore('hard')
  };
};
