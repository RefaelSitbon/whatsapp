import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from "styled-components";
import ChatDisplay from "./chatDisplay";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

export default (props) => {
    const { googleLogin, users, setUsers, conversetion, setConversation, socketMain } = props;
    const [chat, setChat] = useState(false);
    const [text, setText] = useState("");
    const [user, setUser] = useState("");

    const url = 'http://10.56.1.1:3001';
    

    const showChats = (email) => {
        // console.log(email + " " + googleLogin.user.email + " %%%");
        axios.get(url + '/chats', { params: { emailOne: googleLogin.user.email, emailTwo: email } }).then(res => {
            setChat(true);
            setUser(email);
            if (res.data[0]) {
                console.log(res.data);
                // console.log((res.data[0].emailTwo.replaceAll(`"`, "")) + " showChats @@@@");
                // console.log(JSON.stringify(res.data) + " showChats @@@@");
            }
            setConversation(res.data);
            const emailOne = googleLogin.user.email;
            const emailTwo = res.data[0].emailTwo === googleLogin.user.email ? res.data[0].emailOne : res.data[0].emailTwo;
            // const text = res.data[0].text;
        });
    }

    const sendMessage = () => {
        const emailOne = googleLogin.user.email
        const emailTwo = user
        // const mainEmail = googleLogin.user.email;

        axios.post(url + '/chats', {
            text: text, 
            emailOne: emailOne,
            emailTwo: emailTwo
        }).then(res => {
            const obj = {emailOne: emailOne, emailTwo: emailTwo, text: text}
            // socket.emit("newMessage", obj);
            console.log(res.data);
            // setUser("");
            setText("");
            showChats(user);

        });
    }

    return (
        <DivDisplayStyled>
            <div>
                {/* <div>{getUsers()}</div> */}
                {users.map((email, index) => {
                    return (
                        <DivStyled key={index + 1000}>
                            <UserAvatar />
                            <button onClick={() => showChats(email)}>{email}</button>
                        </DivStyled>
                    );
                })} 
            </div>
            {!chat ? null :
                <div>
                    <ChatDisplay conversetion={conversetion} googleLogin={googleLogin} />
                    <DivInputStyled>
                        <InputTextStyled value={text} onChange={e => setText(e.target.value)} />
                        <SendTwoToneIcon onClick={sendMessage} />
                    </DivInputStyled>
                </div>
            }
        </DivDisplayStyled>
    );
}

const DivInputStyled = styled.div
    `
display: flex;
`

const InputTextStyled = styled.input
    `
border: 1px solid black;
border-radius: 5px;
background-color: white;
padding: 10px;
`

const UserAvatar = styled(AccountCircleIcon)
    `
    color: silver;
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
    font-size: 3rem;
    `;

const DivStyled = styled.div
    `
display: flex;
`

const DivDisplayStyled = styled.div
    `
display: flex;
justify-content: space-between;
`