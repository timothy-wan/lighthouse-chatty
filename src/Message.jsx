import React from 'react';

const Message = (props) => {
  const {message} = props;
  return message.type === 'incomingMessage' ? (
    <div className='message'>
      <span className='message-username'>{message.username}</span>
      <span className='message-content'>{message.content}</span>
    </div>
  ) : (
    <div className='message system'>
      {message.content}
    </div>
  )
}

export default Message;