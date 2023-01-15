import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChatUser,setClient } from '../redux/authSlice';
let client = [];
export default function ContactContainer({ socketRef }) {
  const {clients,chatUser}=useSelector((state)=>state.auth)
  const chatUserRef=useRef(chatUser);
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch()
  useEffect(()=>{
    chatUserRef.current=chatUser;
  },[chatUser])
  const handleSelected = (socketId) => {
    if (socketId === selected.socketId) return;
    let y=clients.map((e)=>{
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
      if(x.socketId===socketId)
      {
        x.unReadMess=0;
      }
      return x;
    })
    const data = y.find((e) => e.socketId === socketId);
    setSelected(data);
    dispatch(setClient({clients:[...y]}));
    dispatch(setChatUser({ chatUser: data }));
  }
  useEffect(() => {
    if (socketRef.current === undefined) return
    socketRef.current.on("NEW_PEER", (data) => {
      data["unReadMess"] = 0;
      client = [...client, data];
      dispatch(setClient({clients:[...client]}));
    })
  }, [socketRef]);
  useEffect(() => {
    if (socketRef.current === undefined) return
    socketRef.current.on("ALL_PEER", (data) => {
      data = data.map((e) => {
        e["unReadMess"] = 0
        return e;
      })
      client = [...data]
      dispatch(setClient({clients:[...client]}));
    })
  }, [])
  useEffect(() => {
    socketRef.current.on("DELETE_PEER", ({ socketId }) => {
      client = client.filter((e) => socketId !== e.socketId)
      dispatch(setClient({clients:[...client]}));
      console.log(chatUser);
      if(chatUserRef.current.socketId===socketId)
      {
        dispatch(setChatUser({ chatUser: {} }));
      }
    })
  }, [])
  return (
    <div className='border-box hidden md:block border-[1px] min-w-[23rem] w-[25vw] h-[100vh]'>
      {
        clients.map((e) => (
          <div key={e.socketId} onClick={() => handleSelected(e.socketId)} className={`transition duration-150 ease-in-out h-[72px] border-b-2 flex items-center ${selected.socketId === e.socketId ? "bg-slate-200" : ""}`}>
            <div className='ml-4 h-12 w-12 rounded-3xl inline-block rounded-3xl bg-slate-300'></div>
            <div className='ml-2 font-semibold text-xl'>{e.name}</div>
            {e.unReadMess>0 && <div className='ml-2 mt-1 px-[6px] pt-[1px] pb-[2px] rounded-xl bg-green-600 text-xs text-white'>{e.unReadMess}</div>}
          </div>
        ))
      }
    </div>
  )
}
