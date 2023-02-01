import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from "styled-components";
import ChatDisplay from "./chatDisplay";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

export default (props) => {
    const { googleLogin, users, setUsers } = props;
    const [chat, setChat] = useState(false);
    const [text, setText] = useState("");
    const [user, setUser] = useState("");

    const url = 'http://10.1.0.52:3001';
    const [conversetion, setConversation] = useState([]);
    const getUsers = () => {
        axios.get(url + '/users', { params: { googleLogin: googleLogin.user.email } }).then(res => {
            console.log(res.data);
            if (res.data[0]) {
                console.log(res.data[0].secondaryEmails)
                setConversation(res.data[0].secondaryEmails);

                setUsers(res.data[0].secondaryEmails);
            }
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

    const showChats = (email) => {
        console.log(email + " " + googleLogin.user.email + " %%%");
        axios.get(url + '/chats', { params: { emailOne: googleLogin.user.email, emailTwo: email } }).then(res => {
            setChat(true);
            setUser(email);
            if (res.data[0]) {
                console.log(res.data[0]);
                // console.log((res.data[0].emailTwo.replaceAll(`"`, "")) + " showChats @@@@");
                // console.log(JSON.stringify(res.data) + " showChats @@@@");
            }
            setConversation(res.data);
        });
    }

    const sendMessage = () => {
        const emailOne = googleLogin.user.email
        const emailTwo = user
        console.log(emailOne + " " + emailTwo + " TWOO");
        const mainEmail = googleLogin.user.email;

        axios.post(url + '/chats', {
            text: text, emailOne: emailOne,
            emailTwo: emailTwo
        }).then(res => {
            console.log(res.data);
            setText("");
            // setUser("");
            showChats(user);
        });
    }

    return (
        <DivDisplayStyled>
            <div>
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