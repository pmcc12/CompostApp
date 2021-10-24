import React from 'react'
// import '../css/PrivateMessage.css'
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

    return (
        <>
            {messageSenderId === myState.data.userId ? 
            (
                <div className="chatbuble-wrapper">
                    <p className="chatbuble-username">Your message</p>
                    <div className="chatbuble-msg-date-container">
                        <div className="chatbuble-msg-owner">
                            {messageContent}
                        </div>
                        <div className="chatbuble-date-container" >
                            <p>{messageDate.slice(11,16)}, {messageDate.slice(8,10)}/{messageDate.slice(5,7)}</p>
                        </div>
                    </div>
                </div>

            ) 
            : 
            (
                <div className="chatbuble-wrapper">
                    <p className="chatbuble-username">{messageUsername}</p>
                    <div className="chatbuble-msg-date-container">
                        <div className="chatbuble-msg-other">
                            {messageContent}
                        </div>
                        <div className="chatbuble-date-container">
                            <p>{messageDate.slice(11,16)}, {messageDate.slice(8,10)}/{messageDate.slice(5,7)}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Chatbubble;
