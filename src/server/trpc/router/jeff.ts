import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const jeffRouter = router({
  hello: publicProcedure.input(z.string()).query(({ input }) => {
    return {
      greeting: `Hello ${input}`,
    };
  }),
});
