import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";

export const UserRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        // username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        const { email, password } = input;
        const user = await ctx.db.user.findFirst({
          where: {
            // username: input.username,
            email: input.email,
          },
        });
        return user
          ? (await bcrypt.compare(password, user.password))
            ? true
            : false
          : false;
      } catch (error) {}
    }),

  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(1).max(20),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, username } = input;
      try {
        // check if yours exist in db,
        const UserExists = await ctx.db.user.findFirst({
          where: { email: input.email },
        });
        if (UserExists) {
          // return { success: true, message: "user already exits" };
          return UserExists;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await ctx.db.user.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
          },
        });
        return { success: true, message: "user Successfully signup" };
      } catch (error) {
        console.log(error);
      }
    }),
  verify: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const verifiedUser = await ctx.db.user.update({
          where: {
            email: input.email,
          },
          data: {
            isVerified: true,
          },
        });
        return verifiedUser;
      } catch (error) {
        console.log(error);
      }
    }),
});
