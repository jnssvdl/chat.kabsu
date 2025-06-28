import ChatForm from "@/components/chat-form";
import { useChat } from "@/components/chat-context";
import ChatBox from "@/components/chat-box";

export default function Chat() {
  const {
    isWaiting,
    isMatched,
    isDisconnected,
    messages,
    findMatch,
    leaveRoom,
  } = useChat();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background sticky top-0 z-10 flex justify-between border p-2">
        <h1 className="text-xl font-bold">Matchmaker</h1>
        <button onClick={leaveRoom} disabled={!isMatched}>
          Leave
        </button>
      </header>

      <main className="flex flex-1 flex-col-reverse space-y-2 space-y-reverse overflow-y-auto p-2">
        {isWaiting && <p>Waiting for a match...</p>}

        {!isMatched && !isWaiting && (
          <button onClick={findMatch}>Find a Match</button>
        )}

        {isDisconnected && !isMatched && <p>They have disconnected</p>}

        <ChatBox messages={messages} />

        {!isWaiting && isMatched && <p>Match found! Chat now</p>}
      </main>

      <footer className="bg-background sticky bottom-0 z-10 border-t p-2">
        <ChatForm />
      </footer>
    </div>
  );
}
