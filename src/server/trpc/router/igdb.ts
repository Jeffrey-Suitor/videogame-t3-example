import { router, publicProcedure } from "../trpc";

const baseUrl = "https://api.igdb.com/v4";

export const igdbRouter = router({
  checkhealth: publicProcedure.query(async ({ ctx }) => {
    return "yay";
  }),
});
