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
  sellerId: string;
};

interface data {
  url: string;
}

export const TopUp: React.FC<Props> = ({ authorization }, props) => {
  const myState = useSelector((state: myReducersTypeof) => state.login);
  // const userId = myState.data.userId;
  const history = useHistory();

  const [topUpAmount, setTopUpAmount] = useState(0);
  console.log('props inside TopUp ', props);
  console.log('sellerId inside TopUp ', props.sellerId);

  // let { sellerId } = useParams<detailsParams>();

  const handleTopUpClick = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('topUpAmount ', topUpAmount);

    const numberSellerId = Number(props.sellerId);

    ApiService.topUp(numberSellerId, topUpAmount).then((data: data) => {
      console.log('data in topUP Api call in TopUp');
      window.location.href = data.url;
    });
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount: number = Number(event.currentTarget.value);
    setTopUpAmount(inputAmount);
  };

  return (
    <Container>
      <Col lg={4}>
        <Form>
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
          <Button
            onClick={(event) => {
              handleTopUpClick(event as React.ChangeEvent<HTMLButtonElement>);
            }}
          >
            Add Credit
          </Button>
          <Button onClick={(event) => props.failModalButtonHandler(event)}>
            Cancel transaction
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
