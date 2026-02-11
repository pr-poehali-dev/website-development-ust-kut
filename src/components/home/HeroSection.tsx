import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  smoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export default function HeroSection({ smoothScroll }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
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
                className="bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid-1))] to-[hsl(var(--gradient-mid-2))] hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 shadow-lg shadow-[hsl(var(--gradient-start))]/30" 
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
                className="text-base sm:text-lg px-6 sm:px-8 border-[hsl(var(--border))] hover:border-[hsl(var(--gradient-start))] hover:text-[hsl(var(--gradient-start))] transition-all" 
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