import type { Message } from "@/types/message";

export default function ChatBubble({ message }: { message: Message }) {
  return (
    <div
      className={`animate-in flex duration-200 ${
        message.fromMe
          ? "slide-in-from-bottom-20 justify-end"
          : "slide-in-from-top-20 justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 break-words ${
          message.fromMe
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-accent text-accent-foreground rounded-tl-none"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
