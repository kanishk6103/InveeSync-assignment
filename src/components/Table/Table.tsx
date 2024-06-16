import { useState, useEffect } from "react";
import { ItemType, Order, OrderItem, TableProps } from "@/app/types";
import { sortColumn } from "../utils/sortColumn";
import { useRouter } from "next/navigation";

const Table = ({ headings, data, isOrderList, ItemList }: TableProps) => {
  const [sortedArray, setSortedArray] = useState<Order[] | OrderItem[] | null>(
    null
  );
  const [sortType, setSortType] = useState<"asc" | "desc" | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [originalData, setOriginalData] = useState<Order[] | OrderItem[]>(
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
    setSortedArray(null);
  }, [originalData, sortedArray]);

  const handleSort = (col: string, order: "asc" | "desc" | null) => {
    const arraySorted = sortColumn(
      isOrderList ? (data as Order[]) : (data as Order).items,
      col,
      order
    );
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
    router.push(`/orders/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (
    sortedArray ?? (isOrderList ? (data as Order[]) : (data as Order).items)
  ).slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead className="text-xs text-gray-900 uppercase bg-gray-5">
          <tr>
            {headings.map((singleHeading, index) => {
              // console.log(singleHeading.col);
              return (
                <th
                  scope="col"
                  className="px-6 py-3 w-[20%] cursor-pointer"
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
          {isOrderList
            ? currentData.map((singleItem) => {
                const { id, customer, status, items } = singleItem as Order;
                return (
                  <tr
                    className="bg-white border-b cursor-pointer"
                    onClick={() => {
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
                const { id, name, quantity } = singleItem as OrderItem;
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
      <div className="flex justify-between items-center p-4 w-1/3 m-auto">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            indexOfLastItem >=
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
