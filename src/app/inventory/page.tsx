"use client";
import data from "@/api/data.json";
import { useState } from "react";
import { ItemType } from "../types";
import { headings } from "./contants";
import EditableRow from "./EditableRow";
import { useRouter } from "next/navigation";

const Page = () => {
  const [newItem, setNewItem] = useState<ItemType>({
    id: data.items.length + 1,
    name: "",
    stock: 0,
  });
  const [items, setItems] = useState<ItemType[]>(data.items);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const itemToAdd: ItemType = {
        id: items.length + 1,
        name: newItem.name,
        stock: parseInt(newItem.stock.toString()),
      };

      setItems((prevItems) => [...prevItems, itemToAdd]);
      setNewItem({
        id: items.length + 1,
        name: "",
        stock: 0,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemDelete = (id: number) => {
    data.items = data.items.filter((singleItem) => singleItem.id !== id);
    setItems(data.items);
  };

  const handleItemSave = (updatedItem: ItemType) => {
    const duplicate = items.some(
      (singleItem) =>
        singleItem.name.toLowerCase() === updatedItem.name.toLowerCase()
    );
    if (duplicate) {
      alert("Item already exists, kindly edit the existing item");
      return;
    } else {
      data.items = data.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setItems(data.items);
    }
  };

  const handleCancel = () => {};
  console.log(data.items);
  return (
    <div className="m-5 flex flex-col gap-5">
      <div className="flex gap-5 items-end px-6">
        <button
          onClick={() => {
            router.back();
          }}
        >
          Back
        </button>
        <div className="text-2xl font-bold">Welcome to the inventory</div>
      </div>
      <div>
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
            {items.map((singleItem) => (
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
          <form className="flex gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Item Name"
              name="name"
              value={newItem.name}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Stock"
              name="stock"
              value={newItem.stock}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="px-3 py-2 bg-blue-400 rounded-md text-white"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
