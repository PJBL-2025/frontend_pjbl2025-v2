import { Size, StatusCheckout } from "@/constant/enum";

interface Address {
  id: number;
  address: string;
  zip_code: number;
  destination_code: string;
  receiver_area: string;
}

interface Account {
  name: string;
  username: string;
  address: Address[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  star: number;
  sold: number;
  product_images: string;
  product_category: string[];
}

interface Review {
  star: number;
  comment: string;
  user: {
    username: string;
    name: string;
  };
  created_at: string;
}

interface ProductDetail extends Product {
  description: string;
  product_quantity: number;
  weight: number;
  created_at: string;
  product_size: string[];
  review: Review[];
}

interface Banner {
  id: number;
  name: string;
  price: number;
  product_images: string;
}

interface Checkout {
  status: StatusCheckout;
  image: string;
  name: string;
  price: number;
  amount: number;
  address: Address;
  created_at: string;
}

interface OrderCustom {
  front_image_path: string;
  back_image_path: string;
  front_width: number;
  back_width: number;
}

interface Order {
  quantity?: number;
  size?: Size | null;
  color?: string;
  type?: "reguler" | "custom";
  price: number;
  product_id?: number;
}

interface ProductCart extends Order {
  id: number,
  name: string;
  product_images: string;
  product_size: string[]
  product_quantity: number
}