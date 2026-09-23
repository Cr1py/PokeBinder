"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { fetchCards, deleteCard } from "@/lib/cardService";
import { Card } from "@/types/card";

type DeleteCardProps = {
  onClose: () => void;
  onCardDeleted: () => void;
};

export default function DeleteCard({ onClose, onCardDeleted }: DeleteCardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [pendingCard, setPendingCard] = useState<Card | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    fetchCards()
      .then(setCards)
      .catch((err) =>
        setLoadError(err instanceof Error ? err.message : "Failed to load cards.")
      )
      .finally(() => setIsLoading(false));
  }, []);

  const handleConfirmDelete = async () => {
    if (!pendingCard) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteCard(pendingCard);
      setCards((prev) => prev.filter((c) => c.id !== pendingCard.id));
      setPendingCard(null);
      onCardDeleted();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete card.");
    } finally {
      setIsDeleting(false);
    }
  };

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
          className="max-h-[85vh] w-[min(90vw,420px)] overflow-y-auto rounded-xl bg-grey-dark p-6 shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4 text-lg font-semibold text-white">Delete Card</h2>

          {isLoading && <p className="text-sm text-white/60">Loading cards...</p>}

          {!isLoading && loadError && (
            <p className="text-sm text-red-400">{loadError}</p>
          )}

          {!isLoading && !loadError && cards.length === 0 && (
            <p className="text-sm text-white/60">No cards in the binder yet.</p>
          )}

          {!isLoading && !loadError && cards.length > 0 && (
            <ul className="flex flex-col gap-2">
              {cards.map((card) => (
                <li
                  key={card.id}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-2"
                >
                  <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded bg-white">
                    <Image
                      src={card.frontImage}
                      alt={`${card.name} card`}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>

                  <span className="flex-1 truncate text-sm text-white">
                    {card.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPendingCard(card)}
                    className="rounded-md bg-red-500/20 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/30"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-md border border-white/20 px-4 py-2 text-white/70 transition hover:bg-white/5"
          >
            Close
          </button>
        </motion.div>

        {pendingCard && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-[min(90vw,340px)] rounded-xl bg-grey-dark p-6 text-center shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-1 text-white">
                Delete <span className="font-semibold">{pendingCard.name}</span>?
              </p>
              <p className="mb-4 text-sm text-white/60">
                This removes the card and its images permanently.
              </p>

              {deleteError && (
                <p className="mb-3 text-sm text-red-400">{deleteError}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 rounded-md bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="button"
                  onClick={() => setPendingCard(null)}
                  disabled={isDeleting}
                  className="rounded-md border border-white/20 px-4 py-2 text-white/70 transition hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}