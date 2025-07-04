export default function TypingIndicator() {
  return (
    <div className="bg-muted inline-flex max-w-fit items-center space-x-1 rounded-full p-4">
      <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.4s]" />
      <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.2s]" />
      <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full" />
    </div>
  );
}
