import React,{ useState } from "react";
import SideBar from "../components/sideBar";
import Login from "./login";

export default () => {
  const [login, setLogin] = useState(false);
  const [googleLogin, setGoogleLogin] = useState("");

  return (
    <div>
        {login ?  <SideBar googleLogin={googleLogin} setGoogleLogin={setGoogleLogin}/> 
        : <Login login={login} setLogin={setLogin} googleLogin={googleLogin} setGoogleLogin={setGoogleLogin}  />}
    </div>
  );
}