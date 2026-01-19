import { DynamicStructuredTool, DynamicTool } from "@langchain/core/tools";
import {
  sayMyNameImplementation,
  weatherImplementation,
} from "./implementations.ts";
import { retrieveRelevantDocs } from "./rag.ts";
import { AskGeminiInputSchema, WeatherInputSchema } from "./schemas.ts";
import { model } from "./app.ts";

const sayMyNameTool = new DynamicTool({
  name: "say_my_name",
  description: "Returns the best fucking name.",
  func: async (_input) => sayMyNameImplementation(),
});

const weatherTool = new DynamicStructuredTool({
  name: "weather_info",
  description: "Fetches weather information for a given location.",
  schema: WeatherInputSchema,
  func: async (input) => weatherImplementation(input),
});

const searchOfficeInfoTool = new DynamicTool({
  name: "search_office_info",
  description: "Search for information related to office.",
  func: async (query) => retrieveRelevantDocs(query, 3),
});

const askGeminiTool = new DynamicStructuredTool({
  name: "ask_gemini",
  description: "Ask Gemini a question.",
  schema: AskGeminiInputSchema,
  func: async ({ context, ask }) => {
    try {
      const prompt = `${context && `CONTEXT: \n${context}\n\nQUESTION: \n`} ${ask}`;
      const res = await model.invoke(prompt);
      return res.content;
    } catch (e) {
      console.error("Error invoking Gemini model:", e);
    }
  },
});

export { askGeminiTool, sayMyNameTool, searchOfficeInfoTool, weatherTool };
