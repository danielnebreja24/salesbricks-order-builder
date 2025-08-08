import { useQuery } from "@tanstack/react-query";
import { getAddOns, getCustomers, getProducts } from "services/order.service";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useOrders = () => {
  // Fetcher for customers
  const customers = useQuery({
    queryKey: ["customers"],
    queryFn: async () => await getCustomers(),
    staleTime: STALE_TIME,
  });

  // Fetcher for products
  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
    staleTime: STALE_TIME,
  });

  // Fetcher for add-ons
  const addOns = useQuery({
    queryKey: ["addons"],
    queryFn: async () => await getAddOns(),
    enabled: !!products.data,
    staleTime: STALE_TIME,
  });

  return {
    customers: customers.data ?? [],
    products: products.data ?? [],
    addOns: addOns.data ?? [],
  };
};
