import React from 'react'
import { Form, Button, Container, Row, Col, Stack, FormControlProps} from 'react-bootstrap'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../state/actions/actionCreators'
import { myReducersTypeof } from '../state/reducers'
import { useState } from 'react'

export const Login = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const state = useSelector((state: myReducersTypeof) => state.login)

    const dispatch = useDispatch();
    const {login} = bindActionCreators(actionCreators, dispatch)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('here in submit');
        console.log(credentials);
        login(credentials);
        
    }

    //event: any ?
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('here');
        console.log(event.currentTarget.value);
        const buffer = event.currentTarget.value
        setCredentials((prev) => ({
            ...prev,
            email: buffer
        }))
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('here');
        console.log(event.currentTarget.value);
        const buffer = event.currentTarget.value
        setCredentials((prevCred) => ({
            ...prevCred,
            password: buffer
        }))
    }
    // const Form: React.FC<FormProps>= ({ children, handleFormSubmit }) => (
    //     <form onSubmit={handleFormSubmit}>{children}</form>)

    return(
        <Container>
            <Row>
                <Col xs={0} md={1} lg={2}></Col>
                <Col xs={12} md={10} lg={8}>
                    <Stack gap={2} className="col-md-4 mx-auto">
                        <h1>Login Screen</h1>
                    </Stack>
                        <Form onSubmit={(event) => handleSubmit(event as React.FormEvent<HTMLFormElement>)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(event) => handleEmail(event as React.ChangeEvent<HTMLInputElement>)} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event) => handlePassword(event as React.ChangeEvent<HTMLInputElement>)}/>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                            {/* </Col> */}
                        </Form>
                </Col>
                <Col xs={0} md={1} lg={2}></Col>
            </Row>
        </Container>
    )
}