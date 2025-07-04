import useAuth from "@/hooks/use-auth";
import { useChat } from "./chat-context";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { LogOut, Unlink } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Header() {
  const { online, isMatched, leaveRoom } = useChat();

  const { logout } = useAuth();

  return (
    <header className="bg-background sticky top-0 z-10 flex items-center justify-between border-b p-4">
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
  );
}
