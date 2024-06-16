"use client";
import React, { useState } from "react";
import Table from "@/components/Table/Table";
import { orderHeadings, buttonList } from "@/components/Table/constants";
import OrderList from "@/api/data.json";
import FilterButton from "@/components/Table/FilterButton";
import Link from "next/link";
import Search from "@/components/Search";
import { Order } from "./types";
const Home = () => {
  const [filter, setFilter] = useState<string>("All");
  const [searchFilteredData, setSearchFilteredData] = useState<Order[] | null>(
    null
  );

  const handleClick = (type: string) => {
    setFilter(type);
    setSearchFilteredData(null);
  };

  // Filter data based on the "filter" state variable, if the variable is set to "All" then all the orders will be displayed otherwise the status
  // will be matched to the filter to filter the objects
  let filteredData =
    filter === "All"
      ? OrderList.orders
      : OrderList.orders.filter((order) => order.status === filter);

  // filter items that include the search term, compared .lowercase to compare all cases
  const handleSearch = (searchTerm: string) => {
    // console.log(searchTerm);
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
      {/* Filter Buttons and Search component */}
      <div className="flex flex-col md:flex-row md:gap-5 w-full my-5 px-40 justify-between items-center">
        <div>
          <Search handleSearch={handleSearch} Order={true} />
        </div>
        <div className="flex gap-5 items-center my-5 md:my-0">
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
      {/* Table component that takes all the column headings as an array, the data that is to be filled in, and a variable "isOrderList" to tell
      If this is a order list or an item list, and sending the array of items seperately from data */}
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
