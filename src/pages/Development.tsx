import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function Development() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Icon name="Sparkles" className="text-primary" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Элегия
            </span>
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
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Разработка сайтов
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Создаём <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">веб-сайты</span>,<br />которые работают на вас
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              От лендингов до сложных веб-платформ — разрабатываем сайты любой сложности с фокусом на результат
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Обсудить проект
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Типы сайтов, которые мы создаём</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Card key={index} className="group hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <CardHeader>
                    <Icon name={type.icon} className="text-accent group-hover:text-primary transition-colors mb-4" size={48} />
                    <CardTitle className="text-xl mb-2">{type.title}</CardTitle>
                    <Badge className="w-fit bg-primary/10 text-primary border-primary/20">{type.price}</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/70">
                      {type.description}
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
                <Card key={index} className="text-center hover:border-accent transition-colors">
                  <CardHeader>
                    <Icon name={tech.icon} className="text-accent mx-auto mb-2" size={40} />
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                    <CardDescription className="text-sm">{tech.description}</CardDescription>
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
            <h2 className="text-4xl font-bold mb-12 text-center">Процесс разработки</h2>
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Анализ и планирование',
                  description: 'Изучаем ваш бизнес, конкурентов и целевую аудиторию. Составляем техническое задание и прототип.',
                  duration: '3-5 дней'
                },
                {
                  step: '02',
                  title: 'Дизайн',
                  description: 'Создаём уникальный дизайн, который отражает ваш бренд. Разрабатываем все страницы и адаптивные версии.',
                  duration: '5-10 дней'
                },
                {
                  step: '03',
                  title: 'Разработка',
                  description: 'Верстаем сайт, программируем функционал, интегрируем с внешними сервисами и системами.',
                  duration: '10-20 дней'
                },
                {
                  step: '04',
                  title: 'Тестирование',
                  description: 'Проверяем работу на всех устройствах и браузерах, исправляем ошибки, оптимизируем производительность.',
                  duration: '2-5 дней'
                },
                {
                  step: '05',
                  title: 'Запуск и поддержка',
                  description: 'Размещаем сайт на хостинге, настраиваем аналитику. Обучаем работе с админ-панелью и предоставляем поддержку.',
                  duration: '2-3 дня'
                }
              ].map((process, index) => (
                <Card key={index} className="hover:border-primary transition-colors">
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
