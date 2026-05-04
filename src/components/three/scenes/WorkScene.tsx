"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const PROJECT_COLORS = [
  "#9CAF88",
  "#C5B99A",
  "#7A9068",
  "#B8A88A",
  "#B8C9A8",
  "#D4CAB8",
];

function ProjectCard({
  index,
  total,
  color,
}: {
  index: number;
  total: number;
  color: string;
}) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 4.5;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const rotY = -angle;

  return (
    <Float speed={0.4 + index * 0.08} floatIntensity={0.4} rotationIntensity={0.08}>
      <group position={[x, (index % 2 === 0 ? 0.6 : -0.6), z - 75]} rotation={[0, rotY, 0]}>
        {/* Card face */}
        <RoundedBox args={[2.4, 1.5, 0.1]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.2}
            depthWrite={false}
          />
        </RoundedBox>
        {/* Card glow border */}
        <RoundedBox args={[2.45, 1.55, 0.06]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.7}
            roughness={0}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </RoundedBox>
        {/* Small accent sphere */}
        <mesh position={[0.8, 0.4, 0.1]} scale={0.12}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function WorkScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {PROJECT_COLORS.map((color, i) => (
        <ProjectCard key={i} index={i} total={PROJECT_COLORS.length} color={color} />
      ))}

      <pointLight position={[0, 4, -75]} intensity={3} color="#9CAF88" distance={20} />
      <pointLight position={[0, -4, -75]} intensity={2} color="#D4CAB8" distance={18} />
      <pointLight position={[4, 0, -72]} intensity={1.5} color="#B8C9A8" distance={15} />
    </group>
  );
}
