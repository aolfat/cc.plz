import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
        caption: z.string(),
        editedPhotoUrl: z.string().nullish(),
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
  getPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.session || !ctx.session.user)
        throw new Error("Not authenticated");

      const { postId } = input;
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
          // ensure that the user is the author of the post
          // authorId: ctx.session.user.id,
        },
      });

      return post;
    }),
});
