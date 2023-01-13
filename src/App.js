import ChatBox from "./components/ChatBox";
import ContactContainer from "./components/ContactContainer";

function App() {
  return (
    <div className="flex overflow-hidden">
      <ContactContainer/>
      <ChatBox/>
    </div>
  );
}

export default App;
