import Binder from "@/components/binder/Binder";
import AdminButton from "@/components/admin/AdminButton";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main>
      <Binder />
      <AdminButton />
    </main>
  );
}