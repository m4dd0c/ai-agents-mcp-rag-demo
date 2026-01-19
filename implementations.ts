import * as z from "zod";
import type { WeatherInputSchema } from "./schemas.ts";

const sayMyNameImplementation = () => {
  return "Not Heisenberg But m4dd0c";
};

const weatherImplementation = ({
  city,
}: z.infer<typeof WeatherInputSchema>) => {
  switch (city.toLowerCase()) {
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
