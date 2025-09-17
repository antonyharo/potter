import Header from "@/components/header";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold">Harry Potter 👓🪄</h1>
      <p className="text-muted-foreground">
        Pesquise curisiodades e fale com personagens do universo!
      </p>
      <Header />
    </div>
  );
}
