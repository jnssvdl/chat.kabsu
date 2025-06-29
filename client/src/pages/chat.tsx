import ChatForm from "@/components/chat-form";
import { useChat } from "@/components/chat-context";
import ChatBox from "@/components/chat-box";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, MessageCircle, Unlink, Users } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import { useEffect, useRef } from "react";
import TypingIndicator from "@/components/typing-indicator";
import { Separator } from "@/components/ui/separator";

export default function Chat() {
  const {
    online,
    isWaiting,
    isMatched,
    isDisconnected,
    isTyping,
    messages,
    findMatch,
    leaveRoom,
  } = useChat();

  const { logout } = useAuth();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaiting, isMatched, isDisconnected]);

  return (
    <div className="flex h-screen justify-center p-4">
      <div className="flex w-full max-w-3xl flex-col border">
        <header className="bg-background flex items-center justify-between border-b p-4">
          <div>
            <h1 className="font-bold">chat.kabsu</h1>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
              <p>{online} online</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <ModeToggle />
            <Button
              onClick={logout}
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/20 dark:hover:bg-destructive/20 text-destructive hover:text-destructive"
            >
              <LogOut />
            </Button>
            <Separator orientation="vertical" />
            <Button
              onClick={leaveRoom}
              disabled={!isMatched}
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/20 dark:hover:bg-destructive/20 text-destructive hover:text-destructive"
            >
              <Unlink />
            </Button>
          </div>
        </header>

        <main className="bg-background flex flex-1 flex-col justify-end p-4">
          {!isWaiting && isMatched && (
            <p className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              <span>You're connected! Say hi to them!</span>
            </p>
          )}
          {isWaiting && (
            <p className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Finding someone you can chat with...</span>
            </p>
          )}
          <ChatBox messages={messages} />
          <TypingIndicator isVisible={isTyping} />
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
        </main>

        <footer className="bg-background sticky bottom-0 border-t p-4">
          <ChatForm />
        </footer>
      </div>
    </div>
  );
}
