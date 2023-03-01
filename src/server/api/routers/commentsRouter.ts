import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  createComment: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
        text: z.string(),
        postId: z.string(),
        parentId: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { authorId, text, postId, parentId } = input;
      const comment = await ctx.prisma.comment.create({
        data: {
          authorId: authorId,
          text: text,
          postId: postId,
          parentId: parentId,
        },
      });

      return comment;
    }),
});
