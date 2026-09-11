"use client";
import Image from "next/image";
import { Card } from "@/types/card";

type CardViewerProps = {
  card: Card;
  onClick?: () => void;
};

export default function CardViewer({
  card,
  onClick,
}: CardViewerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative aspect-[2.5/3.5] w-full overflow-hidden rounded-md shadow-md transition-transform duration-300 hover:scale-[1.03]"
      aria-label={`View ${card.name}`}
    >
      <Image
        src={card.frontImage}
        alt={`${card.name} painted Pokémon card`}
        fill
        sizes="(max-width: 768px) 30vw, 200px"
        className="object-cover"
      />
    </button>
  );
}