import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Create more complex robot with additional details
const createRobot = (scene: THREE.Scene) => {
  // Enhanced materials with metallic look
  const robotMainMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x4070ff,
    metalness: 0.7,
    roughness: 0.2,
    flatShading: true,
  });
  
  const robotSecondaryMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x6e80ff,
    metalness: 0.6, 
    roughness: 0.3,
    flatShading: true,
  });

  const robotAccentMaterial = new THREE.MeshStandardMaterial({
    color: 0x2050e0, 
    metalness: 0.8, 
    roughness: 0.1,
  });

  const glowMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 1,
    metalness: 1,
    roughness: 0.2
  });

  // Create robot head - more detailed with beveled edges
  const headGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2, 2, 2, 2);
  const head = new THREE.Mesh(headGeometry, robotMainMaterial);
  head.position.y = 3;
  
  // Add head details
  const headDetailGeometry = new THREE.BoxGeometry(2.4, 0.4, 2.4);
  const headDetail = new THREE.Mesh(headDetailGeometry, robotSecondaryMaterial);
  headDetail.position.y = 2;
  
  // Create robot eyes with glow effect
  const eyeGeometry = new THREE.SphereGeometry(0.35, 16, 16);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    emissive: 0xaaaaff,
    emissiveIntensity: 0.2
  });
  
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.6, 3.3, 1.15);
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.6, 3.3, 1.15);
  
  // Create dynamic robot pupils
  const pupilGeometry = new THREE.SphereGeometry(0.18, 16, 16);
  const pupilMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    emissive: 0x0055ff,
    emissiveIntensity: 0.5
  });
  
  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  leftPupil.position.set(-0.6, 3.3, 1.4);
  
  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  rightPupil.position.set(0.6, 3.3, 1.4);

  // Create robot body - more complex shape
  const bodyGeometry = new THREE.BoxGeometry(3.4, 4, 2.2);
  const body = new THREE.Mesh(bodyGeometry, robotMainMaterial);
  body.position.y = 0;
  
  // Add body details and panels
  const bodyDetailGeometry = new THREE.BoxGeometry(3.5, 1, 2.3);
  const bodyDetail = new THREE.Mesh(bodyDetailGeometry, robotSecondaryMaterial);
  bodyDetail.position.y = 1;
  
  // Add chest light/reactor
  const reactorGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16);
  const reactor = new THREE.Mesh(reactorGeometry, glowMaterial);
  reactor.rotation.x = Math.PI / 2;
  reactor.position.set(0, 0.5, 1.2);

  // Create robot arms with joints
  const shoulderGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const leftShoulder = new THREE.Mesh(shoulderGeometry, robotSecondaryMaterial);
  leftShoulder.position.set(-1.9, 1.5, 0);
  
  const rightShoulder = new THREE.Mesh(shoulderGeometry, robotSecondaryMaterial);
  rightShoulder.position.set(1.9, 1.5, 0);
  
  const upperArmGeometry = new THREE.BoxGeometry(0.6, 1.6, 0.6);
  const leftUpperArm = new THREE.Mesh(upperArmGeometry, robotMainMaterial);
  leftUpperArm.position.set(-1.9, 0.5, 0);
  
  const rightUpperArm = new THREE.Mesh(upperArmGeometry, robotMainMaterial);
  rightUpperArm.position.set(1.9, 0.5, 0);
  
  const elbowGeometry = new THREE.SphereGeometry(0.35, 16, 16);
  const leftElbow = new THREE.Mesh(elbowGeometry, robotSecondaryMaterial);
  leftElbow.position.set(-1.9, -0.4, 0);
  
  const rightElbow = new THREE.Mesh(elbowGeometry, robotSecondaryMaterial);
  rightElbow.position.set(1.9, -0.4, 0);
  
  const forearmGeometry = new THREE.BoxGeometry(0.5, 1.4, 0.5);
  const leftForearm = new THREE.Mesh(forearmGeometry, robotMainMaterial);
  leftForearm.position.set(-1.9, -1.3, 0);
  
  const rightForearm = new THREE.Mesh(forearmGeometry, robotMainMaterial);
  rightForearm.position.set(1.9, -1.3, 0);
  
  // Hands
  const handGeometry = new THREE.BoxGeometry(0.7, 0.4, 0.7);
  const leftHand = new THREE.Mesh(handGeometry, robotAccentMaterial);
  leftHand.position.set(-1.9, -2.2, 0);
  
  const rightHand = new THREE.Mesh(handGeometry, robotAccentMaterial);
  rightHand.position.set(1.9, -2.2, 0);

  // Create robot legs with joints
  const hipGeometry = new THREE.SphereGeometry(0.45, 16, 16);
  const leftHip = new THREE.Mesh(hipGeometry, robotSecondaryMaterial);
  leftHip.position.set(-0.9, -2.1, 0);
  
  const rightHip = new THREE.Mesh(hipGeometry, robotSecondaryMaterial);
  rightHip.position.set(0.9, -2.1, 0);
  
  const thighGeometry = new THREE.BoxGeometry(0.8, 1.7, 0.8);
  const leftThigh = new THREE.Mesh(thighGeometry, robotMainMaterial);
  leftThigh.position.set(-0.9, -3.1, 0);
  
  const rightThigh = new THREE.Mesh(thighGeometry, robotMainMaterial);
  rightThigh.position.set(0.9, -3.1, 0);
  
  const kneeGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const leftKnee = new THREE.Mesh(kneeGeometry, robotSecondaryMaterial);
  leftKnee.position.set(-0.9, -4.1, 0);
  
  const rightKnee = new THREE.Mesh(kneeGeometry, robotSecondaryMaterial);
  rightKnee.position.set(0.9, -4.1, 0);
  
  const calfGeometry = new THREE.BoxGeometry(0.7, 1.6, 0.7);
  const leftCalf = new THREE.Mesh(calfGeometry, robotMainMaterial);
  leftCalf.position.set(-0.9, -5.1, 0);
  
  const rightCalf = new THREE.Mesh(calfGeometry, robotMainMaterial);
  rightCalf.position.set(0.9, -5.1, 0);
  
  // Feet
  const footGeometry = new THREE.BoxGeometry(1, 0.4, 1.2);
  const leftFoot = new THREE.Mesh(footGeometry, robotAccentMaterial);
  leftFoot.position.set(-0.9, -6, 0.2);
  
  const rightFoot = new THREE.Mesh(footGeometry, robotAccentMaterial);
  rightFoot.position.set(0.9, -6, 0.2);

  // Create robot face features
  const mouthGeometry = new THREE.BoxGeometry(1.2, 0.25, 0.25);
  const mouth = new THREE.Mesh(mouthGeometry, glowMaterial);
  mouth.position.set(0, 2.6, 1.2);
  
  // Create ear-like structures
  const earGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.5);
  const leftEar = new THREE.Mesh(earGeometry, robotSecondaryMaterial);
  leftEar.position.set(-1.2, 3.2, 0);
  
  const rightEar = new THREE.Mesh(earGeometry, robotSecondaryMaterial);
  rightEar.position.set(1.2, 3.2, 0);

  // Create antennas with glowing tips
  const antennaGeometry = new THREE.CylinderGeometry(0.08, 0.12, 1.2, 8);
  const leftAntenna = new THREE.Mesh(antennaGeometry, robotSecondaryMaterial);
  leftAntenna.position.set(-0.7, 4.6, 0);
  leftAntenna.rotation.z = Math.PI / 12;
  
  const rightAntenna = new THREE.Mesh(antennaGeometry, robotSecondaryMaterial);
  rightAntenna.position.set(0.7, 4.6, 0);
  rightAntenna.rotation.z = -Math.PI / 12;
  
  const antennaTipGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const leftAntennaTip = new THREE.Mesh(antennaTipGeometry, glowMaterial);
  leftAntennaTip.position.set(-0.85, 5.2, 0);
  
  const rightAntennaTip = new THREE.Mesh(antennaTipGeometry, glowMaterial);
  rightAntennaTip.position.set(0.85, 5.2, 0);
  
  // Create central antenna
  const centerAntennaGeometry = new THREE.CylinderGeometry(0.1, 0.15, 1.4, 8);
  const centerAntenna = new THREE.Mesh(centerAntennaGeometry, robotSecondaryMaterial);
  centerAntenna.position.set(0, 4.8, 0);
  
  const centerAntennaTipGeometry = new THREE.SphereGeometry(0.25, 16, 16);
  const centerAntennaTip = new THREE.Mesh(centerAntennaTipGeometry, glowMaterial);
  centerAntennaTip.position.set(0, 5.5, 0);

  // Group all robot parts into a hierarchy for better animation
  // Create main robot group
  const robot = new THREE.Group();
  
  // Head group
  const headGroup = new THREE.Group();
  headGroup.add(head, headDetail, leftEye, rightEye, leftPupil, rightPupil, mouth, leftEar, rightEar);
  headGroup.add(leftAntenna, rightAntenna, centerAntenna, leftAntennaTip, rightAntennaTip, centerAntennaTip);
  
  // Body group
  const bodyGroup = new THREE.Group();
  bodyGroup.add(body, bodyDetail, reactor);
  
  // Left arm group
  const leftArmGroup = new THREE.Group();
  leftArmGroup.add(leftShoulder, leftUpperArm, leftElbow, leftForearm, leftHand);
  
  // Right arm group
  const rightArmGroup = new THREE.Group();
  rightArmGroup.add(rightShoulder, rightUpperArm, rightElbow, rightForearm, rightHand);
  
  // Left leg group
  const leftLegGroup = new THREE.Group();
  leftLegGroup.add(leftHip, leftThigh, leftKnee, leftCalf, leftFoot);
  
  // Right leg group
  const rightLegGroup = new THREE.Group();
  rightLegGroup.add(rightHip, rightThigh, rightKnee, rightCalf, rightFoot);
  
  // Add all groups to main robot
  robot.add(headGroup, bodyGroup, leftArmGroup, rightArmGroup, leftLegGroup, rightLegGroup);
  
  // Scale up the robot
  robot.scale.set(1.5, 1.5, 1.5);
  
  // Position robot to be centered
  robot.position.y = 1;
  
  return {
    robot,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    leftLegGroup,
    rightLegGroup,
    leftPupil, 
    rightPupil,
    reactor,
    leftAntennaTip,
    rightAntennaTip,
    centerAntennaTip,
    mouth
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
    
    // Create scene with an interesting background gradient
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    // Setup camera with wider FOV for more dramatic 3D effect
    const aspectRatio = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(85, aspectRatio, 0.1, 1000);
    camera.position.z = 12;
    camera.position.y = 0;
    
    // Create renderer with high quality settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    
    // Add more dramatic lighting for metallic materials
    const ambientLight = new THREE.AmbientLight(0x666666);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    
    const backLight = new THREE.DirectionalLight(0x6666ff, 0.8);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);
    
    const bottomLight = new THREE.DirectionalLight(0x55aaff, 0.5);
    bottomLight.position.set(0, -10, 5);
    scene.add(bottomLight);
    
    // Add robot to scene
    const robotParts = createRobot(scene);
    const { 
      robot, 
      headGroup, 
      leftArmGroup, 
      rightArmGroup, 
      leftLegGroup, 
      rightLegGroup,
      leftPupil,
      rightPupil,
      reactor,
      leftAntennaTip,
      rightAntennaTip,
      centerAntennaTip,
      mouth
    } = robotParts;
    
    scene.add(robot);
    robotRef.current = robotParts;
    
    // Setup more complex animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Always animate basic movement regardless of active state
      // Full body gentle floating motion
      robot.position.y = 1 + Math.sin(time * 1.5) * 0.2;
      
      // Head constantly looks around slightly
      headGroup.rotation.y = Math.sin(time * 0.8) * 0.15;
      headGroup.rotation.x = Math.sin(time * 0.5) * 0.05;
      
      // Make pupils move like eyes looking around
      leftPupil.position.x = -0.6 + Math.sin(time * 0.7) * 0.1;
      leftPupil.position.y = 3.3 + Math.sin(time * 0.5) * 0.05;
      rightPupil.position.x = 0.6 + Math.sin(time * 0.7) * 0.1;
      rightPupil.position.y = 3.3 + Math.sin(time * 0.5) * 0.05;
      
      // Gentle body rotation
      robot.rotation.y = Math.sin(time * 0.2) * 0.1;
      
      // Pulsating lights
      const pulseFactor = (Math.sin(time * 3) + 1) / 2;
      
      reactor.scale.set(
        1 + pulseFactor * 0.2,
        1 + pulseFactor * 0.2,
        1 + pulseFactor * 0.2
      );
      
      if (isActive) {
        // More pronounced animations when active
        
        // Energetic bobbing
        robot.position.y = 1 + Math.sin(time * 3) * 0.3;
        
        // More pronounced head movement
        headGroup.rotation.y = Math.sin(time * 1.5) * 0.25;
        
        // Wave arms energetically
        leftArmGroup.rotation.x = Math.sin(time * 2) * 0.2;
        leftArmGroup.rotation.z = Math.sin(time * 2.5) * 0.3;
        rightArmGroup.rotation.x = Math.sin(time * 2 + 1) * 0.2;
        rightArmGroup.rotation.z = -Math.sin(time * 2.5) * 0.3;
        
        // Shuffle feet slightly
        leftLegGroup.rotation.x = Math.sin(time * 2) * 0.1;
        rightLegGroup.rotation.x = -Math.sin(time * 2) * 0.1;
        
        // More dramatic body twist
        robot.rotation.y = Math.sin(time * 0.7) * 0.2;
        
        // Faster pulsing lights on antennas
        const fastPulseFactor = (Math.sin(time * 8) + 1) / 2;
        leftAntennaTip.scale.set(
          1 + fastPulseFactor * 0.5,
          1 + fastPulseFactor * 0.5,
          1 + fastPulseFactor * 0.5
        );
        rightAntennaTip.scale.set(
          1 + fastPulseFactor * 0.5,
          1 + fastPulseFactor * 0.5,
          1 + fastPulseFactor * 0.5
        );
        centerAntennaTip.scale.set(
          1 + fastPulseFactor * 0.7,
          1 + fastPulseFactor * 0.7,
          1 + fastPulseFactor * 0.7
        );
        
        // Animate mouth to simulate talking
        mouth.scale.y = 0.8 + Math.sin(time * 12) * 0.4;
      } else {
        // Gentler idle animations
        
        // Slight arm swaying
        leftArmGroup.rotation.z = Math.sin(time * 1.2) * 0.1;
        rightArmGroup.rotation.z = -Math.sin(time * 1.2) * 0.1;
        
        // Very subtle leg movement
        leftLegGroup.rotation.x = Math.sin(time * 1.1) * 0.03;
        rightLegGroup.rotation.x = -Math.sin(time * 1.1) * 0.03;
        
        // Slower pulsing lights on antennas
        const slowPulseFactor = (Math.sin(time * 2) + 1) / 2;
        leftAntennaTip.scale.set(
          1 + slowPulseFactor * 0.3,
          1 + slowPulseFactor * 0.3,
          1 + slowPulseFactor * 0.3
        );
        rightAntennaTip.scale.set(
          1 + slowPulseFactor * 0.3,
          1 + slowPulseFactor * 0.3,
          1 + slowPulseFactor * 0.3
        );
        centerAntennaTip.scale.set(
          1 + slowPulseFactor * 0.4,
          1 + slowPulseFactor * 0.4,
          1 + slowPulseFactor * 0.4
        );
      }
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    // Handle window resize
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
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
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