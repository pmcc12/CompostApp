import React from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <Container>
      <Nav />
      <Stack gap={5}>
        <Button variant="primary" size="lg" href="/buy">
          BUY
        </Button>
        <Button variant="secondary" size="lg" href="/sell">
          SELL
        </Button>
        <Button variant="success" size="lg" href="/payments">
          PAYMENTS
        </Button>
        <Button variant="danger" size="lg" href="/messages">
          MESSAGES
        </Button>
        <Button variant="warning" size="lg" href="/transactions">
          TRANSACTIONS
        </Button>
      </Stack>
    </Container>
  );
}
