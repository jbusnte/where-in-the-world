import './App.css';
import City from './models/City';
import { fetchCityData } from './api/apiService';

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Game() {
  const [city, setCity] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [randomCountryNames, setRandomCountryNames] = useState([]);

  const handleStartGame = async () => {
    try {
      setIsLoading(true);
      const { cityData, randomCountryNames } = await fetchCityData();
      const cityInstance = new City(cityData);
  
      setCity(cityInstance);
      setGameStarted(true);
      setRandomCountryNames(randomCountryNames);
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function Guesses({ randomCountryNames, selectedCityCountry }) {
    const guessClicked = (countryName) => {
      console.log("countryName:" + countryName)
      console.log("selectedCityCountry:" + selectedCityCountry)
      if (countryName === selectedCityCountry) {
        alert('Congratulations! You guessed correctly!');
      } else {
        alert('Wrong guess. Try again!');
      }
    };
  
    return (
      <ListGroup>
        {randomCountryNames.map((countryName, index) => (
          <ListGroup.Item key={index} action onClick={() => guessClicked(countryName)}>
            {countryName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  return (
    <div className="Game">
      {gameStarted ? (
        // Content to display when the game has started
        <div>
          <h2>Guess the Country</h2>
          {/* City display, input field, and other game elements */}
          <div>
            {city && (
              <div>
                {/* Display other city information */}
                <Card>
                  <Card.Body>
                    <Card.Title>{city.name}</Card.Title>
                    <Card.Text>
                      Population: {city.population}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
          <Guesses randomCountryNames={randomCountryNames} selectedCityCountry={city.cou_name_en} />
        </div>
      ) : (
        // Content to display when the game hasn't started
        <div>
          <h1>Where In The World</h1>
          {isLoading ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <div>
              <Button variant="primary" size="lg" onClick={handleStartGame}>
                Start Game
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
