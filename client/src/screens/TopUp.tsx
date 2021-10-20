//@ts-nocheck
import { Button, Container, Form, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { myReducersTypeof } from '../state/reducers';
import ApiService from '../ApiService';

type Props = {
  authorization: boolean;
};

type detailsParams = {
  userId: string;
};

export const TopUp: React.FC<Props> = ({ authorization }) => {
  const myState = useSelector((state: myReducersTypeof) => state.login);
  const userId = myState.data.userId;
  const history = useHistory();

  const [topUpAmount, setTopUpAmount] = useState(0);

  const { sellerId } = useParams<detailsParams>();

  const handleTopUpClick = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('topUpAmount ', topUpAmount);

    ApiService.topUp(sellerId, topUpAmount).then((data) => {
      console.log('data.url ', data.url);
      window.location.href = data.url;
      // history.push(data.url);
    });
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount: number = Number(event.currentTarget.value) * 100;
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
