import React from 'react'
import { Form, Button, Container, Row, Col, Stack, FloatingLabel, InputGroup, Spinner} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState, useEffect } from 'react'
import { login } from '../state/actions/actionCreators'
import { Redirect, useParams } from 'react-router-dom'
import MyMap from '../components/Map' 
import Slider from '../components/Slider'
import Navigation from '../components/Navigation';
import ApiService from '../ApiService'
import {IuserProducts, sellerContent, sellerData} from '../state/actions/index'

type Props = {
    authorization: boolean
}

type detailsParams = {
    userId: string
}

export const Details:React.FC<Props> = ({authorization}) => {

    /* Will be important to access the user session data (which will be stored in login variable), such as location, picture, etc.. */ 
    const [loading, setLoading] = useState(true);
    const [buttonPushed, setButtonPushed] = useState(false)
    const [dataFetched, setDataFetched] = useState(false)
    const [myData, setMyData] = useState<sellerContent[]>([])
    const [offerIndex, setofferIndex] = useState(0)
    // if(!authorization){
        //   console.log('not authorized!')
        //   return <Redirect to="login"/>
        // }
    const myState = useSelector((state: myReducersTypeof) => state.login)
    const {userId} = useParams<detailsParams>();
        
    useEffect(() => {
        console.log("inside useeffect");
        /* setLoading to true will cause a re-render only once and if loading === false  */
        setLoading(true);
        console.log('my userid:')
        console.log(+userId);
        /* after updating state, useeffect will be called again. dataFetched ensures that we don't enter in a infinite loop of fetching and seting data. acts like a locker */
        if(!dataFetched){
            console.log("fetching");
            ApiService.getUserOffers(+userId).then((data: any) => setMyData(data)).then(()=>{
            console.log('promisse fulfilled');
            setLoading(false)})
            setDataFetched(true);
        }
    }, [buttonPushed])
    

    console.log('AUTHORIZED IN SELL!')

    /* call to state to get the updated state */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('here in submit');
        // console.log(credentials);
        // dispatch(login(credentials))
    }


    return(
        <>
        { loading ? 
        (

            <Row>
                <Col xs={6} md={4}>
                </Col>
                <Col xs={6} md={4}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
                <Col xs={6} md={4}>
                </Col>
            </Row>
        ) 
        :
        (
        <>
        <Navigation />
        <Container>
            <Row>
                <Col xs={0} md={1} lg={2}></Col>
                <Col xs={12} md={10} lg={8}>
                    <Stack gap={2} className="col-md-4 mx-auto">
                        <h1>Details Screen</h1>
                        <h2>Hello {myData[0] ? myData[0].seller.username : 'John Doe'}</h2>
                    </Stack>

                    <Slider />

                    <br />
                    <br />


                    <MyMap location={{availability: true, error: false, latitude: myData[0].seller.location.latitude, longitude: myData[0].seller.location.latitude}} inRegister={false} inDetailsOrSell={true} inBuy={false}/>

                    <Button variant="primary" type="submit">
                        Make Order
                    </Button>
                    <Button variant="primary" type="submit">
                        Text Message
                    </Button>
                </Col>
                <Col xs={0} md={1} lg={2}></Col>
            </Row>
        </Container>
        </>
        )

        }
        </>
    )
}