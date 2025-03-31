import dotenv from "dotenv";  
dotenv.config(); // Load environment variables from .env file
import express from "express"; // method-2
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js"; 
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";

const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",  // Development
  "https://chat-app-ya9g.onrender.com", // Render Frontend (Old?)
  "https://chat-app-kr82.onrender.com", // Render Frontend (New?)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);




// routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
    console.log('Database connection established');
});
