"use client";
import { useState } from "react";
import Link from "next/link";
import slugify from "slugify";
import { slugOptions } from "@/utils/utils";

function Anime({ anime }) {
  const [isHover, setIsHover] = useState(false);
  const stringToSlug = anime.title.english || anime.title.romaji;
  const slug = slugify(stringToSlug, slugOptions);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <li
      className="hover:scale-110 active:scale-95 
      transition transition-duration-150 ease-linear
      shadow-[1px_2px_4px_1px_rgba(0,0,0,0.6)]
      "
    >
      <Link
        href={`/animes/${slug}/${anime.id}`}
        className="block relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          <img
            src={anime.coverImage.large}
            alt={anime.title.english || anime.title.romaji}
            className="w-full aspect-[3/4]"
          />
          {isHover && (
            <div className="w-full h-full absolute inset-0 bg-black/60 z-2 p-[2rem]">
              <h2 className="mb-2 text-lg font-semibold antialiased">
                {anime.title.english || anime.title.romaji}
              </h2>
              <p className="mb-2 text-sm antialiased">{anime.startDate.year}</p>
              <p className="mb-2 text-sm antialiased">
                {anime.type}, {anime.format}
              </p>
              <p className="mb-2 text-sm antialiased">
                {anime.genres.map((genre, index) => (
                  <span key={index}>{genre}, </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}

export default Anime;
