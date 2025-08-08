interface IGetTotalPriceProps {
  price: number;
  qty: number;
}

/**
 * Calculates the total price based on unit price and quantity.
 * Ensures the result is rounded to two decimal places and non-negative.
 */
export function getTotalPrice({ price, qty }: IGetTotalPriceProps): number {
  return Math.max(0, Math.round(price * qty * 100) / 100);
}

type TPrice = number | string | undefined | null;

/**
 * Safely adds two prices together, handling various types and ensuring
 * the result is rounded to two decimal places and non-negative.
 *
 * @param price1 - First price (can be number, string, undefined, or null).
 * @param price2 - Second price (can be number, string, undefined, or null).
 * @returns The total price as a number.
 */
export function safeAddPrice(price1: TPrice, price2: TPrice): number {
  const parsePrice = (value: TPrice) => {
    if (value == null) return 0; // null or undefined → 0
    const n = typeof value === "string" ? parseFloat(value) : value; // number → itself
    return isNaN(n) ? 0 : n;
  };

  const total = parsePrice(price1) + parsePrice(price2);
  return Math.max(0, Math.round(total * 100) / 100);
}
