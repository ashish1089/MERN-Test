import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";

export const newUserRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        username: z.string().min(1).max(20),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        return await ctx.db.user.create({
          data: {
            username: input.username,
            email: input.email,
            password: hashedPassword,
          },
        });
      } catch (error) {}
    }),
});
