import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, animate } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [cursorText, setCursorText] = useState('');
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  const springConfig = { damping: 20, stiffness: 400 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  // Slower spring for outer ring
  const ringSpringConfig = { damping: 30, stiffness: 200 };
  const ringX = useSpring(0, ringSpringConfig);
  const ringY = useSpring(0, ringSpringConfig);

  // Even slower spring for glow
  const glowSpringConfig = { damping: 40, stiffness: 100 };
  const glowX = useSpring(0, glowSpringConfig);
  const glowY = useSpring(0, glowSpringConfig);

  // Magnetic effect values
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let lastX = 0;
    let lastY = 0;
    let frameCount = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      cursorX.set(clientX);
      cursorY.set(clientY);
      ringX.set(clientX);
      ringY.set(clientY);
      glowX.set(clientX);
      glowY.set(clientY);

      // Add trail point every few frames for performance
      frameCount++;
      if (frameCount % 2 === 0) {
        const distance = Math.sqrt(
          Math.pow(clientX - lastX, 2) + Math.pow(clientY - lastY, 2)
        );
        
        if (distance > 5) {
          trailIdRef.current++;
          setTrail(prev => {
            const newTrail = [...prev, { x: clientX, y: clientY, id: trailIdRef.current }];
            // Keep only last 12 points
            return newTrail.slice(-12);
          });
          lastX = clientX;
          lastY = clientY;
        }
      }

      // Check for magnetic elements
      const magneticElement = document.elementFromPoint(clientX, clientY)?.closest('.magnetic');
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (clientX - centerX) * 0.3;
        const deltaY = (clientY - centerY) * 0.3;
        
        animate(magneticX, deltaX, { duration: 0.3 });
        animate(magneticY, deltaY, { duration: 0.3 });
      } else {
        animate(magneticX, 0, { duration: 0.3 });
        animate(magneticY, 0, { duration: 0.3 });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for cursor text
      const cursorTextElement = target.closest('[data-cursor-text]');
      if (cursorTextElement) {
        setCursorText(cursorTextElement.getAttribute('data-cursor-text') || '');
      }

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.magnetic')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-text]')) {
        setCursorText('');
      }
      setIsHovering(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Clean up old trail points
    const trailCleanup = setInterval(() => {
      setTrail(prev => prev.slice(-8));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearInterval(trailCleanup);
    };
  }, [cursorX, cursorY, ringX, ringY, glowX, glowY, magneticX, magneticY]);

  if (isMobile) return null;

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9995]"
          initial={{ 
            x: point.x, 
            y: point.y, 
            scale: 1,
            opacity: 0.6,
          }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            width: 8 - (trail.length - index) * 0.3,
            height: 8 - (trail.length - index) * 0.3,
            translateX: '-50%',
            translateY: '-50%',
            background: `radial-gradient(circle, hsl(24 100% 50% / ${0.4 + index * 0.05}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${10 + index * 2}px hsl(24 100% 50% / 0.3)`,
          }}
        />
      ))}

      {/* Large Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-[9996]"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, hsl(24 100% 50% / 0.15) 0%, hsl(24 100% 50% / 0.05) 40%, transparent 70%)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0.6,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Outer Ring with glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          borderWidth: isHovering ? 2 : 1,
          opacity: isClicking ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div 
          className="w-full h-full rounded-full border border-primary"
          style={{
            boxShadow: '0 0 20px hsl(24 100% 50% / 0.3), inset 0 0 20px hsl(24 100% 50% / 0.1)',
          }}
        />
      </motion.div>
      
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 10px hsl(24 100% 50% / 0.8), 0 0 20px hsl(24 100% 50% / 0.4)',
        }}
        animate={{
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Cursor Text (for special elements) */}
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full whitespace-nowrap"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: 'calc(-100% - 20px)',
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
        >
          {cursorText}
        </motion.div>
      )}

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};
