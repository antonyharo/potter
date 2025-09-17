"use client";

import { useState, useEffect } from "react";

import { Card, CardTitle, CardContent } from "@/components/ui/card";

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
      <h1 className="text-3xl font-bold mb-6">Feitiços ✨</h1>

      {loading && <p>Carregando...</p>}
      {error && <p>Ooops, um erro ocorreu...</p>}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <Card key={item.id}>
              <CardContent className="space-y-3">
                <CardTitle className="text-2xl font-semibold mb-3">
                  {item.attributes.name}
                </CardTitle>
                <p className="text-muted-foreground">
                  <span className="font-bold text-zinc-900">Incantation:</span>{" "}
                  {item.attributes.incantation || "None"}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-bold text-zinc-900">Effect:</span>{" "}
                  {item.attributes.effect}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-bold text-zinc-900">Light:</span>{" "}
                  {item.attributes.light || "None"}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-bold text-zinc-900">Category:</span>{" "}
                  {item.attributes.category}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
