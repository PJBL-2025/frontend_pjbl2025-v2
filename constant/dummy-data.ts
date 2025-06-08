import { images } from "./images";

export interface Products {
  id: number;
  name: string;
  image: string;
  sold:number;
  price: number;
  star:number;
  product_category: string[];
}

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
    product_category: ["Unbranded", "Handmade", "Frozen", "Jaket", "Kaos Pendek"],
  },
  {
    id: 3,
    name: "Generic Aluminum Sausages",
    price: 307913,
    product_images: "https://picsum.photos/seed/LWmm27c6ec/1212/630",
    star: 0,
    sold: 3,
    product_category: ["Refined", "Frozen", "Handmade", "Kaos Panjang"],
  },
];
