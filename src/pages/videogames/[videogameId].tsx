import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export const VideoGamePage: NextPage = () => {
  const router = useRouter();
  const { videogameId: videogameIdString } = router.query;
  const videogameId = Number(videogameIdString);

  if (isNaN(videogameId)) {
    return <div>Invalid videogameId</div>;
  }

  const { data: game, isLoading } = trpc.igdb.game.useQuery(videogameId);

  if (isLoading || !game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>VideoGamePage</h1>
      <p>Find this page in `./src/pages/videogames/[id].tsx`</p>
      <p>id: {game.id}</p>
      <p>title: {game.name}</p>
      <p>story: {game.storyline}</p>
    </div>
  );
};

export default VideoGamePage;
