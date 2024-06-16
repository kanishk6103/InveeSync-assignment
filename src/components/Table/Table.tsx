import { useState, useEffect } from "react";
import { ItemType, Order, OrderItem, TableProps } from "@/app/types";
import { sortColumn } from "../utils/sortColumn";
import { useRouter } from "next/navigation";

const Table = ({ headings, data, isOrderList, ItemList }: TableProps) => {
  const [sortedArray, setSortedArray] = useState<Order[] | OrderItem[] | null>(
    null
  );
  const [sortType, setSortType] = useState<"asc" | "desc" | null>(null); // sort state variable
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // items we want on one page with pagination
  const [originalData, setOriginalData] = useState<Order[] | OrderItem[]>( // saving the original data state
    () => {
      if (isOrderList) {
        return Array.isArray(data) ? data : [data];
      } else {
        return Array.isArray(data)
          ? data.flatMap((order) => order.items)
          : data.items;
      }
    }
  );

  const router = useRouter();

  useEffect(() => {
    // set sorted array null everytime the original data or sorted array changes since the older array would render otherwise
    setSortedArray(null);
  }, [originalData, sortedArray]);

  // Sorting each column in different orders
  const handleSort = (col: string, order: "asc" | "desc" | null) => {
    // array sorted calls sortColumn function which returns sorted data based on the filter
    const arraySorted = sortColumn(
      isOrderList ? (data as Order[]) : (data as Order).items,
      col,
      order
    );
    // if we were at original order then we went to the ascending order, while if we were at ascending we went to descending
    // and if we were at descending then we went to original order, setting these accordingly.
    if (sortType === null) {
      setSortedArray(arraySorted);
      setSortType("asc");
    } else if (sortType === "asc") {
      setSortType("desc");
      setSortedArray(arraySorted);
    } else if (sortType === "desc") {
      setSortType(null);
      setSortedArray(null);
    }
    setCurrentPage(1);
  };

  const handleRowClick = (id: number) => {
    // route to detailed order page
    router.push(`/orders/${id}`);
  };
  // Here I have calculated the array items that must be at that particular page, from x index to y index
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // if sorted array is available use it, otherwise user data if it is orderList, use single order type if it is not an OrderList
  const currentData = (
    sortedArray ?? (isOrderList ? (data as Order[]) : (data as Order).items)
  ).slice(indexOfFirstItem, indexOfLastItem); // taking the required slice for required page

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto w-full md:px-36">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="text-xs text-gray-900 uppercase bg-gray-5">
          <tr>
            {/* Mapping over the headings to make a header row */}
            {headings.map((singleHeading, index) => {
              // console.log(singleHeading.col);
              return (
                <th
                  scope="col"
                  className="px-6 py-3 w-[20%] cursor-pointer"
                  // Sort when clicked the column name, it first gets sorted in ascending order, if clicked again
                  // it gets sorted in descending order, if clicked for the third time it returns to its original state
                  // For this, I have created a handle sort function, where the column name is passed with sortType which is either
                  // ascending (asc), descending (desc) or null
                  onClick={() => handleSort(singleHeading.col, sortType)}
                  key={index}
                >
                  {singleHeading.heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* This section will be rendered if the list is an order list */}
          {isOrderList
            ? currentData.map((singleItem) => {
                const { id, customer, status, items } = singleItem as Order;
                return (
                  <tr
                    className="bg-white border-b cursor-pointer"
                    onClick={() => {
                      // This is to open a detailed view of the order when clicked
                      handleRowClick(id);
                    }}
                    key={id}
                  >
                    <td className="p-6">{id}</td>
                    <td className="p-6">{customer}</td>
                    <td className="p-6">{status}</td>
                    <td className="p-6">{items.length}</td>
                  </tr>
                );
              })
            : currentData.map((singleItem) => {
                // This section will be rendered if it is an Item list
                const { id, name, quantity } = singleItem as OrderItem;
                // To get the stock of each item, matching IDs, if the ID matches, we will get the stock value for that item
                const itemStock: ItemType[] = ItemList.filter((e: ItemType) => {
                  return e.id == singleItem.id;
                });
                const stock = itemStock[0].stock;
                return (
                  <tr className="bg-white border-b" key={id}>
                    <td className="p-6">{id}</td>
                    <td className="p-6">{name}</td>
                    <td className="p-6">{quantity}</td>
                    <td className="p-6">{stock}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4 w-full lg:w-1/3 m-auto">
        <button
          onClick={() => paginate(currentPage - 1)} // Previous button to set the page number to the previous one
          disabled={currentPage === 1} // previous won't be available if we are on the first page
          className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)} // moving to the next page
          disabled={
            indexOfLastItem >= // if we are on the last page, we can't go next
            (
              sortedArray ??
              (isOrderList ? (data as Order[]) : (data as Order).items)
            ).length
          }
          className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
