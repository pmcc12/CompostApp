import React from 'react';
import {
  Card,
  Container,
  Button,
  Stack,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <>
        <style type="text/css">
          {`
		.nav {
			background-color: #d09a42
		}

		.btn-1 {
			background-color: #8badab;
      color: white;
		}

		.btn-2 {
			background-color: #96A7B6
		}

		.btn-3 {
			background-color: #f0b101
		}

		.btn-4 {
			background-color: #d09a42
		}

		.btn-5 {
			background-color: #eb4343
		}

    .btn-lg {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
        </style>
      </>

      <Container>
        <Col md={12} lg={6}>
          <div
            className="row justify-content-center"
            style={{ display: 'block', width: 700, padding: 10 }}
          >
            {' '}
          </div>
        </Col>

        <div className="row justify-content-center mt-5">
          <Row>
            <Image
              src="https://media.istockphoto.com/photos/get-sowing-get-growing-picture-id889031338?s=612x612"
              className="img-fluid "
              alt="..."
            />
            <Col lg={12}>
              <Stack gap={5}>
                <Button variant="1" size="lg" href="/buy">
                  BUY
                </Button>
                <Button variant="2" size="lg" href="/sell">
                  SELL
                </Button>
                <Button variant="3" size="lg" href="/payments">
                  PAYMENTS
                </Button>
                <Button variant="4" size="lg" href="/messages">
                  MESSAGES
                </Button>
                <Button variant="5" size="lg" href="/transactions">
                  TRANSACTIONS
                </Button>
              </Stack>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
