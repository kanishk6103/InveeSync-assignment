"use client";
import data from "@/api/data.json";
import { useState } from "react";
import { ItemType } from "../types";
import { headings } from "./contants";
const page = () => {
  const [newItem, setNewItem] = useState<ItemType>({
    id: data.orders.length + 1,
    name: "",
    stock: 0,
  });
  const [items, setItems] = useState<ItemType[]>(data.items);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);
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
      if (isEditing && editItemId !== null) {
        const updatedItems = items.map((item) =>
          item.id === editItemId
            ? { ...item, name: newItem.name, stock: newItem.stock }
            : item
        );
        setItems(updatedItems);
        setIsEditing(false);
        setEditItemId(null);
      } else {
        const itemToAdd: ItemType = {
          id: items.length + 1,
          name: newItem.name,
          stock: parseInt(newItem.stock.toString()),
        };

        setItems((prevItems) => [...prevItems, itemToAdd]);
      }

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
    const filteredItems = items.filter((singleItem) => singleItem.id != id);
    setItems(filteredItems);
  };

  const handleItemEdit = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setNewItem(itemToEdit);
      setIsEditing(true);
      setEditItemId(id);
    }
  };

  return (
    <div className="m-5 flex flex-col gap-5">
      <div className="text-2xl font-bold">Welcome to the inventory</div>
      <div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              {headings.map((singleHeading, index) => {
                // console.log(singleHeading.col);
                return (
                  <th
                    scope="col"
                    className="px-6 py-3 w-[20%] cursor-pointer"
                    key={index}
                  >
                    {singleHeading.heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((singleItem) => {
              const { id, name, stock } = singleItem;
              return (
                <tr className="bg-white border-b" key={id}>
                  <td className="p-6">{id}</td>
                  <td className="p-6">{name}</td>
                  <td className="p-6">{stock}</td>
                  <td className="p-6 flex gap-5">
                    <button
                      className={`px-2 py-1 bg-blue-400 text-white rounded-md`}
                      onClick={() => handleItemEdit(id)}
                    >
                      {isEditing ? "Save" : "Edit"}
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
                      onClick={() => handleItemDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Form */}
        {isEditing ? null : (
          <div>
            <form action="" className="flex gap-5" onSubmit={handleSubmit}>
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
              <button type="submit">Add</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
