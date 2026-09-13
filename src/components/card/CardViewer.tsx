"use client";
import { motion, AnimatePresence } from "motion/react";
import { Canvas} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Card } from "@/types/card";
import Card3D from "./Card3D";

type CardViewerProps = {
  card: Card;
  onClose: () => void;
};

export default function CardViewer({ card, onClose }: CardViewerProps) {
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
          className="relative aspect-[2.5/3.5] w-[min(80vw,400px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-screen w-full">
            <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Card3D card={card}/>
              <OrbitControls enablePan={false} />
            </Canvas>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}