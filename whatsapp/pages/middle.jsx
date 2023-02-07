import React, { useState } from "react";
import SideBar from "./sideBar";
import Login from "./login";
// import { googleLog } from "./login";

// import { io } from "socket.io-client"

// const socket = io("ws://localhost:3002")

// socket.on("hello", (data) => {
//   console.log(data)
// })
// socket.emit("whatsapp", "strange")

export default (props) => {
  const [googleLogin, setGoogleLogin] = useState("");
  const [login, setLogin] = useState(false);

  // console.log(googleLog)
  // console.log(googleLogin)


  return (
    <div>
      {/* {!login ? null : <SideBar login={login} setLogin={setLogin} googleLogin={googleLogin} setGoogleLogin={setGoogleLogin} show={!login}/>} */}
      {login ? <SideBar googleLogin={googleLogin} />
        : <Login login={login} setLogin={setLogin} googleLogin={googleLogin} setGoogleLogin={setGoogleLogin} />}
    </div>
  );
}