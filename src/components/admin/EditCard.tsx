"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { fetchCards, updateCard, uploadCardImage } from "@/lib/cardService";
import { Card } from "@/types/card";

type EditCardProps = {
  onClose: () => void;
  onCardUpdated: () => void;
};

export default function EditCard({ onClose, onCardUpdated }: EditCardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetchCards()
      .then(setCards)
      .catch((err) =>
        setLoadError(err instanceof Error ? err.message : "Failed to load cards.")
      )
      .finally(() => setIsLoading(false));
  }, []);

  const startEditing = (card: Card) => {
    setEditingCard(card);
    setName(card.name);
    setDescription(card.description);
    setDate(card.date);
    setFrontFile(null);
    setBackFile(null);
    setSaveError(null);
  };

  const cancelEditing = () => {
    setEditingCard(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const frontImage = frontFile
        ? await uploadCardImage(frontFile, editingCard.id, "front")
        : editingCard.frontImage;

      const backImage = backFile
        ? await uploadCardImage(backFile, editingCard.id, "back")
        : editingCard.backImage;

      const updated: Card = {
        ...editingCard,
        name,
        description,
        date,
        frontImage,
        backImage,
      };

      await updateCard(updated);

      setCards((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      setEditingCard(null);
      onCardUpdated();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to update card.");
    } finally {
      setIsSaving(false);
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
          {!editingCard && (
            <>
              <h2 className="mb-4 text-lg font-semibold text-white">Edit Card</h2>

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
                        onClick={() => startEditing(card)}
                        className="rounded-md bg-pink/20 px-3 py-1.5 text-xs font-medium text-pink transition hover:bg-pink/30"
                      >
                        Edit
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
            </>
          )}

          {editingCard && (
            <form onSubmit={handleSubmit}>
              <h2 className="mb-4 text-lg font-semibold text-white">
                Edit {editingCard.name}
              </h2>

              <label className="mb-3 block text-sm text-white/70">
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-pink"
                />
              </label>

              <label className="mb-3 block text-sm text-white/70">
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-pink"
                />
              </label>

              <label className="mb-3 block text-sm text-white/70">
                Date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-pink"
                />
              </label>

              <label className="mb-3 block text-sm text-white/70">
                Front image
                <span className="mt-1 block text-xs text-white/40">
                  Leave blank to keep the current image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFrontFile(e.target.files?.[0] ?? null)}
                  className="mt-1 w-full text-sm text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-pink file:px-3 file:py-1.5 file:text-white"
                />
              </label>

              <label className="mb-4 block text-sm text-white/70">
                Back image
                <span className="mt-1 block text-xs text-white/40">
                  Leave blank to keep the current image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBackFile(e.target.files?.[0] ?? null)}
                  className="mt-1 w-full text-sm text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-pink file:px-3 file:py-1.5 file:text-white"
                />
              </label>

              {saveError && <p className="mb-3 text-sm text-red-400">{saveError}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-md bg-pink px-4 py-2 font-medium text-white transition hover:bg-pink-dark disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  disabled={isSaving}
                  className="rounded-md border border-white/20 px-4 py-2 text-white/70 transition hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}