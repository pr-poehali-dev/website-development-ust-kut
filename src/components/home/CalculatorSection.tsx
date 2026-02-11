import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface CalculatorSectionProps {
  setIsDialogOpen: (open: boolean) => void;
}

export default function CalculatorSection({ setIsDialogOpen }: CalculatorSectionProps) {
  const calculatorRef = useScrollReveal();
  const [calculatorValues, setCalculatorValues] = useState({
    pages: [3],
    features: [5],
    design: [5]
  });

  const calculatePrice = () => {
    const basePrice = 30000;
    const pagePrice = calculatorValues.pages[0] * 5000;
    const featurePrice = calculatorValues.features[0] * 3000;
    const designPrice = calculatorValues.design[0] * 2000;
    return basePrice + pagePrice + featurePrice + designPrice;
  };

  return (
    <section id="calculator" className="py-20 px-4 relative overflow-hidden scroll-reveal" ref={calculatorRef}>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[hsl(var(--gradient-start))]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[hsl(var(--gradient-mid-2))]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-4 backdrop-blur-glass border-[hsl(var(--gradient-start))]">
            <span className="gradient-text">Калькулятор</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Рассчитайте стоимость</h2>
          <p className="text-xl text-muted-foreground">
            Примерная стоимость вашего проекта
          </p>
        </div>
        <Card className="p-8 gradient-border backdrop-blur-glass animate-scale-in">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-lg font-medium">Количество страниц</label>
                <span className="text-lg font-bold text-primary">{calculatorValues.pages[0]}</span>
              </div>
              <Slider
                value={calculatorValues.pages}
                onValueChange={(value) => setCalculatorValues({ ...calculatorValues, pages: value })}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-lg font-medium">Сложность функционала</label>
                <span className="text-lg font-bold text-primary">{calculatorValues.features[0]}/10</span>
              </div>
              <Slider
                value={calculatorValues.features}
                onValueChange={(value) => setCalculatorValues({ ...calculatorValues, features: value })}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-lg font-medium">Уровень дизайна</label>
                <span className="text-lg font-bold text-primary">{calculatorValues.design[0]}/10</span>
              </div>
              <Slider
                value={calculatorValues.design}
                onValueChange={(value) => setCalculatorValues({ ...calculatorValues, design: value })}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
            <div className="pt-6 border-t border-[hsl(var(--border))]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-semibold">Примерная стоимость:</span>
                <span className="text-4xl font-bold gradient-text">{calculatePrice().toLocaleString('ru-RU')} ₽</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                * Это примерный расчет. Точная стоимость определяется после обсуждения проекта.
              </p>
              <Button size="lg" className="w-full gradient-button button-hover-effect shadow-lg shadow-[hsl(var(--gradient-start))]/30" onClick={() => setIsDialogOpen(true)}>
                <Icon name="MessageSquare" className="mr-2" size={20} />
                Получить точный расчет
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
