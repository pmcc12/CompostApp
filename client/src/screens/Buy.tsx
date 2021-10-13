import MyMap from '../components/Map';
import { ILocationUpdate } from '../state/actions';
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

export default function Buy() {
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
                        src="data:image/jpeg;base64,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"
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
