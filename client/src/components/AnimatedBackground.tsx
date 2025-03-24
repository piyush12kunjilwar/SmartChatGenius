import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene with a fog effect for depth
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c1445, 0.01);
    
    // Setup camera with a wide field of view for immersive effect
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    camera.position.y = 5;
    camera.rotation.x = -0.1;
    
    // Create renderer with high quality settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: 'highp'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000022, 0.3); // Darker blue background with some transparency
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lights to illuminate the 3D objects
    const ambientLight = new THREE.AmbientLight(0x333366, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x6677ff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create an enhanced starfield with different sized particles
    const createStarfield = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 2000;
      
      const positions = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      const colors = new Float32Array(starCount * 3);
      
      const color1 = new THREE.Color(0x6e9fff); // Blue
      const color2 = new THREE.Color(0xaabbff); // Light blue
      const color3 = new THREE.Color(0xffffff); // White
      
      for (let i = 0; i < starCount; i++) {
        // Create stars in a large sphere around the camera
        const radius = 50 + Math.random() * 150;
        const theta = Math.random() * Math.PI * 2; // horizontal angle
        const phi = Math.acos(2 * Math.random() - 1); // vertical angle
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Vary the star sizes
        sizes[i] = Math.random() * 2 + 0.5;
        
        // Randomize the star colors
        const colorChoice = Math.random();
        let starColor;
        
        if (colorChoice < 0.6) {
          starColor = color1;
        } else if (colorChoice < 0.9) {
          starColor = color2;
        } else {
          starColor = color3;
        }
        
        colors[i * 3] = starColor.r;
        colors[i * 3 + 1] = starColor.g;
        colors[i * 3 + 2] = starColor.b;
      }
      
      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const starMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      return new THREE.Points(starGeometry, starMaterial);
    };
    
    const starfield = createStarfield();
    scene.add(starfield);
    
    // Create a grid for ground effect
    const createGrid = () => {
      const gridSize = 100;
      const gridDivisions = 50;
      const gridMaterial = new THREE.LineBasicMaterial({ 
        color: 0x0055ff,
        transparent: true,
        opacity: 0.3,
        fog: true
      });
      
      const grid = new THREE.GridHelper(gridSize, gridDivisions, 0x0088ff, 0x0044aa);
      grid.position.y = -10;
      grid.rotation.x = Math.PI / 2;
      (grid.material as THREE.Material) = gridMaterial;
      
      return grid;
    };
    
    const grid = createGrid();
    scene.add(grid);
    
    // Create floating geometric shapes with glowing edges
    const createGeometricObject = (type: string, position: THREE.Vector3, size: number, color: number) => {
      let geometry;
      
      switch(type) {
        case 'cube':
          geometry = new THREE.BoxGeometry(size, size, size, 2, 2, 2);
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(size / 2, 16, 16);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(size / 2, 0);
          break;
        case 'tetrahedron':
          geometry = new THREE.TetrahedronGeometry(size / 2, 0);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(size / 2, size / 6, 16, 40);
          break;
        default:
          geometry = new THREE.BoxGeometry(size, size, size);
      }
      
      // Create edges for wireframe effect
      const edges = new THREE.EdgesGeometry(geometry);
      const edgesMaterial = new THREE.LineBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.8,
        fog: true
      });
      
      const wireframe = new THREE.LineSegments(edges, edgesMaterial);
      wireframe.position.copy(position);
      
      // Create inner mesh with translucent material
      const meshMaterial = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.15,
        specular: 0xffffff,
        shininess: 100,
        side: THREE.DoubleSide,
        fog: true
      });
      
      const mesh = new THREE.Mesh(geometry, meshMaterial);
      mesh.position.copy(position);
      
      return { wireframe, mesh };
    };
    
    // Create multiple geometric objects
    const geometricObjects: {wireframe: THREE.LineSegments, mesh: THREE.Mesh}[] = [];
    const objectTypes = ['cube', 'sphere', 'octahedron', 'tetrahedron', 'torus'];
    const objectColors = [0x4466ff, 0x44aaff, 0x66ffff, 0x8866ff, 0x6644ff];
    
    for (let i = 0; i < 15; i++) {
      const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80 - 30
      );
      const size = Math.random() * 6 + 3;
      const color = objectColors[Math.floor(Math.random() * objectColors.length)];
      
      const { wireframe, mesh } = createGeometricObject(type, position, size, color);
      scene.add(wireframe);
      scene.add(mesh);
      geometricObjects.push({ wireframe, mesh });
    }
    
    // Create energy beams that move through the scene
    const createEnergyBeams = (count: number) => {
      const beams: {
        line: THREE.Line,
        velocity: THREE.Vector3,
        length: number,
        positions: Float32Array,
        positionAttribute: THREE.BufferAttribute
      }[] = [];
      
      for (let i = 0; i < count; i++) {
        // Create beam geometry
        const beamGeometry = new THREE.BufferGeometry();
        const length = Math.random() * 20 + 10;
        const positions = new Float32Array(6); // Start and end points
        
        // Random initial position outside of view
        const startPoint = new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          -50 - Math.random() * 50
        );
        
        // Initial points
        positions[0] = startPoint.x;
        positions[1] = startPoint.y;
        positions[2] = startPoint.z;
        positions[3] = startPoint.x;
        positions[4] = startPoint.y;
        positions[5] = startPoint.z + length;
        
        const positionAttribute = new THREE.BufferAttribute(positions, 3);
        beamGeometry.setAttribute('position', positionAttribute);
        
        // Create beam material with glow
        const beamMaterial = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.7,
          fog: true,
          linewidth: 2  // Note: this may not work in all browsers due to WebGL limitations
        });
        
        const line = new THREE.Line(beamGeometry, beamMaterial);
        
        // Random velocity vector
        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() * 0.5) + 0.2
        );
        
        beams.push({
          line,
          velocity,
          length,
          positions,
          positionAttribute
        });
        
        scene.add(line);
      }
      
      return beams;
    };
    
    const energyBeams = createEnergyBeams(8);
    
    // Create distant nebula clouds for added depth
    const createNebulaClouds = () => {
      const clouds: THREE.Mesh[] = [];
      const cloudTexture = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='); // Blank 1x1 texture
      
      for (let i = 0; i < 5; i++) {
        const cloudGeometry = new THREE.PlaneGeometry(100, 100);
        const cloudMaterial = new THREE.MeshBasicMaterial({
          map: cloudTexture,
          transparent: true,
          opacity: 0.2,
          fog: true,
          color: new THREE.Color(Math.random() * 0.1 + 0.2, Math.random() * 0.1 + 0.3, Math.random() * 0.3 + 0.5),
          blending: THREE.AdditiveBlending
        });
        
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150,
          -100 - Math.random() * 150
        );
        cloud.rotation.z = Math.random() * Math.PI * 2;
        cloud.scale.set(1 + Math.random() * 3, 1 + Math.random() * 3, 1);
        
        scene.add(cloud);
        clouds.push(cloud);
      }
      
      return clouds;
    };
    
    const nebulaClouds = createNebulaClouds();
    
    // Main animation loop with dynamic camera movement
    let time = 0;
    const cameraPath = new THREE.Vector3(0, 0, 0);
    
    const animate = () => {
      time += 0.005;
      
      // Gently move camera in a figure-8 pattern
      cameraPath.x = Math.sin(time * 0.2) * 5;
      cameraPath.y = Math.sin(time * 0.1) * 3 + Math.sin(time * 0.2) * 2;
      
      camera.position.x = cameraPath.x;
      camera.position.y = cameraPath.y + 5;
      camera.lookAt(new THREE.Vector3(cameraPath.x, cameraPath.y, -50));
      
      // Rotate the starfield for parallax effect
      starfield.rotation.x += 0.0001;
      starfield.rotation.y += 0.0002;
      
      // Rotate grid for movement effect
      grid.position.z = (time * 15) % 10;
      
      // Animate geometric objects
      geometricObjects.forEach((object, i) => {
        const { wireframe, mesh } = object;
        
        // Each object has unique rotation
        wireframe.rotation.x += 0.002 + i * 0.0002;
        wireframe.rotation.y += 0.003 + i * 0.0001;
        wireframe.rotation.z += 0.001 + i * 0.0003;
        
        mesh.rotation.copy(wireframe.rotation);
        
        // Pulsating effect
        const scale = 1 + Math.sin(time * 2 + i) * 0.05;
        wireframe.scale.set(scale, scale, scale);
        mesh.scale.copy(wireframe.scale);
        
        // Subtle position changes
        wireframe.position.x += Math.sin(time + i) * 0.02;
        wireframe.position.y += Math.cos(time * 0.7 + i) * 0.02;
        
        mesh.position.copy(wireframe.position);
      });
      
      // Update energy beams
      energyBeams.forEach(beam => {
        const { line, velocity, length, positions, positionAttribute } = beam;
        
        // Update beam start position
        positions[0] += velocity.x;
        positions[1] += velocity.y;
        positions[2] += velocity.z;
        
        // Update beam end position
        positions[3] = positions[0];
        positions[4] = positions[1];
        positions[5] = positions[2] + length;
        
        // If beam goes too far, reset it
        if (positions[2] > 50) {
          positions[0] = (Math.random() - 0.5) * 100;
          positions[1] = (Math.random() - 0.5) * 100;
          positions[2] = -100;
          positions[3] = positions[0];
          positions[4] = positions[1];
          positions[5] = positions[2] + length;
        }
        
        positionAttribute.needsUpdate = true;
        
        // Slight beam rotation for more dynamic appearance
        line.rotation.z += 0.01;
      });
      
      // Animate nebula clouds
      nebulaClouds.forEach((cloud, i) => {
        cloud.rotation.z += 0.0005 * (i % 3 + 1);
        
        // Slow pulsating
        const cloudScale = 1 + Math.sin(time * 0.2 + i) * 0.1;
        cloud.scale.set(cloudScale + i % 3, cloudScale + i % 2, 1);
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
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
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
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default AnimatedBackground;