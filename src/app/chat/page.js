import charactersData from "@/data/charactersData.json";

import Link from "next/link";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { MessageCircleMore } from "lucide-react";

export default function Chat() {
  return (
    <div className="min-h-screen p-18 flex flex-col gap-12 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-center mb-4">
        Converse com os personagens de Harry Potter! 🪄
      </h1>
      <div className="grid grid-cols-4 gap-3">
        {charactersData &&
          Object.keys(charactersData).map((key) => {
            const character = charactersData[key];
            return (
              <Card key={key}>
                <CardContent className="space-y-2">
                  <CardTitle>{character.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {character.description}
                  </p>
                </CardContent>
                <CardFooter className={"mt-auto w-full justify-end"}>
                  <Link href={`/chat/${key}`}>
                    <Button size="icon" variant="outline">
                      <MessageCircleMore />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
