import { z } from "zod";
import { router, igdbProcedure } from "../trpc";
import { VideoGameSchema } from "../../../types/VideoGame"; // <-- This schema is for fields *;
import type { ApicalypseConfig } from "apicalypse";
import apicalypse from "apicalypse"; // <-- This is a library for making IGDB API calls from their docs. https://github.com/twitchtv/node-apicalypse
import type { IGDBContext } from "../trpc";

// Make sure this is in every call for apicalypse
const makeRequestOptions = (IGDBContext: IGDBContext) => {
  return {
    method: "POST",
    baseURL: IGDBContext.baseUrl,
    headers: {
      "Client-ID": IGDBContext.clientId,
      Authorization: `Bearer ${IGDBContext.access_token}`,
    },
  } as ApicalypseConfig;
};

export const igdbRouter = router({
  checkhealth: igdbProcedure.query(async () => {
    return "yay";
  }),

  games: igdbProcedure
    .output(z.array(VideoGameSchema))
    .query(async ({ ctx }) => {
      const gamesRes = await apicalypse(makeRequestOptions(ctx.igdb))
        .limit(10)
        .fields("*")
        .request("/games");
      return gamesRes.data;
    }),

  game: igdbProcedure
    .input(z.number())
    .output(VideoGameSchema)
    .query(async ({ ctx, input }) => {
      const gameRes = await apicalypse(makeRequestOptions(ctx.igdb))
        .fields("*")
        .where(`id = ${input}`)
        .request("/games");
      console.log(gameRes.data);
      return gameRes.data[0];
    }),
});
