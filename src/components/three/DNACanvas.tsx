"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DNACanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(13, 0, 5);
    camera.lookAt(0, 0, 0);

    /* ── DNA parameters ── */
    const TURNS        = 5;
    const PTS_PER_TURN = 60;
    const TOTAL        = TURNS * PTS_PER_TURN;
    const RADIUS       = 2.7;
    const HEIGHT       = 20;
    const STEP         = 6;

    /* Build helix point arrays */
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];

    for (let i = 0; i <= TOTAL; i++) {
      const a = (i / TOTAL) * Math.PI * 2 * TURNS;
      const y = (i / TOTAL) * HEIGHT - HEIGHT / 2;
      s1.push(new THREE.Vector3(RADIUS * Math.cos(a),           y, RADIUS * Math.sin(a)));
      s2.push(new THREE.Vector3(RADIUS * Math.cos(a + Math.PI), y, RADIUS * Math.sin(a + Math.PI)));
    }

    /* ── Group ── */
    const group = new THREE.Group();
    scene.add(group);

    /* ── Circular sprite texture ── */
    const makeCircleTex = () => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0,   "rgba(255,255,255,1)");
      grad.addColorStop(0.55,"rgba(255,255,255,0.8)");
      grad.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    };
    const circleTex = makeCircleTex();

    /* ── Strand lines ── */
    const makeStrand = (pts: THREE.Vector3[], color: number, opacity: number) => {
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      const line = new THREE.Line(geo, mat);
      group.add(line);
      return { geo, mat };
    };

    const l1 = makeStrand(s1, 0xD64545, 0.45);
    const l2 = makeStrand(s2, 0x6B4F3A, 0.35);

    /* ── Rung lines (between the two strands at STEP intervals) ── */
    const rungPts: THREE.Vector3[] = [];
    for (let i = 0; i <= TOTAL; i += STEP) {
      rungPts.push(s1[i].clone(), s2[i].clone());
    }
    const rungGeo = new THREE.BufferGeometry().setFromPoints(rungPts);
    const rungMat = new THREE.LineBasicMaterial({ color: 0x8B6550, transparent: true, opacity: 0.2 });
    const rungLines = new THREE.LineSegments(rungGeo, rungMat);
    group.add(rungLines);

    /* ── Node points (strand 1: red, strand 2: brown) ── */
    const makeNodes = (pts: THREE.Vector3[], color: number, step: number, size: number, opacity: number) => {
      const nodePts: THREE.Vector3[] = [];
      for (let i = 0; i <= pts.length - 1; i += step) nodePts.push(pts[i].clone());
      const geo = new THREE.BufferGeometry().setFromPoints(nodePts);
      const mat = new THREE.PointsMaterial({
        color,
        size,
        map: circleTex,
        alphaTest: 0.01,
        transparent: true,
        opacity,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const pts3d = new THREE.Points(geo, mat);
      group.add(pts3d);
      return { geo, mat };
    };

    const n1 = makeNodes(s1, 0xD64545, STEP, 0.55, 0.75);
    const n2 = makeNodes(s2, 0x8B6550, STEP, 0.45, 0.6);

    /* ── Animate ── */
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y  = t * 0.14;
      group.position.y  = Math.sin(t * 0.28) * 0.3;
      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      l1.geo.dispose(); l1.mat.dispose();
      l2.geo.dispose(); l2.mat.dispose();
      rungGeo.dispose(); rungMat.dispose();
      n1.geo.dispose(); n1.mat.dispose();
      n2.geo.dispose(); n2.mat.dispose();
      circleTex.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
