"use client";
import React, { useState } from "react";
import Table from "@/components/Table/Table";
import { orderHeadings, buttonList } from "@/components/Table/constants";
import OrderList from "@/api/data.json";
import FilterButton from "@/components/Table/FilterButton";
const Home = () => {
  const [filter, setFilter] = useState<string>("All");

  const handleClick = (type: string) => {
    setFilter(type);
  };

  const filteredData =
    filter === "All"
      ? OrderList.orders
      : OrderList.orders.filter((order) => order.status === filter);

  return (
    <div className="flex flex-col justify-center w-full h-full gap-4 m-5 overflow-x-hidden">
      <div className="font-bold text-2xl">Orders</div>
      {/* Filter Buttons */}
      <div className="flex w-[45vw] my-5 justify-end gap-5 items-center">
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
      <Table
        headings={orderHeadings}
        data={filteredData}
        isOrderList={true}
        ItemList={OrderList.items}
      />
    </div>
  );
};

export default Home;
