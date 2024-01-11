import Anime from "./Anime";

function AnimeList({ animes }) {
  return (
    <ul className="px-8 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 mb-8">
      {animes.map((anime) => (
        <Anime key={anime.id} anime={anime} />
      ))}
    </ul>
  );
}

export default AnimeList;
