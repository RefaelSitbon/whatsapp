import '../styles/globals.css'
// import { useAuthState } from "react-firebase-hooks/auth"
// import  auth from "../firebase";
import Login from './login';

function MyApp({ Component, pageProps }) {
  // console.log(auth + " auth !!!!") 

  // const [user] = useAuthState(auth);
  // console.log(user + " user!!!")

  // return <Login />;

  return <Component {...pageProps} />
}

export default MyApp
