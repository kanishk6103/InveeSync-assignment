export type OrderItem = {
  id: number;
  name: string;
  quantity: number;
};

export type Order = {
  id: number;
  customer: string;
  items: OrderItem[];
  status: string;
};

export type Headings = {
  heading: string;
  col: string;
};

export interface TableProps {
  headings: Headings[];
  data: Order[] | Order;
  isOrderList: boolean;
  ItemList: ItemType[];
}

export type ItemType = {
  id: number;
  name: string;
  stock: number;
};

export interface FilterButtonProps {
  currentFilter: string;
  filterType: string;
  handler: any;
}
