import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// POST /api/gemini
export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { message: "Campo 'messages' é obrigatório." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "GEMINI_API_KEY não configurada no .env.local." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Converte o array de mensagens para o formato aceito pelo SDK:
    // cada item vira um 'content' com partes de texto
    const contents = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const result = await model.generateContent({ contents });
    const output =
      result.response?.text() ?? "Não foi possível gerar resposta.";

    return NextResponse.json({ text: output }, { status: 200 });
  } catch (error) {
    console.error("Erro na rota Gemini:", error);
    return NextResponse.json(
      { message: "Erro interno ao gerar conteúdo." },
      { status: 500 }
    );
  }
}
