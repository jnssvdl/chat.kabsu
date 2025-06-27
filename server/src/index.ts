import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

import http from "http";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/ping", (_, res) => res.send("pong"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  // console.log("Token from client:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    socket.data.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid JWT on socket", err);
    next(new Error("Authentication error"));
  }
});

const queue: Socket[] = [];

io.on("connection", (socket) => {
  // console.log(`User: ${socket.id} connected`);

  socket.on("find_match", () => {
    if (queue.includes(socket)) {
      return;
    }

    if (queue.length === 0) {
      // No partner yet, enqueue self
      queue.push(socket);
      socket.emit("waiting");
      // console.log(`${socket.id} is waiting`);
    } else {
      const partner = queue.shift()!;

      const roomId = uuidv4();

      socket.join(roomId);
      partner.join(roomId);

      socket.data.roomId = roomId;
      partner.data.roomId = roomId;

      socket.emit("matched", { roomId });
      partner.emit("matched", { roomId });
    }
  });

  socket.on("chat_message", ({ roomId, message }) => {
    if (!roomId || !message) return;

    socket.to(roomId).emit("chat_message", {
      from: "Anonymous",
      message,
    });
  });

  socket.on("leave", ({ roomId }) => {
    const index = queue.indexOf(socket);

    if (index !== -1) {
      queue.splice(index, 1);
    }

    socket.to(roomId).emit("partner_disconnected");
    delete socket.data.roomId;
    socket.leave(roomId);
  });

  socket.on("disconnect", () => {
    const index = queue.indexOf(socket);

    if (index !== -1) {
      queue.splice(index, 1);
    }

    const roomId = socket.data.roomId;
    if (roomId) {
      socket.to(roomId).emit("partner_disconnected");
      delete socket.data.roomId;
      socket.leave(roomId);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
