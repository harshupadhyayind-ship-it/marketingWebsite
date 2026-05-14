"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type ShapeType = "icosahedron" | "torusKnot" | "octahedron" | "torus" | "tetrahedron" | "box";

const SHAPES: {
  type: ShapeType;
  position: [number, number, number];
  distort: number;
  floatSpeed: number;
  color: string;
  opacity: number;
}[] = [
  { type: "icosahedron", position: [-5.2,  2.5, -1], distort: 0.45, floatSpeed: 1.4, color: "#E63327", opacity: 0.55 },
  { type: "torusKnot",   position: [ 4.8,  2.0, -2], distort: 0.30, floatSpeed: 2.0, color: "#FF5349", opacity: 0.50 },
  { type: "octahedron",  position: [-4.2, -2.5, -1], distort: 0.50, floatSpeed: 1.2, color: "#B5261B", opacity: 0.55 },
  { type: "torus",       position: [ 4.2, -2.0, -2], distort: 0.35, floatSpeed: 1.8, color: "#E63327", opacity: 0.50 },
  { type: "tetrahedron", position: [ 0.5,  3.8, -3], distort: 0.45, floatSpeed: 2.2, color: "#FF5349", opacity: 0.45 },
  { type: "box",         position: [-0.5, -3.8, -2], distort: 0.40, floatSpeed: 1.6, color: "#E63327", opacity: 0.50 },
];

function DistortShape({
  type, distort, color, opacity,
}: Pick<(typeof SHAPES)[0], "type" | "distort" | "color" | "opacity">) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.15;
    ref.current.rotation.y = clock.elapsedTime * 0.22;
  });

  return (
    <mesh ref={ref}>
      {type === "icosahedron" && <icosahedronGeometry args={[1.1, 2]} />}
      {type === "torusKnot"   && <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />}
      {type === "octahedron"  && <octahedronGeometry args={[1.2, 0]} />}
      {type === "torus"       && <torusGeometry args={[0.85, 0.35, 12, 24]} />}
      {type === "tetrahedron" && <tetrahedronGeometry args={[1.2, 0]} />}
      {type === "box"         && <boxGeometry args={[1.3, 1.3, 1.3]} />}
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={3}
        roughness={0.1}
        metalness={0.9}
        wireframe
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 1.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ServicesCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <CameraRig />
      <Stars radius={40} depth={20} count={1200} factor={1.5} saturation={0} fade speed={0.3} />

      {SHAPES.map((s, i) => (
        <Float key={i} speed={s.floatSpeed} rotationIntensity={0.4} floatIntensity={1.4} position={s.position}>
          <DistortShape type={s.type} distort={s.distort} color={s.color} opacity={s.opacity} />
        </Float>
      ))}
    </Canvas>
  );
}
