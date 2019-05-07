import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  )
}

const App = () => {
  return (
    <div>
      <Navbar/>
      <MessageList/>
      <ChatBar/>
    </div>   
  )
}
export default App;
