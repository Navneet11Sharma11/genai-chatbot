// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Initialize OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Must be in your .env file
});

// ✅ Root route for sanity check
app.get("/", (req, res) => {
  res.send("✅ GenAI Chatbot API is running!");
});

// ✅ Chat route for real AI responses
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question is required." });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: question },
      ],
    });

    const answer = response.choices[0]?.message?.content || "No response.";
    res.json({ answer });
  } catch (error) {
    console.error("🔥 Error in /ask route:");
    console.error(error);

    if (error.response) {
      console.error("API Response Error:", error.response.data);
      res.status(error.response.status || 500).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
});

// ✅ Start server on port 5050
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 GenAI Chatbot API running at http://localhost:${PORT}`);
});
