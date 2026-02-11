import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  smoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export default function HeroSection({ smoothScroll }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const colors = [
      'hsla(24, 95%, 53%, 0.4)',
      'hsla(330, 81%, 60%, 0.4)',
      'hsla(280, 65%, 60%, 0.4)',
      'hsla(210, 50%, 60%, 0.4)'
    ];

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.baseX += p.vx;
        p.baseY += p.vy;

        if (p.baseX < 0 || p.baseX > canvas.width) p.vx *= -1;
        if (p.baseY < 0 || p.baseY > canvas.height) p.vy *= -1;

        const dx = mouse.x - p.baseX;
        const dy = mouse.y - p.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          p.x = p.baseX + dx * force * 0.1;
          p.y = p.baseY + dy * force * 0.1;
        } else {
          p.x = p.baseX;
          p.y = p.baseY;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(24, 95%, 53%, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-start))]/5 via-background to-[hsl(var(--gradient-mid-1))]/5"></div>
      <div className="absolute top-20 -right-20 w-96 h-96 bg-[hsl(var(--gradient-start))]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 -left-20 w-96 h-96 bg-[hsl(var(--gradient-mid-2))]/10 rounded-full blur-3xl animate-pulse delay-300"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 rounded-full backdrop-blur-glass border border-[hsl(var(--border))]">
              <span className="text-sm font-medium gradient-text">🚀 Веб-студия нового поколения</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Создаём{' '}
              <span className="gradient-text">
                цифровые решения
              </span>{' '}
              для вашего бизнеса
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
              Веб-студия полного цикла в Иркутске: от идеи до запуска
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="gradient-button button-hover-effect text-base sm:text-lg px-6 sm:px-8 shadow-lg shadow-[hsl(var(--gradient-start))]/30" 
                asChild
              >
                <a href="#calculator" onClick={(e) => smoothScroll(e, '#calculator')}>
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать стоимость
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="outline-button-hover text-base sm:text-lg px-6 sm:px-8 border-[hsl(var(--border))] hover:border-[hsl(var(--gradient-start))] hover:text-[hsl(var(--gradient-start))]" 
                asChild
              >
                <a href="#services" onClick={(e) => smoothScroll(e, '#services')}>
                  Наши услуги
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid-1))] to-[hsl(var(--gradient-mid-2))] opacity-20 blur-3xl rounded-full animate-glow"></div>
            <img 
              src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/a85fcb09-fbcc-4ab6-9d4b-47f6738de2f3.png" 
              alt="Цифровые решения для бизнеса" 
              className="relative w-full h-auto drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}