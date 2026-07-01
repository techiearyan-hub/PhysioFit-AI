import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Check if API key exists at startup
if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ Missing OPENROUTER_API_KEY in .env file");
  process.exit(1);
}

app.post("/api/plan", async (req, res) => {
  try {
    const { type, prompt } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini", // you can swap to other models
        messages: [
          {
            role: "system",
            content:
              "You are a fitness trainer and dietitian. Always format your response as a structured weekly plan (Monday–Sunday) with Breakfast, Lunch, Snacks, and Dinner.",
          },
          {
            role: "user",
            content: `Create a ${type} plan for: ${prompt}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ required
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // optional but recommended
          "X-Title": "PhysioFit AI",               // optional app name
        },
      }
    );

    const plan = response.data.choices[0].message.content;
    res.json({ plan });
  } catch (error) {
    console.error("Error generating plan:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      return res.status(401).json({
        error: "Authentication failed. Please check your OPENROUTER_API_KEY in .env.",
      });
    }

    res.status(500).json({ error: "Failed to generate plan" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
