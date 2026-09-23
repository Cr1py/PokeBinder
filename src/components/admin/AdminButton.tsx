"use client";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import { MdCatchingPokemon, MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import AddCard from "./AddCard";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";

type AdminButtonProps = {
  onCardAdded: () => void;
  onCardDeleted: () => void;
  onCardUpdated: () => void;
};

export default function AdminButton({
  onCardAdded,
  onCardDeleted,
  onCardUpdated,
}: AdminButtonProps) {
  const { isAdmin, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);

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
              onClick={() => setShowEditCard(true)}
              className="rounded-full bg-grey-dark p-3 text-white/60 shadow-lg transition hover:bg-grey hover:text-white"
              aria-label="Edit card"
              title="Edit card"
            >
              <MdOutlineEdit className="h-5 w-5" />
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
      {showEditCard && (
        <EditCard onClose={() => setShowEditCard(false)} onCardUpdated={onCardUpdated} />
      )}
      {showDeleteCard && (
        <DeleteCard onClose={() => setShowDeleteCard(false)} onCardDeleted={onCardDeleted} />
      )}
    </>
  );
}