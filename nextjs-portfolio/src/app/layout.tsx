"use client";
import "./globals.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import * as THREE from "three";

export default function Layout({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle menu toggle and prevent background scrolling
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const starGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      blending: THREE.AdditiveBlending,
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starsMaterial);
    scene.add(stars);

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <html lang="en" className="dark">
      <body className={`relative text-white font-sans ${menuOpen ? "overflow-hidden" : ""}`}>

        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-screen h-screen -z-10 bg-black"
        />

        <div className="min-h-screen flex flex-col items-center">
          {/* Header */}
          <header className="fixed top-0 w-full bg-black border-b border-white/20 z-50">
            <nav className="max-w-4xl mx-auto p-6 flex items-center justify-between">
              <button
                onClick={toggleMenu}
                className="md:hidden text-white"
              >
                <Bars3Icon className="h-7 w-7 hover:scale-110 transition-transform duration-200" />
              </button>

              <div className="text-2xl font-bold">Akash T K</div>

              <ul className="hidden md:flex space-x-6 text-white">
                <li><a href="#about" className="hover:text-gray-400">About</a></li>
                <li><a href="#projects" className="hover:text-gray-400">Projects</a></li>
                <li><a href="#skills" className="hover:text-gray-400">Skills</a></li>
                <li><a href="#certifications" className="hover:text-gray-400">Certifications</a></li>
                <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
              </ul>
            </nav>
          </header>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="fixed inset-0 flex z-50">
              <div
                className="fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300"
                onClick={toggleMenu}
              ></div>

              <div
                className="fixed top-0 left-0 h-full w-64 backdrop-blur-lg bg-white/10 border border-white/20 rounded-r-lg shadow-lg transition-transform duration-300"
              >
                <div className="p-6 flex flex-col space-y-6 text-white">
                  <a href="#about" onClick={toggleMenu} className="hover:text-gray-400">About</a>
                  <a href="#projects" onClick={toggleMenu} className="hover:text-gray-400">Projects</a>
                  <a href="#skills" onClick={toggleMenu} className="hover:text-gray-400">Skills</a>
                  <a href="#certifications" onClick={toggleMenu} className="hover:text-gray-400">Certifications</a>
                  <a href="#contact" onClick={toggleMenu} className="hover:text-gray-400">Contact</a>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 w-full max-w-4xl p-6 mt-20 min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <footer className="w-full p-6 text-center text-sm text-gray-400">
            © 2025 Akash T K. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
