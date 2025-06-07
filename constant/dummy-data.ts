import { ProductCart, ProductDetail, Review } from "@/interfaces/interfaces";
import { images } from "./images";

export const categoryIcon = [
  { icon: images.clothes1, name: "Sweater" },
  { icon: images.clothes2, name: "Jacket" },
  { icon: images.clothes3, name: "Hoodie" },
];

export const products = [
  {
    id: 1,
    name: "Bespoke Metal Bike",
    price: 83030,
    product_images: "https://loremflickr.com/2898/3209?lock=8961959562327376",
    star: 2,
    sold: 1,
    product_category: ["Practical", "Oriental", "Handmade", "Modern"],
  },
  {
    id: 2,
    name: "Luxurious Bronze Mouse",
    price: 383221,
    product_images: "https://loremflickr.com/1379/307?lock=7188539613782750",
    star: 3,
    sold: 1,
    product_category: ["Unbranded", "Handmade", "Frozen"],
  },
  {
    id: 3,
    name: "Generic Aluminum Sausages",
    price: 307913,
    product_images: "https://picsum.photos/seed/LWmm27c6ec/1212/630",
    star: 0,
    sold: 3,
    product_category: ["Refined", "Frozen", "Handmade"],
  },
  {
    id: 4,
    name: "Bespoke Metal Bike",
    price: 83030,
    product_images: "https://loremflickr.com/2898/3209?lock=8961959562327376",
    star: 2,
    sold: 1,
    product_category: ["Practical", "Oriental", "Handmade", "Modern"],
  },
  {
    id: 5,
    name: "Luxurious Bronze Mouse",
    price: 383221,
    product_images: "https://loremflickr.com/1379/307?lock=7188539613782750",
    star: 3,
    sold: 1,
    product_category: ["Unbranded", "Handmade", "Frozen"],
  },
  {
    id: 6,
    name: "Generic Aluminum Sausages",
    price: 307913,
    product_images: "https://picsum.photos/seed/LWmm27c6ec/1212/630",
    star: 0,
    sold: 3,
    product_category: ["Refined", "Frozen", "Handmade"],
  },
  {
    id: 7,
    name: "Bespoke Metal Bike",
    price: 83030,
    product_images: "https://loremflickr.com/2898/3209?lock=8961959562327376",
    star: 2,
    sold: 1,
    product_category: ["Practical", "Oriental", "Handmade", "Modern"],
  },
  {
    id: 8,
    name: "Luxurious Bronze Mouse",
    price: 383221,
    product_images: "https://loremflickr.com/1379/307?lock=7188539613782750",
    star: 3,
    sold: 1,
    product_category: ["Unbranded", "Handmade", "Frozen"],
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
  product_category: ["Modern", "Frozen", "Oriental"],
  product_size: ["S", "M", "L", "XL"],
  review: mockReviews,
  created_at: "2025-05-16T04:33:22.168Z",
};

