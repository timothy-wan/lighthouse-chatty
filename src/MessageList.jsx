import React from 'react';
import Message from './Message.jsx';



const MessageList = ({messages}) => {
  const messageItems = messages.map(message => (
    <Message key={message.id} message={message}/>
  ));
  return (
    <main className="messages">
      {messageItems}
    </main>
  )
}

export default MessageList;