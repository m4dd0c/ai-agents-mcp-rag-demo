import { DynamicStructuredTool, DynamicTool } from "@langchain/core/tools";
import {
  sayMyNameImplementation,
  weatherImplementation,
} from "./implementations.ts";
import { retrieveRelevantDocs } from "./rag.ts";
import { SearchOfficeInfoInputSchema, WeatherInputSchema } from "./schemas.ts";

const sayMyNameTool = new DynamicTool({
  name: "say_my_name",
  description: "Returns the best fucking name.",
  func: async (_input) => sayMyNameImplementation(),
});

const searchOfficeInfoTool = new DynamicStructuredTool({
  name: "search_office_info",
  description: "Search for information related to office.",
  schema: SearchOfficeInfoInputSchema,
  func: async ({ query }) => {
    const docs = await retrieveRelevantDocs(query, 3);
    if (!docs || docs?.length === 0)
      return "No relevant office information found.";
    return docs
      .map(([doc, score]) => `[Score: ${score.toFixed(2)}] ${doc.pageContent}`)
      .join("\n\n");
  },
});

const weatherTool = new DynamicStructuredTool({
  name: "weather_info",
  description: "Fetches weather information for a given location.",
  schema: WeatherInputSchema,
  func: async (input) => weatherImplementation(input),
});

export { sayMyNameTool, searchOfficeInfoTool, weatherTool };
