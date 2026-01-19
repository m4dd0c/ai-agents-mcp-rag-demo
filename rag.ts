import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GEMINI_API_KEY, officeDocs } from "./constants.ts";

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: GEMINI_API_KEY,
  modelName: "gemini-pro",
});
const vectorStore = new MemoryVectorStore(embeddings);

const seedDB = async () => {
  try {
    await vectorStore.addDocuments(officeDocs);
  } catch (e) {
    console.error("Error seeding vector store:", e);
  }
};

const retrieveRelevantDocs = async (query: string, k: number) => {
  try {
    const similarDocs = await vectorStore.similaritySearchWithScore(query, k);
    return similarDocs;
  } catch (e) {
    console.error("Error retrieving documents:", e);
  }
};

export { seedDB, retrieveRelevantDocs };
