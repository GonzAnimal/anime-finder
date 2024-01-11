"use client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_ANIME_DATA, GET_ANIME_STAFF_DATA } from "@/lib/queries";
import { useMemo } from "react";
import CharacterMedal from "@/components/CharacterMedal";
import { RenderHTMLStr } from "@/utils/utils";
import Loader from "@/components/Loader";
import Image from "next/image";

function AnimeDetails({ params }) {
  const animeId = params.id;
  const { data } = useQuery(GET_ANIME_DATA, {
    variables: { id: animeId },
  });
  const { data: staffData } = useQuery(GET_ANIME_STAFF_DATA, {
    variables: {
      id: animeId,
      page: 1,
      perPage: 25,
    },
  });
  const bannerImage = data?.Media.bannerImage;
  const htmlString = data?.Media.description;
  const filterMainCast = useMemo(() => {
    return (mainChars) =>
      mainChars?.filter((mainChar) => mainChar.role === "MAIN");
  }, []);
  const filterNotableSupportCast = useMemo(() => {
    return (suppChars) =>
      suppChars
        ?.filter((suppChar) => suppChar.role === "SUPPORTING")
        .slice(0, 8);
  }, []);
  const mainCast = filterMainCast(staffData?.Media.characters.edges);
  const notableSupportCast = filterNotableSupportCast(
    staffData?.Media.characters.edges
  );

  return (
    <section className="w-full">
      {data ? (
        <>
          <header
            style={{ backgroundImage: `url(${bannerImage})` }}
            className="w-full bg-cover bg-center h-[16rem]"
          >
            <div className="w-full h-full bg-black/40">
              <div className="w-full md:max-w-screen-xl mx-auto h-full flex justify-center items-center">
                <h1 className="text-4xl font-semibold text-slate-200 antialiased">
                  {data.Media.title.english || data.Media.title.romaji}
                </h1>
              </div>
            </div>
          </header>
          <main className="w-full bg-slate-800">
            <div className="relative flex md:max-w-screen-xl mx-auto">
              <aside className="hidden md:block md:w-2/6 lg:w-1/4 relative left-0 top-0 lg:-top-16 b-auto hover:scale-105 transition transition-duration-150 ease-linear">
                <img
                  src={data.Media.coverImage.large}
                  alt={data.Media.title.english || data.Media.title.romaji}
                  className="w-full aspect-[3/4] border border-solid border-black shadow-[4px_4px_5px_2px_rgba(0,0,0,0.4)]"
                />
              </aside>
              <div className="sm:w-full md:w-4/6 lg:w-3/4 p-[2rem]">
                <img
                  src={data.Media.coverImage.large}
                  alt={data.Media.title.english || data.Media.title.romaji}
                  className="sm:block md:hidden w-96 mx-auto mb-[2rem] aspect-[3/4] border border-solid border-black shadow-[4px_4px_5px_2px_rgba(0,0,0,0.4)]"
                />
                <h2 className="text-lg text-semibold text-slate-400 antialiased mb-4">
                  Synopsis
                </h2>
                <RenderHTMLStr htmlString={htmlString} />
                <p className="pt-[1.5rem] text-slate-400 hover:text-slate-200 text-sm antialiased">
                  {data.Media.genres.map((genre, index) => (
                    <span key={index}>{genre}, </span>
                  ))}
                </p>
              </div>
            </div>
          </main>
          <main className="w-full bg-slate-600">
            <div className="md:max-w-screen-xl mx-auto">
              <h2 className="text-lg text-semibold text-slate-200 antialiased mx-8 pt-[2rem]">
                Main Cast
              </h2>
              <ul className="p-8 flex justify-start items-center flex-wrap gap-8">
                {mainCast?.map((mainChar) => (
                  <li key={mainChar.node.id} className="w-full max-w-[100px]">
                    <CharacterMedal character={mainChar} />
                    <p className="text-center text-sm text-slate-300 antialiased">
                      {mainChar.node?.name.full}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <main className="w-full bg-slate-800">
            <div className="md:max-w-screen-xl mx-auto">
              <h2 className="text-lg text-semibold text-slate-400 antialiased mx-8 pt-[2rem]">
                Notable Supporting cast
              </h2>
              <ul className="p-8 flex justify-start items-center flex-wrap gap-8">
                {notableSupportCast?.map((suppChar) => (
                  <li key={suppChar.node.id} className="w-full max-w-[100px]">
                    <CharacterMedal character={suppChar} />
                    <p className="text-center text-sm text-slate-300 antialiased">
                      {suppChar.node?.name.full}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-[calc(100svh-72px)]">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default AnimeDetails;
