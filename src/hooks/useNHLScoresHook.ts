// hooks/getGames/useNHLScoresHook.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import type { NHLScoreResponse } from '../types/types.ts';

interface CacheEntry {
  data: NHLScoreResponse;
  timestamp: number;
}

// Cache duration in milliseconds (e.g., 5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Create a cache map outside the hook to persist between renders
const cache = new Map<string, CacheEntry>();

export const useNHLScores = ({ date }: { date: string }) => {
  const [data, setData] = useState<NHLScoreResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Check cache first
      const cachedEntry = cache.get(date);
      const now = Date.now();

      if (cachedEntry && now - cachedEntry.timestamp < CACHE_DURATION) {
        setData(cachedEntry.data);
        setLoading(false);
        return;
      }

      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/score/${date}`, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Store in cache
      cache.set(date, {
        data: result,
        timestamp: Date.now(),
      });

      setData(result);
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') {
        // Ignore abort errors
        return;
      }
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Add a manual refresh function that bypasses cache
  const refresh = useCallback(() => {
    // Remove from cache
    cache.delete(date);
    // Fetch fresh data
    fetchData();
  }, [date, fetchData]);

  return { data, loading, error, refresh };
};
