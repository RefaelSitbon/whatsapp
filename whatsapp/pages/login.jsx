import styled from "styled-components";
import Head from "next/head";
import { signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button } from "@mui/material";
import auth from "../firebase";


function Login(props) {
    const { login, setLogin, googleLogin, setGoogleLogin } = props;



    const handleClick = () => {
        // signInWithRedirect(auth, provider);
        // const userData = signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
        // setLogin(true);        
        // });
        signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
            setLogin(true);
        });
    }

    const handleChange = async() => {
        console.log("HEREEEE!!1")
        await signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            console.log("HEREEEE!!2")

            setGoogleLogin(result);
            setLogin(true);
        });
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt=" FUCK!!!" />
                {/* <Button variant="outlined" onClick={handleClick}>Login</Button> */}
                <Button variant="outlined" onClick={handleChange} >Rgister with Google account </Button>
            </LoginContainer>
        </Container>
    )
}



export default Login;

const Container = styled.div
    `
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100vw;
    background-color: whitesmoke;
`;


const Image = styled.img
    `
width: 200px;
height: 200px;
margin-bottom: 50px;
`;

const LoginContainer = styled.div
    `
padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgb(0 143 107 / 70%);
`