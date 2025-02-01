const { io } = require("socket.io-client");

export const createSocketConnection = () =>{
    return io('http://localhost:7777')
}