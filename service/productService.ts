import { API_URL } from "@/constant/env";
import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(`${API_URL}/node/api/product`);
  return res.data.products;
};

export const getBanner = async () => {
  const res = await axios.get(`${API_URL}/node/api/banner`);
  return res.data.data;
};

export const getOnePorduct = async (id: number) => {
  const res = await axios.get(`${API_URL}/node/api/product/${id}`);
  return res.data.products;
};

export const getAllCategory = async () => {
  const res = await axios.get(`${API_URL}/node/api/category`);
  return res.data.data;
};

export const getCategoryPorduct = async (slug: string) => {
  const res = await axios.get(`${API_URL}/node/api/category/${slug}`);
  return res.data.data;
};

export const getSearchPorduct = async (query: string) => {
  const res = await axios.get(`${API_URL}/node/api/product/search?query=${query}`);
  return res.data.products;
};
