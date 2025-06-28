import { socket } from "../lib/socket";

export default function LeaveButton() {
  const leaveRoom = () => {
    socket.emit("leave");
  };
  return <button onClick={leaveRoom}>Leave</button>;
}
