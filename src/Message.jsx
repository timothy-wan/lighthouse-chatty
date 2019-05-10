/* eslint-disable react/prop-types */
import React from 'react';
const checkIfLink = (content) => {
  const regExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&’\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/;
  const links = content.match(regExp);
  if(links) {
    return links[0];
  }
  return false;
}

// Message Component, writes the messages received from the websocket server. 
// It will try to render an img if the message content is an url that ends in png, jpg, jpeg, gif, or svg.
// Messages and notifications are filtered and rendered.
const Message = (props) => {
  const {message} = props;
  let link = checkIfLink(message.content);
  return message.type === 'incomingMessage' ? (
    <>
      <div className='message'>
        <span className='message-username' style={{color: message.colour}}>{message.username}</span>
        {!link && <span className='message-content'>{message.content}</span> }
      </div>
      {link && 
        <div>
          <span className='message-username' style={{color: message.colour}}></span>       
          <img src={link}/>
        </div>
      }
    </>
  ) : (
    <div className='message system'>
      {message.content}
    </div>
  )
}

export default Message;