import React from 'react'
import { Form, Button, Container, Row, Col, Stack} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState } from 'react'
import { register } from '../state/actions/actionCreators'
import { useHistory } from 'react-router-dom'
import MyMap from '../components/Map'

export const Register = () => {

    let history = useHistory();

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
        location: {
            availability: false,
            error: false,
            //default location set to: Faro,Portugal
            latitude: 37.016774457030294,
            longitude: -7.930970191955566
        }
    })

    /* My location handler */
    if(!form.location.availability && !form.location.error){
        navigator.geolocation.getCurrentPosition((location: any) => {
            setForm((prevForm) => ({
                ...prevForm,
                location:{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    availability: true,
                    error: false
                }
            }))
            }, (error: any)=> {
            setForm((prevState) => ({
                ...prevState,
                error:true
            }));
            }
        )
    }

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
                        <h2>My location. Latitude: {form.location.latitude} and Longitude: {form.location.longitude}</h2>
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
                
                    {/* <MyMap latitude={form.location.latitude} longitude={form.location.longitude} availability={form.location.availability} error={form.location.error}/> */}
                    {/* <MyMap location={form.location}/> */}

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