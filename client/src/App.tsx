import { ChatProvider } from "./components/chat-context";
import { SocketProvider } from "./components/socket-context";
import { AuthProvider } from "./components/auth-context";
import Chat from "./pages/chat";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SocketProvider>
                  <ChatProvider>
                    <Chat />
                  </ChatProvider>
                </SocketProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
