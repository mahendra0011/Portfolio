import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";

const TERRAIN_SIZE = 150;
const TERRAIN_SEGMENTS = 150;
const STARS_COUNT = 2000;

const BACKGROUND_THEME = {
  light: {
    clear: 0xf7fbff,
    fog: 0xf7fbff,
    terrain: 0x4057d8,
    terrainOpacity: 0.58,
    star: 0x7c5cff,
    starOpacity: 0.34,
  },
  dark: {
    clear: 0x111111,
    fog: 0x111111,
    terrain: 0xffffff,
    terrainOpacity: 0.62,
    star: 0xffffff,
    starOpacity: 0.76,
  },
};

const AboutLucaBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const palette = BACKGROUND_THEME[theme === "dark" ? "dark" : "light"];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(palette.fog, 0.015);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(palette.clear, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const terrainGeometry = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, TERRAIN_SEGMENTS, TERRAIN_SEGMENTS);
    const terrainPositions = terrainGeometry.attributes.position;

    for (let index = 0; index < terrainPositions.count; index += 1) {
      const x = terrainPositions.getX(index);
      const y = terrainPositions.getY(index);
      const z = Math.sin(x * 0.1) * 3 + Math.cos(y * 0.1) * 3 + Math.sin(x * 0.05 + y * 0.05) * 5;
      terrainPositions.setZ(index, z);
    }

    terrainPositions.needsUpdate = true;
    terrainGeometry.computeVertexNormals();

    const terrainMaterial = new THREE.PointsMaterial({
      color: palette.terrain,
      size: theme === "dark" ? 0.15 : 0.16,
      transparent: true,
      opacity: palette.terrainOpacity,
      depthWrite: false,
      fog: true,
    });

    const terrain = new THREE.Points(terrainGeometry, terrainMaterial);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -10;
    scene.add(terrain);

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STARS_COUNT * 3);

    for (let index = 0; index < STARS_COUNT; index += 1) {
      const offset = index * 3;
      starPositions[offset] = (Math.random() - 0.5) * 200;
      starPositions[offset + 1] = (Math.random() - 0.5) * 200;
      starPositions[offset + 2] = (Math.random() - 0.5) * 200;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: palette.star,
      size: theme === "dark" ? 0.2 : 0.18,
      transparent: true,
      opacity: palette.starOpacity,
      depthWrite: false,
      fog: true,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    stars.position.y = 20;
    scene.add(stars);

    let rafId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      renderer.render(scene, camera);
    };

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;

      camera.aspect = width / Math.max(1, height);
      camera.position.set(0, width < 640 ? 17 : 15, width < 640 ? 48 : 40);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      render();
    };

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      terrain.position.z = (elapsedTime * 2) % 10;
      stars.rotation.y = elapsedTime * 0.01;
      render();
      rafId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      render();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) window.cancelAnimationFrame(rafId);
      terrainGeometry.dispose();
      terrainMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="about-luca-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default AboutLucaBackground;
