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
import LoadingSpinner from '../components/Spinner';
import Chatbubble from '../components/Chatbubble';
import {IuserProducts, sellerContent, sellerData, IgetAllMessages} from '../state/actions/index'

type Props = {
    authorization: boolean
}

type detailsParams = {
    inboxId: string
}

const PrivateMessage:React.FC<Props> = ({authorization}) => {

    console.log('inside private message')

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
    
    useEffect(() => {
        console.log('inside useeffect in params:',inboxId)
        setLoading(true)
        if(!dataFetched){
            console.log('will fetch data')
            const allChatMessages = ApiService.getAllChatMessages(+inboxId).then((data: any) => setMyChatMessages(data)).then(()=>{
                console.log('fetching finished, setting datafetched to true');
                console.log(myChatMessages);
                setDataFetched(true);
            }).then(() => {
                console.log('setting load to true (needs to be the last one to avoid re-rendering)')
                setLoading(false);
            });
        }
    }, [])
    if (!myState.auth) {
        console.log('not authorized!');
        console.log('authorization: ' + authorization + ' and my user name: ' + myState.data.username + ' and my user auth: ' + myState.auth);
        return <Redirect to="login" />;
    }

    /* Fetching all messages from inboxId chat number */

    console.log('AUTHORIZED IN Private Message!')

    console.log(myChatMessages);
    // console.log(typeof myChatMessages.Message[0].createdAt);

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
            {myChatMessages.inboxId} with message {myChatMessages.Message[0].content} and last update on {typeof myChatMessages.Message[0].createdAt}
            <Container>
                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row>
                    <Col xs={0} md={1} lg={2}></Col>

                    {/* Chat is done here inside */}
                    <Col xs={12} md={10} lg={8} style={{backgroundColor:'#FFFFFF'}}>
                        {myChatMessages.Message.length === 0 ? 
                        (
                            'No messages to be displayed in this conversation'
                        ) 
                        : 
                        (
                            myChatMessages.Message.map((message) => {
                                if(message.senderId === myState.data.userId){
                                    return (
                                        <Row>
                                            <Col xs={9} md={5} lg={5}></Col>
                                            <Col xs={2} md={2} lg={2}></Col>
                                            <Col xs={9} md={5} lg={5}>
                                                <Chatbubble messageContent={message.content} messageUsername={message.senderName} messageSenderId={message.senderId} messageDate={myChatMessages.lastUpdated}/>

                                            </Col>
                                        </Row>
                                    )    
                                } else {
                                    return (
                                        <Row>
                                            <Col xs={9} md={5} lg={5}>
                                                <Chatbubble messageContent={message.content} messageUsername={message.senderName} messageSenderId={message.senderId} messageDate={myChatMessages.lastUpdated}/>
                                            </Col>
                                            <Col xs={2} md={2} lg={2}></Col>
                                            <Col xs={9} md={5} lg={5}></Col>
                                        </Row>
                                    )    
                                }
                            }
                            
                            )
                        )

                        }

                        <FloatingLabel controlId="floatingTextarea2" label="Comments">
                            <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <Button>Send Message</Button>
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