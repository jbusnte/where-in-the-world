import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DIFFICULTY_LEVELS } from '../constants/gameConstants';

function DifficultySelector({ onSelectDifficulty, selectedDifficulty }) {
  const difficulties = Object.values(DIFFICULTY_LEVELS);

  return (
    <div className="difficulty-selector">
      <h2>Choose Difficulty</h2>
      <p className="difficulty-subtitle">Higher populations = more well-known cities</p>
      <Container>
        <Row className="justify-content-center">
          {difficulties.map((difficulty) => (
            <Col key={difficulty.id} xs={12} md={4} className="mb-3">
              <Card
                bg={selectedDifficulty?.id === difficulty.id ? difficulty.color : 'dark'}
                text="white"
                className="text-center difficulty-card h-100"
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => onSelectDifficulty(difficulty)}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="difficulty-icon">{difficulty.icon}</Card.Title>
                  <Card.Title>{difficulty.name}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {difficulty.description}
                  </Card.Text>
                  <Button
                    variant={selectedDifficulty?.id === difficulty.id ? 'light' : 'outline-light'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDifficulty(difficulty);
                    }}
                  >
                    {selectedDifficulty?.id === difficulty.id ? 'Selected' : 'Select'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

DifficultySelector.propTypes = {
  onSelectDifficulty: PropTypes.func.isRequired,
  selectedDifficulty: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    minPopulation: PropTypes.number,
    maxPopulation: PropTypes.number,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }),
};

export default DifficultySelector;
