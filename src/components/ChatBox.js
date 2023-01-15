import React, { useEffect, useRef, useState } from 'react'
import { ReciveMessage, SendMessage } from './Message'
import { useDispatch, useSelector } from "react-redux"
import { setClient } from '../redux/authSlice';
export default function ChatBox({ socketRef }) {
  const { chatUser } = useSelector((state) => state.auth)
  const chatUserRef=useRef(chatUser);
  const bottomRef = useRef(null);
  const dispatch=useDispatch();
  const {clients}=useSelector((state)=>state.auth)
  const [chat, setChat] = useState({});
  const [messageBox, setMessageBox] = useState("");
  const clientsRef=useRef(clients);
  useEffect(()=>{
    chatUserRef.current=chatUser
  },[chatUser])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chat]);
  useEffect(()=>{
    clientsRef.current=[...clients];
  })
  useEffect(() => {
    socketRef.current.on("RECEIVE_MESG", ({peerId,data}) => {
      if(chat[peerId]===undefined) chat[peerId]=[];
      chat[peerId].push({ type: "receive", data })
      if(chatUserRef.current.socketId!==peerId)
      {
        clientsRef.current=clientsRef.current.map((e)=>{
          const x={};
          Object.defineProperties(x,{
            name:{
              value:e.name,
              writable:true
            },
            socketId:{
              value:e.socketId,
              writable:true
            },
            unReadMess:{
              value:e.unReadMess,
              writable:true
            }
          })
          if(x.socketId===peerId)
          {
            x.unReadMess+=1;
          }
          return x;
        })
        dispatch(setClient({clients:[...clientsRef.current]}))
      }
      setChat({...chat});
    })
  }, [])
  const sendMessage = () => {
    socketRef.current.emit("SEND_MESG", ({
      data: messageBox,
      peerId: chatUser.socketId
    }))
    if(chat[chatUser.socketId]===undefined) chat[chatUser.socketId]=[];
    chat[chatUser.socketId].push({ type: "send", data:messageBox })
    setChat({...chat});
  }
  return chatUser.socketId === undefined ?
    (<div className='grow flex items-center justify-center font-semibold'>
      No User selected
    </div>)
    : (
      <div className='flex flex-col grow h-[100vh] border-[1px]'>
        <div className='h-[50px] md:h-[72px] bg-slate-100 flex items-center'>
          <div className='ml-4 h-8 w-8 md:h-12 md:w-12 rounded-3xl inline-block bg-slate-300' />
          <div className='ml-2 font-semibold text-sm md:text-xl'>{chatUser.name}</div>
        </div>
        <div className='flex-1 overflow-y-auto pb-2'>
          {
            chat[chatUser.socketId]?.map((e,i) => (
              e.type === "receive" ?
                <ReciveMessage data={e.data} key={i}/>
                :
                <SendMessage data={e.data} key={i}/>
            ))
          }
          <div ref={bottomRef} />
        </div>
        <div className='h-[72px] p-[10px] flex bg-slate-100 items-center'>
          <input value={messageBox} onChange={(e)=>setMessageBox(e.target.value)} className='rounded-lg grow border-2 p-3 w-11/12' placeholder='Type Here' />
          <div onClick={sendMessage} className='ml-2 p-3 rounded-2xl bg-neutral-900 text-white font-semibold text-xl'>Send</div>
        </div>
      </div>
    )
}