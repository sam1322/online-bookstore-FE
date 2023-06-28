import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import InputBox from "@/components/Chat/inputBox";
import MessageContainer from "@/components/MessageContainer";
import { chatUrl } from "@/constants/path";

const Chatroom = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [userName, setUserName] = useState(null);
  const [connected, setConnected] = useState(false);

  const userList = ["Chatroom", "Ram", "Shyam", "Mohan"];
  const headers = {
    "ngrok-skip-browser-warning": "user",
  };
  useEffect(() => {
    const client = new Client({
      // brokerURL: "ws://localhost:8080/chat",
      // brokerURL: "ws://localhost:8080/ws",
      // webSocketFactory: () => new SockJS("http://localhost:8080/chat"),
      webSocketFactory: () =>
        new SockJS(chatUrl, null, {
          transportOptions: {
            "xhr-streaming": {
              headers:headers,
            },
          },
        }),
      // new SockJS(chatUrl + "?ngrok-skip-browser-warning=any"),
      connectHeaders: headers,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("STOMP connection established.");

      client.subscribe(
        "/topic/chat",
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("hi", message, receivedMessage);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        },
        headers
      );
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
        headers: headers,
      });
      setText("");
    }
  };

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (userName == null || userName.trim() == "") return;
    // if (user == null || user.trim() == "") return;
    setConnected(true);
  };

  return (
    <>
      {connected || true ? (
        <div className="bg-red-500 overflow-y-auto p-5 overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="w-full flex h-[500px] bg-white rounded-md shadow-lg shadow-cyan-500/50 drop-shadow-xl">
            <div>
              {userList.map((item, index) => (
                <div
                  key={index}
                  className="text-white bg-blue-500 m-2 p-1 rounded-md hover:shadow-lg hover:bg-blue-400 active:bg-blue-600 cursor-pointer select-none"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="w-full">
              <MessageContainer messages={messages} />
              <InputBox
                text={text}
                setText={setText}
                handleMessageSend={handleMessageSend}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          id="info-popup"
          // tabIndex="-1"
          className="bg-red-500 flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
          <form onSubmit={registerUser}>
            <div className="m-5 p-2 flex gap-3 bg-white rounded-lg shadow dark:bg-gray-800 md:p-5">
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Name"
                required
                value={userName}
                onChange={handleUsername}
              />
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatroom;
