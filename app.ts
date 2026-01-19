import { seedDB } from "./rag.ts";
import { HumanMessage } from "@langchain/core/messages";
import getAgent from "./agent.ts";

const main = async () => {
  try {
    const agent = await getAgent();
    if (agent) {
      await seedDB();
      console.log("Agent ready!\n");

      // Example queries
      const queries = [
        "How are you?", // General → Direct
        "What's the remote work policy?", // Office → RAG
        "What's the weather in London?", // Weather → Tool
        "Say my name", // Identity → Tool
      ];

      for (const query of queries) {
        console.log(`You: ${query}`);
        const result = await agent.invoke({
          messages: [new HumanMessage(query)],
        });

        const reply =
          result?.messages?.[result?.messages?.length - 1]?.content ||
          "No Response from LLM";
        console.log(`Agent: ${reply}\n`);
      }
    }
  } catch (error) {
    console.error("Error in main execution:", error);
  }
};

main();
