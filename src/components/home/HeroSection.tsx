import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  smoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export default function HeroSection({ smoothScroll }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Создаём <span className="text-primary">цифровые</span> решения для вашего бизнеса
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70">
            Веб-студия полного цикла в Усть-Куте: от идеи до запуска
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8" asChild>
              <a href="#calculator" onClick={(e) => smoothScroll(e, '#calculator')}>
                <Icon name="Calculator" className="mr-2" size={20} />
                Рассчитать стоимость
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="#services" onClick={(e) => smoothScroll(e, '#services')}>
                Наши услуги
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
