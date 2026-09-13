"use client";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import { MdCatchingPokemon,  } from "react-icons/md";

export default function AdminButton() {
  const { isAdmin, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => (isAdmin ? signOut() : setShowLogin(true))}
        className="fixed bottom-4 right-4 z-40 rounded-full p-3 text-white/60 transition hover:bg-grey"
        aria-label={isAdmin ? "Sign out of admin mode" : "Admin login"}
        title={isAdmin ? "Sign out" : "Admin login"}
      >
        {isAdmin ? <MdCatchingPokemon className="h-5 w-5" color="red"/> : <MdCatchingPokemon className="h-5 w-5" color="black"/>}
      </button>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
}