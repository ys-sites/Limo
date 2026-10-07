import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "motion/react";
import "./ShinyText.css";

export interface ShinyTextProps {
  text?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  children,
  disabled = false,
  speed = 2.5,
  className = "",
  color = "#D7B65D",
  shineColor = "#FFF3C4",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const directionRef = useRef(direction === "left" ? 1 : -1);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  // Viewport intersection observer to eliminate offscreen CPU/GPU lag
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((time) => {
    // Only animate when visible and not paused
    if (disabled || isPaused || !isInView) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    elapsedRef.current += delta;

    if (elapsedRef.current < delayDuration) return;

    const animElapsed = elapsedRef.current - delayDuration;

    if (yoyo) {
      const cycleTime = animElapsed % (animationDuration * 2);
      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100);
      } else {
        progress.set((1 - (cycleTime - animationDuration) / animationDuration) * 100);
      }
    } else {
      // Luxury sweep: 1.2s calm rest between shines, smooth off-screen entrance and exit
      const totalCycle = animationDuration + 1400;
      const cycleTime = animElapsed % totalCycle;
      if (cycleTime > animationDuration) {
        progress.set(directionRef.current === 1 ? 160 : -60);
      } else {
        const p = cycleTime / animationDuration;
        const start = -40;
        const range = 180;
        progress.set(directionRef.current === 1 ? start + p * range : (start + range) - p * range);
      }
    }
  });

  const background = useTransform(progress, (val) => {
    const half = spread / 2;
    return `linear-gradient(${direction === 'left' ? '90deg' : '270deg'}, ${color} 0%, ${color} ${val - half}%, ${shineColor} ${val}%, ${color} ${val + half}%, ${color} 100%)`;
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  return (
    <motion.span
      ref={elementRef}
      className={`shiny-text ${className}`}
      style={{
        backgroundImage: disabled ? undefined : background,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: disabled ? color : "transparent",
        color: color,
        display: "inline-block",
        willChange: isInView ? "background-position" : "auto",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text || children}
    </motion.span>
  );
};

export default ShinyText;
