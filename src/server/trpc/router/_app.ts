import { router } from "../trpc";
import { authRouter } from "./auth";
import { igdbRouter } from "./igdb";

export const appRouter = router({
  auth: authRouter,
  igdb: igdbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
