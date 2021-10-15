// @ts-nocheck

import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { Col, Row, Container, Button, Card, Stack } from 'react-bootstrap';
import { compostCategories } from '../CompostCategories';

export const Categories = (props: any) => {
  //fix TYPE of props!!!!!!!!
  const myState = useSelector((state: myReducersTypeof) => state.login);

  const handleCategoryClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    catIdNum: number
  ) => {
    console.log('handleCategoryClick()');
    const buyerId = myState.data.userId;
    props.sortProducts(buyerId, catIdNum);
  };

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
