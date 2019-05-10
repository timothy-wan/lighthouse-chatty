// server.js

const express = require('express');
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Random number generator for colours
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

// Colours array for users
const colours = ['#C2D2F2', '#5176A6','#70731F', '#A67D4B', '#A64B29'];

// Set broadcast function to send message to all clients
wss.broadcast = message => {
  wss.clients.forEach(client => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  })
}

// Broadcast a message to everyone but the sender
const broadcastToOthers = (message, ws) => {
  wss.clients.forEach(client => {
    if(ws !== client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  })
}
// Send current number of users to all clients
const sendCurrentUsers = () => {
  let content = '';
  if(wss.clients.size > 1) {
    content = `${wss.clients.size} users online`;
  } else if(wss.clients.size === 1) {
    content = `${wss.clients.size} user online`;
  }
  let newMessage = {
    content,
    type: 'usersConnected'
  }
  wss.broadcast(newMessage);
}

// Sends a random css colour code the client should use
const sendUserColour = ws => {
  let random = getRandomInt(5);
  let newMessage = {
    type: 'userColour',
    colour: colours[random]
  }
  ws.send(JSON.stringify(newMessage));
}

// Formats new message and passes to cb function to use
const broadcastNewMessage = (message, type, cb, ws) => {
  let newMessage = {
    ...message,
    id: uuidv1(),
    type
  }
  cb(newMessage, ws);
}


// Checks the type of message received and broadcasts the message to all open clients
const handleNewMessage = (message, ws) => {
  switch(message.type) {
    case 'postMessage':
      broadcastNewMessage(message, 'incomingMessage', wss.broadcast, ws);
      break;
    case 'postNotification':
      broadcastNewMessage(message, 'incomingNotification', wss.broadcast, ws);
      break;
    case 'currentlyTyping':
      broadcastNewMessage(message, 'currentlyTyping', broadcastToOthers, ws);
      break;
    default:
      console.error('Unknown message type received!');
  }
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
// Assigns a colour for client upon connection and updates them on the current client count
wss.on('connection', ws => {
  sendUserColour(ws);
  sendCurrentUsers();
  // When a client sends a message, will parse the data and broadcast new message to all clients
  ws.on('message', data => {
    const receivedData = JSON.parse(data);
    handleNewMessage(receivedData, ws);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // Updates the open connection count for remaining clients 
  ws.on('close', () => {
    sendCurrentUsers();
  });
});