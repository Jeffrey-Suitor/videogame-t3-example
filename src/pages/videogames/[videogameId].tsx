import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export const VideoGamePage: NextPage = () => {
  const router = useRouter();
  const { videogameId } = router.query;

  if (!videogameId) {
    return <div>Bad id</div>;
  }

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

  const videogame = videogameList.find(
    (videogame) => videogame.id === videogameId
  );

  if (!videogame) {
    return <div>Bad id</div>;
  }
  return (
    <div>
      <h1>VideoGamePage</h1>
      <p>Find this page in `./src/pages/videogames/[id].tsx`</p>
      <p>id: {videogame.id}</p>
      <p>title: {videogame.title}</p>
    </div>
  );
};

export default VideoGamePage;
