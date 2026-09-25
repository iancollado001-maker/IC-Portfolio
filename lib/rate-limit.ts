// Fixed-window, in-memory rate limiter.
// On serverless hosts each warm instance keeps its own window, so this is a
// best-effort brake on bursts from one client, not a global quota.

type Window = { count: number; resetAt: number };

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const windows = new Map<string, Window>();

  return function check(key: string, now: number = Date.now()): RateLimitResult {
    // Drop expired windows so the map can't grow without bound.
    if (windows.size > 1000) {
      windows.forEach((w, k) => {
        if (w.resetAt <= now) windows.delete(k);
      });
    }

    const current = windows.get(key);
    if (!current || current.resetAt <= now) {
      windows.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true };
    }
    if (current.count >= limit) {
      return { allowed: false, retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) };
    }
    current.count += 1;
    return { allowed: true };
  };
}
