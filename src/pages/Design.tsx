import { useState } from 'react';
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

export default function Design() {
  return (
    <>
      <MobileHint />
      <DesignContent />
    </>
  );
}

function DesignContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
        <title>Веб-дизайн Усть-Кут | UI/UX дизайн сайтов | Элегия</title>
        <meta name="description" content="Профессиональный веб-дизайн сайтов в Усть-Куте: UI/UX дизайн, брендинг, фирстиль, логотипы. Современный дизайн, адаптивность, прототипирование. От 30 000 ₽" />
        <meta name="keywords" content="веб дизайн усть-кут, ui ux дизайн, дизайн сайта, брендинг, фирменный стиль, логотип, figma, прототип, адаптивный дизайн" />
        <link rel="canonical" href="https://elegiya-web.ru/design" />
        
        <meta property="og:title" content="Веб-дизайн и UI/UX дизайн сайтов | Элегия" />
        <meta property="og:description" content="Создаем современный дизайн сайтов и приложений. UI/UX, брендинг, фирстиль. Прототипирование, адаптивная верстка. От 30 000 ₽" />
        <meta property="og:url" content="https://elegiya-web.ru/design" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Веб-дизайн",
            "name": "UI/UX дизайн сайтов и приложений",
            "description": "Профессиональный веб-дизайн: создание уникального дизайна сайтов, приложений, брендинг, фирменный стиль",
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
                "name": "Дизайн лендинга",
                "description": "Дизайн одностраничного сайта с прототипом",
                "price": "30000",
                "priceCurrency": "RUB"
              },
              {
                "@type": "Offer",
                "name": "Дизайн многостраничного сайта",
                "description": "Полноценный дизайн с UI-китом и адаптивами",
                "price": "60000",
                "priceCurrency": "RUB"
              },
              {
                "@type": "Offer",
                "name": "Фирменный стиль",
                "description": "Разработка фирстиля с логотипом и брендбуком",
                "price": "50000",
                "priceCurrency": "RUB"
              }
            ]
          })}
        </script>
      </Helmet>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/119321e0-95b2-4cb8-a386-b4f1f1833d05.png" alt="Элегия" className="h-12 sm:h-14 md:h-16" />
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate('/')}>
              На главную
            </Button>
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

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Веб-дизайн
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Дизайн, который <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">продаёт</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Создаём уникальный UI/UX дизайн с фокусом на пользовательский опыт и конверсию
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Заказать дизайн
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Что мы разрабатываем</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Palette',
                  title: 'Дизайн сайтов',
                  description: 'Полное визуальное оформление всех страниц сайта с UI-kit и гайдлайнами'
                },
                {
                  icon: 'Smartphone',
                  title: 'Мобильные приложения',
                  description: 'Дизайн iOS и Android приложений с учётом нативных элементов платформ'
                },
                {
                  icon: 'Sparkles',
                  title: 'Брендинг',
                  description: 'Логотип, фирменный стиль, брендбук и все элементы айдентики'
                },
                {
                  icon: 'Layout',
                  title: 'Лендинги',
                  description: 'Продающие одностраничники с высокой конверсией и продуманной структурой'
                },
                {
                  icon: 'Image',
                  title: 'Баннеры и креативы',
                  description: 'Рекламные материалы для соцсетей, контекстной и таргетированной рекламы'
                },
                {
                  icon: 'Figma',
                  title: 'Редизайн',
                  description: 'Обновление устаревшего дизайна с сохранением узнаваемости бренда'
                }
              ].map((service, index) => (
                <Card key={index} className={`hover:border-primary transition-all duration-300 animate-card-appear delay-${(index + 1) * 100}`}>
                  <CardHeader>
                    <Icon name={service.icon} className="text-accent mb-4" size={48} />
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
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Наш подход к дизайну</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: 'Users',
                  title: 'User-centered подход',
                  description: 'Изучаем целевую аудиторию, её потребности и паттерны поведения. Дизайн ориентирован на удобство пользователя.'
                },
                {
                  icon: 'Target',
                  title: 'Фокус на конверсию',
                  description: 'Каждый элемент работает на достижение бизнес-целей. Используем проверенные UX-практики для роста продаж.'
                },
                {
                  icon: 'Lightbulb',
                  title: 'Уникальность',
                  description: 'Не используем шаблоны. Каждый проект — оригинальное решение, отражающее индивидуальность бренда.'
                },
                {
                  icon: 'Layers',
                  title: 'Дизайн-система',
                  description: 'Создаём полноценные UI-kit с компонентами, стилями и правилами для масштабируемости проекта.'
                }
              ].map((approach, index) => (
                <Card key={index} className={`hover:border-accent transition-colors animate-card-appear delay-${(index + 1) * 100}`}>
                  <CardHeader>
                    <Icon name={approach.icon} className="text-accent mb-3" size={40} />
                    <CardTitle className="text-xl mb-2">{approach.title}</CardTitle>
                    <CardDescription className="text-foreground/70">
                      {approach.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Процесс создания дизайна</h2>
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Исследование',
                  description: 'Изучаем бизнес, конкурентов, целевую аудиторию. Собираем референсы и определяем визуальное направление.',
                  duration: '2-3 дня'
                },
                {
                  step: '02',
                  title: 'Прототипирование',
                  description: 'Создаём структуру и логику интерфейса. Разрабатываем wireframes для всех ключевых экранов.',
                  duration: '3-5 дней'
                },
                {
                  step: '03',
                  title: 'Визуальный дизайн',
                  description: 'Разрабатываем цветовую палитру, типографику, иконки. Создаём финальный дизайн всех страниц.',
                  duration: '5-10 дней'
                },
                {
                  step: '04',
                  title: 'UI-kit и гайдлайны',
                  description: 'Собираем все компоненты в единую систему. Пишем правила использования элементов.',
                  duration: '2-3 дня'
                },
                {
                  step: '05',
                  title: 'Адаптивы',
                  description: 'Адаптируем дизайн под планшеты и мобильные устройства с учётом особенностей платформ.',
                  duration: '3-5 дней'
                },
                {
                  step: '06',
                  title: 'Передача в разработку',
                  description: 'Подготавливаем все макеты, ассеты и спецификации для разработчиков. Поддержка на этапе вёрстки.',
                  duration: '1-2 дня'
                }
              ].map((process, index) => (
                <Card key={index} className={`hover:border-primary transition-colors animate-card-appear delay-${(index + 1) * 100}`}>
                  <CardHeader>
                    <div className="flex items-start gap-6">
                      <div className="text-6xl font-bold text-primary/20">{process.step}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-2xl">{process.title}</CardTitle>
                          <Badge variant="outline" className="border-accent/20 text-accent">
                            {process.duration}
                          </Badge>
                        </div>
                        <CardDescription className="text-foreground/70 text-base">
                          {process.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Что вы получите</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: 'CheckCircle2', text: 'Дизайн всех страниц в Figma' },
                { icon: 'CheckCircle2', text: 'Адаптивы для планшетов и телефонов' },
                { icon: 'CheckCircle2', text: 'UI-kit со всеми компонентами' },
                { icon: 'CheckCircle2', text: 'Все исходники и экспорт ассетов' },
                { icon: 'CheckCircle2', text: 'Интерактивный прототип' },
                { icon: 'CheckCircle2', text: 'Гайдлайны и правила использования' },
                { icon: 'CheckCircle2', text: '3 раунда правок включены' },
                { icon: 'CheckCircle2', text: 'Поддержка при разработке' }
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
            <h2 className="text-4xl font-bold mb-6">Начнём работу над вашим дизайном?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Оставьте заявку, и мы обсудим ваш проект в деталях
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
                  Заказать дизайн
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/3e363ff2-4f8b-4f00-a7ce-75460e851e6e.png" alt="Элегия" className="h-10" />
              </div>
              <p className="text-sm text-foreground/60">
                Премиальная разработка сайтов и SEO-продвижение в Усть-Куте
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/development')}>Разработка сайтов</li>
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/seo')}>SEO-продвижение</li>
                <li className="cursor-pointer hover:text-primary">Веб-дизайн</li>
                <li>Цифровой маркетинг</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/')}>Главная</li>
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