import React from 'react'
import { Form, Button, Container, Row, Col, Stack, FloatingLabel, InputGroup, Spinner, Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { myReducersTypeof } from '../state/reducers'
import { useState, useEffect } from 'react'
import { login } from '../state/actions/actionCreators'
import { useHistory } from 'react-router-dom'
import Slider from '../components/Slider'
import Navigation from '../components/Navigation';
import ApiService from '../ApiService'
import {IchatConversations, Iconversation} from '../state/actions/index'


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
                console.log('fetching finished, setting datafetched to true');
                setDataFetched(true);
            }).then(() => {
                console.log('setting load to true (needs to be the last one to avoid re-rendering)')
                setLoading(false);
            });
        }
    }, [])

    console.log('AUTHORIZED IN SELL!')

    /* forward to correct chat */
    const handleSelectRow = (inboxId: number) => {
        console.log('here in handleSelectRow');

        history.push(`/messages/${inboxId}`)
    }
    /*
    -> Each conversation item is clickable
     */
    return(
        <>
        <Navigation />

        <div>
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
    </div>
    </>
    )
}

export default MessagesOverview;
       