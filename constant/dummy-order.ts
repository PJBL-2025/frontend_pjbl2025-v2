export interface OrderItem {
  id: number;
  image_path: string | null;
  name: string | null;
  status: "processing" | "failed" | "success" | "pending";
  price: number;
  quantity: number;
  type: "custom" | "reguler";
}

export interface OrderGroup {
  id: number;
  order_id: string;
  product: OrderItem[];
  total_price: number;
}

export const dummyOrders: OrderItem[] = [
  {
    id: 1,
    image_path: "https://picsum.photos/seed/tshirt/100",
    name: "Kaos Sigma",
    status: "processing",
    price: 25000,
    quantity: 2,
    type: "reguler",
  },
  {
    id: 2,
    image_path: "https://picsum.photos/seed/sweater/100",
    name: "Sweater Ambalabu",
    status: "pending",
    price: 30000,
    quantity: 1,
    type: "custom",
  },
  {
    id: 3,
    image_path: "https://picsum.photos/seed/jacket/100",
    name: "Jaket Abang",
    status: "success",
    price: 20000,
    quantity: 3,
    type: "reguler",
  },
  {
    id: 4,
    image_path: "https://picsum.photos/seed/hoodie/100",
    name: "Aku Suka NN",
    status: "failed",
    price: 18000,
    quantity: 1,
    type: "reguler",
  },
  {
    id: 5,
    image_path: "https://picsum.photos/seed/kaosah/100",
    name: "Kaos Ah",
    status: "processing",
    price: 35000,
    quantity: 2,
    type: "custom",
  },
  {
    id: 6,
    image_path: "https://picsum.photos/seed/padangjacket/100",
    name: "Jaket Padang",
    status: "success",
    price: 40000,
    quantity: 1,
    type: "reguler",
  },
  {
    id: 7,
    image_path: "https://picsum.photos/seed/jassunda/100",
    name: "Jas Sunda",
    status: "pending",
    price: 12000,
    quantity: 4,
    type: "reguler",
  },
  {
    id: 8,
    image_path: "https://picsum.photos/seed/batakshirt/100",
    name: "Kaos Cinta Batak",
    status: "success",
    price: 5000,
    quantity: 2,
    type: "reguler",
  },
  {
    id: 9,
    image_path: "https://picsum.photos/seed/sweaterbalado/100",
    name: "Sweater Balado",
    status: "failed",
    price: 22000,
    quantity: 1,
    type: "custom",
  },
];