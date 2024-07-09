import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";

const Chat: React.FC = () => {
  const { token } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Array<{ user: string; text: string }>>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error("Error:", data.error);
      } else {
        setChat((prevChat) => [...prevChat, data]);
      }
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket disconnected", event);
      if (event.wasClean) {
        console.log(
          `Closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.log("Connection died");
      }
      setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (ws.current?.readyState !== WebSocket.CLOSED) {
        ws.current?.close();
      }
    };
  };

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN && message) {
      ws.current.send(JSON.stringify({ token, text: message }));
      setMessage("");
    } else {
      console.warn("WebSocket is not open");
    }
  };

  console.log("LOS CHASTS", chat);
  return (
    <div>
      <h1>Chat</h1>
      <div>
        {chat.map((chatMessage, index) => (
          <div key={index}>
            <strong>{chatMessage.user}:</strong> {chatMessage.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
