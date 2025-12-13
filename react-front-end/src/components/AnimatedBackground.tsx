import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = Math.round((e.clientX / window.innerWidth) * 100);
      const y = Math.round((e.clientY / window.innerHeight) * 100);
      setPos({ x, y });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {/* Mouse-reactive glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px 300px at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.12), transparent 30%)`,
        }}
        transition={{ type: 'tween', duration: 0.2 }}
      />

      {/* Ambient floating particles */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none fixed z-0 rounded-full bg-[rgb(var(--accent))] opacity-10"
          style={{
            width: 6 + (i % 6),
            height: 6 + (i % 6),
            left: `${(i * 17) % 100}%`,
            top: `${(i * 29) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}