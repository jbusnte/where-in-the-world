import React, { useState, useEffect } from 'react';
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

  const guessClicked = (countryName, index) => {
    if (isGuessSubmitted) return;

    setSelectedGuessIndex(index);
    setIsGuessSubmitted(true);

    if (countryName === selectedCityCountry) {
      setScore((prevScore) => prevScore + POINTS_PER_CORRECT_ANSWER);
    }

    setTimeout(() => {
      handleRoundComplete();
    }, ROUND_TRANSITION_DELAY_MS);
  };

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
            {countryName}
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
