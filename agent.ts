import { ToolNode } from "@langchain/langgraph/prebuilt";
import { sayMyNameTool, searchOfficeInfoTool, weatherTool } from "./tools";
import {
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { AIMessage } from "langchain";
import { GEMINI_API_KEY } from "./constants.ts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.4, // less creative, more factual
  apiKey: GEMINI_API_KEY,
});

const getAgent = async () => {
  try {
    // step 1: create tools array
    const tools = [weatherTool, sayMyNameTool, searchOfficeInfoTool];

    // step 2: bind tools to the model
    model.bindTools(tools);

    // step 3: create tool Node and agent Node
    const toolNode = new ToolNode(tools);

    const agentNode = async (state: typeof MessagesAnnotation.State) => {
      const systemPrompt = new SystemMessage(`You are a helpful AI assistant.
- Use search_office_docs for company/office related questions
- Use weather_info for weather questions
- Use say_my_name when asked about a person called "Manish"
- For general chat, respond directly without tools`);

      const res = await model.invoke([systemPrompt, ...state.messages]);
      return { messages: [res] };
    };

    // step 4: routing logic
    const shouldContinue = (state: typeof MessagesAnnotation.State) => {
      const lastMessage = state.messages[state.messages.length - 1];

      // if llm made tool calls, go to tools node
      if (
        lastMessage instanceof AIMessage &&
        lastMessage.tool_calls &&
        lastMessage.tool_calls.length > 0
      )
        return "tools";

      return END;
    };

    // step 5: building the graph
    const graph = new StateGraph(MessagesAnnotation)
      .addNode("agent", agentNode)
      .addNode("tools", toolNode)
      .addEdge(START, "agent")
      .addConditionalEdges("agent", shouldContinue, ["tools", END])
      .addEdge("tools", "agent");

    // step 6: the agent
    const agent = graph.compile();

    return agent;
  } catch (error) {
    console.error("Error starting the agent:", error);
  }
};

export default getAgent;
