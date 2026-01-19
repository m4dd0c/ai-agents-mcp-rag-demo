import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { WeatherInputSchema } from "./schemas.ts";
import {
  sayMyNameImplementation,
  weatherImplementation,
} from "./implementations";

const mcp = new McpServer({ name: "test-mcp", version: "1.0.0" });

mcp.registerTool(
  "Say My Name",
  {
    title: "Say My Name",
    description: "Returns the best fucking name.",
  },
  () => {
    return {
      content: [
        {
          type: "text" as const,
          text: sayMyNameImplementation(),
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
    inputSchema: WeatherInputSchema,
  },
  ({ city }) => {
    const weather = weatherImplementation({ city });
    return {
      content: [
        {
          type: "text" as const,
          text: `The weather in ${city} is: ${weather}`,
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
