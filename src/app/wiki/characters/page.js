"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
    <>
      <h1 className="text-3xl font-bold">Personagens 👨👩</h1>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">Ooops, um erro ocorreu...</p>}
      {data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <Card key={item.name + index}>
              <CardContent>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                )}
                <CardTitle className="text-lg font-bold mb-2">
                  {item.name}{" "}
                  <span className="text-sm font-normal">({item.species})</span>
                </CardTitle>
                {item.house && (
                  <p>
                    <span className="font-semibold">Casa:</span> {item.house}
                  </p>
                )}
                {item.patronus && (
                  <p>
                    <span className="font-semibold">Patrono:</span>{" "}
                    {item.patronus}
                  </p>
                )}
                {item.actor && (
                  <p>
                    <span className="font-semibold">Ator:</span> {item.actor}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {item.alive ? "Vivo" : "Falecido"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
