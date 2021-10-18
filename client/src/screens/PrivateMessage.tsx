import React from 'react'
import { Form, Button, Container, Row, Col, Stack, FloatingLabel, InputGroup, Spinner, Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState, useEffect } from 'react'
import { login } from '../state/actions/actionCreators'
import { Redirect, useParams } from 'react-router-dom'
import Slider from '../components/Slider'
import Navigation from '../components/Navigation';
import ApiService from '../ApiService'
import LoadingSpinner from '../components/Spinner'
import {IuserProducts, sellerContent, sellerData, IgetAllMessages} from '../state/actions/index'

type Props = {
    authorization: boolean
}

type detailsParams = {
    inboxId: string
}

const PrivateMessage:React.FC<Props> = ({authorization}) => {

    /* Will be important to access the user session data (which will be stored in login variable), such as location, picture, etc.. */ 
    const [loading, setLoading] = useState(true);
    const [buttonPushed, setButtonPushed] = useState(false)
    const [dataFetched, setDataFetched] = useState(false)
    const [myChatMessages, setMyChatMessages] = useState<IgetAllMessages>({
        inboxId: 0,
        lastUpdated: '',
        Message: []
    })
    const [offerIndex, setofferIndex] = useState(0)
    // if(!authorization){
        //   console.log('not authorized!')
        //   return <Redirect to="login"/>
        // }
    const myState = useSelector((state: myReducersTypeof) => state.login)
    const {inboxId} = useParams<detailsParams>();
    
    if (!myState.auth) {
        console.log('not authorized!');
        console.log('authorization: ' + authorization + ' and my user name: ' + myState.data.username + ' and my user auth: ' + myState.auth);
        return <Redirect to="login" />;
    }

    /* Fetching all messages from inboxId chat number */
    useEffect(() => {
        setLoading(true)
        if(!dataFetched){
            const allChatMessages = ApiService.getAllChatMessages(+inboxId).then((data: any) => setMyChatMessages(data)).then(()=>{
                console.log('fetching finished');
                console.log(myChatMessages);
                setLoading(false);
            });
            setDataFetched(true);
        }
    }, [])

    console.log('AUTHORIZED IN Private Message!')


    /*
        Components:
        -> Chat Bubble
        -> 
    */
    return(

    <>
      {loading ? (LoadingSpinner) : (

        <>
            <Navigation />
            
            <Container>
                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row>
                    <Col xs={0} md={1} lg={2}></Col>

                    {/* Chat is done here inside */}
                    <Col xs={12} md={10} lg={8}>

                        <FloatingLabel controlId="floatingTextarea2" label="Comments">
                            <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <Button>Text Message</Button>
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

export default PrivateMessage;