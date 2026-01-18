import connectMCP from "./mcp.tools.ts";
import { seedDB } from "./rag.ts";

// connecting to mcp server
await connectMCP();
// seeding the vector store
await seedDB();
