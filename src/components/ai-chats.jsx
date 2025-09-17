import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AiChats() {
  return (
    <div className="flex flex-col gap-3">
      <Link href={"/wiki/characters"} className="w-full">
        <Button className="w-full justify-start">
          <User /> Harry Potter
        </Button>
      </Link>
      <Link href={"/wiki/potions"} className="w-full">
        <Button className="w-full justify-start">
          <User /> Hermione
        </Button>
      </Link>
      <Link href={"/wiki/spells"} className="w-full">
        <Button className="w-full justify-start">
          <User /> Draco Malfoy
        </Button>
      </Link>
      <Link href={"/chat"} className="w-full">
        <Button className="w-full justify-start">
          <User /> Hagrid
        </Button>
      </Link>
    </div>
  );
}
