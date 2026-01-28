import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import VkButton from '@/components/VkButton';
import TelegramButton from '@/components/TelegramButton';
import CallbackButton from '@/components/CallbackButton';
import MobileHint from '@/components/MobileHint';

export default function Marketplaces() {
  return (
    <>
      <VkButton />
      <TelegramButton />
      <CallbackButton />
      <MobileHint />
      <MarketplacesContent />
    </>
  );
}

function MarketplacesContent() {
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
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/3e363ff2-4f8b-4f00-a7ce-75460e851e6e.png" alt="Элегия" className="h-16" />
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
              Вывод на маркетплейсы
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Выводим бизнес на <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">маркетплейсы</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Полный цикл запуска и продвижения на Wildberries, Ozon, Яндекс.Маркет и других площадках
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Начать продавать
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">На каких площадках работаем</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Wildberries',
                  icon: 'ShoppingBag',
                  description: 'Крупнейший маркетплейс России',
                  color: 'text-purple-500'
                },
                {
                  name: 'Ozon',
                  icon: 'Package',
                  description: 'Универсальная площадка',
                  color: 'text-blue-500'
                },
                {
                  name: 'Яндекс.Маркет',
                  icon: 'Store',
                  description: 'Торговая площадка Яндекса',
                  color: 'text-red-500'
                },
                {
                  name: 'AliExpress',
                  icon: 'Globe',
                  description: 'Международная торговля',
                  color: 'text-orange-500'
                }
              ].map((platform, index) => (
                <Card key={index} className="text-center hover:border-primary transition-all duration-300">
                  <CardHeader>
                    <Icon name={platform.icon} className={`${platform.color} mx-auto mb-4`} size={56} />
                    <CardTitle className="text-xl">{platform.name}</CardTitle>
                    <CardDescription>{platform.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Что мы делаем</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'FileCheck',
                  title: 'Регистрация и настройка',
                  description: 'Регистрируем магазин, настраиваем личный кабинет, подключаем способы оплаты и доставки'
                },
                {
                  icon: 'Camera',
                  title: 'Создание карточек товаров',
                  description: 'Профессиональная фотосъемка, написание продающих описаний, заполнение характеристик'
                },
                {
                  icon: 'Zap',
                  title: 'Оптимизация и SEO',
                  description: 'Подбор ключевых запросов, оптимизация карточек для поиска внутри маркетплейса'
                },
                {
                  icon: 'TrendingUp',
                  title: 'Реклама на площадках',
                  description: 'Настройка и ведение рекламных кампаний: поиск, баннеры, рекомендации'
                },
                {
                  icon: 'Package',
                  title: 'Логистика и склад',
                  description: 'Помощь в организации поставок на склады маркетплейсов, работа с FBO/FBS'
                },
                {
                  icon: 'BarChart3',
                  title: 'Аналитика и отчёты',
                  description: 'Мониторинг продаж, анализ юнит-экономики, конкурентный анализ, регулярные отчёты'
                }
              ].map((service, index) => (
                <Card key={index} className="hover:border-primary transition-all duration-300">
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

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Тарифы</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Старт',
                  price: '40 000',
                  description: 'Для запуска на одной площадке',
                  features: [
                    'Регистрация магазина',
                    'До 20 карточек товаров',
                    'Базовая оптимизация',
                    'Консультации по логистике',
                    'Отчёты раз в месяц'
                  ]
                },
                {
                  name: 'Рост',
                  price: '70 000',
                  description: 'Для активных продаж',
                  features: [
                    'Запуск на 2-3 площадках',
                    'До 100 карточек товаров',
                    'Продвинутая оптимизация',
                    'Настройка рекламы',
                    'Аналитика 2 раза в месяц',
                    'Работа с отзывами'
                  ],
                  popular: true
                },
                {
                  name: 'Максимум',
                  price: '120 000',
                  description: 'Полное ведение магазина',
                  features: [
                    'Все маркетплейсы',
                    'Неограниченно товаров',
                    'Полное ведение рекламы',
                    'Управление складом',
                    'Еженедельные отчёты',
                    'Личный менеджер',
                    'Работа с репутацией'
                  ]
                }
              ].map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Популярный</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-primary mt-4">
                      {plan.price} ₽<span className="text-base font-normal text-foreground/60">/мес</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon name="CheckCircle2" className="text-accent flex-shrink-0 mt-0.5" size={18} />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                          Выбрать тариф
                        </Button>
                      </DialogTrigger>
                    </Dialog>
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
            <h2 className="text-4xl font-bold mb-12 text-center">Преимущества работы с маркетплейсами</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: 'Users', title: 'Готовая аудитория', text: 'Миллионы покупателей уже ищут товары на площадках' },
                { icon: 'TrendingUp', title: 'Быстрый старт продаж', text: 'Первые заказы через несколько дней после запуска' },
                { icon: 'ShieldCheck', title: 'Доверие покупателей', text: 'Маркетплейсы гарантируют безопасность сделок' },
                { icon: 'Truck', title: 'Логистика решена', text: 'Не нужен свой склад — используйте инфраструктуру площадки' },
                { icon: 'CreditCard', title: 'Удобная оплата', text: 'Все способы оплаты уже настроены' },
                { icon: 'BarChart', title: 'Прозрачная аналитика', text: 'Подробная статистика продаж и поведения покупателей' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-foreground/70">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Готовы выйти на маркетплейсы?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Оставьте заявку, и мы проведём бесплатную консультацию по запуску вашего бизнеса
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
                  Получить консультацию
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
                <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/development')}>Разработка сайтов</li>
                <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/seo')}>SEO-продвижение</li>
                <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/design')}>Веб-дизайн</li>
                <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/marketing')}>Цифровой маркетинг</li>
                <li className="cursor-pointer hover:text-primary transition-colors">Вывод на маркетплейсы</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/')}>Главная</li>
                <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/portfolio')}>Портфолио</li>
                <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/blog')}>Блог</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-accent" />
                  г. Усть-Кут
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-accent" />
                  <a href="tel:+79039885627" className="hover:text-primary transition-colors">+7 (903) 988-56-27</a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} className="text-accent" />
                  <a href="mailto:elegy38@yandex.ru" className="hover:text-primary transition-colors">elegy38@yandex.ru</a>
                </li>
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
