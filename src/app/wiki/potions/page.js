"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function PotionsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.potterdb.com/v1/potions" // <-- troque aqui pela sua rota real
        );
        const result = await response.json();
        // A estrutura do JSON tem a chave "data"
        setData(result.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar poções");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Poções 🧪</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item, index) => {
            const potion = item.attributes;

            return (
              <Card key={item.id + index}>
                <CardContent>
                  {potion.image && (
                    <img
                      src={potion.image}
                      alt={potion.name}
                      className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                  )}
                  <CardTitle className="text-lg font-bold mb-2">
                    {potion.name}
                  </CardTitle>

                  {potion.effect && (
                    <p>
                      <span className="font-semibold">Efeito:</span>{" "}
                      {potion.effect}
                    </p>
                  )}
                  {potion.characteristics && (
                    <p>
                      <span className="font-semibold">Características:</span>{" "}
                      {potion.characteristics}
                    </p>
                  )}
                  {potion.difficulty && (
                    <p>
                      <span className="font-semibold">Dificuldade:</span>{" "}
                      {potion.difficulty}
                    </p>
                  )}
                  {potion.ingredients && (
                    <p>
                      <span className="font-semibold">Ingredientes:</span>{" "}
                      {potion.ingredients}
                    </p>
                  )}
                  {potion.inventors && (
                    <p>
                      <span className="font-semibold">Inventores:</span>{" "}
                      {potion.inventors}
                    </p>
                  )}
                  {potion.manufacturers && (
                    <p>
                      <span className="font-semibold">Fabricantes:</span>{" "}
                      {potion.manufacturers}
                    </p>
                  )}
                  {potion.side_effects && (
                    <p>
                      <span className="font-semibold">Efeitos Colaterais:</span>{" "}
                      {potion.side_effects}
                    </p>
                  )}
                  {potion.time && (
                    <p>
                      <span className="font-semibold">Tempo:</span>{" "}
                      {potion.time}
                    </p>
                  )}
                  {potion.wiki && (
                    <p className="mt-2">
                      <a
                        href={potion.wiki}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Ver mais detalhes
                      </a>
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
