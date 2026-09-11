"use client";
import CardViewer from "@/components/card/CardViewer";
import { Card } from "@/types/card";

type CardSleeveProps = {
  card?: Card;
  onCardClick?: (card: Card) => void;
};

export default function CardSleeve({ card, onCardClick }: CardSleeveProps) {
  return (
    <div className="relative flex aspect-[2.5/3.5] w-full items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/10 p-2 shadow-inner backdrop-blur-sm">
      {card ? (
        <CardViewer card={card} onClick={() => onCardClick?.(card)} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-white/20 text-xs text-white/30">
          Empty Slot
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 rounded-lg border border-white/10" />
    </div>
  );
}