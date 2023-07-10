import ListGroup from 'react-bootstrap/ListGroup';

function UserGuess({ randomCountryNames, selectedCityCountry, handleRoundComplete, setScore }) {
    const guessClicked = (countryName) => {
        if (countryName === selectedCityCountry) {
          alert('Congratulations! You guessed correctly!');
          setScore((prevScore) => prevScore + 10);
        } else {
          alert('Wrong guess. Try again!');
        }
        handleRoundComplete();
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

export default UserGuess;