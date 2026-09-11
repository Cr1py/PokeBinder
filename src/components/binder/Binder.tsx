"use client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import BinderCover from "./BinderCover";
import BinderPage from "./BinderPage";
import PageController from "./PageController";

const TOTAL_SPREADS = 4;

export default function Binder() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [spread, setSpread] = useState(1);
  const [flipDirection, setFlipDirection] = useState<1 | -1 | null>(null);

  const requestNext = () => {
    if (spread < TOTAL_SPREADS && flipDirection === null) {
      setFlipDirection(1);
    }
  };

  const requestPrev = () => {
    if (spread > 1 && flipDirection === null) {
      setFlipDirection(-1);
    }
  };

  const handleFlipComplete = () => {
    setSpread((s) => s + (flipDirection ?? 0));
    setFlipDirection(null);
  };

  const startOpening = () => {
    setIsOpening(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div
        className="relative transition-[width] duration-700 ease-in-out"
        style={{
          width: isOpen
            ? "min(1966px, 95vw, calc(85vh*(520/350)))"
            : "min(983px, 90vw, calc(85vh*(260/350)))",
          height: "min(1323px, 85vh, calc(90vw*(350/260)))",
          perspective: 2400,
        }}
      >
        <AnimatePresence onExitComplete={() => setIsOpen(true)}>
          {!isOpening && <BinderCover key="cover" onOpen={startOpening} />}
        </AnimatePresence>

        {isOpen && (
          <BinderPage
            spread={spread}
            totalSpreads={TOTAL_SPREADS}
            flipDirection={flipDirection}
            onFlipComplete={handleFlipComplete}
            onRequestNext={requestNext}
            onRequestPrev={requestPrev}
          />
        )}
      </div>
      {isOpen && (
        <PageController
          currentPage={spread}
          totalPages={TOTAL_SPREADS}
          onPrevious={requestPrev}
          onNext={requestNext}
        />
      )}
    </div>
  );
}