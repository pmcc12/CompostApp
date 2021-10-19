import React from 'react'
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';

interface Props {
    messageContent: string,
    messageSenderId: number,
    messageDate: string,
    messageUsername: string
}

const Chatbubble = ({messageContent, messageSenderId, messageDate, messageUsername}:Props) => {

    const myState = useSelector((state: myReducersTypeof) => state.login);

    console.log('@chatbubble) username from sender: '+messageUsername+'; message senderId: '+messageSenderId+'; message content: '+messageContent+'; in date: '+messageDate)
    /*
    check if received message to render belongs
    */
    return (
        <>
            {messageSenderId === myState.data.userId ? 
            (
                <div style={{display: 'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                    <p>Your message</p>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        <div style={{backgroundColor: 'rgb(206, 221, 255)'}}>
                            {messageContent}
                        </div>
                        <div style={{display: 'flex', justifyContent:'flex-end'}}>
                            <p>{messageDate.slice(11,16)}, {messageDate.slice(8,10)}/{messageDate.slice(5,7)}</p>
                        </div>
                    </div>
                </div>

            ) 
            : 
            (
                <div style={{display: 'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                    <p>{messageUsername}</p>
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        <div style={{backgroundColor: 'rgb(242, 244, 245)'}}>
                            {messageContent}
                        </div>
                        <div style={{display: 'flex', justifyContent:'flex-end'}}>
                            <p>{messageDate.slice(11,16)}, {messageDate.slice(8,10)}/{messageDate.slice(5,7)}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Chatbubble;
