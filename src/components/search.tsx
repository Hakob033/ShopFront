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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add the onKeyDown handler here
        placeholder="Search"
        className="block w-full px-4 py-2 text-sm outline-none text-gray-700 bg-white border rounded-md shadow-sm "
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
