import { io } from "socket.io-client";

const token = localStorage.getItem("jwt");

export const socket = io("http://localhost:3000", {
  auth: { token },
  autoConnect: false,
});
