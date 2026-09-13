"use client";
import { useRef, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Card } from "@/types/card";

type Card3DProps = {
  card: Card;
};

export default function Card3D({ card }: Card3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [frontTexture, backTexture] = useTexture([
    card.frontImage,
    card.backImage,
  ]);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !meshRef.current) return;
    meshRef.current.rotation.y += e.movementX * 0.01;
    meshRef.current.rotation.x += e.movementY * 0.01;
  };

  const cardWidth = 2.5;
  const cardHeight = 3.5;
  const cardThickness = 0.012;

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerUp}
    >
      <boxGeometry args={[cardWidth, cardHeight, cardThickness]} />
      <meshStandardMaterial attach="material-0" visible={false} />
      <meshStandardMaterial attach="material-1" visible={false} />
      <meshStandardMaterial attach="material-2" visible={false} />
      <meshStandardMaterial attach="material-3" visible={false} />
      <meshStandardMaterial
        attach="material-4"
        map={frontTexture}
        transparent
        alphaTest={0.01}
      />
      <meshStandardMaterial
        attach="material-5"
        map={backTexture}
        transparent
        alphaTest={0.01}
      />
    </mesh>
  );
}