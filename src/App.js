import './App.css';
import City from './models/City';
import { fetchCityData } from './api/apiService';
import RegionSelection from './components/RegionSelection'
import DisplayCity from './components/DisplayCity';
import UserGuess from './components/UserGuess';
import Scoreboard from './components/Scoreboard';
import HeaderNav from './components/HeaderNav';

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
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [showScoreAlert, setShowScoreAlert] = useState(false);


  
  const handleStartGame = async (region) => {
    try {
      setIsLoading(true);
      const { cityData, randomCountryNames } = await fetchCityData(region);
      const cityInstance = new City(cityData);
      setCity(cityInstance);
      setGameStarted(true);
      setRandomCountryNames(randomCountryNames);
      setSelectedRegion(region);
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleRoundComplete() {
    if (round === 5) {
      setRound(1);
      setScore((prevScore) => prevScore + 10);
      setShowScoreAlert(true);
    } else {
      setRound((prevRound) => prevRound + 1);
      setScore((prevScore) => prevScore + 10);
      handleStartGame(selectedRegion);
    }
  }

  function handleScoreAlertDismiss() {
    setShowScoreAlert(false);
    setGameStarted(false);
    setCity(null);
    setSelectedRegion('');
  }

  return (
    <div className="Game">
      {gameStarted ? (
        // Content to display when the game has started
        <div>
          <HeaderNav/>
          <h2>Guess the Country</h2>
          <DisplayCity city={city} />
          <UserGuess
            randomCountryNames={randomCountryNames}
            selectedCityCountry={city.cou_name_en}
            handleRoundComplete={handleRoundComplete}
            setScore={setScore}
          />
          <Scoreboard round={round} score={score} />
        </div>
      ) : (
        // Content to display when the game hasn't started
        <div>
          <HeaderNav/>
          {isLoading ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <div className="regions">
              <h2>Choose a Region</h2>
              <Container>
                <Row>
                  <Col xs={6} md={3}>
                    <RegionSelection
                      region="Africa"
                      handleStartGame={handleStartGame}
                      selectedRegion={selectedRegion}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <RegionSelection
                      region="Americas"
                      handleStartGame={handleStartGame}
                      selectedRegion={selectedRegion}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <RegionSelection
                      region="Asia"
                      handleStartGame={handleStartGame}
                      selectedRegion={selectedRegion}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <RegionSelection
                      region="Europe"
                      handleStartGame={handleStartGame}
                      selectedRegion={selectedRegion}
                    />
                  </Col>
                  <Col xs={6} md={3}>
                    <RegionSelection
                      region="Oceania"
                      handleStartGame={handleStartGame}
                      selectedRegion={selectedRegion}
                    />
                  </Col>
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
            variant="success"
            dismissible
            onClose={handleScoreAlertDismiss}
            className="score-alert"
          >
            <Alert.Heading>Game Over!</Alert.Heading>
            <p>Your final score is: {score}</p>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default Game;
