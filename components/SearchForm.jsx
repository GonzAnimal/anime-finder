"use client";
import { useState, memo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="search"
        className="flex-auto rounded-l-xl bg-white border-2 border-white px-6 py-2 text-base 
          text-gray-700 italic placeholder-gray-400 outline-none transition duration-150 ease-in-out 
          focus:z-[3] focus:shadow-[inset_0_0_4px_2px_rgba(37,99,235,0.6)] focus:border-blue-600
          focus:outline-none antialiased"
        placeholder="Explore Anime and Characters"
        value={searchQuery}
        onChange={handleChange}
        id="search"
        name="search"
      />
      <button
        className="flex items-center rounded-r-xl bg-blue-600 px-6 py-2.5 text-xs font-medium 
        uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out 
        hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none 
        focus:ring-0 active:bg-blue-800 active:shadow-lg"
        type="submit"
        id="search-button"
        name="search-button"
        onChange={handleChange}
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>
    </form>
  );
}

export default memo(SearchForm);
