import * as z from "zod";

const WeatherInputSchema = z.object({
  city: z
    .string()
    .describe("The name of the city to get weather information for.")
    .min(1)
    .max(100),
});

const SearchOfficeInfoInputSchema = z.object({
  query: z
    .string()
    .describe("The query to search for in office information.")
    .min(1, "Office query cannot be empty"),
});
export { SearchOfficeInfoInputSchema, WeatherInputSchema };
