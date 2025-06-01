enum Size {
  XXL,
  XL,
  L,
  M,
  S,
  XS,
}

enum StatusCheckout {
  pending,
  processing,
  success,
  failed,
}

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
  product_images: string;
  star: number;
  sold: number;
  product_category: string[];
}

interface Review {
  star: number;
  comment: string;
  user_id: number;
  created_at: Date;
}

interface ProductDetail extends Product {
  description: string;
  quantity: number;
  weight: number;
  created_at: Date;
  product_images: string[];
  product_size: Size[];
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
  image: string
  name: string
  price: number
  amount: number
  address: Address
  created_at: Date
}

interface OrderCustom {
  front_image_path: string
  back_image_path: string
  front_width: number
  back_width: number
}

interface Order {
  quantity: number
  size: Size
  color: string
  type: ['reguler', 'custom'],
  price: number
  product_id: number
}

