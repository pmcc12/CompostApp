import React from 'react'
import { Form, Button, Container, Row, Col, Stack, FloatingLabel, InputGroup} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState } from 'react'
import { login } from '../state/actions/actionCreators'
import { Redirect } from 'react-router-dom'
import MyMap from '../components/Map' 
import Slider from '../components/Slider'

type Props = {
    authorization: boolean
}

export const Details:React.FC<Props> = ({authorization}) => {

    /* Will be important to access the user session data (which will be stored in login variable), such as location, picture, etc.. */
    const myState = useSelector((state: myReducersTypeof) => state.login)

    if(!authorization){
      console.log('not authorized!')
      return <Redirect to="login"/>
    }

    console.log('AUTHORIZED IN SELL!')

    /* call to state to get the updated state */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('here in submit');
        // console.log(credentials);
        // dispatch(login(credentials))
    }

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
                        <h1>Details Screen</h1>
                    </Stack>

                    <Slider />

                    <br />
                    <br />


                    <MyMap location={{availability: true, error: false, latitude: 37.1245632, longitude: -7.9265792}} inRegister={false} inDetailsOrSell={true} inBuy={false}/>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
                <Col xs={0} md={1} lg={2}></Col>
            </Row>
        </Container>
    )
}