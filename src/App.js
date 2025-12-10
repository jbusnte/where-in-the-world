import './App.css';
import City from './models/City';
import { fetchCityData } from './api/apiService';
import RegionSelection from './components/RegionSelection'
import DisplayCity from './components/DisplayCity';
import UserGuess from './components/UserGuess';
import Scoreboard from './components/Scoreboard';
import HeaderNav from './components/HeaderNav';
import DifficultySelector from './components/DifficultySelector';
import { TOTAL_ROUNDS, REGIONS, DEFAULT_DIFFICULTY } from './constants/gameConstants';
import { getHighScore, updateHighScore } from './utils/localStorage';

import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Game() {
  const [city, setCity] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [randomCountryNames, setRandomCountryNames] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [showScoreAlert, setShowScoreAlert] = useState(false);
  const [error, setError] = useState(null);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    // Load high score for current difficulty
    if (selectedDifficulty) {
      setHighScore(getHighScore(selectedDifficulty.id));
    }
  }, [selectedDifficulty]);


  
  const handleStartGame = async (region) => {
    try {
      setIsLoading(true);
      setError(null);
      const difficulty = selectedDifficulty || DEFAULT_DIFFICULTY;
      const { cityData, randomCountryNames } = await fetchCityData(region, difficulty);
      const cityInstance = new City(cityData);
      setCity(cityInstance);
      setGameStarted(true);
      setRandomCountryNames(randomCountryNames);
      setSelectedRegion(region);
    } catch (error) {
      console.error('API error:', error);
      setError('Failed to load city data. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  function handleRoundComplete() {
    if (round === TOTAL_ROUNDS) {
      setRound(1);
      const difficulty = selectedDifficulty || DEFAULT_DIFFICULTY;
      const achievedNewHighScore = updateHighScore(score, difficulty.id);
      setIsNewHighScore(achievedNewHighScore);
      if (achievedNewHighScore) {
        setHighScore(score);
      }
      setShowScoreAlert(true);
    } else {
      setRound((prevRound) => prevRound + 1);
      handleStartGame(selectedRegion);
    }
  }

  function handleScoreAlertDismiss() {
    setShowScoreAlert(false);
    setGameStarted(false);
    setCity(null);
    setSelectedRegion('');
    setScore(0);
  }

  function handleSelectDifficulty(difficulty) {
    setSelectedDifficulty(difficulty);
  }

  return (
    <div className="Game">
      {gameStarted ? (
        // Content to display when the game has started
        <div>
          <HeaderNav/>
          <h2>
            Guess the Country
            {selectedDifficulty && (
              <span className={`badge bg-${selectedDifficulty.color} current-difficulty`}>
                {selectedDifficulty.icon} {selectedDifficulty.name}
              </span>
            )}
          </h2>
          <DisplayCity city={city} />
          <UserGuess
            randomCountryNames={randomCountryNames}
            selectedCityCountry={city.cou_name_en}
            handleRoundComplete={handleRoundComplete}
            setScore={setScore}
          />
          <Scoreboard round={round} score={score} highScore={highScore} />
        </div>
      ) : (
        // Content to display when the game hasn't started
        <div>
          <HeaderNav/>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)} className="error-alert mx-auto mt-3">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}
          {isLoading ? (
            <div className="spinner-container">
              <Spinner animation="grow" variant="info" />
              <p className="mt-3">Loading cities...</p>
            </div>
          ) : !selectedDifficulty ? (
            <DifficultySelector
              onSelectDifficulty={handleSelectDifficulty}
              selectedDifficulty={selectedDifficulty}
            />
          ) : (
            <div className="regions">
              <h2>
                Choose a Region
                {selectedDifficulty && (
                  <span className={`badge bg-${selectedDifficulty.color} current-difficulty`}>
                    {selectedDifficulty.icon} {selectedDifficulty.name}
                  </span>
                )}
              </h2>
              <Container>
                <Row>
                  {REGIONS.map((region) => (
                    <Col key={region} xs={6} md={3}>
                      <RegionSelection
                        region={region}
                        handleStartGame={handleStartGame}
                        selectedRegion={selectedRegion}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          )}
        </div>
      )}

      {/* Final Score Alert */}
      {showScoreAlert && (
        <div className="overlay">
          <Alert
            variant={isNewHighScore ? "warning" : "success"}
            dismissible
            onClose={handleScoreAlertDismiss}
            className="score-alert"
          >
            <Alert.Heading>
              {isNewHighScore ? "🎉 New High Score!" : "Game Over!"}
            </Alert.Heading>
            {selectedDifficulty && (
              <p className="mb-2">
                <span className={`badge bg-${selectedDifficulty.color}`}>
                  {selectedDifficulty.icon} {selectedDifficulty.name}
                </span>
              </p>
            )}
            <p>Your final score: <strong>{score}</strong></p>
            {!isNewHighScore && <p>High score: {highScore}</p>}
          </Alert>
        </div>
      )}
    </div>
  );
}

export default Game;
