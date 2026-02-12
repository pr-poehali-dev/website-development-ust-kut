import { useState } from 'react';
import { useTilt } from '@/hooks/useTilt';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

import MobileHint from '@/components/MobileHint';
import Footer from '@/components/home/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function Development() {
  return (
    <>
      <ParticlesBackground />
      <MobileHint />
      <DevelopmentContent />
    </>
  );
}

function DevelopmentContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const serviceTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const advantageTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const techTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const typeTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const platformTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const serviceRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 100 }),
    useScrollReveal<HTMLDivElement>({ delay: 200 }),
    useScrollReveal<HTMLDivElement>({ delay: 300 }),
    useScrollReveal<HTMLDivElement>({ delay: 400 }),
    useScrollReveal<HTMLDivElement>({ delay: 500 })
  ];

  const advantageRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 100 }),
    useScrollReveal<HTMLDivElement>({ delay: 200 }),
    useScrollReveal<HTMLDivElement>({ delay: 300 })
  ];

  const techRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 100 }),
    useScrollReveal<HTMLDivElement>({ delay: 200 }),
    useScrollReveal<HTMLDivElement>({ delay: 300 }),
    useScrollReveal<HTMLDivElement>({ delay: 400 }),
    useScrollReveal<HTMLDivElement>({ delay: 500 })
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('https://functions.poehali.dev/facfc1c0-72cc-4f8e-8c21-113d5964b377', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'request',
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email')
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время.',
        });
        setIsDialogOpen(false);
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось отправить заявку',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Проблема с подключением к серверу',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Разработка сайтов Усть-Кут | Создание сайтов под ключ | Элегия</title>
        <meta name="description" content="Разработка сайтов любой сложности в Усть-Куте: лендинги от 35 000 ₽, корпоративные сайты, интернет-магазины, веб-порталы. Современный стек технологий, адаптивная верстка, SEO-оптимизация. Гарантия 12 месяцев" />
        <meta name="keywords" content="разработка сайтов усть-кут, создание сайтов, лендинг, интернет-магазин, корпоративный сайт, react, wordpress, веб-разработка, адаптивная верстка" />
        <link rel="canonical" href="https://elegiya-web.ru/development" />
        
        <meta property="og:title" content="Разработка сайтов в Усть-Куте под ключ | Элегия" />
        <meta property="og:description" content="Создаем современные сайты: лендинги, корпоративные сайты, интернет-магазины. От 35 000 ₽. React, WordPress, адаптивная верстка, SEO-оптимизация" />
        <meta property="og:url" content="https://elegiya-web.ru/development" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Разработка веб-сайтов",
            "name": "Разработка сайтов под ключ",
            "description": "Создание сайтов любой сложности: лендинги, корпоративные сайты, интернет-магазины, веб-порталы на современных технологиях",
            "provider": {
              "@type": "Organization",
              "name": "Элегия",
              "url": "https://elegiya-web.ru",
              "telephone": "+7 (903) 988-56-27",
              "email": "elegy38@yandex.ru"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Россия"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Лендинг",
                "description": "Продающие одностраничники с высокой конверсией",
                "price": "35000",
                "priceCurrency": "RUB"
              },
              {
                "@type": "Offer",
                "name": "Корпоративный сайт",
                "description": "Представительские сайты компаний с CMS",
                "price": "80000",
                "priceCurrency": "RUB"
              },
              {
                "@type": "Offer",
                "name": "Интернет-магазин",
                "description": "E-commerce с интеграцией платежей и 1С",
                "price": "150000",
                "priceCurrency": "RUB"
              }
            ]
          })}
        </script>
      </Helmet>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/119321e0-95b2-4cb8-a386-b4f1f1833d05.png" alt="Элегия" className="h-10 sm:h-12 md:h-14" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" onClick={() => navigate('/')} size="sm" className="hidden sm:flex">
              На главную
            </Button>
            <Button variant="ghost" onClick={() => navigate('/')} size="icon" className="sm:hidden">
              <Icon name="Home" size={20} />
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90" size="sm">Связаться</Button>
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
                    <Input name="name" required placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input name="phone" required type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input name="email" required type="email" placeholder="ivan@example.com" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-[hsl(var(--gradient-start))]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-[hsl(var(--gradient-mid-2))]/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-in">
              <Badge className="mb-4 sm:mb-6 backdrop-blur-glass border-[hsl(var(--gradient-start))]">
                <span className="gradient-text">Разработка сайтов</span>
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Создаём{' '}
                <span className="gradient-text whitespace-nowrap">
                  веб-сайты
                </span>
                ,<br />
                которые работают{' '}
                <span className="whitespace-nowrap">на вас</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">
                От лендингов до сложных веб-платформ — разрабатываем сайты любой сложности с фокусом на результат
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gradient-button button-hover-effect text-base sm:text-lg px-6 sm:px-8 shadow-lg shadow-[hsl(var(--gradient-start))]/30">
                    Обсудить проект
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
            <div className="animate-fade-in flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid-1))] to-[hsl(var(--gradient-mid-2))] opacity-20 blur-3xl rounded-2xl animate-glow"></div>
                <img 
                  src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/147741a5-48df-4323-b3b0-79fe8097427b.png" 
                  alt="Адаптивная разработка сайтов - примеры на разных устройствах" 
                  className="relative w-full max-w-2xl h-auto rounded-2xl shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--gradient-mid-1))]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Типы сайтов, которые мы создаём</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {[
                {
                  icon: 'Store',
                  title: 'Интернет-магазины',
                  description: 'E-commerce платформы с интеграцией платёжных систем, CRM и складского учёта',
                  price: 'от 150 000 ₽'
                },
                {
                  icon: 'Building2',
                  title: 'Корпоративные сайты',
                  description: 'Представительские сайты компаний с каталогами услуг и системой управления контентом',
                  price: 'от 80 000 ₽'
                },
                {
                  icon: 'Rocket',
                  title: 'Лендинги',
                  description: 'Продающие одностраничники с высокой конверсией для товаров и услуг',
                  price: 'от 35 000 ₽'
                },
                {
                  icon: 'Users',
                  title: 'Порталы и сервисы',
                  description: 'Сложные веб-приложения с личными кабинетами, API и интеграциями',
                  price: 'от 250 000 ₽'
                },
                {
                  icon: 'Newspaper',
                  title: 'Блоги и медиа',
                  description: 'Новостные порталы и блог-платформы с системой публикаций и комментариев',
                  price: 'от 60 000 ₽'
                },
                {
                  icon: 'FileText',
                  title: 'Каталоги',
                  description: 'Сайты-каталоги товаров, услуг, недвижимости с фильтрами и поиском',
                  price: 'от 100 000 ₽'
                }
              ].map((type, index) => (
                <div key={index} ref={serviceRevealRefs[index]}>
                  <Card ref={typeTiltRefs[index]} className="gradient-border backdrop-blur-glass group overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-[hsl(var(--gradient-start))]/20 h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--gradient-start))]/20 to-[hsl(var(--gradient-mid-1))]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <Icon name={type.icon} className="gradient-text" size={32} />
                    </div>
                    <CardTitle className="text-xl mb-2">{type.title}</CardTitle>
                    <Badge className="w-fit backdrop-blur-glass border-[hsl(var(--gradient-start))]">
                      <span className="gradient-text">{type.price}</span>
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {type.description}
                    </CardDescription>
                  </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Технологии и платформы</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'React', icon: 'Code', description: 'Современные SPA-приложения' },
                { name: 'WordPress', icon: 'FileCode', description: 'CMS для управления контентом' },
                { name: 'Tilda', icon: 'Layout', description: 'Быстрый запуск лендингов' },
                { name: 'Node.js', icon: 'Server', description: 'Backend и API' },
                { name: 'Next.js', icon: 'Layers', description: 'SSR и SEO-оптимизация' },
                { name: 'PostgreSQL', icon: 'Database', description: 'Надёжные базы данных' },
                { name: 'AWS', icon: 'Cloud', description: 'Облачная инфраструктура' },
                { name: 'Docker', icon: 'Package', description: 'Контейнеризация' }
              ].map((tech, index) => (
                <div key={index} ref={techRevealRefs[index % 6]}>
                  <Card ref={platformTiltRefs[index]} className="text-center transition-shadow duration-300 overflow-hidden h-full">
                    <CardHeader>
                      <Icon name={tech.icon} className="text-accent mx-auto mb-2" size={40} />
                      <CardTitle className="text-lg">{tech.name}</CardTitle>
                      <CardDescription className="text-sm">{tech.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Как мы работаем
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Процесс разработки</h2>
              <p className="text-lg text-foreground/70">
                От идеи до запуска за 5 простых шагов
              </p>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-accent/20 to-primary/20 -translate-x-1/2"></div>

              <div className="space-y-12">
                {[
                  {
                    step: '01',
                    title: 'Анализ и планирование',
                    description: 'Изучаем ваш бизнес, конкурентов и целевую аудиторию. Составляем техническое задание и прототип сайта.',
                    icon: 'Search',
                    duration: '3-5 дней',
                    align: 'left'
                  },
                  {
                    step: '02',
                    title: 'Дизайн',
                    description: 'Создаём уникальный дизайн, который отражает ваш бренд. Разрабатываем все страницы и адаптивные версии.',
                    icon: 'Palette',
                    duration: '5-10 дней',
                    align: 'right'
                  },
                  {
                    step: '03',
                    title: 'Разработка',
                    description: 'Верстаем сайт, программируем функционал, интегрируем с внешними сервисами и системами.',
                    icon: 'Code2',
                    duration: '10-20 дней',
                    align: 'left'
                  },
                  {
                    step: '04',
                    title: 'Тестирование',
                    description: 'Проверяем работу на всех устройствах и браузерах, исправляем ошибки, оптимизируем производительность.',
                    icon: 'Bug',
                    duration: '2-5 дней',
                    align: 'right'
                  },
                  {
                    step: '05',
                    title: 'Запуск и поддержка',
                    description: 'Размещаем сайт на хостинге, настраиваем аналитику. Обучаем работе с админ-панелью и предоставляем поддержку.',
                    icon: 'Rocket',
                    duration: '2-3 дня',
                    align: 'left'
                  }
                ].map((process, index) => (
                  <div key={index} className={`relative lg:grid lg:grid-cols-2 lg:gap-12 animate-fade-in delay-${(index + 1) * 100}`}>
                    {process.align === 'left' ? (
                      <>
                        {/* Content on left */}
                        <Card className="hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10">
                          <CardHeader>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                                <Icon name={process.icon} className="text-white" size={24} />
                              </div>
                              <div className="flex-1">
                                <div className="text-xs font-semibold text-primary mb-1">ШАГ {process.step}</div>
                                <CardTitle className="text-xl">{process.title}</CardTitle>
                              </div>
                              <Badge variant="outline" className="border-accent/20 text-accent hidden sm:flex">
                                {process.duration}
                              </Badge>
                            </div>
                            <CardDescription className="text-foreground/70 text-base">
                              {process.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                        {/* Empty space on right for desktop */}
                        <div className="hidden lg:block"></div>
                      </>
                    ) : (
                      <>
                        {/* Empty space on left for desktop */}
                        <div className="hidden lg:block"></div>
                        {/* Content on right */}
                        <Card className="hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10">
                          <CardHeader>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                                <Icon name={process.icon} className="text-white" size={24} />
                              </div>
                              <div className="flex-1">
                                <div className="text-xs font-semibold text-primary mb-1">ШАГ {process.step}</div>
                                <CardTitle className="text-xl">{process.title}</CardTitle>
                              </div>
                              <Badge variant="outline" className="border-accent/20 text-accent hidden sm:flex">
                                {process.duration}
                              </Badge>
                            </div>
                            <CardDescription className="text-foreground/70 text-base">
                              {process.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </>
                    )}

                    {/* Center dot for desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-8 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background z-10"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Что входит в разработку</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: 'CheckCircle2', text: 'Уникальный дизайн без шаблонов' },
                { icon: 'CheckCircle2', text: 'Адаптивная вёрстка для всех устройств' },
                { icon: 'CheckCircle2', text: 'Панель администратора (CMS)' },
                { icon: 'CheckCircle2', text: 'SEO-оптимизация структуры' },
                { icon: 'CheckCircle2', text: 'Интеграция с аналитикой (Яндекс.Метрика, Google Analytics)' },
                { icon: 'CheckCircle2', text: 'Настройка хостинга и домена' },
                { icon: 'CheckCircle2', text: 'SSL-сертификат для безопасности' },
                { icon: 'CheckCircle2', text: 'Обучение работе с сайтом' },
                { icon: 'CheckCircle2', text: 'Гарантия 12 месяцев' },
                { icon: 'CheckCircle2', text: 'Техническая поддержка 30 дней' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Icon name={item.icon} className="text-accent flex-shrink-0" size={24} />
                  <span className="text-foreground/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Готовы начать проект?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Оставьте заявку, и мы свяжемся с вами в течение часа для обсуждения деталей
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
                  Начать проект
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}