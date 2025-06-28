import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import type { Message } from "../types/message";
import ChatForm from "../components/chat-form";
import FindMatch from "../components/find-match";
import LeaveButton from "../components/leave-button";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    function onConnect() {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onWaiting() {
      console.log("Waiting...");
      setIsWaiting(true);
    }

    function onMatched() {
      // alert("Matched!");
      console.log("Matched event received");
      setIsWaiting(false);
      setIsMatched(true);
    }

    function onMessage(newMessage: Message) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    function onDisconnected() {
      alert("They have disconnected");
      setIsMatched(false);
      setMessages([]);
    }

    socket.connect();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("waiting", onWaiting);
    socket.on("matched", onMatched);
    socket.on("message", onMessage);
    socket.on("disconnected", onDisconnected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      socket.off("waiting", onWaiting);
      socket.off("matched", onMatched);
      socket.off("message", onMessage);
      socket.off("disconnected", onDisconnected);

      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Matchmaker</h1>

      {isMatched ? <LeaveButton /> : ""}

      {isWaiting ? (
        <p>Waiting for a match...</p>
      ) : (
        <FindMatch setMessages={setMessages} />
      )}

      <ChatForm setMessages={setMessages} />

      <ul>
        {messages.map((m, i) => (
          <li key={i}>
            <strong>{m.from === socket.id ? "You" : "Anonymous"}:</strong>{" "}
            {m.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
