import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: games, isLoading } = trpc.igdb.games.useQuery();

  if (isLoading || !games) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full p-8">
      <Head>
        <title>All Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl">All Games</h1>
      {games.map((game) => (
        <div key={game.id}>
          <Link
            className="text-blue-700 underline"
            href={`/videogames/${game.id}`}
          >
            {game.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
