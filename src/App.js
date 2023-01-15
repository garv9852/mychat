import { useState,useRef } from "react";
import { useDispatch } from "react-redux";
import ChatBox from "./components/ChatBox";
import ContactContainer from "./components/ContactContainer";
import { setUser } from "./redux/authSlice";
import { socketInit } from "./socket";
function App() {
  const [name, setName] = useState("");
  const socketRef=useRef();
  const [nameDialog,setNameDialog]=useState(true);
  const dispatch = useDispatch();
  const handleName = () => {
    dispatch(setUser({ user: { name } }));
    setNameDialog(false);
    socketRef.current=socketInit();
    socketRef.current.emit("JOIN",({name}));
  };
  return nameDialog ?
    <div className="relative min-h-screen bg-white flex justify-center items-center">
      <div className="transtion bg-slate-100 rounded-2xl hover:shadow-lg duration-300 p-6">
        <input className='rounded-lg grow border-2 p-3' placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <div className='ml-2 p-3 pointer inline-block rounded-2xl bg-neutral-900 text-white font-semibold text-xl' onClick={handleName}>Join</div>
      </div>
    </div>
    : (<div className="flex">
      <ContactContainer socketRef={socketRef}/>
      <ChatBox socketRef={socketRef}/>
    </div>);
}

export default App;
