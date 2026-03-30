import React, { useState, useEffect } from 'react';

interface TodoItem {
  id: number;
  title: string;
}

function FetchDemoView() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch('/api/todos.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data: TodoItem[]) => {
        if (!cancelled) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div id="fetch-loading">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div id="fetch-error">
        {error}
      </div>
    );
  }

  return (
    <ul id="fetch-list">
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default FetchDemoView;