import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html, OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const services = [
  { name: 'Web Development', position: [2, 0.5, 0.5], description: 'Custom web applications built with cutting-edge technologies' },
  { name: 'UI/UX Design', position: [-1.5, 1.5, 1], description: 'User-centered design that converts visitors into customers' },
  { name: 'E-Commerce', position: [0.5, -1.5, 1.5], description: 'High-converting online stores with Shopify & custom solutions' },
  { name: '3D & Motion', position: [-2, -0.5, 0], description: 'Immersive 3D experiences and stunning animations' },
  { name: 'Mobile Apps', position: [1.5, 1, -1.5], description: 'Native and cross-platform mobile applications' },
  { name: 'Consulting', position: [-0.5, -1, -2], description: 'Strategic guidance for digital transformation' },
];

interface ServiceDotProps {
  position: [number, number, number];
  name: string;
  description: string;
  onHover: (name: string | null) => void;
  isActive: boolean;
}

const ServiceDot = ({ position, name, description, onHover, isActive }: ServiceDotProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(isActive ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(name)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? '#FF4800' : '#FF6B35'}
          emissive={isActive ? '#FF4800' : '#FF4800'}
          emissiveIntensity={isActive ? 2 : 0.5}
        />
      </mesh>
      {isActive && (
        <Html distanceFactor={10} position={[0.3, 0.3, 0]}>
          <div className="glass p-4 rounded-xl min-w-[200px] animate-fade-in">
            <h4 className="text-foreground font-semibold mb-1">{name}</h4>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

const GlobeCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Sphere args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#1E293B"
          transparent
          opacity={0.3}
          distort={0.2}
          speed={1}
          wireframe
        />
      </Sphere>
    </mesh>
  );
};

const GlobeContent = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && !hoveredService) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <GlobeCore />
      {services.map((service) => (
        <ServiceDot
          key={service.name}
          position={service.position as [number, number, number]}
          name={service.name}
          description={service.description}
          onHover={setHoveredService}
          isActive={hoveredService === service.name}
        />
      ))}
    </group>
  );
};

export const ServicesGlobe = () => {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#FF4800" intensity={0.5} />
        <Suspense fallback={null}>
          <GlobeContent />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};
