import ChatBox from "./components/ChatBox";
import ContactContainer from "./components/ContactContainer";

function App() {
  return (
    <div className="flex">
      <ContactContainer/>
      <ChatBox/>
    </div>
  );
}

export default App;
