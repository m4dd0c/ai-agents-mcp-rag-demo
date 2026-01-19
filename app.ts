import { GEMINI_API_KEY } from "./constants.ts";
import connectMCP from "./mcp.ts";
import { seedDB } from "./rag.ts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.4, // less creative, more factual
  apiKey: GEMINI_API_KEY,
});

// connecting to mcp server
await connectMCP();
// seeding the vector store
await seedDB();
