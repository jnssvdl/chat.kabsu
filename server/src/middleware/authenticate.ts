import { Request, Response, NextFunction } from "express";
import { firebaseAdminAuth } from "../lib/firebase-admin";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.token || req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = await firebaseAdminAuth.verifyIdToken(token);

    if (
      process.env.NODE_ENV === "production" &&
      !decoded.email?.endsWith("@cvsu.edu.ph")
    ) {
      return res.status(403).json({ message: "Unauthorized domain" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

// have not used yet but this will be very useful when i add more features
