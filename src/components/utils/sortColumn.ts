import { Order, OrderItem } from "@/app/types";

export const sortColumn = (
  data: Order[] | OrderItem[],
  col: string,
  sortOrder: "asc" | "desc" | null
) => {
  if (sortOrder === "desc") {
    col = "id";
    sortOrder = null;
  }
  return data.sort((a, b) => {
    let x = a[col as keyof (Order | OrderItem)];
    let y = b[col as keyof (Order | OrderItem)];
    return sortOrder === null
      ? x < y
        ? -1
        : x > y
        ? 1
        : 0
      : sortOrder === "asc"
      ? x < y
        ? 1
        : x > y
        ? -1
        : 0
      : 0;
  });
};
