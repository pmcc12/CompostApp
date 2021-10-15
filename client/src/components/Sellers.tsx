import { Button, Card } from 'react-bootstrap';

//FIX TYPE OF PROPS
export const Sellers = (props: any) => {
  console.log(props.sortedByProducts);
  return props.sortedByProducts.map((el: any) => {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>User: {el.seller.username}</Card.Title>
          <Card.Text>Quantity: {el.availableQuantity}</Card.Text>
          <Card.Text>Price: {el.retailPrice}</Card.Text>
          <Button
            variant="primary"
            value={el.seller.userId}
            onClick={(event) => props.handleSellerClick(event)}
          >
            Select supplier
          </Button>
        </Card.Body>
      </Card>
    );
  });
};
