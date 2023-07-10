import Card from 'react-bootstrap/Card';

function DisplayCity({ city  }) {
  return (
    <div>
      {city && (
        <div>
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
  );
}

export default DisplayCity;