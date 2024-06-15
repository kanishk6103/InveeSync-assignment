"use client";
import data from "@/api/data.json";
import { useState } from "react";
import { ItemType } from "../types";
const page = () => {
  const [newItem, setNewItem] = useState<ItemType>({
    id: data.orders.length + 1,
    name: "",
    stock: 0,
  });
  const [items, setItems] = useState<ItemType[]>(data.items);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemToAdd: ItemType = {
      id: data.items.length + 1,
      name: newItem.name,
      stock: parseInt(newItem.stock.toString()),
    };
    // console.log(e);
    data.items.push(itemToAdd);

    setNewItem({
      id: data.items.length + 1,
      name: "",
      stock: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemDelete = (id: number) => {
    // for (let i = 0; i < data.items.length; i++) {
    //   if (id === data.items[i].id) {
    //     data.items.splice(i, 1);
    //   }
    // }
    const filteredItems = items.filter((singleItem) => singleItem.id != id);
    setItems(filteredItems);
    // console.log(data.items);
  };

  return (
    <div className="m-5 flex flex-col gap-5">
      <div className="text-2xl font-bold">Welcome to the inventory</div>
      <div>
        {items.map((singleItem) => {
          const { id, name, stock } = singleItem;
          return (
            <div key={id} className="flex gap-5 text-xl my-5">
              <div>{id}</div>
              <div>{name}</div>
              <div>{stock}</div>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-md"
                onClick={() => handleItemDelete(id)}
              >
                Delete
              </button>
            </div>
          );
        })}
        {/* Form */}
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
      </div>
    </div>
  );
};

export default page;
