export default function TypingIndicator({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="inline-flex max-w-fit items-center space-x-1 rounded-full bg-gray-200 p-4">
      <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.4s]"></span>
      <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.2s]"></span>
      <span className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full"></span>
    </div>
  );
}
