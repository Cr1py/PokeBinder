"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "@/types/card";

type CardViewerProps = {
  card: Card;
  onClose: () => void;
};

export default function CardViewer({ card, onClose }: CardViewerProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative aspect-[2.5/3.5] w-[min(80vw,400px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={card.frontImage}
            alt={`${card.name} card`}
            fill
            sizes="400px"
            className="rounded-lg object-cover shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}