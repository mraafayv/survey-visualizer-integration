import { useEffect, useState, useRef } from "react";

// lives across renders/files while the app is loaded
const cache = new Map(); // key: url -> value: data

export default function useFetch(url) {
  const [data, setData] = useState(() => cache.get(url) ?? null);
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(() => !cache.has(url));
  const abortRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    // If we already have it, use it and skip the fetch
    if (cache.has(url)) {
      setData(cache.get(url));
      setPending(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setPending(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        cache.set(url, data);   // write to cache
        setData(data);          // update state
        setPending(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return; // ignore aborts
        setError(err);
        setPending(false);
      });

    // cancel fetch if the component unmounts or url changes
    return () => controller.abort();
  }, [url]);

  return { data, error, isPending };
}
