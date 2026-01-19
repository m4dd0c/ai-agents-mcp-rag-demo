import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GEMINI_API_KEY, officeDocs } from "./constants.ts";
import * as fs from "node:fs";

const CACHE_FILE = "./vector-cache.json";

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: GEMINI_API_KEY,
  modelName: "gemini-embedding-001",
});

let vectorStore = new MemoryVectorStore(embeddings);

const seedDB = async () => {
  try {
    // Check if cache exists
    if (fs.existsSync(CACHE_FILE)) {
      console.log("Loading embeddings from cache...");
      const cached = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
      vectorStore.memoryVectors = cached;
      console.log(`Loaded ${cached.length} cached vectors`);
      return;
    }

    // Fresh seed - generates embeddings (uses tokens)
    console.log("Generating embeddings...");
    await vectorStore.addDocuments(officeDocs);

    // Save to cache for future runs
    fs.writeFileSync(
      CACHE_FILE,
      JSON.stringify(vectorStore.memoryVectors, null, 2),
    );
    console.log("Embeddings cached to vector-cache.json");
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

export { seedDB, retrieveRelevantDocs, vectorStore };
