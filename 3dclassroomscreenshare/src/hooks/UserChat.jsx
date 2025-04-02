import { useState } from "react";

export const UserChat = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const chat = async (text) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      setMessage(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { message, loading, chat };
};