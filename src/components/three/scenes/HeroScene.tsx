"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Ring({
  position,
  rotation,
  scale = 1,
  color = "#D64545",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={0.8} floatIntensity={0.6} rotationIntensity={0.3}>
      <Torus ref={ref} args={[1, 0.04, 16, 80]} position={position} rotation={rotation} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} emissive={color} emissiveIntensity={0.4} transparent opacity={0.7} />
      </Torus>
    </Float>
  );
}

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central orb */}
      <Float speed={0.7} floatIntensity={0.8} rotationIntensity={0.5}>
        <Sphere args={[1.6, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#D64545"
            distort={0.4}
            speed={2}
            roughness={0.05}
            metalness={0.3}
            emissive="#D64545"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>

      {/* Satellite orbs */}
      <Float speed={1.2} floatIntensity={1} rotationIntensity={0.6}>
        <Sphere args={[0.6, 32, 32]} position={[3.2, 1.2, -1]}>
          <MeshDistortMaterial color="#E05555" distort={0.3} speed={3} roughness={0.1} metalness={0.2} emissive="#E05555" emissiveIntensity={0.25} transparent opacity={0.8} />
        </Sphere>
      </Float>
      <Float speed={1.5} floatIntensity={1.2} rotationIntensity={0.8}>
        <Sphere args={[0.45, 32, 32]} position={[-3, -1.2, -0.5]}>
          <MeshDistortMaterial color="#8B3232" distort={0.5} speed={4} roughness={0.05} metalness={0.1} emissive="#8B3232" emissiveIntensity={0.3} transparent opacity={0.75} />
        </Sphere>
      </Float>
      <Float speed={0.9} floatIntensity={0.9}>
        <Sphere args={[0.35, 32, 32]} position={[1.8, -2.5, -0.8]}>
          <MeshDistortMaterial color="#D64545" distort={0.4} speed={2.5} roughness={0.1} metalness={0.2} emissive="#D64545" emissiveIntensity={0.3} transparent opacity={0.7} />
        </Sphere>
      </Float>

      {/* Decorative rings */}
      <Ring position={[0, 0, 0]} rotation={[Math.PI / 2.5, 0.3, 0]} scale={3.5} color="#D64545" />
      <Ring position={[0, 0, 0]} rotation={[Math.PI / 3, 1.2, 0.5]} scale={5} color="#E05555" />
      <Ring position={[2, 1, -2]} rotation={[0.5, 0.3, 0.2]} scale={2} color="#D4CAB8" />

      <pointLight position={[0, 3, 3]} intensity={4} color="#D64545" distance={15} />
      <pointLight position={[-4, -2, 2]} intensity={2} color="#F5F5FA" distance={12} />
    </group>
  );
}
