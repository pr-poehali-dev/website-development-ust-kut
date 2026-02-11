import { useEffect, useRef } from 'react';

interface TiltOptions {
  max?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const {
    max = 15,
    scale = 1.05,
    speed = 400,
    glare = true,
    maxGlare = 0.3
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let glareElement: HTMLDivElement | null = null;

    if (glare) {
      glareElement = document.createElement('div');
      glareElement.className = 'tilt-glare';
      glareElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(135deg, 
          hsla(var(--gradient-start), 0.3), 
          hsla(var(--gradient-mid-1), 0.3),
          hsla(var(--gradient-mid-2), 0.3)
        );
        pointer-events: none;
        opacity: 0;
        transition: opacity ${speed}ms ease-out;
        z-index: 1;
      `;
      element.style.position = 'relative';
      element.style.transformStyle = 'preserve-3d';
      element.appendChild(glareElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const tiltX = -percentY * max;
      const tiltY = percentX * max;

      element.style.transform = `
        perspective(1000px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `;

      if (glareElement) {
        const glareOpacity = Math.min(
          Math.abs(percentX) + Math.abs(percentY),
          maxGlare
        );
        glareElement.style.opacity = glareOpacity.toString();
        glareElement.style.background = `
          radial-gradient(
            circle at ${x}px ${y}px,
            hsla(var(--gradient-start), ${glareOpacity}),
            hsla(var(--gradient-mid-1), ${glareOpacity * 0.5}),
            transparent
          )
        `;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      element.style.transition = `transform ${speed}ms ease-out`;
      
      if (glareElement) {
        glareElement.style.opacity = '0';
      }

      setTimeout(() => {
        element.style.transition = '';
      }, speed);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (glareElement && element.contains(glareElement)) {
        element.removeChild(glareElement);
      }
    };
  }, [max, scale, speed, glare, maxGlare]);

  return ref;
}
