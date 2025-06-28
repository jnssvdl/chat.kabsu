import { ChatProvider } from "./components/chat-context";
import useAuth from "./hooks/use-auth";
import Chat from "./pages/chat";
import Login from "./pages/login";

function App() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <ChatProvider>
        <Chat />
      </ChatProvider>
    );
  }

  return <Login />;
}

export default App;
