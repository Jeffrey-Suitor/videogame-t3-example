import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);

export const IGDBContextSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
  baseUrl: z.string(),
  clientId: z.string(),
});

export type IGDBContext = z.infer<typeof IGDBContextSchema>;

const isIGDBAuthed = t.middleware(async ({ next }) => {
  const baseUrl = "https://api.igdb.com/v4";

  if (
    process.env.TWITCH_SECRET === undefined ||
    process.env.TWITCH_CLIENT_ID === undefined
  ) {
    throw new Error("Missing env vars");
  }

  const getIGDBTokens = await fetch(
    "https://id.twitch.tv/oauth2/token?" +
      new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_SECRET,
        grant_type: "client_credentials",
      }),
    {
      method: "POST",
    }
  );

  const igdbUnsafe = await getIGDBTokens.json();
  const igdb = IGDBContextSchema.parse({
    ...igdbUnsafe,
    baseUrl,
    clientId: process.env.TWITCH_CLIENT_ID,
  });

  if (!igdb) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      igdb,
    },
  });
});

export const igdbProcedure = t.procedure.use(isIGDBAuthed);
