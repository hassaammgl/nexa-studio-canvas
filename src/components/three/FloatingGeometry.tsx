import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, 0, 0]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <MeshDistortMaterial
          color="#FF4800"
          distort={0.2}
          speed={2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingOctahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-2, 1, -1]}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial
          color="#FF6B35"
          roughness={0.2}
          metalness={0.9}
          emissive="#FF4800"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const FloatingIcosahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, -1.5, 0.5]}>
        <icosahedronGeometry args={[0.6]} />
        <meshStandardMaterial
          color="#FF4800"
          roughness={0.1}
          metalness={1}
          wireframe
        />
      </mesh>
    </Float>
  );
};

export const FloatingGeometry = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} color="#FF4800" intensity={0.8} />
        <Suspense fallback={null}>
          <FloatingTorus />
          <FloatingOctahedron />
          <FloatingIcosahedron />
        </Suspense>
      </Canvas>
    </div>
  );
};
