import PropTypes from 'prop-types';
import '../App.css';

function Scoreboard({ round, score, highScore }) {
  return (
    <div className="scoreboard">
      <p>Round: {round}</p>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
}

Scoreboard.propTypes = {
  round: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

export default Scoreboard;