"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Line } from "@react-three/drei";
import * as THREE from "three";

const STRAND_COUNT = 30;
const HELIX_RADIUS  = 1.8;
const HELIX_HEIGHT  = 11;
const HELIX_TURNS   = 2.5;

function useHelixPoints(phaseOffset = 0) {
  return useMemo(
    () =>
      Array.from({ length: STRAND_COUNT }, (_, i) => {
        const t     = i / (STRAND_COUNT - 1);
        const angle = t * Math.PI * 2 * HELIX_TURNS + phaseOffset;
        return new THREE.Vector3(
          Math.cos(angle) * HELIX_RADIUS,
          t * HELIX_HEIGHT - HELIX_HEIGHT / 2,
          Math.sin(angle) * HELIX_RADIUS,
        );
      }),
    [phaseOffset],
  );
}

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const strand1  = useHelixPoints(0);
  const strand2  = useHelixPoints(Math.PI);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.22;
  });

  /* Rung pairs — every other node */
  const rungs = useMemo(
    () => strand1.filter((_, i) => i % 2 === 0).map((p1, k) => [p1, strand2[k * 2]]),
    [strand1, strand2],
  );

  return (
    <group ref={groupRef}>
      {/* Strand lines */}
      <Line points={strand1} color="#E63327" lineWidth={2}  transparent opacity={0.65} />
      <Line points={strand2} color="#FF5349" lineWidth={2}  transparent opacity={0.65} />

      {/* Rung cross-links */}
      {rungs.map((pair, i) => (
        <Line key={i} points={pair as THREE.Vector3[]} color="#E6332755" lineWidth={0.7} transparent opacity={0.3} />
      ))}

      {/* Strand 1 nodes */}
      {strand1.map((pos, i) => (
        <mesh key={`a${i}`} position={pos}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#E63327" emissive="#E63327" emissiveIntensity={1.2} roughness={0.1} metalness={0.4} />
        </mesh>
      ))}

      {/* Strand 2 nodes */}
      {strand2.map((pos, i) => (
        <mesh key={`b${i}`} position={pos}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#FF5349" emissive="#FF5349" emissiveIntensity={1.2} roughness={0.1} metalness={0.4} />
        </mesh>
      ))}

      {/* Rung endpoint accents */}
      {rungs.map((pair, i) => (
        <mesh key={`rr${i}`} position={(pair[1] as THREE.Vector3)}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#F5F5FA" emissive="#F5F5FA" emissiveIntensity={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 1 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function AboutCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <CameraRig />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]}   color="#E63327" intensity={4} distance={20} />
      <pointLight position={[-5, -5, 5]} color="#F5F5FA" intensity={2} distance={18} />
      <Stars radius={40} depth={20} count={900} factor={1.5} saturation={0} fade speed={0.25} />
      <DNAHelix />
    </Canvas>
  );
}
