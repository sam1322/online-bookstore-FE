import React from "react";

const InputBox = (props) => {
  const { text, setText, handleMessageSend } = props;
  return (
    <div>
      <form
        className="flex items-center mt-3 mr-2"
        onSubmit={handleMessageSend}
      >
        <label for="sendtext" className="sr-only">
          Send Text Message
        </label>
        <input
          type="text"
          placeholder="Enter your message"
          className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 flex-grow"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-500 border border-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
          {/* Send */}
        </button>
      </form>
    </div>
  );
};

export default InputBox;
