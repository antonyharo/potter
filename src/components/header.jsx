import {
  BottleWine,
  UserSearch,
  Sparkles,
  MessageCircleMore,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center items-center gap-3">
      <Link href={"/wiki/characters"}>
        <Button>
          <UserSearch />
          Personagens
        </Button>
      </Link>
      <Link href={"/wiki/potions"}>
        <Button>
          <BottleWine />
          Poções
        </Button>
      </Link>
      <Link href={"/wiki/spells"}>
        <Button>
          <Sparkles />
          Feitiços
        </Button>
      </Link>
      <Link href={"/chat"}>
        <Button>
          <MessageCircleMore />
          Chat
        </Button>
      </Link>
    </div>
  );
}
