import { useState } from "react";

const Search = ({
  handleSearch,
  Order,
}: {
  handleSearch: (searchTerm: string) => void;
  Order: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="flex gap-5">
      <input
        type="text"
        className="border-b outline-none placeholder:text-sm p-1"
        placeholder={`Search an ${Order ? "order" : "item"}...`}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button
        className="px-3 py-1 bg-blue-400 rounded-md text-white text-sm"
        onClick={() => handleSearch(searchTerm)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
