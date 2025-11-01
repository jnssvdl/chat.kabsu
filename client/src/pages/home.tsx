import { useAuth } from "@/components/auth-context";
import { GoogleLogin } from "../components/google-login";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { FaShieldAlt, FaUserSecret } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      {/* header */}
      <header className="fixed z-50 w-full border-b-2 bg-transparent backdrop-blur-md">
        <div className="container mx-auto flex max-w-screen-xl items-center justify-between p-4">
          <h1 className="font-bold">chat.kabsu</h1>
          <ModeToggle />
        </div>
      </header>

      {/* hero or login */}
      <div className="from-primary-foreground/60 to-background relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
          )}
        />

        <div className="z-10 container mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-y-8 px-4 lg:gap-y-10">
          <h1 className="text-center text-4xl font-semibold text-balance lg:text-5xl">
            Anonymously talk, interact, and connect with the Kabsu Community
          </h1>
          <p className="text-center text-balance lg:text-xl">
            Instantly connect with a fellow kabsuhenyo — one on one, in real
            time. No profile, just pure conversation.
          </p>

          {isAuthenticated ? (
            <Button
              size={"lg"}
              className="group rounded-full"
              onClick={() => navigate("/chat")}
            >
              Start chatting
              <ArrowRight className="transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
          ) : (
            <div className="flex flex-col gap-y-4">
              <div className="mx-auto">
                <GoogleLogin />
              </div>
              <p className="text-muted-foreground text-center text-sm">
                Log in with your CvSU account to start chatting anonymously.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Some other stuff */}
      <div className="from-primary-foreground/60 to-background border-t-2 bg-gradient-to-t py-24">
        <div className="container mx-auto max-w-screen-xl px-4">
          <h2 className="mb-12 text-center text-3xl font-semibold text-balance">
            What is chat.kabsu?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="mb-4 text-center text-xl font-semibold text-balance">
                <FaUserSecret className="mx-auto mb-4 text-3xl text-balance" />
                Anonymous Conversations
              </h3>
              <p className="text-muted-foreground text-center">
                Connect with fellow CvSU peeps without revealing your identity.
                This real-time communication is powered by Socket.IO, ensuring a
                low latency experience.
              </p>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="mb-4 text-center text-xl font-semibold text-balance">
                <IoLogoFirebase className="mx-auto mb-4 text-3xl text-balance" />
                Secure Authentication
              </h3>
              <p className="text-muted-foreground text-center">
                We use Firebase Authentication to ensure that only verified
                users can join. Your account is safe, with no sensitive data
                stored on our end.
              </p>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="mb-4 text-center text-xl font-semibold text-balance">
                <FaShieldAlt className="mx-auto mb-4 text-3xl text-balance" />
                Your Data, Your Privacy
              </h3>
              <p className="text-muted-foreground text-center">
                No messages are stored in our database. Your conversations are
                secure, ephemeral, and private, ensuring your personal data
                stays private.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="from-primary-foreground/60 to-background border-t-2 bg-gradient-to-b py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} chat.kabsu
          </p>
        </div>
      </footer>
    </>
  );
}
