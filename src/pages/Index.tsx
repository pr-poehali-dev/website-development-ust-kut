import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const [calculatorValues, setCalculatorValues] = useState({
    pages: [3],
    features: [5],
    design: [5]
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const calculatePrice = () => {
    const basePrice = 30000;
    const pagePrice = calculatorValues.pages[0] * 5000;
    const featurePrice = calculatorValues.features[0] * 3000;
    const designPrice = calculatorValues.design[0] * 2000;
    return basePrice + pagePrice + featurePrice + designPrice;
  };

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время.',
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-primary" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Элегия
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" onClick={(e) => smoothScroll(e, '#services')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
              Услуги
            </a>
            <span onClick={() => navigate('/portfolio')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
              Портфолио
            </span>
            <a href="#calculator" onClick={(e) => smoothScroll(e, '#calculator')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
              Калькулятор
            </a>
            <a href="#reviews" onClick={(e) => smoothScroll(e, '#reviews')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
              Отзывы
            </a>
            <a href="#blog" onClick={(e) => smoothScroll(e, '#blog')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
              Блог
            </a>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">Связаться</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Оставьте заявку</DialogTitle>
                  <DialogDescription>
                    Заполните форму, и мы свяжемся с вами в течение часа
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <Input required placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input required type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input required type="email" placeholder="ivan@example.com" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 mt-8">
                <a href="#services" onClick={(e) => smoothScroll(e, '#services')} className="text-lg hover:text-primary transition-colors">
                  Услуги
                </a>
                <a href="#portfolio" onClick={(e) => smoothScroll(e, '#portfolio')} className="text-lg hover:text-primary transition-colors">
                  Портфолио
                </a>
                <a href="#calculator" onClick={(e) => smoothScroll(e, '#calculator')} className="text-lg hover:text-primary transition-colors">
                  Калькулятор
                </a>
                <a href="#reviews" onClick={(e) => smoothScroll(e, '#reviews')} className="text-lg hover:text-primary transition-colors">
                  Отзывы
                </a>
                <a href="#blog" onClick={(e) => smoothScroll(e, '#blog')} className="text-lg hover:text-primary transition-colors">
                  Блог
                </a>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 w-full">Связаться</Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                Веб-разработка в Усть-Куте
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Создаём сайты,
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  которые продают
                </span>
              </h1>
              <p className="text-xl text-foreground/70 mb-8">
                Премиальная разработка сайтов, SEO-продвижение и цифровой маркетинг 
                для бизнеса в Усть-Куте и по всей России
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                      Заказать проект
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button size="lg" variant="outline" className="text-lg px-8 border-accent text-accent hover:bg-accent/10" onClick={(e) => smoothScroll(e as any, '#portfolio')}>
                  Наше портфолио
                </Button>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 blur-3xl"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                      <div className="w-3 h-3 rounded-full bg-accent/60"></div>
                      <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                    <div className="h-4 bg-accent/20 rounded w-full"></div>
                    <div className="h-4 bg-primary/20 rounded w-5/6"></div>
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mt-4 flex items-center justify-center">
                      <Icon name="Laptop" className="text-primary/40" size={64} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="h-16 bg-accent/10 rounded"></div>
                      <div className="h-16 bg-primary/10 rounded"></div>
                      <div className="h-16 bg-accent/10 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl w-32">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-primary/20 rounded w-full"></div>
                    <div className="h-2 bg-accent/20 rounded w-4/5"></div>
                    <div className="h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg flex items-center justify-center mt-2">
                      <Icon name="Smartphone" className="text-accent/40" size={32} />
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      <div className="h-6 bg-primary/10 rounded"></div>
                      <div className="h-6 bg-accent/10 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-6">О нашем агентстве</h2>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Элегия — премиальное веб-агентство полного цикла в Усть-Куте. 
                Мы специализируемся на разработке эксклюзивных сайтов, 
                комплексном SEO-продвижении и цифровом маркетинге.
              </p>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Наша команда экспертов создаёт решения, которые не только красиво выглядят, 
                но и приносят реальный результат вашему бизнесу.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <div className="text-sm text-foreground/60">Проектов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">98%</div>
                  <div className="text-sm text-foreground/60">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">7 лет</div>
                  <div className="text-sm text-foreground/60">На рынке</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"></div>
              <div className="relative bg-card border border-border rounded-lg p-8">
                <Icon name="Award" className="text-accent mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-4">Качество превыше всего</h3>
                <p className="text-foreground/70">
                  Каждый проект — это уникальное решение, созданное с вниманием 
                  к деталям и заточенное под конкретные цели вашего бизнеса.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-foreground/70 text-lg">
              Полный спектр услуг для развития вашего бизнеса в интернете
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Code',
                title: 'Разработка сайтов',
                description: 'Создание современных сайтов на React, WordPress и других платформах',
                link: '/development'
              },
              {
                icon: 'TrendingUp',
                title: 'SEO-продвижение',
                description: 'Комплексное продвижение в поисковых системах Яндекс и Google',
                link: '/seo'
              },
              {
                icon: 'Palette',
                title: 'Веб-дизайн',
                description: 'Эксклюзивный дизайн, который выделит ваш бренд среди конкурентов',
                link: '/design'
              },
              {
                icon: 'Megaphone',
                title: 'Цифровой маркетинг',
                description: 'Контекстная реклама, SMM и email-маркетинг для роста продаж',
                link: '/marketing'
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className="group hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                onClick={() => service.link && navigate(service.link)}
              >
                <CardHeader>
                  <Icon 
                    name={service.icon} 
                    className="text-accent group-hover:text-primary transition-colors mb-4" 
                    size={40} 
                  />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Портфолио</h2>
            <p className="text-foreground/70 text-lg">
              Проекты, которыми мы гордимся
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Интернет-магазин техники', category: 'E-commerce', image: '🛒' },
              { title: 'Корпоративный сайт', category: 'Бизнес', image: '🏢' },
              { title: 'Лендинг для стартапа', category: 'Landing Page', image: '🚀' },
              { title: 'Онлайн-школа', category: 'Образование', image: '📚' },
              { title: 'Ресторан', category: 'HoReCa', image: '🍽️' },
              { title: 'Медицинский центр', category: 'Медицина', image: '🏥' }
            ].map((project, index) => (
              <Card 
                key={index}
                className="group overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-accent/10 text-accent border-accent/20">
                    {project.category}
                  </Badge>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Калькулятор стоимости</h2>
            <p className="text-foreground/70 text-lg">
              Узнайте примерную стоимость вашего проекта
            </p>
          </div>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Рассчитайте стоимость проекта</CardTitle>
              <CardDescription>Выберите параметры вашего будущего сайта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Количество страниц: {calculatorValues.pages[0]}
                </label>
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
                <label className="text-sm font-medium mb-3 block">
                  Уровень функционала (1-10): {calculatorValues.features[0]}
                </label>
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
                <label className="text-sm font-medium mb-3 block">
                  Сложность дизайна (1-10): {calculatorValues.design[0]}
                </label>
                <Slider
                  value={calculatorValues.design}
                  onValueChange={(value) => setCalculatorValues({ ...calculatorValues, design: value })}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Примерная стоимость:</span>
                  <span className="text-3xl font-bold text-primary">
                    {calculatePrice().toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">
                      Получить точный расчёт
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-foreground/70 text-lg">
              Что говорят о нас наши клиенты
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Алексей Морозов',
                company: 'ООО "ТехноТрейд"',
                text: 'Отличная работа! Сайт получился современным и удобным. Конверсия выросла на 45% за первый месяц.',
                rating: 5
              },
              {
                name: 'Елена Соколова',
                company: 'Медицинский центр "Здоровье"',
                text: 'Профессиональный подход на всех этапах. Особенно понравилась работа с SEO — мы в топе по всем ключевым запросам.',
                rating: 5
              },
              {
                name: 'Игорь Петров',
                company: 'Ресторан "Сибирь"',
                text: 'Красивый дизайн и быстрая загрузка. Теперь половина заказов приходит через сайт. Спасибо команде!',
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index} className="hover:border-accent transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-accent fill-accent" size={16} />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <CardDescription>{review.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 italic">&ldquo;{review.text}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Блог</h2>
            <p className="text-foreground/70 text-lg">
              Полезные статьи о веб-разработке и продвижении
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Как выбрать платформу для интернет-магазина в 2026 году',
                date: '15 января 2026',
                category: 'E-commerce',
                icon: '🛍️'
              },
              {
                title: 'SEO-тренды 2026: что важно для продвижения',
                date: '10 января 2026',
                category: 'SEO',
                icon: '📈'
              },
              {
                title: 'Адаптивный дизайн: почему это критично для бизнеса',
                date: '5 января 2026',
                category: 'Веб-дизайн',
                icon: '📱'
              }
            ].map((post, index) => (
              <Card 
                key={index}
                className="group hover:border-primary transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-6xl">
                  {post.icon}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-accent/20 text-accent">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-foreground/50">{post.date}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto text-accent hover:text-accent/80">
                    Читать далее →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-foreground/70 text-lg">
              Готовы обсудить ваш проект? Заполните форму или позвоните нам
            </p>
          </div>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                  <Input required placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input required type="email" placeholder="ivan@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон</label>
                  <Input required type="tel" placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Сообщение</label>
                  <Textarea 
                    placeholder="Расскажите о вашем проекте..." 
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Отправить заявку
                </Button>
              </form>
              <div className="mt-8 pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" className="text-accent" size={24} />
                    <div>
                      <div className="text-sm text-foreground/60">Телефон</div>
                      <div className="font-medium">+7 (999) 123-45-67</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" className="text-accent" size={24} />
                    <div>
                      <div className="text-sm text-foreground/60">Email</div>
                      <div className="font-medium">info@elegia.ru</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sparkles" className="text-primary" size={28} />
                <span className="text-xl font-bold">Элегия</span>
              </div>
              <p className="text-sm text-foreground/60">
                Премиальная разработка сайтов и SEO-продвижение в Усть-Куте
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>Разработка сайтов</li>
                <li>SEO-продвижение</li>
                <li>Веб-дизайн</li>
                <li>Цифровой маркетинг</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>О нас</li>
                <li>Портфолио</li>
                <li>Блог</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>г. Усть-Кут</li>
                <li>+7 (999) 123-45-67</li>
                <li>info@elegia.ru</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-foreground/60">
            © 2026 Элегия. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}