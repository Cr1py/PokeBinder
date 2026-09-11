"use client";
import { motion } from "motion/react";

type BinderCoverProps = {
  onOpen: () => void;
};

export default function BinderCover({ onOpen }: BinderCoverProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="absolute inset-0 overflow-hidden rounded-2xl border border-black/10 bg-pink shadow-2xl"
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
  );
}