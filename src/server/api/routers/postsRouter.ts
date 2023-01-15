import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(
      z.object({
        caption: z.string(),
        editedPhotoUrl: z.string(),
        originalPhotoUrl: z.string().nullish(),
      })
    )
    .mutation(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
