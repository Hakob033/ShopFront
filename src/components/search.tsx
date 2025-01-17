import React, { useState } from "react";
import Search from "../app/icons/search";

const SearchBar = ({ setSearch }: { setSearch: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSearchClick = () => {
    setSearch(inputValue);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search"
        className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button onClick={handleSearchClick}>
          <Search />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
