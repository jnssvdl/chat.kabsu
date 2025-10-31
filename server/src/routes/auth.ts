import { Router } from "express";
import jwt from "jsonwebtoken";
import { firebaseAdminAuth } from "../lib/firebase-admin";

const router = Router();

router.post("/login", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await firebaseAdminAuth.verifyIdToken(token);

    // if (!decoded.email?.endsWith("@cvsu.edu.ph")) {
    //   return res.status(403).json({ message: "Email not allowed" });
    // }

    const appJwt = jwt.sign(
      { uid: decoded.uid, email: decoded.email },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.cookie("token", appJwt, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.json({ message: "Authenticated" });
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid Firebase token" });
  }
});

router.post("/logout", (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });
  return res.json({ message: "Logged out" });
});

router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    res.sendStatus(200);
  } catch {
    res.sendStatus(401);
  }
});

export default router;
