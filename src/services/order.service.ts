import { IAddOn, ICustomer, IProduct } from "interfaces/models";
import { formatError } from "utils/formatter";

/**
 * Fetches customer data from a local JSON file.
 * @returns {Promise<ICustomer[]>} A promise that resolves to an array of customers.
 * @throws {Error} If the fetch operation fails or the response is not ok.
 * FOR IMPROVEMENT: FETCH FROM THE ACTUAL API ENDPOINT
 */
export const getCustomers = async (): Promise<ICustomer[]> => {
  try {
    const res = await fetch("/data/customers.json");

    if (!res.ok) {
      throw new Error("Failed to fetch customers");
    }

    return await res.json();
  } catch (error) {
    throw new Error(formatError(error));
  }
};

/**
 * Fetches product data from a local JSON file.
 * @returns {Promise<IProduct[]>} A promise that resolves to an array of products.
 * @throws {Error} If the fetch operation fails or the response is not ok.
 * FOR IMPROVEMENT: FETCH FROM THE ACTUAL API ENDPOINT
 */
export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const res = await fetch("/data/products.json");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  } catch (error) {
    throw new Error(formatError(error));
  }
};

/**
 * Fetches add-on data from a local JSON file.
 * @returns {Promise<IAddOn[]>} A promise that resolves to an array of add-ons.
 * @throws {Error} If the fetch operation fails or the response is not ok.
 * FOR IMPROVEMENT: FETCH FROM THE ACTUAL API ENDPOINT
 */
export const getAddOns = async (): Promise<IAddOn[]> => {
  try {
    const res = await fetch("/data/addons.json");

    if (!res.ok) {
      throw new Error("Failed to fetch add-ons");
    }

    return await res.json();
  } catch (error) {
    throw new Error(formatError(error));
  }
};
