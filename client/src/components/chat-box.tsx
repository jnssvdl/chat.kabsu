import type { Message } from "@/types/message";
import ChatBubble from "./chat-bubble";
import { useEffect, useRef } from "react";

export default function ChatBox({ messages }: { messages: Message[] }) {
  const lastChatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-2">
      {messages.map((message, index) => {
        if (messages.length === index + 1) {
          return <ChatBubble key={index} message={message} ref={lastChatRef} />;
        } else {
          return <ChatBubble key={index} message={message} />;
        }
      })}
    </div>
  );
}
