import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'motion/react';

interface TiltCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  maxTilt?: number;
  enableGlare?: boolean;
  className?: string;
  glareColor?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  maxTilt = 7,
  enableGlare = true,
  className = '',
  glareColor = 'rgba(212, 175, 55, 0.12)',
  ...motionProps
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position normalized between -0.5 and 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Glare position in percentages (0% to 100%)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  // Smooth springs for fluid, physics-based tilt
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });
  const glareOpacitySpring = useSpring(glareOpacity, { stiffness: 180, damping: 20 });

  // Transforms to rotation angles in degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);

    const mouseXPercent = ((e.clientX - rect.left) / width) * 100;
    const mouseYPercent = ((e.clientY - rect.top) / height) * 100;

    glareX.set(mouseXPercent);
    glareY.set(mouseYPercent);
    glareOpacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative ${className}`}
        {...motionProps}
      >
        {children}

        {/* Specular Glare Effect */}
        {enableGlare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl z-20 transition-opacity duration-300"
            style={{
              opacity: glareOpacitySpring,
              background: useTransform(
                [glareX, glareY],
                ([latestX, latestY]) =>
                  `radial-gradient(circle 280px at ${latestX}% ${latestY}%, ${glareColor}, transparent 70%)`
              ),
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
