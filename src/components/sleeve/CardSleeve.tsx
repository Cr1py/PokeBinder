"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { Card } from "@/types/card";

type CardSleeveProps = {
  card?: Card;
  isSelected: boolean;
  onSelect: (card: Card) => void;
  onDeselect: () => void;
  onInspect: (card: Card) => void;
};

export default function CardSleeve({
  card,
  isSelected,
  onSelect,
  onDeselect,
  onInspect,
}: CardSleeveProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!card) return;

    if (!isSelected) {
      onSelect(card);
      return;
    }

    // logic for deciding pick up/ inspect or sleeve back
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const isTopHalf = clickY < rect.height / 2;

    if (isTopHalf) {
      onInspect(card);
    } else {
      onDeselect();
    }
  };

  return (
    <div className="relative aspect-[2.5/3.5] w-full">
      {/* sleeve background */}
      <div className="absolute inset-0 rounded-lg border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm" />

      {!card && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg border border-dashed border-white/20 text-xs text-white/30">
          Empty Slot
        </div>
      )}

      {card && (
        <motion.button
          type="button"
          onClick={handleClick}
          className="absolute inset-2 z-10 overflow-hidden rounded-md shadow-lg"
          animate={{
            y: isSelected ? -45 : 0,
            zIndex: isSelected ? 20 : 10,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={card.frontImage}
            alt={`${card.name} card`}
            fill
            sizes="200px"
            className="object-cover"
          />

          {/* top= inspect, bottom=put back */}
          {isSelected && (
            <>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 transition-colors hover:bg-white/10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 transition-colors hover:bg-black/10" />
            </>
          )}
        </motion.button>
      )}

      {/* sleeve overlay on top of the card */}
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-lg">
        <div className="absolute inset-x-0 bottom-0 h-[97%] bg-white/10" />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-lg border border-white/10" />
    </div>
  );
}