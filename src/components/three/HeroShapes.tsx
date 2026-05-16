"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroShapes() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F5EFE6");

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 18);

    /* ── Lights ── */
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    /* ── Triangulated grid background ── */
    const triGridPts: number[] = [];
    const COLS = 12, ROWS = 7;
    const GW = 28, GH = 18;
    for (let row = 0; row <= ROWS; row++) {
      for (let col = 0; col <= COLS; col++) {
        const x = -GW / 2 + (col / COLS) * GW;
        const y = -GH / 2 + (row / ROWS) * GH;
        // Horizontal lines
        if (col < COLS) triGridPts.push(x, y, -3, x + (GW / COLS), y, -3);
        // Vertical lines
        if (row < ROWS) triGridPts.push(x, y, -3, x, y + (GH / ROWS), -3);
        // Diagonal (triangle subdivision)
        if (col < COLS && row < ROWS) {
          triGridPts.push(x, y, -3, x + (GW / COLS), y + (GH / ROWS), -3);
        }
      }
    }
    const triGridGeo = new THREE.BufferGeometry();
    triGridGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(triGridPts), 3));
    const triGridMat = new THREE.LineBasicMaterial({
      color: 0x6B4F3A,
      transparent: true,
      opacity: 0.12,
    });
    const triGrid = new THREE.LineSegments(triGridGeo, triGridMat);
    scene.add(triGrid);

    /* ── 150 Particles ── */
    const PARTICLE_COUNT = 150;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = -5 + Math.random() * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      color: 0xD64545,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(particleGeo, particleMat);
    scene.add(points);

    /* ── Network lines (pre-computed once) ── */
    const lineVerts: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i * 3]     - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 5.0) {
          lineVerts.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    let lines: THREE.LineSegments | null = null;
    if (lineVerts.length > 0) {
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xD64545,
        transparent: true,
        opacity: 0.08,
      });
      lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);
    }

    /* ── Central rotating tetrahedron ── */
    const centralGeo = new THREE.TetrahedronGeometry(2.2, 1);
    const centralMat = new THREE.MeshBasicMaterial({
      color: 0xD64545,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const central = new THREE.Mesh(centralGeo, centralMat);
    scene.add(central);

    /* ── Floating UI cards ── */
    const CARDS = [
      { x: -6, y: 2, z: -1, w: 3.2, h: 1.8, color: 0x6B4F3A },
      { x: 5, y: -1.5, z: -2, w: 2.6, h: 1.5, color: 0xD64545 },
      { x: -4, y: -2.5, z: -3, w: 2.2, h: 1.3, color: 0x8B6550 },
      { x: 7, y: 1.5, z: -4, w: 3.0, h: 1.6, color: 0x6B4F3A },
    ];
    const cards: THREE.Mesh[] = [];
    const cardPhases: number[] = [];
    const cardEdges: THREE.LineSegments[] = [];

    CARDS.forEach(({ x, y, z, w, h, color }) => {
      const geo = new THREE.BoxGeometry(w, h, 0.04);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.z = (Math.random() - 0.5) * 0.15;
      mesh.rotation.x = (Math.random() - 0.5) * 0.1;
      scene.add(mesh);
      cards.push(mesh);
      cardPhases.push(Math.random() * Math.PI * 2);

      // Card border/edge wireframe
      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      edges.position.copy(mesh.position);
      edges.rotation.copy(mesh.rotation);
      scene.add(edges);
      cardEdges.push(edges);
    });

    /* ── Mouse parallax ── */
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    /* ── Resize ── */
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    /* ── Animation loop ── */
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Central tetrahedron rotation
      central.rotation.y += 0.005;
      central.rotation.x += 0.003;

      // Floating cards bob
      cards.forEach((card, i) => {
        card.position.y += Math.sin(t * 0.5 + cardPhases[i]) * 0.003;
        // Keep edges in sync
        cardEdges[i].position.copy(card.position);
      });

      // Camera mouse parallax: drifts ±1.5 on X, ±1.0 on Y
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      triGridGeo.dispose();
      triGridMat.dispose();

      particleGeo.dispose();
      particleMat.dispose();

      if (lines) {
        lines.geometry.dispose();
        (lines.material as THREE.Material).dispose();
      }

      centralGeo.dispose();
      centralMat.dispose();

      cards.forEach((card) => {
        card.geometry.dispose();
        (card.material as THREE.Material).dispose();
      });

      cardEdges.forEach((edge) => {
        edge.geometry.dispose();
        (edge.material as THREE.Material).dispose();
      });

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
