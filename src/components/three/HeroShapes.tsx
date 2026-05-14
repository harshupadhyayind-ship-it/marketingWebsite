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

    /* ── Scene — keep white background for page hero sections ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFFFFF");

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 20);

    /* ── Lights ── */
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    // Warm red glow points for subtle depth
    const glow1 = new THREE.PointLight(0xe63327, 1.5, 15);
    glow1.position.set(-6, 3, 5);
    scene.add(glow1);

    const glow2 = new THREE.PointLight(0xe63327, 1.5, 15);
    glow2.position.set(7, -4, 3);
    scene.add(glow2);

    /* ── Red colour ── */
    const RED = 0xe63327;

    /* ── Shape definitions ── */
    type ShapeDef = {
      mesh: THREE.Mesh;
      rotSpeed: [number, number, number];
    };
    const shapes: ShapeDef[] = [];

    function makeMesh(
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      pos: [number, number, number]
    ): ShapeDef {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      scene.add(mesh);
      return {
        mesh,
        rotSpeed: [
          (Math.random() - 0.5) * 0.016,
          (Math.random() - 0.5) * 0.020,
          (Math.random() - 0.5) * 0.012,
        ],
      };
    }

    // ── 4 wireframe octahedra ──────────────────────────────────────────

    /* 1 */
    shapes.push(
      makeMesh(
        new THREE.OctahedronGeometry(2.2),
        new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.45 }),
        [-7, 4, -6]
      )
    );

    /* 2 */
    shapes.push(
      makeMesh(
        new THREE.OctahedronGeometry(1.4),
        new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.35 }),
        [8, -3, -7]
      )
    );

    /* 3 */
    shapes.push(
      makeMesh(
        new THREE.OctahedronGeometry(3.0),
        new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.20 }),
        [2, -4, -8]
      )
    );

    /* 4 */
    shapes.push(
      makeMesh(
        new THREE.OctahedronGeometry(1.8),
        new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.40 }),
        [-5, -3, -5]
      )
    );

    // ── 2 solid icosahedra ─────────────────────────────────────────────

    /* 5 */
    shapes.push(
      makeMesh(
        new THREE.IcosahedronGeometry(0.9, 0),
        new THREE.MeshStandardMaterial({
          color: RED,
          transparent: true,
          opacity: 0.55,
          roughness: 0.4,
          metalness: 0.1,
          emissive: new THREE.Color(RED),
          emissiveIntensity: 0.12,
        }),
        [6, 3, -4]
      )
    );

    /* 6 */
    shapes.push(
      makeMesh(
        new THREE.IcosahedronGeometry(1.2, 0),
        new THREE.MeshStandardMaterial({
          color: RED,
          transparent: true,
          opacity: 0.50,
          roughness: 0.3,
          metalness: 0.1,
          emissive: new THREE.Color(RED),
          emissiveIntensity: 0.10,
        }),
        [-3, 2, -6]
      )
    );

    // ── 2 wireframe tori ───────────────────────────────────────────────

    /* 7 */
    (() => {
      const def = makeMesh(
        new THREE.TorusGeometry(2.0, 0.22, 16, 48),
        new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.38 }),
        [7, 2, -7]
      );
      def.mesh.rotation.x = Math.PI / 3;
      shapes.push(def);
    })();

    /* 8 */
    (() => {
      const def = makeMesh(
        new THREE.TorusGeometry(1.5, 0.18, 12, 40),
        new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.45 }),
        [-8, -2, -5]
      );
      def.mesh.rotation.x = Math.PI / 4;
      shapes.push(def);
    })();

    // ── 2 large wireframe spheres ──────────────────────────────────────

    /* 9 */
    shapes.push(
      makeMesh(
        new THREE.SphereGeometry(1.5, 6, 6),
        new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.22 }),
        [-6, 3, -7]
      )
    );

    /* 10 */
    shapes.push(
      makeMesh(
        new THREE.SphereGeometry(1.5, 6, 6),
        new THREE.MeshBasicMaterial({ color: RED, wireframe: true, transparent: true, opacity: 0.18 }),
        [5, -4, -6]
      )
    );

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
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Parallax camera — ±2.5 units
      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 2.5 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Rotate each shape
      for (const { mesh, rotSpeed } of shapes) {
        mesh.rotation.x += rotSpeed[0];
        mesh.rotation.y += rotSpeed[1];
        mesh.rotation.z += rotSpeed[2];
      }

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      for (const { mesh } of shapes) {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
