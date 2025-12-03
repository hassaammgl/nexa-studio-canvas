import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

const FloatingAstronaut = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.5, 1, 4, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.7} />
        </mesh>
        
        {/* Helmet */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial 
            color="#333333" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#FF4800"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Visor */}
        <mesh position={[0, 0.9, 0.25]}>
          <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color="#FF4800" 
            metalness={1} 
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Backpack */}
        <mesh position={[0, 0.2, -0.5]}>
          <boxGeometry args={[0.6, 0.8, 0.3]} />
          <meshStandardMaterial color="#dddddd" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const positions = new Float32Array(500 * 3);
  for (let i = 0; i < 500; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} color="#FF4800" intensity={0.5} />
          <Suspense fallback={null}>
            <FloatingAstronaut />
            <Stars />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Houston, We Have a Problem
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Looks like this page got lost in space. Don't worry, our astronaut is 
            looking for it. In the meantime, let's get you back home.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <motion.button
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-4 h-4" />
              Go Home
            </motion.button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
