// context/chat-context.tsx
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { socket } from "../lib/socket";
import type { Message } from "../types/message";

type ChatPhase = "idle" | "waiting" | "matched" | "disconnected";

type ChatState = {
  connected: boolean;
  phase: ChatPhase;
  typing: boolean;
  messages: Message[];
};

type ChatAction =
  | { type: "SET_CONNECTED"; payload: boolean }
  | { type: "SET_PHASE"; payload: ChatPhase }
  | { type: "SET_PARTNER_TYPING"; payload: boolean }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "CLEAR_MESSAGES" };

type ChatContextType = ChatState & {
  sendMessage: (message: string) => void;
  leaveRoom: () => void;
  findMatch: () => void;
};

const initialState: ChatState = {
  connected: false,
  phase: "idle",
  typing: false,
  messages: [],
};

function reducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_CONNECTED":
      return { ...state, connected: action.payload };
    case "SET_PHASE":
      return { ...state, phase: action.payload };
    case "SET_PARTNER_TYPING":
      return { ...state, typing: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "CLEAR_MESSAGES":
      return { ...state, messages: [] };
    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    socket.connect();

    const onConnect = () => dispatch({ type: "SET_CONNECTED", payload: true });
    const onDisconnect = () =>
      dispatch({ type: "SET_CONNECTED", payload: false });

    const onWaiting = () => dispatch({ type: "SET_PHASE", payload: "waiting" });
    const onMatched = () => dispatch({ type: "SET_PHASE", payload: "matched" });
    const onDisconnected = () =>
      dispatch({ type: "SET_PHASE", payload: "disconnected" });

    const onTyping = ({ typing }: { typing: boolean }) =>
      dispatch({ type: "SET_PARTNER_TYPING", payload: typing });

    const onMessage = (message: Message) =>
      dispatch({ type: "ADD_MESSAGE", payload: message });

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("waiting", onWaiting);
    socket.on("matched", onMatched);
    socket.on("disconnected", onDisconnected);

    socket.on("typing", onTyping);
    socket.on("message", onMessage);

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  const findMatch = () => {
    dispatch({ type: "CLEAR_MESSAGES" });
    dispatch({ type: "SET_PHASE", payload: "waiting" });
    socket.emit("find");
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    socket.emit("message", { message });
    dispatch({
      type: "ADD_MESSAGE",
      payload: { from: socket.id, message },
    });
  };

  const leaveRoom = () => {
    socket.emit("leave");
    dispatch({ type: "SET_PHASE", payload: "idle" });
  };

  const value: ChatContextType = {
    ...state,
    sendMessage,
    leaveRoom,
    findMatch,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
