import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, Sparkles, Crown, Check, ArrowRight, ChevronDown } from 'lucide-react';
import { AnimatedText, AnimatedLetters, RevealText } from '@/components/animations/AnimatedText';
import { GlowingCard, TiltCard } from '@/components/animations/GlowingCard';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    description: 'Perfect for startups and small businesses',
    price: '$5,000',
    priceNote: 'starting at',
    features: [
      '5-10 page website',
      'Responsive design',
      'Basic animations',
      'SEO optimization',
      'Contact form',
      '2 rounds of revisions',
      '1 month support',
    ],
    cta: 'Get Started',
    popular: false,
    gradient: 'from-blue-500/20 to-purple-500/20',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80',
  },
  {
    name: 'Professional',
    icon: Sparkles,
    description: 'For growing businesses that need more',
    price: '$15,000',
    priceNote: 'starting at',
    features: [
      '10-20 page website',
      'Custom design system',
      'Advanced animations',
      'CMS integration',
      '3D elements',
      'E-commerce ready',
      'Unlimited revisions',
      '3 months support',
    ],
    cta: 'Get Started',
    popular: true,
    gradient: 'from-primary/30 to-orange-500/20',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
  },
  {
    name: 'Enterprise',
    icon: Crown,
    description: 'For large-scale digital transformations',
    price: 'Custom',
    priceNote: 'contact us',
    features: [
      'Unlimited pages',
      'Full design system',
      'Complex animations',
      'Custom development',
      'Full 3D experiences',
      'API integrations',
      'Dedicated team',
      '12 months support',
      'Priority support',
    ],
    cta: 'Contact Us',
    popular: false,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80',
  },
];

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A Starter project typically takes 4-6 weeks, Professional projects 8-12 weeks, and Enterprise projects 3-6 months or more.',
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes! We offer flexible payment plans. Typically 50% upfront and 50% upon completion, or monthly payments for larger projects.',
  },
  {
    question: 'What\'s included in support?',
    answer: 'Support includes bug fixes, minor content updates, security patches, and performance monitoring. Additional development work is billed separately.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Absolutely! Many clients start with Starter and upgrade as their business grows. We make transitions seamless.',
  },
];

// 3D Components
const PricingGem = ({ position, scale = 1, color = "#ff4800" }: { position: [number, number, number]; scale?: number; color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

const FloatingRings = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 3 + i * 0.3, 0, i * 0.5]} scale={2 + i * 0.5}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshBasicMaterial color="#ff4800" transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
    </group>
  );
};

const PricingScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#ff4800" />
      <PricingGem position={[0, 0, 0]} scale={1.5} />
      <FloatingRings />
      <Environment preset="night" />
    </>
  );
};

// Pricing Card Section with parallax background
const PricingSection = ({ 
  plan, 
  index, 
  alignment 
}: { 
  plan: typeof plans[0]; 
  index: number; 
  alignment: 'left' | 'center' | 'right';
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50]);

  const getAlignment = () => {
    switch (alignment) {
      case 'left': return 'justify-start pl-8 md:pl-16 lg:pl-24';
      case 'center': return 'justify-center';
      case 'right': return 'justify-end pr-8 md:pr-16 lg:pr-24';
    }
  };

  const Icon = plan.icon;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-10" />
        <motion.img
          src={plan.image}
          alt={plan.name}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        />
        {/* Overlay gradient based on plan */}
        <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} mix-blend-overlay`} />
      </motion.div>

      {/* Animated SVG Pattern */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={alignment === 'left' ? 20 : alignment === 'right' ? 80 : 50}
              cy={50}
              r={10 + i * 8}
              fill="none"
              stroke="hsl(var(--primary) / 0.1)"
              strokeWidth="0.1"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 - i * 0.1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Card Container */}
      <div className={`container mx-auto px-4 relative z-20 flex ${getAlignment()}`}>
        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="w-full max-w-md"
        >
          <TiltCard className="h-full" tiltAmount={5}>
            <GlowingCard className="h-full">
              <div className={`relative p-8 rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl overflow-hidden`}>
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-1 -right-1 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-bl-lg rounded-tr-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Plan header */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${plan.gradient} mb-4`}>
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </motion.div>

                {/* Price */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
                  <div className="text-5xl font-bold text-foreground">{plan.price}</div>
                </motion.div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + featureIndex * 0.05 }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <MagneticButton>
                    <Button 
                      className={`w-full group ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-card border border-border hover:bg-accent'}`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </MagneticButton>
                </motion.div>
              </div>
            </GlowingCard>
          </TiltCard>
        </motion.div>
      </div>

      {/* Section indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        animate={{ y: [0, 10, 0] }}
        transition={{ y: { duration: 2, repeat: Infinity } }}
      >
        <ChevronDown className="w-8 h-8 text-primary/50" />
      </motion.div>
    </section>
  );
};

const Pricing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="section-padding relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* 3D Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <PricingScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Animated SVG Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={i}
                x1="0"
                y1={20 + i * 15}
                x2="100"
                y2={20 + i * 15}
                stroke="hsl(var(--primary) / 0.05)"
                strokeWidth="0.1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
            ))}
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Transparent Pricing
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <AnimatedLetters text="Investment in" className="block text-foreground" />
              <AnimatedLetters text="Excellence" className="block text-primary" delay={0.3} />
            </h1>
            
            <RevealText delay={0.6}>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Choose the perfect plan for your business. Scroll to explore each tier.
              </p>
            </RevealText>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center text-muted-foreground"
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <ChevronDown className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Sections - One by One */}
      {plans.map((plan, index) => (
        <PricingSection
          key={plan.name}
          plan={plan}
          index={index}
          alignment={index === 0 ? 'left' : index === 1 ? 'center' : 'right'}
        />
      ))}

      {/* FAQ Section */}
      <section className="section-padding py-32 bg-background relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="none"
              stroke="hsl(var(--primary) / 0.03)"
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <AnimatedLetters text="Common Questions" className="text-foreground" />
            </h2>
            <RevealText>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to know about working with us
              </p>
            </RevealText>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard tiltAmount={2}>
                  <div
                    className="border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm overflow-hidden cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="p-6 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-foreground">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-primary" />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === index ? 'auto' : 0,
                        opacity: openFaq === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <AnimatedLetters text="Ready to Start?" className="text-foreground" />
            </h2>
            <RevealText>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your project and find the perfect solution for your needs.
              </p>
            </RevealText>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <MagneticButton>
                <Button size="lg" className="text-lg px-8 py-6 group">
                  Schedule a Call
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
