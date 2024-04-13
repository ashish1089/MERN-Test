import { createTRPCRouter, publicProcedure } from "../trpc";

export const interestRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.interest.findMany();
    return res;
  }),
});
