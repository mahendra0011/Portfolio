import { useEffect, useRef } from "react";
import * as THREE from "three";

const fallbackPalette = {
  primary: [216, 0.9, 0.58],
  primaryGlow: [204, 0.84, 0.84],
  accent: [267, 0.86, 0.64],
};

const cssHslToColor = (raw, fallback) => {
  const color = new THREE.Color();
  const parts = raw.trim().split(/\s+/);

  if (parts.length >= 3) {
    const hue = Number.parseFloat(parts[0]) / 360;
    const saturation = Number.parseFloat(parts[1]) / 100;
    const lightness = Number.parseFloat(parts[2]) / 100;
    color.setHSL(hue, saturation, lightness);
    return color;
  }

  color.setHSL(fallback[0] / 360, fallback[1], fallback[2]);
  return color;
};

const readPalette = () => {
  const styles = getComputedStyle(document.documentElement);

  return {
    primary: cssHslToColor(styles.getPropertyValue("--primary"), fallbackPalette.primary),
    primaryGlow: cssHslToColor(styles.getPropertyValue("--primary-glow"), fallbackPalette.primaryGlow),
    accent: cssHslToColor(styles.getPropertyValue("--accent"), fallbackPalette.accent),
  };
};

const HeroScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return undefined;
    }

    const palette = readPalette();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const group = new THREE.Group();
    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    scene.add(group);

    const ribbonMaterial = new THREE.MeshBasicMaterial({
      color: palette.accent,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });

    const ribbons = [
      [
        new THREE.Vector3(-5.6, -1.4, -2.6),
        new THREE.Vector3(-2.4, 0.65, -2.2),
        new THREE.Vector3(0.9, -0.28, -1.9),
        new THREE.Vector3(2.35, -0.78, -2.2),
      ],
      [
        new THREE.Vector3(-4.8, 2.4, -3.2),
        new THREE.Vector3(-1.8, 1.2, -2.4),
        new THREE.Vector3(0.6, 1.45, -2.8),
        new THREE.Vector3(2.15, 1.95, -2.9),
      ],
      [
        new THREE.Vector3(1.8, -2.05, -3.1),
        new THREE.Vector3(3.4, -1.0, -2.7),
        new THREE.Vector3(5.2, -1.25, -3.0),
        new THREE.Vector3(6.0, 0.45, -3.4),
      ],
    ].map((points) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const ribbon = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.018, 8, false), ribbonMaterial);
      group.add(ribbon);
      return ribbon;
    });

    const particleCount = window.innerWidth < 768 ? 120 : 230;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const index = i * 3;
      particlePositions[index] = (Math.random() - 0.5) * 10.5;
      particlePositions[index + 1] = (Math.random() - 0.5) * 6.8;
      particlePositions[index + 2] = -1.4 - Math.random() * 4.5;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: palette.primary,
        size: 0.024,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
      }),
    );
    group.add(particles);

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;

      camera.aspect = width / height;
      camera.position.set(0, 0.1, width < 768 ? 8.7 : 7.2);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();

      group.rotation.y = pointer.x * 0.04;
      group.rotation.x = pointer.y * 0.045;
      ribbons.forEach((ribbon, index) => {
        ribbon.rotation.z = Math.sin(elapsed * 0.2 + index) * 0.035;
      });
      particles.rotation.y = -elapsed * 0.018;

      renderer.render(scene, camera);
      if (!reducedMotion) frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-70 [mask-image:linear-gradient(90deg,transparent_0%,transparent_42%,black_62%,black_100%)]"
    />
  );
};

export default HeroScene;
