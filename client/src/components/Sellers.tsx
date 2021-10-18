import { Button, Card, Col } from 'react-bootstrap';
import NoImage from '../assets/no-image.png'

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
          <Col lg={3} md={4} sm={6} style={{ borderBlock: 'black', marginRight:'15px' }}>
            <Card style={{ width: '18rem' }} key={el.seller.userId}>
              <div style={{margin: '5px', height: '178px'}}>
                {
                  el.images.includes('http') ? 
                  (
                    <Card.Img variant="top" src={el.images} />
                  ) 
                  : 
                  (
                    <Card.Img variant="top" src={NoImage} />
                  )
                }
              </div>
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
          </Col>
        );
      })}
    </>
  );
};
