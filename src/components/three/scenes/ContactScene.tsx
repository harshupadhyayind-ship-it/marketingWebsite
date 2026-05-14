"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Torus, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function PortalRing({
  radius,
  tubeRadius,
  color,
  speed,
  rotOffset,
}: {
  radius: number;
  tubeRadius: number;
  color: string;
  speed: number;
  rotOffset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * speed + rotOffset;
  });
  return (
    <Torus ref={ref} args={[radius, tubeRadius, 16, 120]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color={color}
        roughness={0}
        metalness={1}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.8}
      />
    </Torus>
  );
}

export default function ContactScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, -100]}>
      {/* Portal rings */}
      <PortalRing radius={3} tubeRadius={0.03} color="#E63327" speed={0.12} rotOffset={0} />
      <PortalRing radius={4} tubeRadius={0.025} color="#FF5349" speed={-0.08} rotOffset={1} />
      <PortalRing radius={5} tubeRadius={0.02} color="#D4CAB8" speed={0.06} rotOffset={2.1} />
      <PortalRing radius={2} tubeRadius={0.04} color="#E63327" speed={-0.18} rotOffset={0.5} />

      {/* Central pulse orb */}
      <Float speed={0.5} floatIntensity={0.6} rotationIntensity={0.2}>
        <Sphere args={[0.8, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#E63327"
            distort={0.5}
            speed={3}
            roughness={0}
            metalness={0.3}
            transparent
            opacity={0.85}
            emissive="#E63327"
            emissiveIntensity={0.4}
          />
        </Sphere>
      </Float>

      {/* Floating accent spheres */}
      <Float speed={1} floatIntensity={1}>
        <Sphere args={[0.2, 16, 16]} position={[3.5, 1, 0.5]}>
          <meshStandardMaterial color="#FF5349" emissive="#FF5349" emissiveIntensity={0.8} />
        </Sphere>
      </Float>
      <Float speed={0.8} floatIntensity={0.8}>
        <Sphere args={[0.15, 16, 16]} position={[-3, -1.5, 0.3]}>
          <meshStandardMaterial color="#E63327" emissive="#E63327" emissiveIntensity={0.8} />
        </Sphere>
      </Float>
      <Float speed={1.2} floatIntensity={1.2}>
        <Sphere args={[0.1, 16, 16]} position={[1, 3, -0.5]}>
          <meshStandardMaterial color="#D4CAB8" emissive="#D4CAB8" emissiveIntensity={0.8} />
        </Sphere>
      </Float>

      <pointLight position={[0, 0, 3]} intensity={4} color="#E63327" distance={20} />
      <pointLight position={[0, 5, 0]} intensity={2} color="#F5F5FA" distance={15} />
    </group>
  );
}
