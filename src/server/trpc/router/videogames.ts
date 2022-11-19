import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const videogameRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.videogame.findMany();
  }),

  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.videogame.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
