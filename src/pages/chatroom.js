import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Chatroom = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  // const [user, setUser] = useState({});
  const [userName, setUserName] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      // brokerURL: "ws://localhost:8080/chat",
      // brokerURL: "ws://localhost:8080/ws",
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
    if (stompClient && text.trim() !== "") {
      stompClient.publish({
        destination: "/app/chatMessage",
        body: JSON.stringify({ name: "Sam", content: text }),
        // body: message,
      });
      setText("");
    }
  };

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const registerUser = () => {
    if (user == null || user.trim() == "") return;
    setConnected(true);
  };
  return (
    <>
      {/* {user?.connected || true ? ( */}
      {connected ? (
        <div>
          <h2>Chatroom</h2>
          <div>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  {msg.content} by {msg.name} at {msg.createdTime}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleMessageSend}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        // <div className="register">
        //   <input
        //     // id="user-name"
        //     placeholder="Enter your name"
        //     name="userName"
        //     // value={user.userName}
        //     // value={user}
        //     value={userName}
        //     onChange={handleUsername}
        //     margin="normal"
        //   />
        //   <button type="button" onClick={registerUser}>
        //     connect
        //   </button>
        // </div>
        <div
          id="info-popup"
          tabIndex="-1"
          className="bg-red-500 flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
          {/* <div className="relative flex justify-center items-center p-4 w-full max-w-lg h-full md:h-auto"> */}
            <div className="m-5 p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
              <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                  Privacy info
                </h3>
                <p>
                  The backup created with this export functionnality may contain
                  some sensitive data. We suggest you to save this archive in a
                  securised location.
                </p>
              </div>
              <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                <a
                  href="#"
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Learn more about privacy
                </a>
                <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                  <button
                    id="close-modal"
                    type="button"
                    className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    id="confirm-button"
                    type="button"
                    className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
};

export default Chatroom;
