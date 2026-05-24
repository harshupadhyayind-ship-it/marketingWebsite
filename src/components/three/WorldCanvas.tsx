"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WorldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0D0F1C");
    scene.fog = new THREE.Fog(0x0d0f1c, 60, 200);

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 500);
    camera.position.set(0, 26, 70);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // ── Ground grid (main) ───────────────────────────────────────────────
    const GRID_W = 60, GRID_D = 80, GRID_STEP = 4;
    const gridPts: number[] = [];

    for (let x = -GRID_W / 2; x <= GRID_W / 2; x += GRID_STEP) {
      gridPts.push(x, 0, -GRID_D / 2, x, 0, GRID_D / 2);
    }
    for (let z = -GRID_D / 2; z <= GRID_D / 2; z += GRID_STEP) {
      gridPts.push(-GRID_W / 2, 0, z, GRID_W / 2, 0, z);
    }

    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(gridPts), 3));
    const gridMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D64545"),
      transparent: true,
      opacity: 0.18,
    });
    const grid = new THREE.LineSegments(gridGeo, gridMat);
    grid.position.y = -8;
    scene.add(grid);

    // ── Inner fine grid (half step) ─────────────────────────────────────
    const fineGridPts: number[] = [];
    const FINE_STEP = GRID_STEP / 2;
    for (let x = -GRID_W / 2; x <= GRID_W / 2; x += FINE_STEP) {
      fineGridPts.push(x, 0, -GRID_D / 2, x, 0, GRID_D / 2);
    }
    for (let z = -GRID_D / 2; z <= GRID_D / 2; z += FINE_STEP) {
      fineGridPts.push(-GRID_W / 2, 0, z, GRID_W / 2, 0, z);
    }
    const fineGridGeo = new THREE.BufferGeometry();
    fineGridGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(fineGridPts), 3));
    const fineGridMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D64545"),
      transparent: true,
      opacity: 0.07,
    });
    const fineGrid = new THREE.LineSegments(fineGridGeo, fineGridMat);
    fineGrid.position.y = -8;
    scene.add(fineGrid);

    // ── Triangulated diagonal grid ──────────────────────────────────────
    const triPts: number[] = [];
    for (let x = -GRID_W / 2; x < GRID_W / 2; x += GRID_STEP) {
      for (let z = -GRID_D / 2; z < GRID_D / 2; z += GRID_STEP) {
        triPts.push(x, 0, z, x + GRID_STEP, 0, z + GRID_STEP); // diagonal
      }
    }
    const triGeo = new THREE.BufferGeometry();
    triGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(triPts), 3));
    const triMat = new THREE.LineBasicMaterial({ color: new THREE.Color("#D64545"), transparent: true, opacity: 0.04 });
    const triLines = new THREE.LineSegments(triGeo, triMat);
    triLines.position.y = -8;
    scene.add(triLines);

    // ── Rising bar chart — 3D performance bars ─────────────────────────
    const BAR_DATA = [14, 28, 22, 48, 38, 62, 52, 76, 68, 92];
    const bars: THREE.Mesh[] = [];
    const barCaps: THREE.Mesh[] = [];
    const barTargetH: number[] = [];
    const barMats: THREE.MeshStandardMaterial[] = [];
    const capMats: THREE.MeshStandardMaterial[] = [];

    BAR_DATA.forEach((pct, i) => {
      const maxH = (pct / 100) * 18 * 1.3;
      barTargetH.push(maxH);

      const isLast = i === BAR_DATA.length - 1;
      const mat = new THREE.MeshStandardMaterial({
        color:    new THREE.Color(isLast ? "#D64545" : "#A03030"),
        emissive: new THREE.Color(isLast ? "#D64545" : "#A03030"),
        emissiveIntensity: isLast ? 0.6 : 0.2,
        transparent: true,
        opacity: 0,
        roughness: 0.3,
        metalness: 0.1,
      });
      barMats.push(mat);

      const geo = new THREE.BoxGeometry(2.8, 1, 2.8);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.y = 0.001;
      mesh.position.set((i - (BAR_DATA.length - 1) / 2) * 3.2, -8, 0);
      mesh.castShadow = true;
      bars.push(mesh);
      scene.add(mesh);

      // Glow cap on top of each bar
      const capMat = new THREE.MeshStandardMaterial({
        color:    new THREE.Color(isLast ? "#D64545" : "#A03030"),
        emissive: new THREE.Color(isLast ? "#D64545" : "#A03030"),
        emissiveIntensity: 2.0,
        transparent: true,
        opacity: 0,
        roughness: 0.1,
        metalness: 0.3,
      });
      capMats.push(capMat);
      const capGeo = new THREE.BoxGeometry(2.9, 0.15, 2.9);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.scale.y = 0.001;
      cap.position.set((i - (BAR_DATA.length - 1) / 2) * 3.2, -8, 0);
      barCaps.push(cap);
      scene.add(cap);
    });

    // ── Rising accent lines (vertical) ───────────────────────────────
    const VLINE_COUNT = 30;
    const vlinePts: number[] = [];
    for (let i = 0; i < VLINE_COUNT; i++) {
      const x = (Math.random() - 0.5) * GRID_W * 0.9;
      const z = (Math.random() - 0.5) * 40;
      const h = 2 + Math.random() * 16;
      vlinePts.push(x, -8, z, x, -8 + h, z);
    }
    const vlineGeo = new THREE.BufferGeometry();
    vlineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vlinePts), 3));
    const vlineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D64545"),
      transparent: true,
      opacity: 0,
    });
    const vlines = new THREE.LineSegments(vlineGeo, vlineMat);
    scene.add(vlines);

    // ── Growth curves ─────────────────────────────────────────────────
    // Curve 1 (main)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-28, -6, 0),
      new THREE.Vector3(-18, -4, 0),
      new THREE.Vector3(-8,  -1, 0),
      new THREE.Vector3( 0,   3, 0),
      new THREE.Vector3( 10,  6, 0),
      new THREE.Vector3( 20, 10, 0),
      new THREE.Vector3( 28, 14, 0),
    ]);
    const curvePts = curve.getPoints(120);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
    const curveMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D64545"),
      transparent: true,
      opacity: 0,
    });
    const curveLine = new THREE.Line(curveGeo, curveMat);
    scene.add(curveLine);

    // Curve 2 — behind and fainter
    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-28, -8, -6),
      new THREE.Vector3(-16, -6, -6),
      new THREE.Vector3( -4, -2, -6),
      new THREE.Vector3(  8,  2, -6),
      new THREE.Vector3( 20,  7, -6),
      new THREE.Vector3( 28, 10, -6),
    ]);
    const curve2Pts = curve2.getPoints(100);
    const curve2Geo = new THREE.BufferGeometry().setFromPoints(curve2Pts);
    const curve2Mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D64545"),
      transparent: true,
      opacity: 0,
    });
    const curveLine2 = new THREE.Line(curve2Geo, curve2Mat);
    scene.add(curveLine2);

    // Curve 3 — highlight, slightly in front (z=4), opacity 0.25 max
    const curve3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-28, -5, 4),
      new THREE.Vector3(-18, -3, 4),
      new THREE.Vector3(-6,   0, 4),
      new THREE.Vector3( 4,   4, 4),
      new THREE.Vector3( 14,  8, 4),
      new THREE.Vector3( 28, 13, 4),
    ]);
    const curve3Pts = curve3.getPoints(110);
    const curve3Geo = new THREE.BufferGeometry().setFromPoints(curve3Pts);
    const curve3Mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D64545"),
      transparent: true,
      opacity: 0,
    });
    const curveLine3 = new THREE.Line(curve3Geo, curve3Mat);
    scene.add(curveLine3);

    // ── Central red geometric accent — rotating octahedron ───────────
    const accentMat = new THREE.MeshStandardMaterial({
      color:   new THREE.Color("#D64545"),
      emissive: new THREE.Color("#D64545"),
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0,
      roughness: 0.1,
      metalness: 0.6,
    });
    const accent = new THREE.Mesh(new THREE.OctahedronGeometry(2.8, 0), accentMat);
    accent.position.set(0, 4, 0);
    scene.add(accent);

    // Inner wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#D64545"),
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const wire = new THREE.Mesh(new THREE.OctahedronGeometry(3.0, 1), wireMat);
    wire.position.copy(accent.position);
    scene.add(wire);

    // Outer wireframe octahedron — slower rotation, nested ring effect
    const outerWireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#D64545"),
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const outerWire = new THREE.Mesh(new THREE.OctahedronGeometry(3.4, 1), outerWireMat);
    outerWire.position.copy(accent.position);
    scene.add(outerWire);

    // ── Lights ───────────────────────────────────────────────────────
    const ambLight = new THREE.AmbientLight(0x1a1a2e, 0.8);
    scene.add(ambLight);
    const dirLight = new THREE.DirectionalLight(0xD64545, 2.0);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);
    // Purple fill — matches HTML reference accent
    const fillLight = new THREE.DirectionalLight(0x6B4EFF, 0.8);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);
    // Warm red glow on bars
    const redPoint = new THREE.PointLight(0xD64545, 3.0, 35);
    redPoint.position.set(0, 8, 2);
    scene.add(redPoint);
    // Subtle purple rim
    const purplePoint = new THREE.PointLight(0x6B4EFF, 1.2, 50);
    purplePoint.position.set(-20, 10, -10);
    scene.add(purplePoint);

    // ── Camera waypoints ─────────────────────────────────────────────
    const WAY = [
      { z: 70, y: 26, x:  0 },  // 0%  — elevated overview (y bumped from 22→26)
      { z: 42, y: 10, x: -2 },  // 25% — descending into grid
      { z: 18, y:  2, x:  0 },  // 50% — at grid level, curves visible
      { z:  4, y:  2, x:  0 },  // 75% — bars & accent close
      { z: -8, y:  1, x:  0 },  // 100% — past the accent
    ];

    let camTX = WAY[0].x, camTY = WAY[0].y, camTZ = WAY[0].z;
    let progress = 0;
    let mouseX = 0, mouseY = 0;

    const onScroll = () => {
      const el = document.getElementById("scroll-container");
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      progress = Math.max(0, Math.min(1, window.scrollY / scrollable));
      const seg = WAY.length - 1;
      const raw = progress * seg;
      const idx = Math.min(Math.floor(raw), seg - 1);
      const t   = raw - idx;
      const a   = WAY[idx], b = WAY[idx + 1];
      camTX = a.x + (b.x - a.x) * t;
      camTY = a.y + (b.y - a.y) * t;
      camTZ = a.z + (b.z - a.z) * t;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;
    const lp = (a: number, b: number, t: number) => a + (b - a) * t;
    const fade = (p: number, s: number, e: number) =>
      p < s ? 0 : p > e ? 1 : (p - s) / (e - s);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const p = progress;

      // Camera
      camera.position.x = lp(camera.position.x, camTX + mouseX * 1.2, 0.04);
      camera.position.y = lp(camera.position.y, camTY - mouseY * 0.8, 0.04);
      camera.position.z = lp(camera.position.z, camTZ, 0.04);
      camera.lookAt(0, 0, 0);

      // Grid — always visible, slightly more visible on dark bg
      const gridApproach = Math.min(1, p / 0.4);
      gridMat.opacity = 0.08 + gridApproach * 0.16;   // max = 0.24
      fineGridMat.opacity = 0.03 + gridApproach * 0.05; // stays subtle

      // Growth curves — fade in 0.20→0.45, hold, fade 0.72→0.84
      const curveFade = p < 0.20 ? 0
        : p < 0.45 ? (p - 0.20) / 0.25
        : p < 0.72 ? 1
        : p < 0.84 ? 1 - (p - 0.72) / 0.12
        : 0;
      curveMat.opacity  = curveFade * 0.85;
      curve2Mat.opacity = curveFade * 0.40;
      curve3Mat.opacity = curveFade * 0.25;  // highlight curve

      // Vertical accent lines — fade 0.15→0.40
      vlineMat.opacity = lp(0, 0.55, Math.min(1, Math.max(0, (p - 0.15) / 0.25)));
      // Slowly drift them upward
      const vArr = vlineGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < vArr.length / 3; i += 2) {
        vArr[i * 3 + 1] += 0.004;
        if (vArr[i * 3 + 1] > 14) vArr[i * 3 + 1] = -8;
      }
      vlineGeo.attributes.position.needsUpdate = true;

      // Bars — fade in 0.55→0.75, grow height
      const barFade = fade(p, 0.55, 0.75);
      const barGrow = fade(p, 0.60, 0.82);
      bars.forEach((bar, i) => {
        barMats[i].opacity = barFade * 0.9;
        const targetH = barTargetH[i] * barGrow;
        bar.scale.y = lp(bar.scale.y, Math.max(0.001, targetH), 0.06);
        // Keep bar sitting on grid floor
        bar.position.y = -8 + (bar.scale.y * barTargetH[i]) / 2;

        // Glow cap: position at top of bar, fade with bar
        capMats[i].opacity = barFade * 0.95;
        barCaps[i].scale.y = lp(barCaps[i].scale.y, Math.max(0.001, targetH * 0.5), 0.06);
        barCaps[i].position.y = bar.position.y + (bar.scale.y * barTargetH[i]) / 2;
      });

      // Accent octahedra — fade in 0.40→0.60
      const accentFade = fade(p, 0.40, 0.60);
      accentMat.opacity    = accentFade * 0.80;
      wireMat.opacity      = accentFade * 0.30;
      outerWireMat.opacity = accentFade * 0.18;

      // Inner accent: normal speed rotation
      accent.rotation.y = t * 0.55;
      accent.rotation.x = t * 0.28;
      wire.rotation.copy(accent.rotation);
      wire.position.copy(accent.position);

      // Outer wireframe: slightly slower rotation for nested ring effect
      outerWire.rotation.y = t * 0.35;
      outerWire.rotation.x = t * 0.18;
      outerWire.position.copy(accent.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
