"use client";

// Ask the server to refresh the cached public pages after an admin write so
// changes appear immediately instead of waiting out the ISR window. Best-effort:
// failures are swallowed (the 5-min revalidate is the safety net).
export async function revalidatePublic(tags: string[]): Promise<void> {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags }),
    });
  } catch {
    /* ignore — time-based revalidation will catch up */
  }
}
