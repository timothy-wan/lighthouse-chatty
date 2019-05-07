import React, {Component} from 'react';

const Message = ({message}) => {
  return message.type === "incomingMessage" ? (
    <div className="message">
      <span className="message-username">{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
  ) : (
    <div class="message system">
      {message.content}
    </div>
  )
}

export default Message;