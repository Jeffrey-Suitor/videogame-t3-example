import { router } from "../trpc";
import { authRouter } from "./auth";
import { igdbRouter } from "./igdb";
import { jeffRouter } from "./jeff";
import { videogameRouter } from "./videogames";

export const appRouter = router({
  auth: authRouter,
  videogames: videogameRouter,
  jeff: jeffRouter,
  igdb: igdbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
