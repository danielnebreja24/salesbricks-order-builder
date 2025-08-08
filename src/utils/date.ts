import dayjs from "dayjs";

interface IAddToDateProps {
  date: Date;
  numberToAdd: number;
  unit: "days" | "months" | "years";
}

/**
 * Adds a specified number of time units to a date.
 */
export function addToDate({ date, numberToAdd, unit }: IAddToDateProps) {
  return dayjs(date).add(numberToAdd, unit).toDate();
}

/**
 * Formats a date into a string based on the specified format.
 * Default format is "YYYY-MM-DD".
 */
export function formatDate(date: Date, format: string = "YYYY-MM-DD") {
  return dayjs(date).format(format);
}
