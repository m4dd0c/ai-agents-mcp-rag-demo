import { createAgent } from "langchain";
import { model } from "./app.ts";
import { responseFormat } from "./constants.ts";

const agent = createAgent({
  model,
  tools: [],
  responseFormat,
});

// agent.invoke()
