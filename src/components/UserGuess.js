import React, { useState, useEffect, useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { POINTS_PER_CORRECT_ANSWER, ROUND_TRANSITION_DELAY_MS } from '../constants/gameConstants';

function UserGuess({ randomCountryNames, selectedCityCountry, handleRoundComplete, setScore }) {
  const [selectedGuessIndex, setSelectedGuessIndex] = useState(null);
  const [isGuessSubmitted, setIsGuessSubmitted] = useState(false);

  useEffect(() => {
    setIsGuessSubmitted(false);
    setSelectedGuessIndex(null);
  }, [randomCountryNames]);

  const guessClicked = useCallback((countryName, index) => {
    if (isGuessSubmitted) return;

    setSelectedGuessIndex(index);
    setIsGuessSubmitted(true);

    if (countryName === selectedCityCountry) {
      setScore((prevScore) => prevScore + POINTS_PER_CORRECT_ANSWER);
    }

    setTimeout(() => {
      handleRoundComplete();
    }, ROUND_TRANSITION_DELAY_MS);
  }, [isGuessSubmitted, selectedCityCountry, setScore, handleRoundComplete]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      const keyNumber = parseInt(key, 10);

      // Check if key is 1-4 and corresponds to a valid answer
      if (keyNumber >= 1 && keyNumber <= 4 && keyNumber <= randomCountryNames.length) {
        const index = keyNumber - 1;
        const countryName = randomCountryNames[index];
        guessClicked(countryName, index);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [randomCountryNames, guessClicked]);

  return (
    <ListGroup>
      {randomCountryNames.map((countryName, index) => {
        const isCorrectGuess = countryName === selectedCityCountry;
        const isWrongGuess = !isCorrectGuess && index === selectedGuessIndex;

        const listItemClasses = classNames({
          'list-group-item': true,
          'list-group-item-success': isCorrectGuess && isGuessSubmitted,
          'list-group-item-danger': isWrongGuess && isGuessSubmitted,
        });

        return (
          <ListGroup.Item
            key={index}
            action
            onClick={() => guessClicked(countryName, index)}
            className={listItemClasses}
          >
            <span className="keyboard-hint">{index + 1}.</span> {countryName}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

UserGuess.propTypes = {
  randomCountryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCityCountry: PropTypes.string.isRequired,
  handleRoundComplete: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default UserGuess;
