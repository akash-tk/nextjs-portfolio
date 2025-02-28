"use client";
import "./globals.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import * as THREE from "three";

export default function Layout({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Prevent flash by controlling visibility
  useEffect(() => {
  document.documentElement.style.backgroundColor = "#03020d";
  document.body.style.backgroundColor = "#03020d";
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
  setLoaded(true); // Ensure this runs
}, []);
    
    // Apply dark background to html element immediately
    document.documentElement.style.backgroundColor = "#03020d";
    document.body.style.backgroundColor = "#03020d";
    
    // Force dark mode at browser level if supported
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
  if (!canvasRef.current) return;
  const canvas = canvasRef.current;

  const initTimer = setTimeout(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(new THREE.Color("#03020d"), 1);

    // Ensure proper sizing
    const updateSize = () => {
      if (!canvasRef.current) return;
      renderer.setSize(window.innerWidth, window.innerHeight); // Use window dimensions directly
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    updateSize();

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

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => updateSize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("deviceorientation", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("deviceorientation", handleResize);
      cancelAnimationFrame(animationFrameId);
      starGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, 100);

  return () => clearTimeout(initTimer);
}, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
          html, body {
            background-color: #03020d !important;
          }
          
          /* Apply smooth transitions to body background */
          body {
            transition: background-color 0.3s ease;
          }
          
          /* Critical CSS to prevent flashing */
          .bg-init {
            background-color: #03020d;
            color: #e2e8f0;
            min-height: 100vh;
            width: 100%;
          }
        `}</style>
      </head>
      
      <body className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-[#03020d] via-[#120f22] to-[#0d0d14] bg-init">
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundColor: '#03020d',
            visibility: loaded ? 'visible' : 'hidden', // Hide canvas until loaded
          }}
        />

        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 w-full bg-black/80 backdrop-blur-sm border-b border-white/20 z-50">
            <nav className="max-w-4xl mx-auto p-6 flex items-center justify-between">
              <button
                onClick={() => setMenuOpen(true)}
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

          <div className={`fixed inset-0 flex z-50 ${menuOpen ? "visible" : "invisible"}`}>
            <div
              className={`fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
              onClick={() => setMenuOpen(false)}
            />

            <div
              className={`fixed top-0 left-0 h-full w-64 backdrop-blur-lg bg-white/10 border-r border-white/20 shadow-lg transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <div className="p-6 flex flex-col space-y-6 text-white">
                <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">About</a>
                <a href="#projects" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Projects</a>
                <a href="#skills" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Skills</a>
                <a href="#certifications" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Certifications</a>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">Contact</a>
              </div>
            </div>
          </div>

          <main className="flex-1 w-full max-w-4xl mx-auto p-6 mt-20">{children}</main>

          <footer className="w-full p-6 text-center text-sm text-gray-400">
            © 2025 Akash T K. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
