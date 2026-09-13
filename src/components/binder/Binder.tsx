"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import BinderCover from "./BinderCover";
import BinderPage from "./BinderPage";
import PageController from "./PageController";
import CardViewer from "@/components/card/CardViewer";
import { fetchCards } from "@/lib/cardService";
import { fetchBinderPages } from "@/lib/binderService";
import { Card, BinderPageData } from "@/types/card";

export default function Binder() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [spread, setSpread] = useState(1);
  const [flipDirection, setFlipDirection] = useState<1 | -1 | null>(null);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [viewingCard, setViewingCard] = useState<Card | null>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const [binderPages, setBinderPages] = useState<BinderPageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [cardsData, pagesData] = await Promise.all([
        fetchCards(),
        fetchBinderPages(),
      ]);
      setCards(cardsData);
      setBinderPages(pagesData);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load binder data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalSpreads = Math.max(1, Math.ceil(binderPages.length / 2) + 1);

  const requestNext = () => {
    if (spread < totalSpreads && flipDirection === null) {
      setSelectedCardId(null);
      setFlipDirection(1);
    }
  };

  const requestPrev = () => {
    if (spread > 1 && flipDirection === null) {
      setSelectedCardId(null);
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

  const handleSelectCard = (card: Card) => {
    setSelectedCardId(card.id);
  };

  const handleDeselectCard = () => {
    setSelectedCardId(null);
  };

  const handleInspectCard = (card: Card) => {
    setViewingCard(card);
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

        {isOpen && isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-grey-darker text-white/60">
            Loading binder...
          </div>
        )}

        {isOpen && !isLoading && loadError && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-grey-darker px-8 text-center text-red-400">
            {loadError}
          </div>
        )}

        {isOpen && !isLoading && !loadError && (
          <BinderPage
            spread={spread}
            totalSpreads={totalSpreads}
            flipDirection={flipDirection}
            onFlipComplete={handleFlipComplete}
            onRequestNext={requestNext}
            onRequestPrev={requestPrev}
            selectedCardId={selectedCardId}
            onSelectCard={handleSelectCard}
            onDeselectCard={handleDeselectCard}
            onInspectCard={handleInspectCard}
            cards={cards}
            binderPages={binderPages}
          />
        )}
      </div>

      {isOpen && (
        <PageController
          currentPage={spread}
          totalPages={totalSpreads}
          onPrevious={requestPrev}
          onNext={requestNext}
        />
      )}

      {viewingCard && (
        <CardViewer card={viewingCard} onClose={() => setViewingCard(null)} />
      )}
    </div>
  );
}