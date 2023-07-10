//import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function RegionSelection({ region, handleStartGame }) {
  const getImageSrc = () => {

    // Map the region name to the corresponding image filename
    const imageMap = {
      Africa: 'africa.png',
      Asia: 'asia.png',
      Europe: 'europe.png',
      Oceania: 'oceania.png',
      Americas: 'americas.png'
    };

    const imageName = imageMap[region];
    return `/${imageName}`;
  };

  return (
    <Card className="text-center" style={{ width: '12rem' }}>
      <Card.Img variant="top" src={getImageSrc()} />
      <Card.Body>
        <Button variant="primary" size="lg" onClick={() => handleStartGame(region)}>
          {region}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RegionSelection;