import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  smoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export default function HeroSection({ smoothScroll }: HeroSectionProps) {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Создаём цифровые решения для вашего бизнеса';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight min-h-[120px] sm:min-h-[160px] md:min-h-[240px]">
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/70">
              Веб-студия полного цикла в Иркутске: от идеи до запуска
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8" asChild>
                <a href="#calculator" onClick={(e) => smoothScroll(e, '#calculator')}>
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать стоимость
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8" asChild>
                <a href="#services" onClick={(e) => smoothScroll(e, '#services')}>
                  Наши услуги
                </a>
              </Button>
            </div>
          </div>
          <div className="relative animate-scale-in hidden lg:block">
            <img 
              src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/a85fcb09-fbcc-4ab6-9d4b-47f6738de2f3.png" 
              alt="Цифровые решения для бизнеса" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}