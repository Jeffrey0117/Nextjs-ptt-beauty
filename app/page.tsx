'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function FetchPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch(`/api/search/${page}`);
    const newData = await res.json();
    setData((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [page, loading]);

  useEffect(() => {
    fetchMore(); // 載入第一頁
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchMore]);

  return (
    <div
      style={{
        padding: 20,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 20,
      }}
    >
      {data.map((item, idx) => {
        const slug = item.user?.links?.html?.split('/').pop();

        return (
          <div key={idx} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
            <Link href={`/view/${slug}`}>
              <img
                src={item.urls?.regular}
                alt={item.title}
                style={{ width: '100%', borderRadius: 8 }}
              />
              <h4>{item.title}</h4>
              <p>by {item.user?.name}</p>
            </Link>
            
          </div>
        );
      })}

      <div ref={loaderRef} style={{ height: 1 }} />
      {loading && <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>載入中...</p>}
    </div>
  );
}
