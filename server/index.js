import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import compilerRoutes from './src/routes/compiler.routes.js';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://logposetempo.vercel.app/"],
  }),
);
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "LogPose backend is running",
  });
});
app.use('/api', compilerRoutes);

app.listen(PORT, () => console.log(`🚀 Backend active on port ${PORT}`));