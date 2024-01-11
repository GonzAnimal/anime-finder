"use client";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { slugOptions } from "@/utils/utils";

function CharacterMedal({ character }) {
  const charRouter = useRouter();

  const handleCharNav = (fullname, charId) => {
    const stringToSlug = `${fullname}`;
    const slug = slugify(stringToSlug, slugOptions);
    charRouter.push(`/characters/${slug}/${charId}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() =>
          handleCharNav(
            character.node?.name.full || character.name.full,
            character.node?.id || character.id
          )
        }
      >
        <img
          src={character.node?.image.medium || character.image.medium}
          alt={character.node?.name.full || character.name.full}
          className="w-full max-w-[100px] aspect-square rounded-full mb-2
          border border-solid border-black shadow-[1px_2px_4px_1px_rgba(0,0,0,0.6)]
          hover:scale-105 active:scale-95 transition transition-duration-150 ease-linear
          "
        />
      </button>
    </>
  );
}

export default CharacterMedal;
