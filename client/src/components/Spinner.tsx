import React from 'react'
import {Container, Row, Col, Spinner} from 'react-bootstrap'

export default function LoadingSpinner() {
    return (
        <Container className="vh-100 d-flex flex-column ">
        <Row className="h-50"></Row>
        <Row>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
          <Col xs={6} md={4}></Col>
        </Row>
      </Container>
    )
}
