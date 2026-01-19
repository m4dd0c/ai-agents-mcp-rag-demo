import * as z from "zod";

const AskGeminiInputSchema = z.object({
  context: z
    .string()
    .describe("The context in which user is asking the question.")
    .optional(),
  ask: z
    .string()
    .describe("The question that is being asked")
    .min(1, "Ask cannot be empty"),
});

const WeatherInputSchema = z.object({
  city: z
    .string()
    .describe("The name of the city to get weather information for.")
    .min(1)
    .max(100),
});

export { AskGeminiInputSchema, WeatherInputSchema };
