import { useState } from "react";

const Search = ({
  handleSearch,
  Order,
}: {
  handleSearch: (searchTerm: string) => void;
  Order: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // A very basic component which doesn't do anything by itself but fetches the search term and sends it to the function handleSearch on parent
  // page, where the logic is done and the data is mapped accordingly.
  return (
    <div className="flex gap-5">
      <input
        type="text"
        className="border-b outline-none placeholder:text-sm p-1"
        placeholder={`Search an ${Order ? "order" : "item"}...`}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          // console.log(e.target.value);
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
