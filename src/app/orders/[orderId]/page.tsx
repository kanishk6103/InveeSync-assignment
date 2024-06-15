"use client";
import { useParams } from "next/navigation";
import data from "@/api/data.json";
import { itemHeadings } from "@/components/Table/constants";
import Table from "@/components/Table/Table";
import { ItemType, Order, OrderItem } from "@/app/types";
const page = () => {
  const params = useParams();
  const { orderId } = params;
  // ans will store the order that matches the id
  let ans: Order[] = data.orders.filter((e) => {
    return e.id == (orderId as unknown as number);
  });
  //   console.log(ans[0]);
  const items: OrderItem[] = ans[0].items;
  const handleClick = (quantity: number, stock: number) => {
    if (quantity < stock) {
    }
  };
  return (
    <div className="m-10">
      <div className="m-5 text-2xl font-bold">
        {ans[0].id} : {ans[0].customer} ordered {ans[0].items.length} items
      </div>
      <Table
        headings={itemHeadings}
        data={ans[0]}
        isOrderList={false}
        ItemList={data.items}
      />
    </div>
  );
};

export default page;
