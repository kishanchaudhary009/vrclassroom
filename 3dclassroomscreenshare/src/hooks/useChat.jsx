// useChat.jsx
import { createContext, useContext, useState } from "react";

// Create a context for the chat
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const chat = async (text) => {
    setLoading(true);

    try {
      console.log("Sending text to backend:", text);
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from backend:", data);
      setMessage(data); // This should include text, audio, and lipsync
    } catch (error) {
      console.error("Error sending message to backend:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ message, loading, chat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};