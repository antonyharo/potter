"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [messages, setMessages] = useState([
    {
      id: "system-1",
      role: "assistant",
      text: "Oi, sou o Harry Potter!",
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

    // Harry Potter é sempre o padrão
    const payload = {
      messages: [
        {
          role: "system",
          content:
            "Aviso: esta é uma simulação ficcional do personagem Harry Potter — não é afiliada oficialmente a J.K. Rowling, Bloomsbury, ou Warner Bros.",
        },
        {
          role: "system",
          content: `Você é um assistente que interpreta fielmente o personagem Harry Potter (o jovem bruxo da série conhecida mundialmente). 
          Responda no tom, conhecimento e personalidade do Harry Potter dos livros: corajoso, leal, um pouco humilde e curioso. 
          Não revele segredos do universo além do que seria razoável para o personagem. Sempre mantenha o aviso de simulação claro para o usuário no início da conversa.`,
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

      if (!res.ok) {
        const text = await res.text();
        addMessage({
          id: `a-error-${Date.now()}`,
          role: "assistant",
          text: `Erro do servidor: ${res.status} ${text}`,
        });
        setLoading(false);
        return;
      }

      const data = await res.json();
      const assistantText = data.text ?? "Desculpe, não recebi resposta.";
      addMessage({
        id: `a-${Date.now()}`,
        role: "assistant",
        text: assistantText,
      });
    } catch (err) {
      addMessage({
        id: `a-ex-${Date.now()}`,
        role: "assistant",
        text: `Erro ao chamar a API: ${err?.message ?? String(err)}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="h-screen p-8 overflow-hidden space-y-6">
        <h1 className="text-3xl font-bold">Harry Potter ✨🪄</h1>

        <main className="h-[70vh] overflow-y-auto" aria-live="polite">
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex w-full ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] 
                    break-words rounded-xl px-3 py-2 text-md 
                    ${
                      m.role === "user"
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-900 text-zinc-900"
                    }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </main>

        <form onSubmit={handleSend} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 "
            placeholder="Escreva sua mensagem..."
            aria-label="Mensagem"
          />
          <Button disabled={loading} type="submit">
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </div>
    </>
  );
}
