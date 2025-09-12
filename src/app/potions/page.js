"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.potterdb.com/v1/potions");
        const data = await response.json();
        setData(data.data);
        setError(null);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Carregando...</p>}
      {error && <p>Ooops, um erro ocorreu...</p>}
      {data && (
        <div>
          {data.map((item) => (
            <div key={item.id}>{item.attributes.name}</div>
          ))}
        </div>
      )}
    </>
  );
}
