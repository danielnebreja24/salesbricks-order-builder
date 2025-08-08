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
