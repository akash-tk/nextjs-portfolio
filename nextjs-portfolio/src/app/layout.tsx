"use client";
import "./globals.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import * as THREE from "three";

export default function Layout({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect(() => {
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );
  //   camera.position.z = 10;

  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: canvasRef.current!,
  //     alpha: true,
  //   });
  //   renderer.setClearColor(0x000000, 1);

  //   const updateSize = () => {
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //   };

  //   updateSize();

  //   const particleCount = 2000;
  //   const geometry = new THREE.BufferGeometry();
  //   const positions = new Float32Array(particleCount * 3);

  //   for (let i = 0; i < particleCount; i++) {
  //     const phi = Math.acos(2 * Math.random() - 1);
  //     const theta = 2 * Math.PI * Math.random();
  //     const radius = 5 + Math.random() * 5;

  //     positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
  //     positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
  //     positions[i * 3 + 2] = radius * Math.cos(phi);
  //   }

  //   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  //   const material = new THREE.PointsMaterial({
  //     color: 0xffffff,
  //     size: 0.05,
  //     transparent: true,
  //     opacity: 0.8,
  //   });

  //   const particles = new THREE.Points(geometry, material);
  //   scene.add(particles);

  //   const animate = () => {
  //     requestAnimationFrame(animate);
  //     particles.rotation.y += 0.0005;
  //     particles.rotation.x += 0.0003;
  //     renderer.render(scene, camera);
  //   };
  //   animate();

  //   const handleResize = () => {
  //     updateSize();
  //     renderer.setPixelRatio(window.devicePixelRatio);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  // useEffect(() => {
  //   // ✅ 1. Create Scene & Camera
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );
  //   camera.position.z = 15; // Move camera back for better visibility

  //   // ✅ 2. Setup Renderer
  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: canvasRef.current!,
  //     alpha: true,
  //     antialias: true, // Smoother edges
  //   });
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   renderer.setClearColor(0x000000, 1);

  //   // ✅ 3. Create a Sphere of Particles
  //   const particleCount = 5000; // More particles for denser effect
  //   const geometry = new THREE.BufferGeometry();
  //   const positions = new Float32Array(particleCount * 3);

  //   for (let i = 0; i < particleCount; i++) {
  //     const r = 5; // Radius of the sphere
  //     const u = Math.random() * 2 - 1; // Random value between -1 and 1
  //     const theta = Math.random() * 2 * Math.PI; // Full 360-degree rotation

  //     const x = r * Math.sqrt(1 - u * u) * Math.cos(theta);
  //     const y = r * Math.sqrt(1 - u * u) * Math.sin(theta);
  //     const z = r * u;

  //     positions[i * 3] = x;
  //     positions[i * 3 + 1] = y;
  //     positions[i * 3 + 2] = z;
  //   }

  //   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  //   // ✅ 4. Particle Material (Small Particles with Soft White Glow)
  //   const material = new THREE.PointsMaterial({
  //     color: 0xffffff,
  //     size: 0.025, // Tiny particles
  //     transparent: true,
  //     opacity: 0.9,
  //   });

  //   const particles = new THREE.Points(geometry, material);
  //   scene.add(particles);

  //   // ✅ 5. Add Soft Lighting for Depth
  //   const light = new THREE.PointLight(0xffffff, 1, 100);
  //   light.position.set(10, 10, 10);
  //   scene.add(light);

  //   // ✅ 6. Animate the Particles
  //   const animate = () => {
  //     requestAnimationFrame(animate);

  //     // Rotate the sphere slightly
  //     particles.rotation.y += 0.0008;
  //     particles.rotation.x += 0.0005;

  //     renderer.render(scene, camera);
  //   };
  //   animate();

  //   // ✅ 7. Handle Resizing
  //   const handleResize = () => {
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    // ✅ 1. Create Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20; // Move camera further for a wider view

    // ✅ 2. Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fully transparent black

    // renderer.setClearColor(0x000000, 1);

    // ✅ 3. Create a Sphere of Particles (Larger & Denser)
    const particleCount = 8000; // More particles for more density
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    // for (let i = 0; i < particleCount; i++) {
    //   const r = 12; // Larger sphere radius
    //   const u = Math.random() * 2 - 1;
    //   const theta = Math.random() * 2 * Math.PI;

    //   const x = r * Math.sqrt(1 - u * u) * Math.cos(theta);
    //   const y = r * Math.sqrt(1 - u * u) * Math.sin(theta);
    //   const z = r * u;

    //   positions[i * 3] = x;
    //   positions[i * 3 + 1] = y;
    //   positions[i * 3 + 2] = z;
    // }
    // for (let i = 0; i < particleCount; i++) {
    //   const angle = i * 0.1; // Spiral effect
    //   const distance = Math.sqrt(i) * 0.5; // Controls spread

    //   const x = distance * Math.cos(angle);
    //   const y = distance * Math.sin(angle);
    //   const z = (Math.random() - 0.5) * 5; // Adds a slight 3D depth

    //   positions[i * 3] = x;
    //   positions[i * 3 + 1] = y;
    //   positions[i * 3 + 2] = z;
    // }
    // for (let i = 0; i < particleCount; i++) {
    //   const angle = i * 0.1; // Spiral effect
    //   const distance = Math.sqrt(i) * 0.5; // Controls spread

    //   const x = distance * Math.cos(angle);
    //   const y = distance * Math.sin(angle);
    //   const z = (Math.random() - 0.5) * 5; // Adds a slight 3D depth

    //   positions[i * 3] = x;
    //   positions[i * 3 + 1] = y;
    //   positions[i * 3 + 2] = z;
    // }
    for (let i = 0; i < particleCount; i++) {
      const angle = i * 0.1; // Spiral effect
      const distance = Math.log(i + 1) * 2; // Adjusted growth for uniform spread

      const x = distance * Math.cos(angle);
      const y = distance * Math.sin(angle);
      const z = (Math.random() - 0.5) * 5; // Adds a slight 3D depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    // ✅ Keep particle size small
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03, // 👈 Tiny particles for a refined look
      transparent: true,
      opacity: 0.9,
    });

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // // ✅ 4. Particle Material (Glow Effect)
    // const material = new THREE.PointsMaterial({
    //   color: 0xffffff,
    //   size: 0.04, // Slightly bigger for visibility
    //   transparent: true,
    //   opacity: 0.9,
    // });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ✅ 5. Add Soft Lighting for Depth
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // ✅ 6. Animate the Particles
    const animate = () => {
      requestAnimationFrame(animate);

      // Slow, immersive rotation
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    // ✅ 7. Handle Resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <html lang="en" className="dark">
      <body className="relative text-white font-sans">
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full -z-10 bg-black"
          style={{ height: "100%", backgroundColor: "black" }}
        ></canvas>

        <div className="min-h-screen flex flex-col items-center">
          <header className="fixed top-0 w-full bg-black border-b border-white/20 z-50">
            <nav className="max-w-4xl mx-auto p-6 flex items-center justify-between">
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden text-white"
              >
                <Bars3Icon className="h-7 w-7 hover:scale-110 transition-transform duration-200" />
              </button>

              <div className="text-2xl font-bold">Akash T K</div>

              <ul className="hidden md:flex space-x-6 text-white">
                <li>
                  <a href="#about" className="hover:text-gray-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-gray-400">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-gray-400">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#certifications" className="hover:text-gray-400">
                    Certifications
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </header>

          <div
            className={`fixed inset-0 flex z-50 ${
              menuOpen ? "visible" : "invisible"
            }`}
          >
            <div
              className={`fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ${
                menuOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setMenuOpen(false)}
            ></div>

            <div
              className={`fixed top-0 left-0 h-full w-64 backdrop-blur-lg bg-white/10 border border-white/20 rounded-r-lg shadow-lg transition-transform duration-300 ${
                menuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-6 flex flex-col space-y-6 text-white">
                <a
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-400"
                >
                  About
                </a>
                <a
                  href="#projects"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-400"
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-400"
                >
                  Skills
                </a>
                <a
                  href="#certifications"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-400"
                >
                  Certifications
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-400"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          <main className="flex-1 w-full max-w-4xl p-6 mt-20">{children}</main>

          <footer className="w-full p-6 text-center text-sm text-gray-400">
            © 2025 Akash T K. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
