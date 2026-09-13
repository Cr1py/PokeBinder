"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "./AuthContext";

type LoginProps = {
  onClose: () => void;
};

export default function Login({ onClose }: LoginProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      onClose();
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
          className="w-[min(90vw,360px)] rounded-xl bg-grey-dark p-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4 text-lg font-semibold text-white">Are you Cr1py???</h2>

          <label className="mb-3 block text-sm text-white/70">
            What's my email?
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-pink"
            />
          </label>

          <label className="mb-4 block text-sm text-white/70">
            What's the magic word?
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-pink"
            />
          </label>

          {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-pink px-4 py-2 font-medium text-white transition"
            >
              {loading ? ":D" : "LET ME IN"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/20 px-4 py-2 text-white/70 transition"
            >
              No, I'm not D:
            </button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}