import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        password: v.string(),
        imageUrl: v.string(),
        upgrade: v.boolean() // Should be "upgrade" instead of "urgrade"
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
        dimensions: 768,
    }),
    notes: defineTable({
        fileId: v.string(),
        notes: v.any(),
        createdBy: v.string(),
    }),
})
