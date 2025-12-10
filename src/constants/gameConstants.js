// Game configuration constants
export const TOTAL_ROUNDS = 5;
export const POINTS_PER_CORRECT_ANSWER = 10;
export const ROUND_TRANSITION_DELAY_MS = 1000;
export const NUMBER_OF_ANSWER_CHOICES = 4;
export const NUMBER_OF_WRONG_CHOICES = NUMBER_OF_ANSWER_CHOICES - 1;

// Region mapping for API calls
export const REGION_MAP = {
  Americas: 'America',
  Oceania: 'Australia',
};

// Available regions
export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

// Difficulty levels based on city population
export const DIFFICULTY_LEVELS = {
  EASY: {
    id: 'easy',
    name: 'Easy',
    description: 'Major cities (500K+ population)',
    minPopulation: 500000,
    color: 'success',
    icon: '😊'
  },
  MEDIUM: {
    id: 'medium',
    name: 'Medium',
    description: 'Mid-sized cities (100K-500K population)',
    minPopulation: 100000,
    maxPopulation: 500000,
    color: 'warning',
    icon: '🤔'
  },
  HARD: {
    id: 'hard',
    name: 'Hard',
    description: 'Small cities (1K-100K population)',
    minPopulation: 1000,
    maxPopulation: 100000,
    color: 'danger',
    icon: '🔥'
  }
};

export const DEFAULT_DIFFICULTY = DIFFICULTY_LEVELS.EASY;
