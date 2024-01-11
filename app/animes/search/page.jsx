"use client";
import { useCallback } from "react";
import SearchForm from "@/components/SearchForm";
import CharacterMedal from "@/components/CharacterMedal";
import { useLazyQuery } from "@apollo/client";
import { GET_POPULAR_ANIME_LIST, SEARCH_CHARACTER_QUERY } from "@/lib/queries";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { slugOptions } from "@/utils/utils";
import Loader from "@/components/Loader";

function SearchPage() {
  const router = useRouter();

  const [
    searchAnime,
    { loading: loadingAnime, data: animeResults, error: animeError },
  ] = useLazyQuery(GET_POPULAR_ANIME_LIST);
  const [
    searchCharacters,
    { loading: loadingChar, data: charactersResults, error: characterError },
  ] = useLazyQuery(SEARCH_CHARACTER_QUERY);

  const handleSearch = useCallback(
    async (searchQuery) => {
      try {
        searchAnime({
          variables: { search: searchQuery, perPage: 25, page: 1 },
        });
        searchCharacters({
          variables: { search: searchQuery, perPage: 25, page: 1 },
        });
      } catch (error) {
        console.log("Error during search:", error);
      }
    },
    [searchAnime, searchCharacters]
  );

  const handleAnimeNav = (title, id) => {
    const stringToSlug = `${title}`;
    const slug = slugify(stringToSlug, slugOptions);
    router.push(`/animes/${slug}/${id}`);
  };

  const handleViewAllResultsNav = (searchType) => {
    router.push(`/animes/search/all/${searchType}`);
  };

  return (
    <section className="w-full">
      <header className="w-full bg-slate-500 text-center pt-8 pb-4 md:pt-16 md:pb-8 z-1">
        <div className="md:max-w-screen-xl mx-auto px-16">
          <h1
            className="text-2xl md:text-4xl lg:text-5xl text-slate-300 font-bold 
            antialiased mb-2 md:mb-6"
          >
            Explore Anime and Characters
          </h1>
          <p className="text-base md:text-lg text-slate-300 mb-4 md:mb-8 antialiased">
            Searching for a specific anime or character? Look no further! Your
            anime journey continues with every search.
          </p>
        </div>
      </header>
      <main className="w-full">
        <div className="w-full bg-black/60 py-8 md:py-12 mb-4">
          <div
            className="relative flex w-full max-w-[80%] md:max-w-[70%] 
            lg:max-w-[60%] mx-auto flex-wrap items-stretch"
          >
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
        <article
          className="md:max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 
          md:gap-2 xl:gap-4 2xl:gap-8"
        >
          {animeResults && (
            <div className="m-4 p-4 md:m-2 xl:m-8 xl:p-8 bg-slate-600 rounded-lg">
              <h2 className="antialiased font-semibold text-xl mb-3 lg:mb-6">
                Anime results
              </h2>
              <ul className="flex flex-column justify-start flex-wrap gap-4 mb-4">
                {animeResults.Page.media.map((animeResult) => (
                  <li
                    key={animeResult.id}
                    className="w-full pb-4 border-b border-solid border-slate-500 
                    last-of-type:border-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleAnimeNav(
                          animeResult.title.english || animeResult.title.romaji,
                          animeResult.id
                        )
                      }
                      className="w-full text-left flex justify-between gap-4 
                      hover:scale-105 active:scale-95 transition transition-duration-150 ease-linear"
                    >
                      <img
                        className="aspect-[4/5] w-full max-w-[100px] 
                        shadow-[1px_2px_4px_1px_rgba(0,0,0,0.6)]"
                        src={animeResult.coverImage.medium}
                        alt={
                          animeResult.title.english || animeResult.title.romaji
                        }
                      />
                      <div className="grow py-2">
                        <h3 className="font-semibold antialiased mb-2">
                          {animeResult.title.english ||
                            animeResult.title.romaji}
                        </h3>
                        <p className="antialiased text-sm mb-2">
                          {animeResult.format}
                        </p>
                        <p className="antialiased text-sm">
                          {animeResult.genres.map((genre, index) => (
                            <span key={index}>{genre}, </span>
                          ))}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="block mx-auto antialiased text-sm px-4 py-2
                font-semibold text-slate-400 hover:text-slate-300"
                onClick={() => {
                  handleViewAllResultsNav("animes");
                }}
              >
                View all results
              </button>
            </div>
          )}
          {loadingAnime && (
            <div className="m-4 p-4 md:m-2 xl:m-8 xl:p-8 bg-slate-600 rounded-lg">
              <h2 className="antialiased font-semibold text-xl mb-3 lg:mb-6">
                Anime results
              </h2>
              <div className="flex justify-center items-center w-full h-[20svh]">
                <Loader />
              </div>
            </div>
          )}
          {charactersResults && (
            <div className="m-4 p-4 md:m-2 xl:m-8 xl:p-8 bg-slate-600 rounded-lg">
              <h2 className="antialiased font-semibold text-xl mb-3 lg:mb-6">
                Characters results
              </h2>
              <ul className="flex flex-column justify-start flex-wrap gap-4 mb-4">
                {charactersResults.Page.characters.map((characterResult) => (
                  <li
                    key={characterResult.id}
                    className="w-full flex justify-between gap-4 pb-2 border-b border-solid border-slate-500 
                    last-of-type:border-0"
                  >
                    <CharacterMedal character={characterResult} />
                    <div className="grow py-2 max-w-[calc(100%-116px)]">
                      <h3 className="antialiased font-semibold mb-2">
                        {characterResult.name.full}
                      </h3>
                      <p className="antialiased text-sm">
                        {characterResult.media.edges
                          .slice(0, 5)
                          .map((media, index) => (
                            <span key={index}>{media.node.title.romaji}, </span>
                          ))}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="block mx-auto antialiased text-sm px-4 py-2
                font-semibold text-slate-400 hover:text-slate-300"
                onClick={() => {
                  handleViewAllResultsNav("characters");
                }}
              >
                View all results
              </button>
            </div>
          )}
          {loadingChar && (
            <div className="m-4 p-4 md:m-2 xl:m-8 xl:p-8 bg-slate-600 rounded-lg">
              <h2 className="antialiased font-semibold text-xl mb-3 lg:mb-6">
                Character results
              </h2>
              <div className="flex justify-center items-center w-full h-[20svh]">
                <Loader />
              </div>
            </div>
          )}
        </article>
      </main>
    </section>
  );
}

export default SearchPage;
