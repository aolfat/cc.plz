import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
        caption: z.string(),
        editedPhotoUrl: z.string(),
        originalPhotoUrl: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { authorId, caption, editedPhotoUrl, originalPhotoUrl } = input;
      const post = await ctx.prisma.post.create({
        data: {
          authorId: authorId,
          caption: caption,
          editedPhotoUrl: editedPhotoUrl,
          originalPhotoUrl: originalPhotoUrl,
        },
      });

      return post;
    }),
});
