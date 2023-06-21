// import { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';

// const Chatroom = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = new SockJS('http://localhost:8080/chat');
//     newSocket.onopen = () => {
//       console.log('WebSocket connection established.');
//     };
//     newSocket.onmessage = (event) => {
//       const receivedMessage = event.data;
//       setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//     };
//     setSocket(newSocket);

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   const handleMessageSend = (e) => {
//     e.preventDefault();
//     if (socket) {
//       socket.send(message);
//     }
//     setMessage('');
//   };

//   return (
//     <div>
//       <h2>Chatroom</h2>
//       <div>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg}</li>
//           ))}
//         </ul>
//       </div>
//       <form onSubmit={handleMessageSend}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chatroom;

import {useEffect, useState} from "react";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Chatroom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const client = new Client({
      // brokerURL: () => new SockJS("http://localhost:8080/chat"),
      webSocketFactory: () => new SockJS("http://localhost:8080/chat"),
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("STOMP connection established.");

      client.subscribe("/topic/chat", (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("hi", message, receivedMessage);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    };

    client.activate();

    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (stompClient && message.trim() !== "") {
      stompClient.publish({
        destination: "/app/chatMessage",
        body: JSON.stringify({name: "Sam", content: message}),
        // body: message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chatroom</h2>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.content} by {msg.name} at {msg.createdTime}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleMessageSend}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatroom;
