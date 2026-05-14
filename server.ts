import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.1,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1000,
    }
  });

  const SYSTEM_PROMPT = `
    You are the 'PKCS Business Assistant', a professional AI for Port Khalid Cold Stores (PKCS).
    Your goal is to assist visitors and qualify logistics leads in a corporate, industrial tone.

    COMPANY KNOWLEDGE:
    - Established: 1985 in Port Khalid, Sharjah.
    - Capacity: 5,000 MT, 7 dedicated temperature zones.
    - Temperature Range: -18°C to +15°C (Frozen, Chilled, Ambient).
    - Services: Storage (Frozen/Chilled/Ambient), Cross-Docking, Co-Packing, Reverse Logistics.
    - Location: Near Berth 9 & 10, Port Khalid, Sharjah.
    - Hours: 08:00 - 22:00, Daily.

    CONVERSATION FLOW:
    1. Greeting: "Welcome to Port Khalid Cold Stores. I am here to assist with your cold chain requirements."
    2. Lead Qualification: If a user asks about services or storage, concisely ask for:
       - Nature of Commodity (e.g., Seafood, Pharma)
       - Temperature Requirement (e.g., Frozen -18C)
       - Volume (Pallet count or MT)
       - Storage Duration
    3. Closing: Once info is gathered, provide a brief summary and tell them "A logistics specialist will review this. Please proceed to WhatsApp for immediate coordination."

    RULES:
    - Be concise, operational, and business-focused.
    - No emojis, no casual flair.
    - If you don't know something, ask the user to contact us via WhatsApp (+971 52 293 3852).
  `;

  // Email Transporter (SMTP)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const history = (messages || []).map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Understood. I will represent PKCS with professional precision." }] },
          ...history.slice(0, -1)
        ],
      });

      const result = await chat.sendMessage(messages[messages.length - 1].content);
      const response = await result.response;
      const text = response.text();

      res.json({ content: text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "AI service interruption. Please contact us on WhatsApp." });
    }
  });

  app.post("/api/inquiry", async (req, res) => {
    try {
      const inquiry = req.body;
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.NOTIFICATION_RECIPIENT || "info@portkhalidcoldstores.ae",
        subject: `New Cold Storage Inquiry - ${inquiry.company || "General"}`,
        text: `
          New Inquiry Received via AI Chatbot:
          
          Company: ${inquiry.company || "N/A"}
          Commodity: ${inquiry.commodity || "N/A"}
          Temperature: ${inquiry.temperature || "N/A"}
          Volume: ${inquiry.volume || "N/A"}
          
          Full Context / Summary:
          ${inquiry.summary || "No summary provided"}
          
          Link to WhatsApp: https://wa.me/971522933852
        `,
      };

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Logistics desk notified." });
      } else {
        console.log("Mock Email (No SMTP config):", mailOptions.text);
        res.json({ success: true, message: "Inquiry logged (Mock)." });
      }
    } catch (error) {
      console.error("Mail Error:", error);
      res.status(500).json({ error: "Notification failure." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PKCS Enterprise Node running on Port ${PORT}`);
  });
}

startServer();
