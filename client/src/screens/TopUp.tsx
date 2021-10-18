import { Button, Container, Form, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { myReducersTypeof } from '../state/reducers';
import ApiService from '../ApiService';
import { RectangleProps } from 'react-leaflet';

type Props = {
  authorization: boolean;
};

export const TopUp: React.FC<Props> = ({ authorization }) => {
  const myState = useSelector((state: myReducersTypeof) => state.login);
  const userId = myState.data.userId;
  const history = useHistory();

  const [topUpAmount, setTopUpAmount] = useState(0);

  const handleTopUpClick = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('topUpAmount ', topUpAmount);
    ApiService.topUp(userId, topUpAmount);
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount: number = Number(event.currentTarget.value);
    setTopUpAmount(inputAmount);
  };

  return (
    <Container>
      <Col lg={4}>
        <Form
          onSubmit={(event) => {
            handleTopUpClick(event as React.ChangeEvent<HTMLFormElement>);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Top Up Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount here"
              onChange={(event) =>
                handleAmount(event as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
