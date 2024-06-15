"use client";
import { useParams, useRouter } from "next/navigation";
import data from "@/api/data.json";
import { itemHeadings } from "@/components/Table/constants";
import Table from "@/components/Table/Table";
import { ItemType, Order, OrderItem } from "@/app/types";
import { useEffect, useState } from "react";
import { Router } from "next/router";
const page = () => {
  const params = useParams();
  const { orderId } = params;
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<"Completed" | "Pending" | null>(null);

  useEffect(() => {
    // ans will store the order that matches the id
    const ans: Order[] = data.orders.filter((e) => {
      return e.id == (orderId as unknown as number);
    });
    setOrder(ans[0]);
  }, [orderId]);

  const items: OrderItem[] | null = order ? order.items : null;
  const handleClick = () => {
    if (order && order.status !== "Completed") {
      order.status = "Completed";
      setOrder(order);
      setStatus("Completed"); // Trigger re-render
    }
  };
  const handleMarkPending = () => {
    if (order && order.status !== "Pending") {
      order.status = "Pending";
      setOrder(order);
      setStatus("Pending"); // Trigger re-render
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-10">
      <div>
        <div className="cursor-pointer" onClick={() => router.back()}>
          Back
        </div>
        <div className="m-5 text-2xl font-bold">
          {order.id} : {order.customer} ordered {order.items.length} items
        </div>
      </div>
      <Table
        headings={itemHeadings}
        data={order}
        isOrderList={false}
        ItemList={data.items}
      />
      <div className="flex gap-5">
        <button
          className={
            "my-5 p-3 rounded-md " +
            (order.status == "Completed"
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-400 text-white")
          }
          onClick={handleClick}
        >
          Mark as completed
        </button>
        <button
          className={
            "my-5 p-3 rounded-md " +
            (order.status == "Pending"
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-400 text-white")
          }
          onClick={handleMarkPending}
        >
          Mark as Pending
        </button>
      </div>
    </div>
  );
};

export default page;
