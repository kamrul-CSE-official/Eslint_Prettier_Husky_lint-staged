import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRouters from "./routes/user.routers";
import limiter from "./middleware/limiter";

const app = express();

// Middleware setup
app.use(
  cors({
    origin: "https://ukil-saheb.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Root route handler
app.get("/", limiter, (req, res) => {
  res.send("Server is running...🏃");
});

// API routes
app.use("/api/v1/users", usersRouters);

// Error handlers
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Requested URL was not found!");
  console.error("Requested URL:", req.url);
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .json({ status: "fail", message: err.message || "Internal Server Error" });
});

export default app;
