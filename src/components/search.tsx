// components/SearchBar.tsx
import Search from "../app/icons/search";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
