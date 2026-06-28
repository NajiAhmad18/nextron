'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  scale = 1
}: ScrollRevealProps) {
  const getDirections = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: scale,
        ...getDirections()
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Apple-like easeOutExpo
      }}
    >
      {children}
    </motion.div>
  );
}
