import { FilterButtonProps } from "@/app/types";
const FilterButton = ({
  currentFilter,
  filterType,
  handler,
}: FilterButtonProps) => {
  // Simple button which performs whatever is passed to it
  return (
    <button
      className={
        "py-1 px-3 rounded-md " +
        (currentFilter === filterType
          ? "bg-blue-400 text-white"
          : " bg-gray-200 text-black")
      }
      onClick={handler}
    >
      {filterType}
    </button>
  );
};

export default FilterButton;
