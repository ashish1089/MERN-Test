import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

export const UserRouter = createTRPCRouter({
  get: publicProcedure
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

  create: publicProcedure
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
        const isUserExists = await ctx.db.user.findFirst({
          where: { email: input.email },
        });
        if (isUserExists) {
          return new TRPCError({
            code: "BAD_REQUEST",
            message: "user already exist",
          });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return await ctx.db.user.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
          },
        });
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
