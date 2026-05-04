"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Torus } from "@react-three/drei";
import * as THREE from "three";

const SERVICE_COLORS = [
  "#9CAF88",
  "#B8C9A8",
  "#7A9068",
  "#D4CAB8",
  "#A89888",
  "#C5B99A",
];

function ServicePanel({
  index,
  total,
  color,
}: {
  index: number;
  total: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const angle = ((index / total) * Math.PI) - Math.PI / 2;
  const radius = 5;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius * 0.4;
  const rotY = -angle + Math.PI / 2;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = rotY + Math.sin(clock.elapsedTime * 0.3 + index) * 0.04;
  });

  return (
    <Float speed={0.5 + index * 0.1} floatIntensity={0.3} rotationIntensity={0.05}>
      <group ref={ref} position={[x, (index % 2 === 0 ? 0.4 : -0.4), z]}>
        <RoundedBox args={[1.8, 2.4, 0.08]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.25}
            roughness={0.05}
            metalness={0.15}
            depthWrite={false}
          />
        </RoundedBox>
        {/* Glowing edge */}
        <RoundedBox args={[1.85, 2.45, 0.04]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.6}
            roughness={0}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </RoundedBox>
      </group>
    </Float>
  );
}

export default function ServicesScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.07) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      {SERVICE_COLORS.map((color, i) => (
        <ServicePanel key={i} index={i} total={SERVICE_COLORS.length} color={color} />
      ))}

      {/* Central accent */}
      <Float speed={0.4} floatIntensity={0.3}>
        <Torus args={[2, 0.03, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#9CAF88" roughness={0} metalness={1} emissive="#9CAF88" emissiveIntensity={0.5} transparent opacity={0.6} />
        </Torus>
      </Float>

      <pointLight position={[0, 5, 3]} intensity={3} color="#9CAF88" distance={18} />
      <pointLight position={[0, -5, 3]} intensity={2} color="#B8C9A8" distance={15} />
      <pointLight position={[5, 0, 3]} intensity={1.5} color="#F5F1E8" distance={12} />
    </group>
  );
}
