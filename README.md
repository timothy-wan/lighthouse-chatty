Chatty App
=====================

A SPA built with ReactJS that allows users with communicate with each other without having to register for an account.

### Screenshots

!['Conversation'](https://github.com/tw5033/lighthouse-chatty/blob/screenshots/screenshots/conversation.png)
!['Notification'](https://github.com/tw5033/lighthouse-chatty/blob/screenshots/screenshots/notification.png)
!["Cat"](https://github.com/tw5033/lighthouse-chatty/blob/screenshots/screenshots/img.png)

### Usage

Clone the project.

Install the dependencies and start the React server from chatty directory. Change directory into the websocket server, chatty/chatty-server and install the dependencies and start the websocket server.

```
npm install
npm start
cd chatty-server
npm install
node server.js
open http://localhost:3000
```


### Linting

This project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* css-loader
* sass-loader
* SASS
* ws
* uuid
* style-loader
* SockJS-client
* eslint

### Project Requirements

#### Functional Requirements
* Primarily a client-side SPA (single-page app) built with ReactJS
 based on the HTML and CSS provided:
  * Contains a chat log displaying messages and notifications ✅
  * Contains an input field to change your name and an input field to send a message ✅
* The client-side app communicates with a server via WebSockets for multi-user real-time updates
* No persistent database is involved; the focus is on the client-side experience

#### Behaviour Requirements
* When any connected user sends a chat message, all connected users receive and display the message ✅
* When any connected user changes their name, all connected users are notified of the name change ✅
* Notifications are styled differently from chat messages ✅
* Header will display the count of connected users ✅
* When the number of connected users changes, this count will be updated for all connected users ✅
* (STRETCH) Different users' names will each be coloured differently
Bonus: the colouring is consistent between connected user instances or is calculated algorithmically based on their name, or is manually selectable by users, or any other interesting approach! ✅

#### Technical Specifications

Stack:

* Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
* WebSockets using Node package ws on the server-side, and native 
* WebSocket on client side
* ReactJS

React component guidelines:

* A single root component (e.g. App) should be responsible for the main application state, as well as communication with the WebSocket server ✅
* A message list component renders the chat log (chat messages and system notifications) ✅
* A chat bar component provides an input field for changing your username and an input field for sending messages. These input fields do not need to be React-style "controlled inputs", although they can be. ✅

Client websocket behaviour:

* opens a websocket connection as soon as the App component is mounted
the connection stays open until the client closes the page (or otherwise disconnects) ✅
* sends chat messages and (name change) notifications initiated by the current user ✅
* handles broadcast messages (chat, notifications, user count) from the server and may alter state accordingly ✅

Websocket server specs:

* The Chatty client app and Chatty websocket server are separate ✅
* Node apps each with their own package.json ✅
* It's a simple server using express and ws ✅
* The server should send and receive JSON-encoded messages ✅

When a client sends a message:

* the server should determine what to do based on the message's type property ✅
* it should construct a message to send back in response with a corresponding type and a generated unique id (e.g. a UUID) ✅ 
* When a client connects or disconnects, the server should broadcast the current user count to all connected clients ✅
* (STRETCH) the server may assign and/or keep track of user colours (there are several ways of solving this) ✅
