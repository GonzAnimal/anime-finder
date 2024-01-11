"use client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_CHARACTER_DATA } from "@/lib/queries";
import HTMLReactParser from "html-react-parser";
import { useRouter } from "next/navigation";
import { modifyDomNode } from "@/utils/utils";
import Loader from "@/components/Loader";

function CharacterDetails({ params }) {
  const router = useRouter();
  const characterId = params.id;
  const { loading, data, error } = useQuery(GET_CHARACTER_DATA, {
    variables: { id: characterId },
  });
  const charData = data?.Character;
  const htmlString = charData?.description;

  return (
    <section className="w-full">
      {data && (
        <>
          <header className="w-full bg-slate-900 h-[8rem]">
            <div className="md:max-w-screen-xl mx-auto h-full flex justify-center items-center">
              <h1 className="text-4xl font-semibold antialiased text-slate-200">
                {charData.name.first} {charData.name.middle}{" "}
                {charData.name.last}
              </h1>
            </div>
          </header>
          <main className="w-full bg-slate-700 flex-column">
            <div className="relative flex md:max-w-screen-xl mx-auto">
              <aside className="hidden md:block md:w-2/6 lg:w-1/4 relative left-0 top-0 lg:-top-16 b-auto hover:scale-105 transition transition-duration-150 ease-linear">
                <img
                  src={charData.image.large}
                  alt={`${charData.name.first} ${charData.name.middle} ${charData.name.last}`}
                  className="w-full aspect-[3/4] border border-solid border-black shadow-[4px_4px_5px_2px_rgba(0,0,0,0.4)]"
                />
              </aside>
              <div className="sm:w-full md:w-4/6 lg:w-3/4 p-[2rem] min-h-[calc(100svh-18.25rem)]">
                <img
                  src={charData.image.large}
                  alt={`${charData.name.first} ${charData.name.middle} ${charData.name.last}`}
                  className="sm:block md:hidden w-96 mx-auto mb-[2rem] aspect-[3/4] border border-solid border-black shadow-[4px_4px_5px_2px_rgba(0,0,0,0.4)]"
                />
                <h2 className="text-lg text-semibold antialiased text-slate-400 mb-2">
                  Character data
                </h2>
                {HTMLReactParser(htmlString, {
                  replace: modifyDomNode,
                })}
              </div>
            </div>
            <div className="p-[2rem] bg-slate-900">
              <div className="md:max-w-screen-xl mx-auto flex justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="text-sm text-slate-400 font-semibold italic 
                  antialiased hover:text-slate-300 py-2 px-4"
                >
                  Go back..
                </button>
              </div>
            </div>
          </main>
        </>
      )}
      {loading && (
        <div className="flex justify-center items-center w-full h-[calc(100svh-72px)]">
          <Loader />
        </div>
      )}
      {error && <p>Something went wrong..</p>}
    </section>
  );
}

export default CharacterDetails;
