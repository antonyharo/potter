import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-3">
      <Link href={"/characters"}>Characters</Link>
      <Link href={"/potions"}>Potions</Link>
      <Link href={"/spells"}>Spells</Link>
    </div>
  );
}
