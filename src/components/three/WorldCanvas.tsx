"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WorldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0D0B08");
    scene.fog = new THREE.Fog("#0D0B08", 25, 95);

    // Camera
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xb8c9a8, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Hero orb
    const orbGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const orbMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#9CAF88"),
      emissive: new THREE.Color("#9CAF88"),
      emissiveIntensity: 0.6,
      roughness: 0.05,
      metalness: 0.3,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // Decorative ring
    const ringGeo = new THREE.TorusGeometry(3.5, 0.04, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#9CAF88"),
      emissive: new THREE.Color("#9CAF88"),
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    ring.rotation.y = 0.3;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(5, 0.025, 16, 80);
    const ring2Mat = ringMat.clone();
    ring2Mat.color = new THREE.Color("#B8C9A8");
    ring2Mat.emissive = new THREE.Color("#B8C9A8");
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = 1.2;
    ring2.rotation.z = 0.5;
    scene.add(ring2);

    // Satellites
    const mkSatellite = (r: number, pos: [number, number, number], color: string) => {
      const geo = new THREE.SphereGeometry(r, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.2,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(...pos);
      scene.add(m);
      return m;
    };
    const s1 = mkSatellite(0.6, [3.2, 1.2, -1], "#B8C9A8");
    const s2 = mkSatellite(0.45, [-3, -1.2, -0.5], "#7A9068");
    const s3 = mkSatellite(0.35, [1.8, -2.5, -0.8], "#9CAF88");

    // Point lights
    const pl1 = new THREE.PointLight(0x9caf88, 6, 18);
    pl1.position.set(0, 3, 3);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xf5f1e8, 3, 14);
    pl2.position.set(-4, -2, 2);
    scene.add(pl2);

    // Particles
    const pCount = 800;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 30;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 2] = Math.random() * -130 + 15;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x9caf88, size: 0.06, sizeAttenuation: true, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Scroll → camera
    const scrollContainer = document.getElementById("scroll-container");
    let camZ = 8, camY = 0, camX = 0;
    const camTargets = [
      { z: 8, y: 0, x: 0 },
      { z: -17, y: 1.5, x: 0 },
      { z: -42, y: -0.5, x: 0.5 },
      { z: -67, y: 0.5, x: -0.5 },
      { z: -92, y: 0, x: 0 },
    ];
    const onScroll = () => {
      if (!scrollContainer) return;
      const scrollable = scrollContainer.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, window.scrollY / scrollable));
      // Lerp between waypoints
      const idx = Math.min(Math.floor(p * 4), 3);
      const t = (p * 4) - idx;
      const a = camTargets[idx], b = camTargets[idx + 1];
      camZ = a.z + (b.z - a.z) * t;
      camY = a.y + (b.y - a.y) * t;
      camX = a.x + (b.x - a.x) * t;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation
    const clock = new THREE.Clock();
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      orb.position.y = Math.sin(t * 0.7) * 0.15;
      ring.rotation.z = t * 0.15;
      ring2.rotation.z = -t * 0.08;
      s1.position.y = 1.2 + Math.sin(t * 1.2) * 0.2;
      s2.position.y = -1.2 + Math.sin(t * 1.5) * 0.2;
      s3.position.y = -2.5 + Math.sin(t * 0.9) * 0.15;

      // Smooth camera
      camera.position.x += (camX - camera.position.x) * 0.05;
      camera.position.y += (camY - camera.position.y) * 0.05;
      camera.position.z += (camZ - camera.position.z) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
