import { useState, useEffect } from 'react';

export function useFetchPhotos(count = 30) {
  const [photos, setPhotos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPhotos() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://picsum.photos/v2/list?page=1&limit=${count}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setPhotos(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to fetch photos.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPhotos();
    return () => { cancelled = true; };
  }, [count]);

  return { photos, loading, error };
}