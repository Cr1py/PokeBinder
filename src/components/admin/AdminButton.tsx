"use client";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import { MdCatchingPokemon, MdOutlineAdd, MdOutlineDelete } from "react-icons/md";
import AddCard from "./AddCard";
import DeleteCard from "./DeleteCard";

type AdminButtonProps = {
  onCardAdded: () => void;
  onCardDeleted: () => void;
};

export default function AdminButton({ onCardAdded, onCardDeleted }: AdminButtonProps) {
  const { isAdmin, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex gap-2">
        {isAdmin && (
          <>
            <button
              type="button"
              onClick={() => setShowAddCard(true)}
              className="rounded-full bg-grey-dark p-3 text-white/60 shadow-lg transition hover:bg-grey hover:text-white"
              aria-label="Add card"
              title="Add card"
            >
              <MdOutlineAdd className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteCard(true)}
              className="rounded-full bg-grey-dark p-3 text-white/60 shadow-lg transition hover:bg-grey hover:text-white"
              aria-label="Delete card"
              title="Delete card"
            >
              <MdOutlineDelete className="h-5 w-5" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => (isAdmin ? signOut() : setShowLogin(true))}
          className="rounded-full bg-grey-dark p-3 text-white/60 shadow-lg transition hover:bg-grey hover:text-white"
          aria-label={isAdmin ? "Sign out of admin mode" : "Admin login"}
          title={isAdmin ? "Sign out" : "Admin login"}
        >
          {isAdmin ? <MdCatchingPokemon className="h-5 w-5" color="red" /> : <MdCatchingPokemon className="h-5 w-5" color="black" />}
        </button>
      </div>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showAddCard && (
        <AddCard onClose={() => setShowAddCard(false)} onCardAdded={onCardAdded} />
      )}
      {showDeleteCard && (
        <DeleteCard onClose={() => setShowDeleteCard(false)} onCardDeleted={onCardDeleted} />
      )}
    </>
  );
}