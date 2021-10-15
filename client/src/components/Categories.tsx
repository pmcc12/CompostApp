import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { Button, Card } from 'react-bootstrap';
import { compostCategories } from '../CompostCategories';

interface props {
  sortProducts: (buyerId: number, productCategoryId: number) => void;
}

export const Categories = (props: props) => {
  const myState = useSelector((state: myReducersTypeof) => state.login);

  const handleCategoryClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    productCategoryId: number
  ) => {
    console.log('handleCategoryClick()');
    const buyerId = myState.data.userId;
    props.sortProducts(buyerId, productCategoryId);
  };

  return (
    <>
      {compostCategories.map((compostCategory) => {
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
      })}
    </>
  );
};
