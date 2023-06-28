import React, { useEffect } from "react";

const MessageContainer = (props) => {
  const { messages } = props;
  useEffect(() => {}, [messages]);
  return (
    <div className="rounded-sm mb-1 h-[85%] w-full shadow drop-shadow-2xl overflow-auto">
      {messages.map((msg, index) => (
        <div key={index}>
          {msg.content} by {msg.name} at {msg.createdTime}
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;

// import React from "react";

// const ChatBubble = ({ message, isSent }) => {
//   const bubbleClass = isSent
//     ? "bg-blue-500 text-white "
//     : "bg-gray-200 text-gray-800";

//   return (
//     <div className={`flex items-center ${isSent ? "justify-end" : ""}`}>
//       <div className={`p-4 rounded-lg inline-block max-w-max ${bubbleClass}`}>
//         {message}
//       </div>
//     </div>
//   );
// };

// const Chat = () => {
//   const chatData = [
//     { user: "Sam", message: "Hello!", isSent: true },
//     { user: "Sriram", message: "Hi there!", isSent: false },
//     { user: "Sam", message: "How are you?", isSent: true },
//     { user: "Sriram", message: "I'm good, thanks!", isSent: false },
//   ];

//   return (
//     <div className="flex flex-col space-y-2 rounded-sm mb-1 h-[85%] w-full shadow drop-shadow-2xl overflow-auto">
//       {chatData.map((chat, index) => (
//         <ChatBubble key={index} message={chat.message} isSent={chat.isSent} />
//       ))}
//     </div>
//   );
// };

// export default Chat;
