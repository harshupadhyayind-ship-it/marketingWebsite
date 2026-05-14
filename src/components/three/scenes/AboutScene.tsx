"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function GlassPanel({
  position,
  rotation,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={0.6} floatIntensity={0.4} rotationIntensity={0.1}>
      <group position={position} rotation={rotation}>
        {/* Panel face */}
        <RoundedBox args={[2.2, 3, 0.06]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.18}
            roughness={0.05}
            metalness={0.1}
            depthWrite={false}
          />
        </RoundedBox>
        {/* Panel border */}
        <RoundedBox args={[2.2, 3, 0.02]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.5}
            roughness={0}
            metalness={0.6}
            wireframe
          />
        </RoundedBox>
      </group>
    </Float>
  );
}

function FloatingSphere({
  position,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.3 * speed;
    ref.current.rotation.y = clock.elapsedTime * 0.2 * speed;
  });
  return (
    <Float speed={speed} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} wireframe />
      </mesh>
    </Float>
  );
}

export default function AboutScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0, -25]}>
      {/* Three glass panels */}
      <GlassPanel position={[-3.2, 0, 0]} rotation={[0, 0.35, 0]} color="#E63327" />
      <GlassPanel position={[0, 0, 0.5]} rotation={[0, 0, 0]} color="#FF5349" />
      <GlassPanel position={[3.2, 0, 0]} rotation={[0, -0.35, 0]} color="#D4CAB8" />

      {/* Floating geometric accents */}
      <FloatingSphere position={[-5, 2.5, 1]} scale={0.4} color="#E63327" speed={0.8} />
      <FloatingSphere position={[5, -2, 0.5]} scale={0.35} color="#FF5349" speed={1.2} />
      <FloatingSphere position={[0, 3, -1]} scale={0.3} color="#D4CAB8" speed={1} />
      <FloatingSphere position={[-1.5, -3, 1]} scale={0.25} color="#E63327" speed={1.4} />

      <pointLight position={[0, 4, 4]} intensity={2.5} color="#E63327" distance={15} />
      <pointLight position={[0, -4, 3]} intensity={1.5} color="#F5F5FA" distance={12} />
    </group>
  );
}
