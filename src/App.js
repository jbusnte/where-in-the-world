import './App.css';
import City from './models/City';
import { fetchCityData } from './api/apiService';
import RegionSelection from './components/RegionSelection'
import DisplayCity from './components/DisplayCity';
import UserGuess from './components/UserGuess';
import Scoreboard from './components/Scoreboard';

import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Game() {
  const [city, setCity] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [randomCountryNames, setRandomCountryNames] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  
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
      setScore(0);
      setGameStarted(false);
      setCity(null);
      setSelectedRegion(''); // Reset the selected region
    } else {
      setRound((prevRound) => prevRound + 1);
      handleStartGame(selectedRegion); // Pass the selected region to handleStartGame
    }
  }

  return (
    <div className="Game">
      {gameStarted ? (
        // Content to display when the game has started
        <div>
        <h2>Guess the Country</h2>
        <Scoreboard round ={round} score={score} />
        <DisplayCity city={city} />
        <UserGuess
            randomCountryNames={randomCountryNames}
            selectedCityCountry={city.cou_name_en}
            handleRoundComplete={handleRoundComplete}
            setScore={setScore}
          />
      </div>
      ) : (
        // Content to display when the game hasn't started
        <div>
          <h1>Where In The World</h1>
          {isLoading ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            // Content to display after the game has loaded
            <div>
              <RegionSelection region="Africa" handleStartGame={handleStartGame} selectedRegion={selectedRegion} />
              <RegionSelection region="Americas" handleStartGame={handleStartGame} selectedRegion={selectedRegion} />
              <RegionSelection region="Asia" handleStartGame={handleStartGame} selectedRegion={selectedRegion} />
              <RegionSelection region="Europe" handleStartGame={handleStartGame} selectedRegion={selectedRegion} />
              <RegionSelection region="Oceania" handleStartGame={handleStartGame} selectedRegion={selectedRegion} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
