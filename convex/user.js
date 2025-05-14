import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        imageUrl: v.string()
    },
    handler: async (ctx, args) => {
        // if user already exists, 
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("email"), args.email)).collect();

        if (user?.length == 0) {
            await ctx.db.insert('users', {
                email: args.email,
                name: args.name,
                imageUrl: args.imageUrl,
                password: "oauth", // Adding a default password for OAuth users
                upgrade: false
            });

            return "Inserted user";
        }
        return "User already exists";
    }
})

export const userUpgradePlan = mutation({
    args: {
        userEmail: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.userEmail))
            .collect();

        if (result) {
            await ctx.db.patch(result[0]._id, { upgrade: true });
            return "Success";
        }

        return "Error";
    },
});



export const getUserInfo = query({
    args: {
        userEmail: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        if (!args.userEmail) {
            return;
        }
        const result = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.userEmail))
            .collect();

        return result[0];
    },
});