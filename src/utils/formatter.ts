/**
 * Normalize any caught value into a simple string message.
 */
export function formatError(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    "statusText" in err
  ) {
    return `${err.status} ${err.statusText}`;
  }

  return String(err);
}

/**
 * Formats a number or string value into a currency format based on the provided locale and currency.
 * Returns an empty string if the value is null, undefined, or not a valid number.
 *
 * @param value - The value to format (number, string, undefined, or null).
 * @param locale - The locale to use for formatting (default is "en-US").
 * @param currency - The currency code to use for formatting (default is "USD").
 * @returns A formatted currency string or an empty string if the input is invalid.
 */
export function formatCurrency(
  value: number | string | undefined | null,
  locale: string = "en-US",
  currency: string = "USD"
): string {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (numValue == null || isNaN(numValue)) return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(numValue);
}

/**
 * Safely handles a number or string value, returning a default value if the input is not a valid number.
 */
export function safeHandleNumber(
  value: number | string | undefined | null,
  defaultValue = 0
): number {
  if (typeof value === "number")
    return Number.isFinite(value) ? value : defaultValue;

  if (typeof value === "string") {
    if (value === "") return defaultValue;
    const numberValue = Number(value.trim());
    return Number.isFinite(numberValue) ? numberValue : defaultValue;
  }
  return defaultValue;
}
