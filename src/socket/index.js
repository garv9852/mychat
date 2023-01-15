import {io} from 'socket.io-client'
export const socketInit=()=>{
    const options={
        'force new connection':true,
        reconnectionAttempts:"Infinity",
        timeout:10000,
        transport:['websocket']
    }
    return io('https://mychat-backend.up.railway.app/',options)
}