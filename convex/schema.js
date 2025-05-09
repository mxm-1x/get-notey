import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        password: v.string(),
        imageUrl: v.string() // <-- Add this line
    }),
    pdfFiles: defineTable({
        fileId: v.string(),
        storageId: v.string(),
        fileName: v.string(),
        fileUrl: v.string(),
        createdBy: v.string(),
    }),
    documents: defineTable({
        embedding: v.array(v.number()),
        text: v.string(),
        metadata: v.any(),
    }).vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 1536,
    }),
})
