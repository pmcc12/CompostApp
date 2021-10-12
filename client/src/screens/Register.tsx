import React from 'react'
import { Form, Button, Container, Row, Col, Stack} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState } from 'react'
import { register } from '../state/actions/actionCreators'
import { useHistory } from 'react-router-dom'

export const Register = () => {

    let history = useHistory();

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: ''
    })

    const myState = useSelector((state: myReducersTypeof) => state.login)

    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('here in submit');
        console.log(form);
        await dispatch(register(form))
        history.push("/login")
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('here');
        console.log(event.currentTarget.value);
        const buffer = event.currentTarget.value
        setForm((prev) => ({
            ...prev,
            email: buffer
        }))
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('here');
        console.log(event.currentTarget.value);
        const buffer = event.currentTarget.value
        setForm((prevCred) => ({
            ...prevCred,
            password: buffer
        }))
    }

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('here');
        console.log(event.currentTarget.value);
        const buffer = event.currentTarget.value
        setForm((prevCred) => ({
            ...prevCred,
            username: buffer
        }))
    }

    return(
        <Form onSubmit={(event) => handleSubmit(event as React.FormEvent<HTMLFormElement>)}>
            <Row>
                <Col xs={0} md={1} lg={2}></Col>
                <Col xs={12} md={10} lg={8}>
                    <Stack gap={2} className="col-md-4 mx-auto">
                        <h1>Register Screen</h1>
                    </Stack>
                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => handleEmail(event as React.ChangeEvent<HTMLInputElement>)}/>
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event) => handlePassword(event as React.ChangeEvent<HTMLInputElement>)}/>
                    </Form.Group>
                    </Row>
                
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="HandsomeJoe1954" onChange={(event) => handleUsername(event as React.ChangeEvent<HTMLInputElement>)}/>
                    </Form.Group>
                
                    {/* <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>
                
                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                        </Form.Select>
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    </Row>
                
                    <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </div>
                </Col>
                <Col xs={0} md={1} lg={2}></Col>
            </Row>
        </Form>
    )
}