"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { addCard, uploadCardImage } from "@/lib/cardService";
import { assignCardToNextSlot } from "@/lib/binderService";

type AddCardProps = {
  onClose: () => void;
  onCardAdded: () => void;
};

export default function AddCard({ onClose, onCardAdded }: AddCardProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!frontFile || !backFile) {
      setError("Please select both a front and back image.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const id = crypto.randomUUID();

      const [frontImage, backImage] = await Promise.all([
        uploadCardImage(frontFile, id, "front"),
        uploadCardImage(backFile, id, "back"),
      ]);

      await addCard({
        id,
        name,
        description,
        date,
        frontImage,
        backImage,
      });

      await assignCardToNextSlot(id);

      onCardAdded();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
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
        <motion.form
          onSubmit={handleSubmit}
          className="max-h-[85vh] w-[min(90vw,420px)] overflow-y-auto rounded-xl bg-grey-dark p-6 shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4 text-lg font-semibold text-white">Add Card</h2>

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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFrontFile(e.target.files?.[0] ?? null)}
              required
              className="mt-1 w-full text-sm text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-pink file:px-3 file:py-1.5 file:text-white"
            />
          </label>

          <label className="mb-4 block text-sm text-white/70">
            Back image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackFile(e.target.files?.[0] ?? null)}
              required
              className="mt-1 w-full text-sm text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-pink file:px-3 file:py-1.5 file:text-white"
            />
          </label>

          {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-md bg-pink px-4 py-2 font-medium text-white transition hover:bg-pink-dark disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Card"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/20 px-4 py-2 text-white/70 transition hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}