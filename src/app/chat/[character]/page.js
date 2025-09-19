"use client";

import React from "react";
import { notFound } from "next/navigation";

import charactersData from "@/data/charactersData.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { Loader2, MessageCircleMore } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import AiChats from "@/components/ai-chats";
import Link from "next/link";

export default function AiChat(props) {
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
    <div className="w-7xl min-h-screen mx-auto flex gap-5 p-5">
      {/* Sidebar */}
      <ScrollArea className="h-[90vh] w-64 rounded-xl border">
        <div className="p-5 grid gap-2">
          {Object.keys(charactersData)
            .sort((a, b) => (a === character ? -1 : b === character ? 1 : 0))
            .map((key) => {
              const isCurrent = key === character;
              return (
                <Link href={`/chat/${key}`} key={key}>
                  <Button
                    variant={isCurrent ? "default" : "outline"}
                    className={`w-full justify-start ${
                      isCurrent
                        ? "bg-yellow-400 text-white hover:bg-yellow-300"
                        : ""
                    }`}
                  >
                    <MessageCircleMore color={isCurrent ? "white" : "orange"} />
                    {charactersData[key].name}
                  </Button>
                </Link>
              );
            })}
        </div>
      </ScrollArea>

      {/* Chat */}
      <div className="flex-1 flex flex-col h-[90vh] border rounded-xl overflow-hidden">
        {/* Cabeçalho */}
        <h1 className="p-5 text-2xl font-bold border-b flex-shrink-0">
          {data.name}
        </h1>

        {/* Mensagens com Scroll */}
        <ScrollArea className="flex-1 p-5">
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`max-w-[85%] break-words rounded-xl px-4 py-2 text-md border ${
                    m.role === "user"
                      ? "bg-zinc-900 text-white"
                      : "border-yellow-200 bg-white text-zinc-900"
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

        {/* Barra de input */}
        <form
          onSubmit={handleSend}
          className="flex gap-3 p-4 border-t bg-zinc-100 flex-shrink-0"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-lg bg-card"
            placeholder="Escreva sua mensagem..."
            aria-label="Mensagem"
          />
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Enviar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
