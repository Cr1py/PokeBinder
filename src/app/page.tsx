"use client";
import { useState, useCallback } from "react";
import Binder from "@/components/binder/Binder";
import AdminButton from "@/components/admin/AdminButton";


export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCardAdded = useCallback(() => {
    setRefreshKey((k) => k + 1); 
  }, []);
  
  return (
    <div>
      <title>Cr1py's Poke Binder</title>
      <main>
        <Binder key={refreshKey} />
        <AdminButton onCardAdded={handleCardAdded} />
      </main>
    </div>

  );
}