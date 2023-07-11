function Scoreboard({ round, score }) {
  return (
  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
    <p>Round: {round}</p>
    <p>Score: {score}</p>
  </div>
  );
}

export default Scoreboard;