import Card from 'react-bootstrap/Card';

function DisplayCity({ city  }) {
  return (
    <div>
      {city && (
        <div class= "center">
          <Card
            bg="light"
            border='secondary'
            style={{ width: '17rem '}}
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

export default DisplayCity;