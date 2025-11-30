import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { ExtendedError, Socket } from "socket.io";

import dotenv from "dotenv";
dotenv.config();

const socketAuth = (socket: Socket, next: (err?: ExtendedError) => void) => {
  try {
    const cookies = parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;

    if (!token) return next(new Error("No auth token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    socket.data.user = decoded;

    return next();
  } catch (err) {
    console.error("Socket auth failed:", err);
    return next(new Error("Authentication error"));
  }
};

export default socketAuth;
