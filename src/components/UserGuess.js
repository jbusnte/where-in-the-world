import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classNames from 'classnames';

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
      setScore((prevScore) => prevScore + 10);
    }

    setTimeout(() => {
      handleRoundComplete();
    }, 1000); // Delay the round completion for 1 second
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

export default UserGuess;
