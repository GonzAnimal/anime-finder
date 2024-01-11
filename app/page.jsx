import AnimeList from "@/components/AnimeList";
import { getClient } from "@/lib/client";
import { GET_POPULAR_ANIME_LIST } from "@/lib/queries";
import Link from "next/link";

async function loadData(searchQuery = null) {
  let variables = {
    page: 1,
    perPage: 20,
    search: searchQuery,
  };
  const { data } = await getClient().query({
    query: GET_POPULAR_ANIME_LIST,
    variables: variables,
  });
  return data.Page.media;
}

async function Home() {
  const animes = await loadData();

  return (
    <main className="w-full">
      <header className="w-full bg-slate-500 text-center pt-16 pb-8 mb-8 z-1">
        <div className="md:max-w-screen-xl mx-auto px-16">
          <h1 className="md:text-4xl lg:text-5xl text-slate-300 antialiased font-bold mb-[1.5rem]">
            Discover Your Next Favorite Anime!
          </h1>
          <p className="text-lg text-slate-300 font-semibold antialiased mb-8">
            Explore the latest and most popular anime titles. Your anime journey
            begins here.
          </p>
        </div>
        <Link
          className="block w-fit mx-auto bg-blue-600 antialiased shadow-[1px_2px_4px_1px_rgba(0,0,0,0.6)] 
          text-slate-200 font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 
          hover:scale-105 active:scale-95 transition transition-duration-150 ease-linear"
          href="/animes/search"
        >
          Start Exploring
        </Link>
      </header>
      <div className="md:max-w-screen-xl mx-auto">
        <AnimeList animes={animes} />
      </div>
    </main>
  );
}

export default Home;
