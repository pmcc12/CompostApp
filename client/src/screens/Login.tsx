import React from 'react'
import { Form, Button, Container, Row, Col, Stack, FormControlProps} from 'react-bootstrap'

export const Login = () => {

    const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        console.log(event.target);
    }

    const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
        console.log('here');
        console.log(event.target);
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
                        <Form onSubmit={(event) => handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(event) => handleEmail} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
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