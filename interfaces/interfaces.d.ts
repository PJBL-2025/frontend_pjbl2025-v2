enum Size {
    XXL, XL, L, M, S, XS 
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  size: Size[];
  rating: number;
  reviewCount: number;
}
