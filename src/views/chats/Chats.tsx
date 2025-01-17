import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import classes from "./Chats.module.css";
import { getChats } from "../../api/requests/chats";
import { Chats } from "../../types";
import { Phone, SendHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

const Chat: React.FC = () => {
  const { token, name, setToken } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Array<Chats>>([]);
  const ws = useRef<WebSocket | null>(null);
  const [chats, setChats] = useState<Chats[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const closeChat = () => {
    if (ws.current) {
      ws.current.close();
      localStorage.removeItem("name");
      localStorage.removeItem("access_token");
      setToken(null);
      navigate("/");
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  const getAllChats = async () => {
    const { data } = await getChats();
    setChats(data);
  };

  useEffect(() => {
    if (ws.current) {
      return;
    } else {
      connectWebSocket();
    }

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats, chat]);

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
        setChat((prevChat) => [
          ...prevChat,
          { message: data.text, name: data.user },
        ]);
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

  return (
    <section className={classes["container-chats"]}>
      <div className={classes["container-video"]}>
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/SwQJv06DlgY?si=b2C9xCLIUTiOdVNI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <div className={classes["container-messages"]}>
          {chats.concat(chat).map((chatMessage, index) => (
            <div
              key={index}
              className={
                name === chatMessage.name
                  ? classes["my-bubble"]
                  : classes["other-bubble"]
              }
            >
              <strong>{chatMessage.name}:</strong> {chatMessage.message}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        <div className={classes["form-chats"]}>
          <input
            type="text"
            value={message}
            className={classes.input}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className={classes["button-form"]}
            type="submit"
            onClick={sendMessage}
          >
            <SendHorizontal />
          </button>
        </div>
      </div>

      <div className={classes["footer-chats"]}>
        <button className={classes["button-close"]} onClick={closeChat}>
          <Phone size={26} />
        </button>
      </div>
    </section>
  );
};

export default Chat;
