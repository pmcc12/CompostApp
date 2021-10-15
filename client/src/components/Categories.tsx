// @ts-nocheck

import { Button, Card } from 'react-bootstrap';
import { compostCategories } from '../CompostCategories';

export const Categories = () => {
  return compostCategories.map((compostCategory) => {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={compostCategory.pic} />
        <Card.Body>
          <Card.Title>{compostCategory.title}</Card.Title>
          <Card.Text>Some description here</Card.Text>
          <Button
            variant="primary"
            onClick={(event) =>
              handleCategoryClick(event, compostCategory.eventNumber)
            }
          >
            Click to select
          </Button>
        </Card.Body>
      </Card>
    );
  });
};
