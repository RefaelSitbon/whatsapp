import { io } from "socket.io-client"


const socket = () => {return io("http://10.56.1.1:3002");} 
// socket.on('connect', () => console.log("You connect with id: " + socket.id));

export default socket;