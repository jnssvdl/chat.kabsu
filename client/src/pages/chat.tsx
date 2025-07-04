import ChatForm from "@/components/chat-form";
import { useChat } from "@/components/chat-context";
import ChatBox from "@/components/chat-box";
import { Button } from "@/components/ui/button";
import { Loader2, MessageCircle, Unlink, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import TypingIndicator from "@/components/typing-indicator";
import Header from "@/components/header";

export default function Chat() {
  const {
    isWaiting,
    isMatched,
    isDisconnected,
    isTyping,
    messages,
    findMatch,
  } = useChat();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaiting, isMatched, isDisconnected]);

  return (
    <div className="flex h-screen justify-center lg:p-4">
      <div className="flex w-full max-w-5xl flex-col border shadow">
        <Header />

        <div className="flex-1 overflow-y-auto">
          <div className="flex min-h-full flex-col justify-end gap-2 p-4">
            {!isWaiting && isMatched && (
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                <span>You're connected! Say hi to them!</span>
              </p>
            )}

            {isWaiting && (
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Finding someone you can chat with...</span>
              </p>
            )}

            <ChatBox messages={messages} />

            {isTyping && <TypingIndicator />}

            {isDisconnected && !isMatched && (
              <p className="text-destructive flex items-center justify-center gap-2">
                <Unlink className="h-4 w-4" />
                <span>They have disconnected!</span>
              </p>
            )}

            {!isMatched && !isWaiting && (
              <div className="flex justify-center">
                <Button onClick={findMatch} className="rounded-full">
                  <MessageCircle />
                  <span>New chat</span>
                </Button>
              </div>
            )}

            <div ref={ref}></div>
          </div>
        </div>

        <div className="bg-background sticky bottom-0 border-t p-4">
          <ChatForm />
        </div>
      </div>
    </div>
  );
}
