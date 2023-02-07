import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { IconButton, Button } from "@mui/material";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import * as EmailValidator from "email-validator";
import axios from 'axios';
import ChatList from "../components/chatList";
import { io } from "socket.io-client"
import { googleLog } from "./login";
import socket from "../socket";

const firebase = require('@firebase/app');


export default (props) => {
    var socketMain = null;
    const socketMailArray = [];
    // const socket = io("http://10.56.1.1:3002");
    // const { socket } = props;
    console.log(googleLog?.user.email + " googleLog: ")

    const googleLogin = googleLog;
    // console.log("User " + JSON.stringify(googleLogin.user.email))
    const url = 'http://10.56.1.1:3001';
    const [users, setUsers] = useState([]);
    // const [user, setUser] = useState(googleLogin.user.email);//destructing (to arrayss)
    // const [img, setImg] = useState(googleLog?.user.photoURL);
    const img = googleLog?.user.photoURL;
    // console.log((googleLogin.user))


    const [conversetion, setConversation] = useState([]);
    const getUsers = () => {
        axios.get(url + '/users', { params: { googleLogin: googleLog?.user.email } }).then(res => {
            console.log(res.data);
            if (res.data[0]) {
                // console.log(res.data[0].secondaryEmails)
                // setConversation(res.data[0].secondaryEmails);

                setUsers(res.data[0].secondaryEmails);
                socketMain = socket();
                socketMain.on('try', (data) => {
                    socketMailArray.push(data);
                    console.log(JSON.stringify(socketMailArray) + "JSON");
                    // socketMain.emit("log", {"email": googleLog?.user.email});
                    // console.log(data + " DATA");
                    // socketMailArray.push({"email": googleLog?.user.email, "socketId": data});
                    // console.log(JSON.stringify(socketMailArray) + " socketMailArray")
                });
                socketMain.on('alert', (data) => { setConversation(data) });

            }
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

    const some = () => {
        console.log("SSSSSAMMAAAKK!!!!")
    }
    // useEffect(() => {
    // some();
    // })

    const createChat = () => {
        const input = prompt(
            "Enter an email address for  the user you wish to chat with:");
        // console.log(input + " Input");
        if (!input) { return null; }

        if (EmailValidator.validate(input)) {
            console.log("Validated input")
            axios.put(url + '/register', { params: { emailOne: googleLog?.user.email, emailTwo: input } }).then(res => {
                // console.log(JSON.stringify(res.data));
                setUsers(res.data)
            });
            // we need to add the chat into the DB 'chats' collection 
        } else {
            alert("Please enter a valid email address");
        }
    }


    return (
        <Container>
            <Header>
                <ImgStyle src={img} alt={"NOTHING"} />
                <IconContainer>
                    <IconButton >
                        <ChatIcon />
                    </IconButton>
                    <IconButton >
                        <DotsIcon />
                    </IconButton>
                </IconContainer>
            </Header>
            <SearchDiv>
                <SearchIcon />
                <SearchInput placeholder="search in chats" />
            </SearchDiv>

            <SideBarButton onClick={createChat}>Start a new chat</SideBarButton>

            {/* <button onClick={handleClick} >Google</button> */}
            {/* List of  chats */}
            <hr></hr>

            {/* <ChatDisplay googleLogin={googleLogin}/> */}
            <ChatList googleLogin={googleLogin} users={users} setUsers={setUsers} conversetion={conversetion} setConversation={setConversation} socketMain={socketMain} />

        </Container>
    );
}



const Container = styled.div
    `
    
`;

const Header = styled.div
    `
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0% 0% 0% 0%;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const IconContainer = styled.div
    `
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

const ChatIcon = styled(MessageTwoToneIcon)
    `
    margin: 0% 0% 1% 15%;
    font-size: 2rem;
    `

const DotsIcon = styled(MoreVertTwoToneIcon)
    `
    margin: 0% 0% 0% 0%;
    
    border-width: 0px;
    font-size: 2rem;
    `

const SearchDiv = styled.div
    `
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 3px;
`;

const SearchIcon = styled(SearchTwoToneIcon)
    `
    cursor: pointer;
    color: black;
    margin-right: 5px;
    font-size: 1.5rem;
    `

const SearchInput = styled.input
    `
    outline-width: 0;
    border: none;
    flex: 1;
`;

const SideBarButton = styled(Button)
    `
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    color: black;
    width: 100%;
    `

const ImgStyle = styled.img
    `
    width: 50px;
    height: 50px;
    border-radius: 30px;
    

`