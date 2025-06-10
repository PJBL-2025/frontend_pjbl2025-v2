import { Address, ProductDetail, Review } from "@/interfaces/interfaces";
import { images } from "./images";

export const categoryIcon = [
  { icon: images.sweaterIcon, name: "Sweater" },
  { icon: images.jaketIcon, name: "Jaket" },
  { icon: images.kaosPanjangIcon, name: "Kaos Panjang" },
  { icon: images.kaosPendekIcon, name: "Kaos Pendek" },
  { icon: images.designIcon, name: "Design"}
];

export const products = [
  {
    id: 1,
    name: "Bespoke Metal Bike",
    price: 83030,
    product_images: "https://loremflickr.com/2898/3209?lock=8961959562327376",
    star: 2,
    sold: 1,
    product_category: ["Practical", "Oriental", "Handmade", "Modern", "Sweater"],
  },
  {
    id: 2,
    name: "Luxurious Bronze Mouse",
    price: 383221,
    product_images: "https://loremflickr.com/1379/307?lock=7188539613782750",
    star: 3,
    sold: 1,
    product_category: ["Unbranded", "Handmade", "Frozen", "Kaos Pendek"],
  },
  {
    id: 3,
    name: "Generic Aluminum Sausages",
    price: 307913,
    product_images: "https://picsum.photos/seed/LWmm27c6ec/1212/630",
    star: 0,
    sold: 3,
    product_category: ["Refined", "Frozen", "Handmade", "Kaos Pendek"],
  },
  {
    id: 4,
    name: "Bespoke Metal Bike",
    price: 83030,
    product_images: "https://loremflickr.com/2898/3209?lock=8961959562327376",
    star: 2,
    sold: 1,
    product_category: ["Practical", "Oriental", "Handmade", "Modern", "Sweater"],
  },
  {
    id: 5,
    name: "Luxurious Bronze Mouse",
    price: 383221,
    product_images: "https://loremflickr.com/1379/307?lock=7188539613782750",
    star: 3,
    sold: 1,
    product_category: ["Unbranded", "Handmade", "Frozen", "Jaket"],
  },
  {
    id: 6,
    name: "Generic Aluminum Sausages",
    price: 307913,
    product_images: "https://picsum.photos/seed/LWmm27c6ec/1212/630",
    star: 0,
    sold: 3,
    product_category: ["Refined", "Frozen", "Handmade", "Kaos Panjang"],
  },
  {
    id: 7,
    name: "Bespoke Metal Bike",
    price: 83030,
    product_images: "https://loremflickr.com/2898/3209?lock=8961959562327376",
    star: 2,
    sold: 1,
    product_category: ["Practical", "Oriental", "Handmade", "Modern", "Sweater"],
  },
  {
    id: 8,
    name: "Luxurious Bronze Mouse",
    price: 383221,
    product_images: "https://loremflickr.com/1379/307?lock=7188539613782750",
    star: 3,
    sold: 1,
    product_category: ["Unbranded", "Handmade", "Frozen", "Kaos Pendek"],
  },
];

export const mockReviews: Review[] = [
  {
    user: {
      username: "haibub",
      name: "Sarah Johnson",
    },
    star: 5,
    comment:
      "The sound quality is amazing! Very comfortable to wear for long periods. Definitely worth the price.",
    created_at: "2025-05-16T04:33:23.301Z",
  },
  {
    user: {
      username: "haibai",
      name: "Michael Chen",
    },
    star: 4,
    comment:
      "Great headphones overall. Battery life is impressive, but the bass could be a bit stronger.",
    created_at: "2025-05-16T04:33:23.301Z",
  },
  {
    user: {
      username: "2",
      name: "Emma Wilson",
    },
    star: 2,
    comment:
      "Perfect for my daily commute. Noise cancellation works really well. Love the design!",
    created_at: "2025-05-16T04:33:23.301Z",
  },
  {
    user: {
      username: "hai",
      name: "Emma Wilson",
    },
    star: 1,
    comment:
      "Perfect for my daily commute. Noise cancellation works really well. Love the design!",
    created_at: "2025-05-16T04:33:23.301Z",
  },
];

export const mockProduct: ProductDetail = {
  id: 1,
  name: "Heavyweight Long Sleeve 7500",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium maiores sunt est error nisi eum architecto quisquam earum amet recusandae perspiciatis, suscipit cumque, facere quas aliquid necessitatibus ex iure iusto!",
  product_images: "https://loremflickr.com/1671/3101?lock=769877223393981",
  product_quantity: 900,
  price: 150000,
  weight: 10,
  star: 4.7,
  sold: 911,
  product_category: ["Jaket"],
  product_size: ["S", "M", "L", "XL"],
  review: mockReviews,
  created_at: "2025-05-16T04:33:22.168Z",
};

export const addressMockup: Address[] = [
  {
    id: 10,
    address: "3857 Titus Field",
    zip_code: 15555,
    destination_code: "UZB",
    receiver_area: "AUS-584",
  },
  {
    id: 11,
    address: "332 W Broadway Street",
    zip_code: 97196,
    destination_code: "USA",
    receiver_area: "CZE-887",
  },
  {
    id: 12,
    address: "19684 Buckingham Road",
    zip_code: 7415,
    destination_code: "KGZ",
    receiver_area: "PER-454",
  },
];
