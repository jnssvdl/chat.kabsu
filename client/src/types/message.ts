import type { Socket } from "socket.io-client";

export type Message = {
  from: Socket["id"];
  message: string;
};
