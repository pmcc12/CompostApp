import React from 'react';
import {Card,Container,Button,Stack,Row,Col,Image} from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { Redirect } from 'react-router-dom'

type Props = {
  authorization: boolean
}

const Home: React.FC<Props> = ({authorization}) => {

  if(!authorization){
    return <Redirect to="login"/>
  }

  return (
    <>
      <Navigation />

      <style type="text/css">
        {`

		.btn-1 {
			background-color: #9ab1a3;
      color: white;
		}

		.btn-2 {
			background-color: #b1bdc9
		}

		.btn-3 {
			background-color: #fed971
		}

		.btn-4 {
			background-color: #a97351
		}

		.btn-5 {
			background-color: #cb1515
		}

    .btn-lg {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>

      <Container>
        <div className="row justify-content-center mt-5">
          <Row>
            <Image
              src="https://media.istockphoto.com/photos/get-sowing-get-growing-picture-id889031338?s=612x612"
              className="img-fluid"
              alt="..."
            />
          </Row>
          <Row style={{ padding: '10px' }}>
            <Col lg={12}>
              <Stack gap={4}>
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

export default Home
