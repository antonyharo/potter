import Header from "@/components/header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen p-15 flex flex-col gap-8 max-w-7xl mx-auto w-full">
      <Header />
      <main className="space-y-6">{children}</main>
    </div>
  );
}
