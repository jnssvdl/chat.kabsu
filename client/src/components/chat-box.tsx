import type { Message } from "@/types/message";
import ChatBubble from "./chat-bubble";

export default function ChatBox({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-2">
      {messages.map((message, index) => (
        <ChatBubble key={index} message={message} />
      ))}
    </div>
  );
}
