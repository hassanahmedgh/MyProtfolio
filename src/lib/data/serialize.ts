import "server-only";

import { Timestamp } from "firebase/firestore";

/**
 * Convert a Firestore Timestamp (or millis / ISO string) to an ISO string so it
 * is serializable across the server→client boundary. Returns null otherwise.
 */
export function toISO(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "object" && value !== null && "toDate" in value) {
    try {
      const d = (value as { toDate: () => Date }).toDate();
      return d.toISOString();
    } catch {
      return null;
    }
  }
  if (typeof value === "number") return new Date(value).toISOString();
  if (typeof value === "string") return value;
  return null;
}
