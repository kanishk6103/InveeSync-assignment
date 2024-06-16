"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { orderHeadings, buttonList } from "@/components/Table/constants";
import OrderList from "@/api/data.json";
import FilterButton from "@/components/Table/FilterButton";
import Link from "next/link";
import Search from "@/components/Search";
import { fetchInitialData } from "@/components/utils/fetchData";
import { ItemType, Order } from "./types";
import { GetStaticProps } from "next";
import {
  loadFromLocalStorage,
  saveToLocal,
} from "@/components/utils/localStorage";

interface HomeProps {
  initialData: {
    orders: Order[];
    items: ItemType[];
  };
}
const Home: React.FC<HomeProps> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [searchFilteredData, setSearchFilteredData] = useState<Order[] | null>(
    null
  );
  const initialData = async () => {
    const data = await fetchInitialData();
    setOrders(data.orders);
    setItems(data.items);
  };

  useEffect(() => {
    initialData();
  }, []);

  useEffect(() => {
    const storedData = loadFromLocalStorage<{
      orders: Order[];
      items: ItemType[];
    }>("appData");
    if (storedData) {
      setOrders(storedData.orders);
      setItems(storedData.items);
    }
    console.log(storedData);
  }, []);

  const handleClick = (type: string) => {
    setFilter(type);
    setSearchFilteredData(null);
  };

  let filteredData =
    filter === "All"
      ? OrderList.orders
      : OrderList.orders.filter((order) => order.status === filter);

  const handleSearch = (searchTerm: string) => {
    console.log(searchTerm);
    setSearchFilteredData(
      OrderList.orders.filter((singleOrder) => {
        return singleOrder.customer
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    );
  };
  return (
    <div className="flex flex-col justify-center w-full h-full gap-4 m-5 overflow-x-hidden">
      <div className="flex gap-10">
        <div className="font-bold text-2xl">Orders</div>
        <div className="font-light text-2xl">
          <Link href={`/inventory`}>Inventory</Link>
        </div>
      </div>
      {/* Filter Buttons */}
      <div className="flex w-full my-5 px-40 justify-between items-center">
        <div>
          <Search handleSearch={handleSearch} Order={true} />
        </div>
        <div className="flex gap-5 items-center">
          {buttonList.map((singleButton, index) => {
            return (
              <FilterButton
                currentFilter={filter}
                filterType={singleButton}
                handler={() => handleClick(singleButton)}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <Table
        headings={orderHeadings}
        data={searchFilteredData ?? filteredData}
        isOrderList={true}
        ItemList={OrderList.items}
      />
    </div>
  );
};

export default Home;
