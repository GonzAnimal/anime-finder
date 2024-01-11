"use client";
import { useCallback, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_POPULAR_ANIME_LIST, SEARCH_CHARACTER_QUERY } from "@/lib/queries";
import SearchForm from "@/components/SearchForm";
import InfiniteScroll from "react-infinite-scroll-component";
import AnimeList from "@/components/AnimeList";
import CharacterMedal from "@/components/CharacterMedal";
import Loader from "@/components/Loader";

function AllResultsPage({ params }) {
  const searchType = params.all[params.all.length - 1];
  const [pageNbr, setPageNbr] = useState(1);
  const [results, setResults] = useState({
    Page: {
      pageInfo: [],
      media: [],
      characters: [],
    },
  });
  const queryByType =
    searchType === "animes" ? GET_POPULAR_ANIME_LIST : SEARCH_CHARACTER_QUERY;
  const [executeQuery, { loading, data, error }] = useLazyQuery(queryByType);
  const handleSearch = useCallback(
    (searchQuery, page) => {
      executeQuery({
        variables: { search: searchQuery, perPage: 25, page },
        fetchPolicy: "cache-and-network",
      }).then((result) => {
        if (page === 1) {
          setResults(result.data);
        } else {
          setResults((prevResults) => ({
            ...prevResults,
            Page: {
              ...prevResults.Page,
              pageInfo: result.data.Page.pageInfo,
              media: [
                ...(prevResults.Page.media || []),
                ...(result.data.Page.media || []),
              ],
              characters: [
                ...(prevResults.Page.characters || []),
                ...(result.data.Page.characters || []),
              ],
            },
          }));
        }
      });
    },
    [executeQuery]
  );
  const handleScrollFetch = () => {
    const nextPage = pageNbr + 1;
    setPageNbr(nextPage);
    handleSearch(searchType, nextPage);
  };

  return (
    <section className="w-full">
      <header className="w-full bg-slate-500 text-center pt-8 pb-4 md:pt-16 md:pb-8 z-1">
        <div className="md:max-w-screen-xl mx-auto px-16">
          <h1
            className="text-2xl md:text-4xl lg:text-5xl text-slate-300 font-bold 
            antialiased mb-2 md:mb-6"
          >
            Expand your Search
          </h1>
        </div>
      </header>
      <main className="w-full">
        <div className="w-full bg-black/60 py-8 md:py-12 mb-4">
          <div
            className="relative flex w-full max-w-[80%] md:max-w-[70%] 
          lg:max-w-[60%] mx-auto flex-wrap items-stretch"
          >
            <SearchForm onSearch={handleSearch} searchType={searchType} />
          </div>
        </div>
        <article className="md:max-w-screen-xl min-h-[calc(100svh-24.5rem)] mx-auto pb-16">
          {data && (
            <>
              <InfiniteScroll
                dataLength={
                  searchType === "animes"
                    ? data.Page.media.length
                    : data.Page.characters.length
                }
                next={handleScrollFetch}
                hasMore={
                  !!(results.Page.pageInfo && results.Page.pageInfo.hasNextPage)
                }
                scrollThreshold={0.9}
                endMessage={
                  <p
                    className="antialiased text-center text-sm px-4 py-2
                  font-semibold text-slate-400"
                  >
                    No more results..
                  </p>
                }
              >
                {searchType === "animes" ? (
                  <AnimeList animes={results.Page.media} />
                ) : (
                  <ul className="w-11/12 sm:w-4/5 lg:w-3/5 mx-auto flex flex-column justify-start flex-wrap gap-4 mb-4">
                    {results.Page.characters.map((characterResult) => (
                      <li
                        key={characterResult.id}
                        className="w-full xl:w- flex justify-between gap-4 pb-2 border-b 
                          border-solid border-slate-500 last-of-type:border-0"
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
                                <span key={index}>
                                  {media.node.title.romaji},{" "}
                                </span>
                              ))}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </InfiniteScroll>
            </>
          )}
          {loading && (
            <div className="flex justify-center items-center w-full h-[20svh]">
              <Loader />
            </div>
          )}
          {error && <p>Error</p>}
        </article>
      </main>
    </section>
  );
}

export default AllResultsPage;
