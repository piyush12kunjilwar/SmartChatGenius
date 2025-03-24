import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EnhancedTypingIndicator: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene, camera and renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(40, 40);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create pulsing spheres
    const createSphere = (position: THREE.Vector3, color: number) => {
      const geometry = new THREE.SphereGeometry(0.5, 16, 16);
      const material = new THREE.MeshPhongMaterial({ 
        color,
        transparent: true,
        opacity: 0.8,
        shininess: 30 
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(position);
      return sphere;
    };
    
    const sphere1 = createSphere(new THREE.Vector3(-1.5, 0, 0), 0x9c5cf5);
    const sphere2 = createSphere(new THREE.Vector3(0, 0, 0), 0x734af5);
    const sphere3 = createSphere(new THREE.Vector3(1.5, 0, 0), 0x4a7ef5);
    
    scene.add(sphere1, sphere2, sphere3);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Animation loop
    const animate = () => {
      const time = Date.now() * 0.001;
      
      // Animate each sphere with offset timing
      sphere1.position.y = Math.sin(time * 3) * 0.5;
      sphere1.scale.setScalar(0.8 + Math.sin(time * 3) * 0.2);
      
      sphere2.position.y = Math.sin(time * 3 + 1) * 0.5;
      sphere2.scale.setScalar(0.8 + Math.sin(time * 3 + 1) * 0.2);
      
      sphere3.position.y = Math.sin(time * 3 + 2) * 0.5;
      sphere3.scale.setScalar(0.8 + Math.sin(time * 3 + 2) * 0.2);
      
      // Slowly rotate everything for a subtle effect
      scene.rotation.y = Math.sin(time * 0.5) * 0.2;
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <motion.div 
      className="flex items-center space-x-2 p-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div ref={containerRef} className="w-10 h-10" />
      
      <motion.p 
        className="text-sm text-blue-700 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        AI is thinking...
      </motion.p>
    </motion.div>
  );
};

export default EnhancedTypingIndicator;