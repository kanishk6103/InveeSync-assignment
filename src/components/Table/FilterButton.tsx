import { FilterButtonProps } from "@/app/types";
const FilterButton = ({
  currentFilter,
  filterType,
  handler,
}: FilterButtonProps) => {
  return (
    <button
      className={
        "py-1 px-3 bg-gray-200 rounded-md " +
        (currentFilter === filterType ? "bg-blue-500 text-white" : "")
      }
      onClick={handler}
    >
      {filterType}
    </button>
  );
};

export default FilterButton;
