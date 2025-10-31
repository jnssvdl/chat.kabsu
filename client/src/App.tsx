import { ChatProvider } from "./components/chat-context";
import { SocketProvider } from "./components/socket-context";
import { AuthProvider, useAuth } from "./components/auth-context";
import Chat from "./pages/chat";
import Login from "./pages/login";

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <SocketProvider>
        <ChatProvider>
          <Chat />
        </ChatProvider>
      </SocketProvider>
    );
  }

  return <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
