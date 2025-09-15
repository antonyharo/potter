"use client";

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
    <div>
      <div className="overflow-hidden">
        <header className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Harry Potter</h1>
        </header>

        <main className="p-4 h-[60vh] overflow-y-auto" aria-live="polite">
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] ${
                  m.role === "user" ? "ml-auto text-right" : "mr-auto text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-xl ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </main>

        <form onSubmit={handleSend} className="p-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl border px-4 py-2 focus:outline-none focus:ring"
            placeholder="Escreva sua mensagem..."
            aria-label="Mensagem"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
