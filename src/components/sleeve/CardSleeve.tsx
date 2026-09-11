"use client";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Card } from "@/types/card";

type CardSleeveProps = {
  card?: Card;
  onCardClick?: (card: Card) => void;
};

export default function CardSleeve({ card, onCardClick }: CardSleeveProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (!card) return;
    setIsSelected((prev) => !prev);
    onCardClick?.(card);
  };

  return (
    <div className="relative aspect-[2.5/3.5] w-full">
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
        </motion.button>
      )}

      {/* sleeve */}
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-lg">
        <div className="absolute inset-x-0 bottom-0 h-[97%] bg-white/10" />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-lg border border-white/10" />
    </div>
  );
}