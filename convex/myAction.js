import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { api } from "./_generated/api";
import { v } from "convex/values";
import { ChatOpenAI } from "@langchain/openai";

// Polyfill for performance.now() which is required by LangChain in Convex edge environments
if (typeof performance === "undefined") {
    globalThis.performance = { now: () => Date.now() };
}

export const ingest = action({
    args: {
        splitText: v.any(),
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        const embeddings = new HuggingFaceInferenceEmbeddings({
            apiKey: process.env.HUGGINGFACE_API_KEY,
            model: "sentence-transformers/all-MiniLM-L6-v2",
        });

        // Map over splitText to provide a metadata object for each text chunk
        const metadata = args.splitText.map(() => ({ fileId: args.fileId }));

        await ConvexVectorStore.fromTexts(
            args.splitText, // array of strings
            metadata,
            embeddings,
            { ctx }
        );
        return "Success";
    },
});

export const search = action({
    args: {
        query: v.string(),
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        const embeddings = new HuggingFaceInferenceEmbeddings({
            apiKey: process.env.HUGGINGFACE_API_KEY,
            model: "sentence-transformers/all-MiniLM-L6-v2",
        });

        const vectorStore = new ConvexVectorStore(embeddings, { ctx });

        const resultOne = await (
            await vectorStore.similaritySearch(args.query, 1)
        ).filter((q) => q.metadata.fileId !== args.fileId);
        console.log(resultOne);

        return JSON.stringify(resultOne);
    },
});

export const generate = action({
    args: {
        query: v.string(),
    },
    handler: async (ctx, args) => {
        const model = new ChatOpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            modelName: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free", // Correct model ID for Nemotron 3 Nano Omni
            configuration: {
                baseURL: "https://openrouter.ai/api/v1",
            },
        });

        const response = await model.invoke(args.query);
        return response.content;
    },
});
