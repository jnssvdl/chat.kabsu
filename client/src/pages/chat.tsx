import { socket } from "../lib/socket";
import ChatForm from "../components/chat-form";
import { useChat } from "../components/chat-context";

export default function Chat() {
  const {
    isMatched,
    isWaiting,
    findMatch,
    messages,
    leaveRoom,
    isDisconnected,
  } = useChat();

  return (
    <div>
      <h1>Matchmaker</h1>

      <button onClick={leaveRoom} disabled={!isMatched}>
        Leave
      </button>

      {isWaiting && <p>Waiting for a match...</p>}

      {!isMatched && !isWaiting && (
        <button onClick={findMatch}>Find a Match</button>
      )}

      {!isWaiting && isMatched && <p>Match found! Chat now</p>}

      {isDisconnected && !isMatched && <p>They have disconnected</p>}

      <ChatForm />

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
