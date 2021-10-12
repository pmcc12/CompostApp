import React from 'react'
import { Form, Button, Container, Row, Col, Stack, FloatingLabel, InputGroup} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState } from 'react'
import { login } from '../state/actions/actionCreators'
import { Redirect } from 'react-router-dom' 

export const Sell = () => {

    /* Define  */
    const myState = useSelector((state: myReducersTypeof) => state.login)

    // if(!myState.auth){
    //   console.log('not authorized!')
    //   return <Redirect to="login"/>
    // }

    console.log('AUTHORIZED IN SELL!')

    /* call to state to get the updated state */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('here in submit');
        // console.log(credentials);
        // dispatch(login(credentials))
    }

    //event: any ?
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('here');
        console.log(event.currentTarget.value);
        const buffer = event.currentTarget.value
        // setCredentials((prev) => ({
        //     ...prev,
        //     email: buffer
        // }))
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('here');
        console.log(event.currentTarget.value);
        const buffer = event.currentTarget.value
        // setCredentials((prevCred) => ({
        //     ...prevCred,
        //     password: buffer
        // }))
    }
    // const Form: React.FC<FormProps>= ({ children, handleFormSubmit }) => (
    //     <form onSubmit={handleFormSubmit}>{children}</form>)

    return(
        <Container>
            <Row>
                <Col xs={0} md={1} lg={2}></Col>
                <Col xs={12} md={10} lg={8}>
                    <Stack gap={2} className="col-md-4 mx-auto">
                        <h1>Sell Screen</h1>
                    </Stack>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Offer Tittle</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Select aria-label="Default select example">
                                <option>Please Select the Product Category</option>
                                <option value="1">Juice Fertilizer</option>
                                <option value="2">Soil Fertilizers</option>
                                <option value="3">Vermicompost</option>
                                <option value="4">Activators for Compost</option>
                                <option value="5">Worms</option>
                                <option value="6">Brown Material</option>
                                <option value="7">Compost Case</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Default file input example</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <FloatingLabel controlId="floatingTextarea2" label="Product Description">
                                <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>€</InputGroup.Text>
                                <Form.Control type="number" placeholder="Price per Unit" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="switch" id="custom-switch" label="Negotiable" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="g-2">
                                <Col xs={10} md={10} lg={10}>
                                    <FloatingLabel controlId="floatingInputGrid" label="Quantity">
                                    <Form.Control type="number" placeholder="1 liter" />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={2} md={2} lg={2}>
                                    <FloatingLabel controlId="floatingSelectGrid" label="SI">
                                    <Form.Select aria-label="Floating label select example">
                                        <option value="1">Kg</option>
                                        <option value="2">Unit</option>
                                        <option value="3">Liters</option>
                                    </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Ready for Pickup</Form.Label>
                            <Form.Control type="datetime-local" value={(new Date()).toISOString().slice(0,16)} min={(new Date()).toISOString().slice(0,16)} placeholder="Availability" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={0} md={1} lg={2}></Col>
            </Row>
        </Container>
    )
}

/* 
id="datetime-local"
        label="Next appointment"
        type="datetime-local"
*/