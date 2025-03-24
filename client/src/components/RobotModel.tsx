import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const createRobot = (scene: THREE.Scene) => {
  // Create robot head
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ color: 0x6e7cff, flatShading: true })
  );
  head.position.y = 3;
  scene.add(head);

  // Create robot eyes
  const eyeGeometry = new THREE.SphereGeometry(0.3, 8, 8);
  const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
  
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.5, 3.2, 1.1);
  scene.add(leftEye);
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.5, 3.2, 1.1);
  scene.add(rightEye);
  
  // Create robot pupils
  const pupilGeometry = new THREE.SphereGeometry(0.15, 8, 8);
  const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
  
  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  leftPupil.position.set(-0.5, 3.2, 1.35);
  scene.add(leftPupil);
  
  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  rightPupil.position.set(0.5, 3.2, 1.35);
  scene.add(rightPupil);

  // Create robot body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3.5, 2),
    new THREE.MeshPhongMaterial({ color: 0x407bff, flatShading: true })
  );
  body.position.y = 0;
  scene.add(body);

  // Create robot arms
  const armGeometry = new THREE.BoxGeometry(0.5, 2.5, 0.5);
  const armMaterial = new THREE.MeshPhongMaterial({ color: 0x6e7cff, flatShading: true });
  
  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  leftArm.position.set(-1.75, 0.5, 0);
  scene.add(leftArm);
  
  const rightArm = new THREE.Mesh(armGeometry, armMaterial);
  rightArm.position.set(1.75, 0.5, 0);
  scene.add(rightArm);

  // Create robot legs
  const legGeometry = new THREE.BoxGeometry(1, 2, 1);
  const legMaterial = new THREE.MeshPhongMaterial({ color: 0x6e7cff, flatShading: true });
  
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  leftLeg.position.set(-0.75, -2.75, 0);
  scene.add(leftLeg);
  
  const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
  rightLeg.position.set(0.75, -2.75, 0);
  scene.add(rightLeg);

  // Create robot mouth
  const mouthGeometry = new THREE.BoxGeometry(1, 0.3, 0.2);
  const mouthMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
  mouth.position.set(0, 2.5, 1.1);
  scene.add(mouth);

  // Create an antenna
  const antennaGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
  const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
  antenna.position.set(0, 4.5, 0);
  scene.add(antenna);

  const antennaBallGeometry = new THREE.SphereGeometry(0.2, 8, 8);
  const antennaBallMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const antennaBall = new THREE.Mesh(antennaBallGeometry, antennaBallMaterial);
  antennaBall.position.set(0, 5, 0);
  scene.add(antennaBall);

  // Group all robot parts
  const robot = new THREE.Group();
  robot.add(head, leftEye, rightEye, leftPupil, rightPupil, body, leftArm, rightArm, leftLeg, rightLeg, mouth, antenna, antennaBall);
  
  // Position robot to be centered
  robot.position.y = 0.5;
  
  return {
    robot,
    head,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    antennaBall
  };
};

interface RobotModelProps {
  isActive?: boolean;
}

const RobotModel: React.FC<RobotModelProps> = ({ isActive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const robotRef = useRef<any>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene, camera and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const aspectRatio = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = 10;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add robot to scene
    const robotParts = createRobot(scene);
    const { robot, leftArm, rightArm, antennaBall } = robotParts;
    scene.add(robot);
    robotRef.current = robotParts;
    
    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      if (robot && isActive) {
        // Bobbing animation
        robot.position.y = 0.5 + Math.sin(time * 2) * 0.1;
        
        // Wave arms when active
        if (leftArm && rightArm) {
          leftArm.rotation.z = Math.sin(time * 3) * 0.2;
          rightArm.rotation.z = -Math.sin(time * 3) * 0.2;
        }
        
        // Pulsing antenna light
        if (antennaBall) {
          antennaBall.scale.set(
            1 + Math.sin(time * 5) * 0.2,
            1 + Math.sin(time * 5) * 0.2,
            1 + Math.sin(time * 5) * 0.2
          );
        }
      }
      
      // Gentle rotation when not actively chatting
      robot.rotation.y = Math.sin(time * 0.5) * 0.1;
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
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
  }, [isActive]);
  
  return (
    <motion.div 
      ref={containerRef} 
      className="robot-container h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default RobotModel;