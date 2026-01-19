import { seedDB } from "./rag.ts";
import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import getAgent from "./agent.ts";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const main = async () => {
  try {
    const agent = await getAgent();
    if (agent) {
      await seedDB();
      console.log("\x1b[33m%s\x1b[0m", "Agent ready! Try asking\n");

      console.log("  - Who's Manish? How long he can work remotely in a year?");
      console.log("  - What tasks are included in the employee onboarding?");
      console.log("  - Is there any weather update for Bagra?\n");

      console.log("\x1b[33m%s\x1b[0m", "Capabilities:");
      console.log("  - RAG: Internal office docs search");
      console.log("  - Tools: Real-time weather & ID lookup");
      console.log("  - Memory: Remembers current conversation context\n");

      const rl = readline.createInterface({ input, output });
      const messages: BaseMessage[] = [];

      try {
        while (true) {
          const query = await rl.question("\x1b[36mYou: \x1b[0m");

          if (
            query.toLowerCase() === "exit" ||
            query.toLowerCase() === "quit"
          ) {
            console.log("\x1b[33m%s\x1b[0m", "Goodbye!");
            break;
          }

          if (!query.trim()) continue;

          messages.push(new HumanMessage(query));

          const result = await agent.invoke({
            messages,
          });

          const lastMessage = result?.messages?.[result?.messages?.length - 1];
          const reply = lastMessage?.content || "No Response from LLM";

          // Add the AI response to history
          if (lastMessage) {
            messages.push(lastMessage);
          }

          console.log(`\x1b[32mAgent:\x1b[0m ${reply}\n`);
        }
      } finally {
        rl.close();
      }
    }
  } catch (error) {
    console.error("Error in main execution:", error);
  }
};

await main();
