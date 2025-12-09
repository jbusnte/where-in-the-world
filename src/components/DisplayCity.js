import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function DisplayCity({ city }) {
  return (
    <div>
      {city && (
        <div className="center">
          <Card
            bg="light"
            border="secondary"
            style={{ width: '17rem' }}
            className="mb-2"
          >
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
  );
}

DisplayCity.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    cou_name_en: PropTypes.string.isRequired,
  }),
};

export default DisplayCity;