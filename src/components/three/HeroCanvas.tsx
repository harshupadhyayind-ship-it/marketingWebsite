"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, Sphere, Torus, Box } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Individual 3D objects ---------- */

function FloatingOrb({
  position,
  scale = 1,
  speed = 1,
  color = "#D64545",
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus({
  position,
  rotation,
  scale = 1,
  speed = 1,
  color = "#E05555",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <Torus
        ref={ref}
        args={[1, 0.3, 32, 64]}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.6}
          transparent
          opacity={0.75}
        />
      </Torus>
    </Float>
  );
}

function FloatingCube({
  position,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.4 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1.5}>
      <Box ref={ref} args={[1, 1, 1]} position={position} scale={scale}>
        <meshStandardMaterial
          color="#D4CAB8"
          roughness={0.05}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Box>
    </Float>
  );
}

/* ---------- Particle field ---------- */
function Particles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [positions];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#D64545" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ---------- Scene ---------- */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Main central orb */}
      <FloatingOrb position={[0, 0, 0]} scale={1.8} speed={0.8} color="#D64545" />

      {/* Orbiting elements */}
      <FloatingOrb position={[3.5, 1.5, -1]} scale={0.7} speed={1.4} color="#E05555" />
      <FloatingOrb position={[-3.2, -1, -2]} scale={0.9} speed={1.1} color="#8B3232" />
      <FloatingOrb position={[1.5, -2.8, -1]} scale={0.5} speed={1.8} color="#D64545" />

      {/* Tori */}
      <FloatingTorus position={[3, -2, 0]} scale={0.6} speed={0.9} color="#D64545" />
      <FloatingTorus position={[-2.5, 2, -1]} rotation={[Math.PI / 4, 0, 0]} scale={0.5} speed={1.3} color="#D4CAB8" />
      <FloatingTorus position={[0, 3, -3]} rotation={[0, Math.PI / 4, 0]} scale={0.8} speed={0.7} color="#E05555" />

      {/* Cubes */}
      <FloatingCube position={[-4, 0.5, -2]} scale={0.45} speed={0.8} />
      <FloatingCube position={[4.5, -0.5, -3]} scale={0.35} speed={1.2} />
      <FloatingCube position={[1, 3.5, -2]} scale={0.3} speed={1.5} />

      {/* Particles */}
      <Particles count={150} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#F5F5FA" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#D64545" />
      <pointLight position={[5, 5, -5]} intensity={0.6} color="#E05555" />
      <Environment preset="forest" />
    </group>
  );
}

/* ---------- Export ---------- */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
