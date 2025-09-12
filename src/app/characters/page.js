"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://hp-api.onrender.com/api/characters"
        );
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="p-6 font-sans">
      {loading && <p className="">Carregando...</p>}
      {error && <p className="text-red-500">Ooops, um erro ocorreu...</p>}
      {data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={item.name + index}
              className=" rounded-2xl shadow-md p-4 hover:shadow-lg transition"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-lg font-bold mb-2">
                {item.name}{" "}
                <span className="text-sm font-normal">({item.species})</span>
              </h2>
              {item.house && (
                <p className="">
                  <span className="font-semibold">Casa:</span> {item.house}
                </p>
              )}
              {item.patronus && (
                <p className="">
                  <span className="font-semibold">Patrono:</span>{" "}
                  {item.patronus}
                </p>
              )}
              {item.actor && (
                <p className="">
                  <span className="font-semibold">Ator:</span> {item.actor}
                </p>
              )}
              <p className="">
                <span className="font-semibold">Status:</span>{" "}
                {item.alive ? "Vivo" : "Falecido"}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
