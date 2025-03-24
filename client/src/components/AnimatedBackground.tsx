import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    
    // Setup camera with a wide field of view for immersive effect
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    
    const posArray = new Float32Array(particleCount * 3); // xyz for each particle
    
    // Create random positions for particles
    for (let i = 0; i < particleCount * 3; i++) {
      // Create a wider spread for particles
      posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create particle material with glow effect
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x6e9fff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Create a few floating cubic elements for added 3D effect
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x5a7bff,
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });
    
    // Create several floating cubes
    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      // Vary the size of each cube
      const scale = Math.random() * 3 + 1;
      cube.scale.set(scale, scale, scale);
      scene.add(cube);
      cubes.push(cube);
    }
    
    // Animation loop
    const animate = () => {
      // Make particles slowly rotate
      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.0008;
      
      // Animate each cube
      cubes.forEach((cube, i) => {
        // Each cube has slightly different animation
        cube.rotation.x += 0.002 * (i % 3 + 1);
        cube.rotation.y += 0.003 * (i % 2 + 1);
        cube.rotation.z += 0.001 * (i % 4 + 1);
        
        // Subtle scaling animation
        const time = Date.now() * 0.001;
        const scale = Math.sin(time * 0.3 + i) * 0.1 + 1;
        cube.scale.x = scale * (i % 3 + 1);
        cube.scale.y = scale * (i % 4 + 1);
        cube.scale.z = scale * (i % 2 + 1);
      });
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <motion.div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 2 }}
    />
  );
};

export default AnimatedBackground;