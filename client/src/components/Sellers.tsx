import { Button, Card } from 'react-bootstrap';

interface props {
  handleSellerClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    sellerId: number
  ) => void;
  sortedByProducts: never[];
}

export const Sellers = (props: props) => {
  return (
    <>
      {props.sortedByProducts.map((el: any) => {
        return (
          <Card style={{ width: '18rem' }} key={el.seller.userId}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>User: {el.seller.username}</Card.Title>
              <Card.Text>Quantity: {el.availableQuantity}</Card.Text>
              <Card.Text>Price: {el.retailPrice}</Card.Text>
              <Button
                variant="primary"
                onClick={(event) =>
                  props.handleSellerClick(event, el.seller.userId)
                }
              >
                Select supplier
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};
