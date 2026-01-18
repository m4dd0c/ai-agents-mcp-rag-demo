import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod";

const mcp = new McpServer({ name: "test-mcp", version: "1.0.0" });

const weatherApi = (c: string) => {
  switch (c.toLowerCase()) {
    case "jalore":
      return "Sunny, 32°C";
    case "new york":
      return "Cloudy, 22°C";
    case "london":
      return "Rainy, 18°C";
    default:
      return "City not found";
  }
};

mcp.registerTool(
  "Say My Name",
  {
    title: "Say My Name",
    description: "Returns the best fucking name.",
  },
  () => {
    const text = "Not Heisenberg But m4dd0c";
    return {
      content: [
        {
          type: "text" as const,
          text,
        },
      ],
    };
  },
);

mcp.registerTool(
  "Weather Info",
  {
    title: "Get Weather Information",
    description: "Fetches weather information for a given location.",
    inputSchema: z.object({
      city: z
        .string()
        .describe("The name of the city to get weather information for.")
        .min(1)
        .max(100),
    }),
  },
  (city) => {
    const weather = weatherApi(city.city);
    return {
      content: [
        {
          type: "text" as const,
          text: `The weather in ${city.city} is: ${weather}`,
        },
      ],
    };
  },
);

const main = async () => {
  const transport = new StdioServerTransport();
  await mcp.connect(transport);
  console.log("MCP server is running...");
};

export default main;
