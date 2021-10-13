import MyMap from '../components/Map';

import Navigation from '../components/Navigation';
import {
  Row,
  Col,
  Container,
  Stack,
  Button,
  Image,
  Card,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

type Props = {
  authorization: boolean;
};

export const Buy: React.FC<Props> = ({ authorization }) => {
  if (!authorization) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ minHeight: '400px', paddingTop: '10px' }}>
          <Col
            lg={4}
            md={6}
            sm={12}
            style={{ borderBlock: 'black' }}
            // className="block-example border border-dark"
          >
            <h3>Pick a category</h3>
            <Container style={{ padding: '5px' }}>
              <Row style={{ minHeight: '200px' }}>
                <Col
                  // className="block-example border border-dark"
                  style={{ padding: '5px' }}
                >
                  <Stack>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://media.wired.com/photos/5b2836690105105e90d02814/16:9/w_2400,h_1350,c_limit/compost-488988734.jpg"
                      />
                      <Card.Body>
                        <Card.Title>Juice Fertilizer</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button variant="primary">Click to select</Button>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh3pIKUajEUBse6s4lOORnSqRRM58E8JFMEA&usqp=CAU"
                      />
                      <Card.Body>
                        <Card.Title>Soil Compost</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button variant="primary">Click to select</Button>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh3pIKUajEUBse6s4lOORnSqRRM58E8JFMEA&usqp=CAU"
                      />
                      <Card.Body>
                        <Card.Title>Worm Compost</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button variant="primary">Click to select</Button>
                      </Card.Body>
                    </Card>
                  </Stack>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col
            lg={4}
            md={6}
            sm={12}
            // className="block-example border border-dark"
          >
            <h3>Nearest suppliers</h3>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Supplier details</Card.Text>
                <Button variant="primary">Select supplier</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Supplier details</Card.Text>
                <Button variant="primary">Select supplier</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col
            lg={4}
            md={6}
            sm={12}
            // className="block-example border border-dark"
          >
            I AM A BOX IN WHICH A MAP WILL RESIDE
            <MyMap
              location={{
                availability: true,
                error: false,
                latitude: 37.1245632,
                longitude: -7.9265792,
              }}
              inRegister={false}
              inDetailsOrSell={true}
              inBuy={false}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
