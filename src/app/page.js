import {
  BottleWine,
  UserSearch,
  Glasses,
  Sparkles,
  MessageCircleMore,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold">Harry Potter 👓🪄</h1>
      <p className="text-muted-foreground">
        Pesquise curisiodades e fale com personagens do universo!
      </p>
      <div className="flex justify-center items-center gap-3">
        <Button>
          <UserSearch />
          <Link href={"/characters"}>Personagens</Link>
        </Button>
        <Button>
          <BottleWine />
          <Link href={"/potions"}>Poções</Link>
        </Button>
        <Button>
          <Sparkles />
          <Link href={"/spells"}>Feitiços</Link>
        </Button>
        <Button>
          <MessageCircleMore />
          <Link href={"/chat"}>Chat</Link>
        </Button>
      </div>
    </div>
  );
}
