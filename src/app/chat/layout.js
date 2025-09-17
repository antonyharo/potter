import AiChats from "@/components/ai-chats";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex p-10 gap-8 mx-auto w-full">
      <AiChats />
      <main className="space-y-6">{children}</main>
    </div>
  );
}
