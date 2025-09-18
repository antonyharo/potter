"use client";

import React from "react";
import { notFound } from "next/navigation";

import charactersData from "@/data/charactersData.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Chat(props) {
  const params = React.use(props.params);
  const character = params.character;

  if (!character) {
    notFound();
  }

  const data = charactersData[character];

  if (!data) {
    notFound();
  }

  const [messages, setMessages] = useState([
    {
      id: "system-1",
      role: "assistant",
      text: data.initialMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function addMessage(msg) {
    setMessages((m) => [...m, msg]);
  }

  async function handleSend(e) {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: `u-${Date.now()}`, role: "user", text: input };
    addMessage(userMsg);
    setInput("");
    setLoading(true);

    const payload = {
      messages: [
        {
          role: "system",
          // ALTERAR AQUI PARA O MELHOR PROMPT (SE POSSIVEL DEIXAR DENTRO DO JSON TAMBEM!)
          content: `Você é um assistente que interpreta fielmente o personagem ${character} sua descrição é ${data.description}.`,
        },
        { role: "user", content: userMsg.text },
      ],
    };

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Erro: ${res.status}`);

      const data = await res.json();
      addMessage({
        id: `a-${Date.now()}`,
        role: "assistant",
        text: data.text ?? "Desculpe, não recebi resposta.",
      });
    } catch (err) {
      addMessage({
        id: `a-ex-${Date.now()}`,
        role: "assistant",
        text: `Erro ao chamar a API: ${err.message ?? String(err)}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen mx-auto flex flex-col border rounded-xl">
      {/* header */}
      <h1 className="p-4 text-2xl font-bold border-b">Harry Potter 🪄✨</h1>

      {/* mensagens */}
      <ScrollArea className="flex-1 p-4 pb-28">
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`max-w-[85%] break-words rounded-xl px-4 py-2 text-md shadow-sm
                  ${
                    m.role === "user"
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-900"
                  }`}
              >
                {m.text}
              </p>
            </div>
          ))}
          {loading && <Skeleton className="h-10 w-[60%]" />}
          <div ref={endRef} />
        </div>
      </ScrollArea>

      {/* barra de input */}
      <form
        onSubmit={handleSend}
        className="sticky bottom-0 flex justify-center items-center gap-3 p-4"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 py-6 px-6 text-3xl"
          placeholder="Escreva sua mensagem..."
          aria-label="Mensagem"
        />
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Enviar"}
        </Button>
      </form>
    </div>
  );
}
