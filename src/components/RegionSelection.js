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
    return process.env.PUBLIC_URL + '/' + imageName;
  };

  return (
    <Card             
    bg="secondary"
    border="light"
    className="text-center my-3"
    style={{ width: '12rem', height: '90%'}}>
      <Card.Img variant="top" src={getImageSrc()} />
      <Card.Body>
        <Button 
         variant="light"
         onClick={() => handleStartGame(region)}
         >
          {region}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RegionSelection;