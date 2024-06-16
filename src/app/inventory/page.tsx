"use client";
import data from "@/api/data.json";
import { useState } from "react";
import { ItemType } from "../types";
import { headings } from "./contants";
import EditableRow from "./EditableRow";
import Link from "next/link";
import Search from "@/components/Search";
import FilterButton from "@/components/Table/FilterButton";
const Inevntory = () => {
  const [newItem, setNewItem] = useState<ItemType>({
    id: data.items.length + 1,
    name: "",
    stock: 0,
  });
  const [items, setItems] = useState<ItemType[]>(data.items);
  const [searchFilteredData, setSearchFilteredData] = useState<
    ItemType[] | null
  >(null);
  const [filter, setFilter] = useState<string>("All");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSearchFilteredData(null);
    // prevents the page from refreshing
    e.preventDefault();
    // checking for duplicates, if an item with same name exists already then don't add it.
    const duplicate = items.some(
      (singleItem) =>
        singleItem.name.toLowerCase() === newItem.name.toLowerCase()
    );
    if (duplicate) {
      setNewItem({
        id: data.items.length + 1,
        name: "",
        stock: 0,
      });
      alert("Item already exists, kindly edit the existing item");
      return;
    } else {
      // if no duplicate exists
      const itemToAdd: ItemType = {
        id: items.length + 1,
        name: newItem.name,
        stock: parseInt(newItem.stock.toString()),
      };
      // add a new item
      setItems((prevItems) => [...prevItems, itemToAdd]);
      data.items = [...data.items, itemToAdd];
      setNewItem({
        id: items.length + 1,
        name: "",
        stock: 0,
      });
    }
  };

  // Handle input change when adding a new item to the items list
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilteredData(null);
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // filtering all the items that don't match the item id and then setting those to items state variable to map over them
  const handleItemDelete = (id: number) => {
    setSearchFilteredData(null);
    data.items = data.items.filter((singleItem) => singleItem.id !== id);
    setItems(data.items);
  };

  // When saving the item after editing it
  const handleItemSave = (updatedItem: ItemType) => {
    setSearchFilteredData(null);
    // check for duplicate again, if a duplicate exists, don't add the name
    const duplicate = items.some(
      (singleItem) =>
        singleItem.name.toLowerCase() === updatedItem.name.toLowerCase()
    );
    if (duplicate) {
      alert("Item already exists, kindly edit the existing item");
      return;
    } else {
      // Replace the item with the old item with the new item
      data.items = data.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      // console.log(data.items);
      // set the updated data.items to the items state variable for a re-render
      setItems(data.items);
    }
  };

  const handleCancel = () => {};
  // console.log(data.items);

  // handles search by filtering the items that match the search term and store it in searchFilteredData
  const handleSearch = (searchTerm: string) => {
    // console.log(searchTerm);
    setSearchFilteredData(
      items.filter((singleOrder) => {
        return singleOrder.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    );
  };

  // sets the filter type
  const handleFilterChange = (filterType: string) => {
    setFilter(filterType);
    setSearchFilteredData(null);
  };

  // filters based on the stock, if filter is set to "In Stock", all items with stock value more than 0 will be displayed
  // otherwise all items with no stock will be displayed
  const filteredItems = items.filter((item) => {
    if (filter === "In stock") {
      return item.stock > 0;
    } else if (filter === "Out of stock") {
      return item.stock === 0;
    }
    return true;
  });

  // Button headings for filter buttons
  const buttonHeadings = ["All", "In Stock", "Out of Stock"];

  return (
    <div className="m-5 flex flex-col gap-5">
      <div className="flex gap-10">
        <div className="font-light text-2xl">
          {/* Links to the orders page */}
          <Link href={`/`}>Orders</Link>
        </div>
        <div className="font-bold text-2xl">Inventory</div>
      </div>
      <div className="m-10 my-5 w-full md:px-24">
        <div className="flex md:flex-row flex-col justify-between items-center pr-20">
          <div className="mx-6 my-8">
            {/* Reused search component */}
            <Search handleSearch={handleSearch} Order={false} />
          </div>
          <div className="flex gap-3 mb-5 md:mb-0">
            {buttonHeadings.map((singleHeading, Index) => {
              return (
                <FilterButton
                  currentFilter={filter}
                  filterType={singleHeading}
                  handler={() => handleFilterChange(singleHeading)}
                  key={Index}
                />
              );
            })}
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              {headings.map((singleHeading, index) => (
                <th
                  scope="col"
                  className="px-6 py-3 w-[20%] cursor-pointer"
                  key={index}
                >
                  {singleHeading.heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* An editable row component to make the code tidy */}
            {(searchFilteredData ?? filteredItems).map((singleItem) => (
              <EditableRow
                item={singleItem}
                onSave={handleItemSave}
                onCancel={handleCancel}
                onDelete={handleItemDelete}
                key={singleItem.id}
              />
            ))}
          </tbody>
        </table>
        {/* Form */}
        <div className="m-5">
          {/* Input form to add a new item */}
          <form className="flex gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Item Name"
              name="name"
              className="border-b outline-none w-[15%]"
              value={newItem.name}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Stock"
              name="stock"
              className="border-b outline-none w-[8%]"
              value={newItem.stock}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-400 rounded-md text-white"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inevntory;
