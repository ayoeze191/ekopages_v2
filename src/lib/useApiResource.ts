"use client";

import { useCallback, useEffect, useState } from "react";

type Resource<T> = { data: T | null; loading: boolean; failed: boolean; reload: () => void };

/**
 * Loads an API resource in a client component.
 *
 * State updates are deferred by a microtask on purpose: setting state
 * synchronously inside an effect cascades an extra render, which the React
 * compiler's lint rules reject.
 */
export function useApiResource<T>(loader: () => Promise<T>, deps: React.DependencyList): Resource<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await Promise.resolve();
      if (cancelled) return;
      setLoading(true);
      setFailed(false);
      try {
        const result = await loader();
        if (!cancelled) setData(result);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, loading, failed, reload };
}
