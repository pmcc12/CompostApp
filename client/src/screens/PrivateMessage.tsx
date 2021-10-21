import React from 'react'
import '../css/PrivateMessage.css'
import { Form, Button, Container, Row, Col, Stack, FloatingLabel, InputGroup, Spinner, Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState, useEffect, useRef } from 'react'
import { login } from '../state/actions/actionCreators'
import { Redirect, useParams } from 'react-router-dom'
import Slider from '../components/Slider'
import Navigation from '../components/Navigation';
import ApiService from '../ApiService'
import LoadingSpinner from '../components/Spinner';
import Chatbubble from '../components/Chatbubble';
import {IuserProducts, sellerContent, sellerData, IgetAllMessages} from '../state/actions/index'
import MessagesOverview from './MessagesOverview'

type Props = {
    authorization: boolean
}

type detailsParams = {
    inboxId: string
}

interface messagesBuffer {
    
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
    const [ongoingMessage, setOngoingMessage] = useState('');
    const [ownMessagesBuffer, setOwnMessagesBuffer] = useState<string[]>([]);
    // if(!authorization){
        //   console.log('not authorized!')
        //   return <Redirect to="login"/>
        // }
        const myState = useSelector((state: myReducersTypeof) => state.login)
        const {inboxId} = useParams<detailsParams>();
        const dummyDiv = useRef<null | HTMLDivElement>(null)

    
    useEffect(() => {
        console.log('inside useeffect in params:',inboxId)
        setLoading(true)
        if(!dataFetched){
            console.log('will fetch data')
            const allChatMessages = ApiService.getAllChatMessages(+inboxId)
               .then((data: any) => setMyChatMessages(data)).then(()=>{
                console.log('fetching finished, setting datafetched to true');
                setDataFetched(true);
            }).then(() => {
                console.log('setting load to true (needs to be the last one to avoid re-rendering)')
                console.log(myChatMessages);
                setLoading(false)
                console.log('loading set to false');
            })
              .then(() => {
                    console.log('will start now to try dummy div inside promise chain')
                    if(dummyDiv.current){
                        console.log('will scroll')
                        dummyDiv.current.scrollIntoView({behavior:'smooth'})
                    }
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

    const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const buffer = event.currentTarget.value;
        setOngoingMessage(buffer);
    }

    const sendMessage = async () => {
        console.log(ongoingMessage);
        const response = await ApiService.postUserMessage({
            inboxId: +inboxId,
            senderId: myState.data.userId,
            content: ongoingMessage
        })
        setButtonPushed(true);
        setOwnMessagesBuffer((prevState)=>([...prevState,ongoingMessage]));
        setOngoingMessage('');
        if(dummyDiv.current){
            console.log('will scroll')
            dummyDiv.current.scrollIntoView({behavior:'smooth'})
        }
    }

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
            <Container className="pvt-msg-container">
                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row>
                    <Col xs={0} md={1} lg={2}></Col>

                    {/* Chat is done here inside */}
                    <Col xs={12} md={10} lg={8} className="pvt-msg-chatwindow">
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
                                            <Col xs={2} md={5} lg={5}></Col>
                                            <Col xs={3} md={2} lg={2}></Col>
                                            <Col xs={7} md={5} lg={5}>
                                                <Chatbubble messageContent={message.content} messageUsername={message.senderName} messageSenderId={message.senderId} messageDate={message.createAt}/>

                                            </Col>
                                        </Row>
                                    )    
                                } else {
                                    return (
                                        <Row>
                                            <Col xs={7} md={5} lg={5}>
                                                <Chatbubble messageContent={message.content} messageUsername={message.senderName} messageSenderId={message.senderId} messageDate={message.createAt}/>
                                            </Col>
                                            <Col xs={3} md={2} lg={2}></Col>
                                            <Col xs={2} md={5} lg={5}></Col>
                                        </Row>
                                    )    
                                }
                            }
                            
                            )
                        )
                        /* after other messages are rendered we can start writing our code */
                    }
                    {buttonPushed ? 
                        (
                            ownMessagesBuffer.map((message)=>(
                                <Row>
                                    <Col xs={2} md={5} lg={5}></Col>
                                    <Col xs={3} md={2} lg={2}></Col>
                                    <Col xs={7} md={5} lg={5}>
                                            <Chatbubble messageContent={message} messageUsername={myState.data.username} messageSenderId={myState.data.userId} messageDate={new Date().toISOString()}/>
                                    </Col>
                                </Row>
                            ))
                        )
                        :
                        null
                    }
                    <div ref={dummyDiv}></div>
                    </Col>

                    <Col xs={0} md={1} lg={2}></Col>

                </Row>

                    <Row>
                        <Col xs={0} md={1} lg={2}></Col>

                        {/* Chat is done here inside */}
                        <Col xs={12} md={10} lg={8} className="pvt-msg-form-container">

                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                <Form.Control
                                value={ongoingMessage}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                onChange={(event) => handleMessage(event as React.ChangeEvent<HTMLInputElement>)}
                                />
                            </FloatingLabel>
                            <Button onClick={()=>sendMessage()}>Send Message</Button>
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