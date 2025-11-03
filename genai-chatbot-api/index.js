import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/ask
app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    // 👇 You can replace this with real GenAI API call (like OpenAI or Gemini)
    // For now, we’ll simulate AI response
    const fakeAIResponse = `🤖 You asked: "${question}". Here's a simple mock answer for now.`;

    res.json({ answer: fakeAIResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
