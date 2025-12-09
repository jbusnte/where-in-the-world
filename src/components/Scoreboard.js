import PropTypes from 'prop-types';
import '../App.css';

function Scoreboard({ round, score }) {
  return (
    <div className="scoreboard">
      <p>Round: {round}</p>
      <p>Score: {score}</p>
    </div>
  );
}

Scoreboard.propTypes = {
  round: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default Scoreboard;