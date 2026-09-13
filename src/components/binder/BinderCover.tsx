"use client";
import { motion } from "motion/react";
import PageContent from "./PageContent";
import { Card, BinderPageData } from "@/types/card";

type BinderCoverProps = {
  onOpen: () => void;
  cards: Card[];
  binderPages: BinderPageData[];
  selectedCardId: string | null;
  onSelectCard: (card: Card) => void;
  onDeselectCard: () => void;
  onInspectCard: (card: Card) => void;
};

export default function BinderCover({
  onOpen,
  cards,
  binderPages,
  selectedCardId,
  onSelectCard,
  onDeselectCard,
  onInspectCard,
}: BinderCoverProps) {
  console.log("BinderCover received:", { cards, binderPages });
  return (
    <div className="absolute inset-0">
      {/* binder inside so it don't look weird */}
      <div className="absolute inset-0 z-0 rounded-2xl bg-grey-darker p-8 shadow-2xl">
        <PageContent
          pageNum={1}
          cards={cards}
          binderPages={binderPages}
          selectedCardId={selectedCardId}
          onSelectCard={onSelectCard}
          onDeselectCard={onDeselectCard}
          onInspectCard={onInspectCard}
        />
      </div>

      {/* cover page */}
      <motion.button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-40 overflow-hidden rounded-2xl border border-black/10 bg-pink shadow-2xl"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        initial={{ rotateY: 0, opacity: 1 }}
        exit={{
          rotateY: -115,
          opacity: 0,
          transition: {
            rotateY: { duration: 0.7, ease: [0.45, 0, 0.55, 1] },
            opacity: { duration: 0.3, delay: 0.4 },
          },
        }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 4px)",
          transformOrigin: "0% 50%",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="pointer-events-none absolute inset-3 rounded-xl border-2 border-dashed border-black/10" />
        <div className="absolute left-0 top-0 h-full w-10 border-r border-black/10 bg-pink-dark/60" />
        <div className="absolute bottom-10 left-14 text-left">
          <h1
            className="text-3xl font-extrabold tracking-tight text-pink-darker"
            style={{
              textShadow:
                "1px 1px 0px rgba(255,255,255,0.35), -1px -1px 0px rgba(0,0,0,0.15)",
            }}
          >
            cr1pyx
          </h1>
          <p className="mt-2 text-sm font-medium text-pink-darker/70">
            click to open
          </p>
        </div>
      </motion.button>
    </div>
  );
}