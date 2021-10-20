//@ts-nocheck
import React from 'react'
import { Form, Button, Container, Row, Col, Stack, FloatingLabel, InputGroup, Spinner, Table, Card} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState, useEffect } from 'react'
import { login } from '../state/actions/actionCreators'
import { useHistory } from 'react-router-dom'
import Slider from '../components/Slider'
import Navigation from '../components/Navigation';
import ApiService from '../ApiService'
import {IchatConversations, Iconversation} from '../state/actions/index'
import moment from 'moment';


type Props = {
    authorization: boolean
}

type detailsParams = {
    userId: string
}

const MessagesOverview:React.FC<Props> = ({authorization}) => {

    /* Will be important to access the user session data (which will be stored in login variable), such as location, picture, etc.. */ 
    const [loading, setLoading] = useState(true);
    const [buttonPushed, setButtonPushed] = useState(false)
    const [dataFetched, setDataFetched] = useState(false)
    const [myData, setMyData] = useState<IchatConversations[]>([])
    const [offerIndex, setofferIndex] = useState(0)

    // const dummyDiv = useRef<null | HTMLDivElement>(null)

    // if(!authorization){
        //   console.log('not authorized!')
        //   return <Redirect to="login"/>
        // }
    const myState = useSelector((state: myReducersTypeof) => state.login);
    let history = useHistory();
    
    useEffect(() => {
        console.log('inside useeffect in params:')
        setLoading(true)
        if(!dataFetched){
            console.log('will fetch data')
            const allChatMessages = ApiService.getAllInboxes(myState.data.userId).then((data: any) => setMyData(data)).then(()=>{
                /* locking this fetching */
                setDataFetched(true);
            }).then(() => {
                /* unlocking the rendering of components that rely on fetched data */
                setLoading(false);
            });
        }
    }, [])


    /* forward to correct chat */
    const handleSelectRow = (inboxId: number) => {

        history.push(`/messages/${inboxId}`)
    }
    /*
    -> Each conversation item is clickable
     */
    return(
        <>
        <Navigation />

        <Container>
                {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                <Row>
                    <Col xs={0} md={1} lg={2}></Col>
                    {/* Chat is done here inside */}
                    <Col xs={12} md={10} lg={8} style={{backgroundColor:'#FFFFFF', height: '60vh', overflowY:'auto',overflowX:'hidden', marginTop:"3rem",padding: "0"}}>
                            
                                <Table  hover size="sm">
                                    <thead>
                                        <tr onClick={()=>console.log('i am here! in head')} style={{ color: "rgba(0, 0, 0, 0.55)" }}>
                                        <th style={{ textAlign: "center",   padding: "0.5rem 0" }}>No.</th>
                                        <th style={{ paddingLeft:"1.25rem", padding: "0.5rem 0" }}>Username</th>
                                        <th style={{ paddingLeft:"1.5rem",  padding: "0.5rem 0" }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myData.length === 0 ? 
                                            (
                                                'No conversations to show'
                                            ) 
                                            : 
                                            (
                                                myData.map((userConversation) => 
                                                {
                                                    let username = userConversation.users[0].username
                                                    if(username === myState.data.username){
                                                        username = userConversation.users[1].username;
                                                    }
                                                    return(
                                                        <tr onClick={() => {handleSelectRow(userConversation.inboxId)}} style={{cursor: 'pointer', backgroundColor: "white"}}>
                                                                    <td style={{ textAlign: "center", padding: "0.5rem 0" }}>{userConversation.inboxId}&nbsp;&nbsp;</td>
                                                                    <td style={{ paddingLeft:"1.25rem", padding: "0.5rem 0" }}>{username}</td>
                                                                    <td style={{ paddingLeft:"1.5rem", padding: "0.5rem 0" }}>{moment(userConversation.lastUpdated).format('MM/DD, hh:mm')}</td>
                                        
                                                                </tr>
                                                    )  

                                                }
                                                            

                                            )
                                            )
                                        }
                                    </tbody>
                                </Table>
                    </Col>

                    <Col xs={0} md={1} lg={2}></Col>

                </Row>

                    <Row>
                        
                    </Row>
            </Container>

        {/* <div>
                <h1></h1>
                <Table responsive="xl">
                    <thead>
                        <tr onClick={()=>console.log('i am here! in head')}>
                            <th>Conversation Number</th>
                            <th>Username</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myData.length === 0 ? 
                            (
                                'No conversations to show'
                            ) 
                            : 
                            (
                                myData.map((userConversation) => 
                                {
                                    let username = userConversation.users[0].username
                                    if(username === myState.data.username){
                                        username = userConversation.users[1].username;
                                    }
                                    return(
                                        <tr onClick={() => {handleSelectRow(userConversation.inboxId)}} style={{cursor: 'pointer'}}>
                                                    <td>{userConversation.inboxId}</td>
                                                    <td>{username}</td>
                                                    <td>{userConversation.lastUpdated}</td>
                        
                                                </tr>
                                    )  

                                }
                                            

                            )
                            )
                        }
                    </tbody>
                </Table>
            </div> */}
            {/* <div style={{  
                            width: '18rem', 
                            position: "absolute",
                            top:  "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)" 
                        }}>
                
                    <Table  hover size="sm">
                        <thead>
                            <tr onClick={()=>console.log('i am here! in head')} style={{ color: "rgba(0, 0, 0, 0.55)" }}>
                            <th>No.</th>
                            <th style={{ paddingLeft:"1.25rem" }}>Username</th>
                            <th style={{ paddingLeft:"1.5rem" }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myData.length === 0 ? 
                                (
                                    'No conversations to show'
                                ) 
                                : 
                                (
                                    myData.map((userConversation) => 
                                    {
                                        let username = userConversation.users[0].username
                                        if(username === myState.data.username){
                                            username = userConversation.users[1].username;
                                        }
                                        return(
                                            <tr onClick={() => {handleSelectRow(userConversation.inboxId)}} style={{cursor: 'pointer', backgroundColor: "white"}}>
                                                        <td>{userConversation.inboxId}</td>
                                                        <td style={{ paddingLeft:"1.25rem" }}>{username}</td>
                                                        <td style={{ paddingLeft:"1.5rem" }}>{moment(userConversation.lastUpdated).format('MM/DD, hh:mm')}</td>
                            
                                                    </tr>
                                        )  

                                    }
                                                

                                )
                                )
                            }
                        </tbody>
                    </Table>
            </div> */}
    </>
    )
}

export default MessagesOverview;
       