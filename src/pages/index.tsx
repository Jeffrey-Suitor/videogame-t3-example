import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: checkhealth } = trpc.igdb.checkhealth.useQuery();
  console.log(checkhealth);
  // const { data: videogameList, isLoading } = trpc.videogames.getAll.useQuery();

  // if (isLoading || !videogameList) {
  //   return <div>Loading...</div>;
  // }

  const videogameList = [
    {
      id: "1",
      title: "Super Mario Bros.",
    },
    {
      id: "2",
      title: "Zelda",
    },
  ];

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {videogameList.map((videogame) => (
        <div key={videogame.id}>
          <Link href={`/videogames/${videogame.id}`}>{videogame.title}</Link>
        </div>
      ))}
      Home page
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
