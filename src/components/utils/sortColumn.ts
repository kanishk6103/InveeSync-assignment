import { Order, OrderItem } from "@/app/types";

export const sortColumn = (
  data: Order[] | OrderItem[],
  col: string,
  sortOrder: "asc" | "desc" | null
) => {
  // if we were to go from descending to original, it was originally sorted by id, so we set the column to "id" and sort it in ascending by setting
  // the sortOrder to null. In real life we can use Serial Number maybe
  if (sortOrder === "desc") {
    col = "id";
    sortOrder = null;
  }
  return data.sort((a, b) => {
    // fetching two items from the array, where a and b are any two elements from the array
    let x = a[col as keyof (Order | OrderItem)];
    let y = b[col as keyof (Order | OrderItem)];
    // if x<y then -1 would mean that y comes first then x and vice versa for 1. while 0 means that no changes are being made.
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
