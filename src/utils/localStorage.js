const HIGH_SCORE_KEY = 'whereInTheWorld_highScore';

export const getHighScore = () => {
  try {
    const highScore = localStorage.getItem(HIGH_SCORE_KEY);
    return highScore ? parseInt(highScore, 10) : 0;
  } catch (error) {
    console.error('Error reading high score from localStorage:', error);
    return 0;
  }
};

export const setHighScore = (score) => {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
  } catch (error) {
    console.error('Error saving high score to localStorage:', error);
  }
};

export const updateHighScore = (currentScore) => {
  const highScore = getHighScore();
  if (currentScore > highScore) {
    setHighScore(currentScore);
    return true; // New high score!
  }
  return false;
};
