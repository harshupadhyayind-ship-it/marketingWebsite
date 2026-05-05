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
    scene.background = new THREE.Color("#0D0B08");

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000);
    camera.position.set(-10, 5, 180);

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    mount.appendChild(renderer.domElement);

    // ── Phase 0: Deep starfield (universe view) ──────────────────────
    const STAR_COUNT = 14000;
    const starPos   = new Float32Array(STAR_COUNT * 3);
    const starColor = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 90 + Math.random() * 280;

      starPos[i * 3]     = Math.sin(phi) * Math.cos(theta) * r;
      starPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      starPos[i * 3 + 2] = Math.cos(phi) * r;

      const c = Math.random();
      if (c < 0.65) {
        starColor[i * 3] = 0.88 + Math.random() * 0.12;
        starColor[i * 3 + 1] = 0.9  + Math.random() * 0.1;
        starColor[i * 3 + 2] = 1.0;
      } else if (c < 0.83) {
        starColor[i * 3] = 0.6;
        starColor[i * 3 + 1] = 0.72;
        starColor[i * 3 + 2] = 1.0;
      } else {
        starColor[i * 3] = 1.0;
        starColor[i * 3 + 1] = 0.92;
        starColor[i * 3 + 2] = 0.72;
      }
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color",    new THREE.BufferAttribute(starColor, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Milky Way band (denser mid-plane stars) ───────────────────────
    const BAND_COUNT = 3500;
    const bandPos   = new Float32Array(BAND_COUNT * 3);
    const bandColor = new Float32Array(BAND_COUNT * 3);

    for (let i = 0; i < BAND_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r     = 60 + Math.random() * 200;
      const h     = (Math.random() - 0.5) * 30;

      bandPos[i * 3]     = Math.cos(theta) * r;
      bandPos[i * 3 + 1] = h;
      bandPos[i * 3 + 2] = Math.sin(theta) * r;

      const t = Math.random();
      bandColor[i * 3]     = 0.55 + t * 0.2;
      bandColor[i * 3 + 1] = 0.68 + t * 0.2;
      bandColor[i * 3 + 2] = 0.52 + t * 0.1;
    }

    const bandGeo = new THREE.BufferGeometry();
    bandGeo.setAttribute("position", new THREE.BufferAttribute(bandPos, 3));
    bandGeo.setAttribute("color",    new THREE.BufferAttribute(bandColor, 3));

    const bandMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const band = new THREE.Points(bandGeo, bandMat);
    scene.add(band);

    // ── Phase 1–2: Galaxy spiral (centered at origin) ─────────────────
    const GALAXY_COUNT = 6000;
    const galPos   = new Float32Array(GALAXY_COUNT * 3);
    const galColor = new Float32Array(GALAXY_COUNT * 3);

    for (let i = 0; i < GALAXY_COUNT; i++) {
      const arm   = Math.floor(Math.random() * 3);
      const angle = (arm * 2 * Math.PI) / 3;
      const r     = Math.pow(Math.random(), 0.5) * 32 + 0.3;
      const theta = angle + r * 0.28 + (Math.random() - 0.5) * 0.5;
      const scatter = Math.max(0, 1 - r / 32);

      galPos[i * 3]     = Math.cos(theta) * r;
      galPos[i * 3 + 1] = (Math.random() - 0.5) * 1.8 * scatter;
      galPos[i * 3 + 2] = Math.sin(theta) * r;

      const d = r / 32;
      if (d < 0.15) {
        galColor[i * 3]     = 0.95;
        galColor[i * 3 + 1] = 1.0;
        galColor[i * 3 + 2] = 0.92;
      } else {
        const t = Math.random();
        galColor[i * 3]     = 0.38 + t * 0.22;
        galColor[i * 3 + 1] = 0.52 + t * 0.22;
        galColor[i * 3 + 2] = 0.34 + t * 0.12;
      }
    }

    const galGeo = new THREE.BufferGeometry();
    galGeo.setAttribute("position", new THREE.BufferAttribute(galPos, 3));
    galGeo.setAttribute("color",    new THREE.BufferAttribute(galColor, 3));

    const galMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
    });
    const galaxy = new THREE.Points(galGeo, galMat);
    scene.add(galaxy);

    // ── Phase 2: Galaxy core glow ─────────────────────────────────────
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#9CAF88"),
      emissive: new THREE.Color("#9CAF88"),
      emissiveIntensity: 2.5,
      transparent: true,
      opacity: 0,
      roughness: 0.05,
      metalness: 0.2,
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(2.5, 32, 32), coreMat);
    scene.add(core);

    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#B8C9A8"),
      transparent: true,
      opacity: 0,
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(7, 16, 16), haloMat);
    scene.add(halo);

    // ── Phase 3: Burst particles (shoot outward from core) ───────────
    const BURST_COUNT = 1200;
    const burstPos  = new Float32Array(BURST_COUNT * 3);
    const burstDir  = new Float32Array(BURST_COUNT * 3);
    const burstSpeed = new Float32Array(BURST_COUNT);
    const burstColor = new Float32Array(BURST_COUNT * 3);

    for (let i = 0; i < BURST_COUNT; i++) {
      // Random direction in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const dx = Math.sin(phi) * Math.cos(theta);
      const dy = Math.sin(phi) * Math.sin(theta);
      const dz = Math.cos(phi);

      burstPos[i * 3]     = dx * 0.5;
      burstPos[i * 3 + 1] = dy * 0.5;
      burstPos[i * 3 + 2] = dz * 0.5;

      burstDir[i * 3]     = dx;
      burstDir[i * 3 + 1] = dy;
      burstDir[i * 3 + 2] = dz;
      burstSpeed[i] = 0.04 + Math.random() * 0.06;

      // Sage / gold spectrum
      const t = Math.random();
      burstColor[i * 3]     = 0.35 + t * 0.45;
      burstColor[i * 3 + 1] = 0.50 + t * 0.35;
      burstColor[i * 3 + 2] = 0.28 + t * 0.25;
    }

    const burstGeo = new THREE.BufferGeometry();
    burstGeo.setAttribute("position", new THREE.BufferAttribute(burstPos, 3));
    burstGeo.setAttribute("color",    new THREE.BufferAttribute(burstColor, 3));

    const burstMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
    });
    const burst = new THREE.Points(burstGeo, burstMat);
    scene.add(burst);

    // ── Phase 3: Rising glow particles (centered on origin) ──────────
    const RISE_COUNT = 800;
    const risePos = new Float32Array(RISE_COUNT * 3);
    const riseVel = new Float32Array(RISE_COUNT);

    for (let i = 0; i < RISE_COUNT; i++) {
      risePos[i * 3]     = (Math.random() - 0.5) * 20;
      risePos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      risePos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      riseVel[i]         = 0.018 + Math.random() * 0.04;
    }

    const riseGeo = new THREE.BufferGeometry();
    riseGeo.setAttribute("position", new THREE.BufferAttribute(risePos, 3));

    const riseMat = new THREE.PointsMaterial({
      color: 0x9caf88,
      size: 0.14,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
    });
    const riseParticles = new THREE.Points(riseGeo, riseMat);
    scene.add(riseParticles);

    // ── Lights ───────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const sun = new THREE.DirectionalLight(0x9caf88, 1.8);
    sun.position.set(5, 8, 5);
    scene.add(sun);
    const coreLight = new THREE.PointLight(0x9caf88, 10, 35);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // ── Camera waypoints (5 stops over 0→1 scroll) ──────────────────
    const WAY = [
      { z: 180, y:  5,  x: -10 },  // 0%   — universe wide shot
      { z:  75, y:  3,  x:  -4 },  // 25%  — approaching galaxy
      { z:  18, y:  1,  x:   1 },  // 50%  — entering galaxy
      { z:  -3, y: -1,  x: 0.5 },  // 75%  — inside / transition
      { z: -22, y:  0,  x:   0 },  // 100% — settled performance view
    ];

    let camTX = WAY[0].x;
    let camTY = WAY[0].y;
    let camTZ = WAY[0].z;
    let progress = 0;

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
      const a   = WAY[idx];
      const b   = WAY[idx + 1];

      camTX = a.x + (b.x - a.x) * t;
      camTY = a.y + (b.y - a.y) * t;
      camTZ = a.z + (b.z - a.z) * t;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ──────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;

    const lp = (a: number, b: number, t: number) => a + (b - a) * t;

    const fade = (p: number, inStart: number, inEnd: number, outStart: number, outEnd: number) => {
      if (p < inStart)  return 0;
      if (p < inEnd)    return (p - inStart) / (inEnd - inStart);
      if (p < outStart) return 1;
      if (p < outEnd)   return 1 - (p - outStart) / (outEnd - outStart);
      return 0;
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const p = progress;

      // Camera
      camera.position.x = lp(camera.position.x, camTX, 0.045);
      camera.position.y = lp(camera.position.y, camTY, 0.045);
      camera.position.z = lp(camera.position.z, camTZ, 0.045);
      camera.lookAt(0, 0, 0);

      // Stars — always visible, slowly rotate, dim inside galaxy
      stars.rotation.y = t * 0.012;
      stars.rotation.x = t * 0.004;
      starMat.opacity  = lp(1, 0.25, Math.max(0, (p - 0.55) / 0.25));
      bandMat.opacity  = 0.6 * lp(1, 0.15, Math.max(0, (p - 0.55) / 0.25));

      // Galaxy — fade in 0.18→0.50, hold, fade out 0.75→0.88
      galMat.opacity = fade(p, 0.18, 0.50, 0.75, 0.88) * 0.9;
      galaxy.rotation.y = t * 0.025;

      // Core orb — fade in 0.40→0.58, full from there
      const coreFade = p < 0.40 ? 0 : p < 0.58 ? (p - 0.40) / 0.18 : 1;
      coreMat.opacity  = coreFade * 0.88;
      haloMat.opacity  = coreFade * 0.09;
      core.position.y  = Math.sin(t * 0.55) * 0.5;
      halo.position.copy(core.position);
      coreLight.intensity = coreFade * 10;

      // Burst particles — explode outward from 0.65
      const perfFade = p < 0.65 ? 0 : p < 0.82 ? (p - 0.65) / 0.17 : 1;
      burstMat.opacity = perfFade * 0.85;
      if (perfFade > 0) {
        const bArr = burstGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < BURST_COUNT; i++) {
          bArr[i * 3]     += burstDir[i * 3]     * burstSpeed[i] * perfFade;
          bArr[i * 3 + 1] += burstDir[i * 3 + 1] * burstSpeed[i] * perfFade;
          bArr[i * 3 + 2] += burstDir[i * 3 + 2] * burstSpeed[i] * perfFade;
          // Reset when too far
          const dx = bArr[i * 3], dy = bArr[i * 3 + 1], dz = bArr[i * 3 + 2];
          if (dx*dx + dy*dy + dz*dz > 400) {
            bArr[i * 3]     = burstDir[i * 3]     * 0.5;
            bArr[i * 3 + 1] = burstDir[i * 3 + 1] * 0.5;
            bArr[i * 3 + 2] = burstDir[i * 3 + 2] * 0.5;
          }
        }
        burstGeo.attributes.position.needsUpdate = true;
      }

      // Rising particles — upward stream around origin from 0.65
      riseMat.opacity = perfFade * 0.7;
      if (perfFade > 0) {
        const arr = riseGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < RISE_COUNT; i++) {
          arr[i * 3 + 1] += riseVel[i] * perfFade;
          if (arr[i * 3 + 1] > 10) arr[i * 3 + 1] = -8;
        }
        riseGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
