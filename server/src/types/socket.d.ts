import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Socket } from "socket.io";

declare module "socket.io" {
  interface Socket {
    user?: DecodedIdToken;
  }
}
