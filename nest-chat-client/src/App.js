
import './App.css';
import Chat from './components/chat/chat';
import LoginSignIn from './components/loginSignIn/loginSignIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FrontContextProvider } from './context/frontContext';
import { UserDataProvider } from './context/userDataContext';
import { ChatContextProvider } from './context/chatContext';

function App() {
  return (
    <div className="App">
      <FrontContextProvider>
          <ChatContextProvider>
        <UserDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginSignIn/>}></Route>
              <Route path="/chat" element={<Chat/>}></Route>
            </Routes>
          </BrowserRouter>
        </UserDataProvider>
          </ChatContextProvider> 
      </FrontContextProvider>

    </div>
  );
}

export default App;
