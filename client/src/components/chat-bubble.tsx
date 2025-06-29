import { socket } from "@/lib/socket";
import type { Message } from "@/types/message";

export default function ChatBubble({ message }: { message: Message }) {
  const isMe = message.from === socket.id;
  return (
    <div
      className={`flex transition-all duration-200 ease-in-out ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-96 transform rounded-2xl px-4 py-2 text-sm break-words shadow ${isMe ? "rounded-br-none bg-blue-500 text-white" : "rounded-tl-none bg-gray-200 text-black"} scale-100 opacity-100 transition-all duration-200 ease-in-out`}
      >
        {message.message}
      </div>
    </div>
  );
}
