import charactersData from "@/data/charactersData.json";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { MessageCircleMore } from "lucide-react";

export default function AiChats() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-2">
        {Object.keys(charactersData).map((character) => {
          return (
            <Link
              href={`/chat/${character}`}
              className="w-full"
              key={character}
            >
              <Button variant={"outline"} className="w-full justify-start">
                <MessageCircleMore color="red" />
                {charactersData[character].name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
