"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const RING_COUNT = 32;
const SPACING    = 1.4;
const TOTAL_DEPTH = RING_COUNT * SPACING;
const NEAR_PLANE  = 3.5;
const SPEED       = 0.55;

function WormholeTunnel() {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const matRefs  = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame((_, delta) => {
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;

      // Fly forward
      mesh.position.z += delta * SPEED;
      mesh.rotation.z  += delta * (0.03 + (i % 3) * 0.01);

      // Teleport ring back when it passes camera
      if (mesh.position.z > NEAR_PLANE) {
        mesh.position.z -= TOTAL_DEPTH;
      }

      // Fade opacity by depth
      const mat = matRefs.current[i];
      if (mat) {
        const depth = -mesh.position.z; // positive = farther away
        mat.opacity = THREE.MathUtils.clamp(depth / (TOTAL_DEPTH * 0.8) * 0.55, 0.03, 0.55);
      }
    });
  });

  const colors = ["#D64545", "#E05555", "#8B3232"];

  return (
    <group>
      {Array.from({ length: RING_COUNT }, (_, i) => {
        const initZ  = -i * SPACING;
        const radius = 2.3 + Math.sin(i * 0.4) * 0.2;
        const color  = colors[i % 3];

        return (
          <mesh
            key={i}
            ref={(el) => { if (el) meshRefs.current[i] = el; }}
            position={[0, 0, initZ]}
            rotation={[0, 0, i * 0.18]}
          >
            <torusGeometry args={[radius, 0.013, 8, 90]} />
            <meshBasicMaterial
              ref={(el) => { if (el) matRefs.current[i] = el; }}
              color={color}
              transparent
              opacity={0.5 - (i / RING_COUNT) * 0.45}
            />
          </mesh>
        );
      })}

      {/* Central glowing orb at the vanishing point */}
      <mesh position={[0, 0, -TOTAL_DEPTH]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#D64545" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* Floating accent particles orbiting the tunnel mouth */
function AccentOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = clock.elapsedTime * 0.12;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const r = 2.6 + (i % 3) * 0.4;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.6, 0]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#D64545" transparent opacity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 0.9 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, -10);
  });
  return null;
}

export default function ContactCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 72 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <CameraRig />
      <Stars radius={30} depth={10} count={600} factor={1.2} saturation={0} fade speed={0.2} />
      <WormholeTunnel />
      <AccentOrbs />
    </Canvas>
  );
}
