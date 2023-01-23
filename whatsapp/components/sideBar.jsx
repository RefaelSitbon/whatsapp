import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { IconButton, Button } from "@mui/material";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import * as EmailValidator from "email-validator";
// import { app, auth, db, provider } from "../firebase";
import {
    getAuth, GoogleAuthProvider, signInWithRedirect,
    getRedirectResult
} from 'firebase/auth';
const firebase = require('@firebase/app');
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
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const IconContainer = styled.div
    `

`

let UserAvatar = styled(AccountCircleIcon)
    `
    color: silver;
    font-size: 3rem;
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`;

const ChatIcon = styled(MessageTwoToneIcon)
    `
    font-size: 2rem;
    margin: 0% 0% 1% 15%;
`

const DotsIcon = styled(MoreVertTwoToneIcon)
    `
    font-size: 2rem;
    margin: 0% 0% 0% 0%;

    border-width: 0px;
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
    font-size: 1.5rem;
    margin-right: 5px;
`

const SearchInput = styled.input
    `
    outline-width: 0;
    border: none;
    flex: 1;
`;

const SideBarButton = styled(Button)
    `
    width: 100%;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    color: black;
`

const ImgStyle = styled.img
`
    width: 50px;
    height: 50px;
    border-radius: 30px;
`


export default () => {
    const createChat = () => {
        const input = prompt(
            "Enter an email address for the user you wish to chat with:");
        console.log(input);
        if (!input) { return null; }

        if (EmailValidator.validate(input)) {
            // we need to add the chat into the DB 'chats' collection 
        }
    }

    const firebaseConfig = {
        apiKey: "AIzaSyD9BmC5oYlcmpWar308pS5GVLwrESznQXQ",
        authDomain: "whatsapp-bd5dc.firebaseapp.com",
        projectId: "whatsapp-bd5dc",
        storageBucket: "whatsapp-bd5dc.appspot.com",
        messagingSenderId: "523912150721",
        appId: "1:523912150721:web:51496b4a5a5bb831d21e40",
        measurementId: "G-ZQ5YEDS6HT"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider;
    const [user, setUser] = useState('');
    console.log(user.photoURL + " USERR")
    const [img, setImg] = useState('');


    const handleClick = () => {
        signInWithRedirect(auth, provider)

    }

    const handleGetAuth = () => {
        getRedirectResult(auth).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(credential);
            console.log("               ")
            console.log(credential.idToken)
            console.log("               ")

            console.log(credential.accessToken)
            console.log("               ")
            console.log(credential.providerId)

            setUser(result.user);
            setImg(result.user.photoURL);
        })
    }

    return (
        <Container>
            <Header>
                {!user ? <UserAvatar /> : <ImgStyle src={img} alt={" NOTHING"} />}
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

            <button onClick={handleClick} >Google</button>
            <button onClick={handleGetAuth}>Get a random token</button>
            {/* {GoogleSignInButton()} */}
            {/* List of  chats */}
            <hr></hr>
        </Container>
    );
}