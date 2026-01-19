import * as z from "zod";
import type { WeatherInputSchema } from "./schemas";

// functional implementation
const sayMyNameImplementation = () => {
  const text = "Not Heisenberg But m4dd0c";
  return text;
};

const weatherImplementation = ({
  city,
}: z.infer<typeof WeatherInputSchema>) => {
  return weatherApi(city);
};

const weatherApi = (c: string): string => {
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

export { weatherImplementation, sayMyNameImplementation };
