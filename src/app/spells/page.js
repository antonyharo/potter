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
        const response = await fetch("https://api.potterdb.com/v1/spells");
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
        <div className="space-y-5">
          {data.map((item) => (
            <ul key={item.id}>
              <h3 className="font-bold">{item.attributes.name}</h3>
              <li className="pl-5">
                Incantation: {item.attributes.incantation || "None"}
              </li>
              <li className="pl-5">Effect: {item.attributes.effect}</li>
              <li className="pl-5">Light: {item.attributes.light || "None"}</li>
              <li className="pl-5">Category: {item.attributes.category}</li>
            </ul>
          ))}
        </div>
      )}
    </>
  );
}
