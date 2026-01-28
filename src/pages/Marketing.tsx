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

export default function Marketing() {
  return (
    <>
      <VkButton />
      <MarketingContent />
    </>
  );
}

function MarketingContent() {
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
              Цифровой маркетинг
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Привлекаем клиентов через <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">интернет</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Комплексное продвижение в digital: контекстная реклама, SMM, email-маркетинг и таргет
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Запустить рекламу
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Наши услуги</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'MousePointerClick',
                  title: 'Контекстная реклама',
                  description: 'Яндекс.Директ и Google Ads — настройка и ведение рекламных кампаний с оплатой за результат'
                },
                {
                  icon: 'Users',
                  title: 'SMM-продвижение',
                  description: 'Ведение и продвижение в соцсетях: контент-план, посты, сторис, рилс, взаимодействие с аудиторией'
                },
                {
                  icon: 'Target',
                  title: 'Таргетированная реклама',
                  description: 'Настройка рекламы в ВКонтакте, Telegram, Одноклассниках на вашу целевую аудиторию'
                },
                {
                  icon: 'Mail',
                  title: 'Email-маркетинг',
                  description: 'Настройка рассылок, автоворонок, триггерных писем для повышения лояльности и допродаж'
                },
                {
                  icon: 'BarChart3',
                  title: 'Аналитика и CRM',
                  description: 'Настройка систем аналитики, коллтрекинга, интеграция с CRM для отслеживания эффективности'
                },
                {
                  icon: 'MessageSquare',
                  title: 'Чат-боты',
                  description: 'Разработка ботов для Telegram, ВК, WhatsApp для автоматизации продаж и поддержки'
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

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Почему с нами выгодно</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: 'TrendingUp',
                  title: 'Рост продаж',
                  description: 'Привлекаем только целевой трафик, который конвертируется в заявки и продажи'
                },
                {
                  icon: 'DollarSign',
                  title: 'Прозрачность бюджета',
                  description: 'Вы видите куда идут деньги, сколько стоит каждая заявка и какой ROI по каждому каналу'
                },
                {
                  icon: 'Zap',
                  title: 'Быстрый старт',
                  description: 'Запускаем первые кампании за 3-5 дней. Первые лиды начинают приходить сразу'
                },
                {
                  icon: 'LineChart',
                  title: 'Постоянная оптимизация',
                  description: 'Еженедельно анализируем данные и улучшаем кампании для снижения стоимости лида'
                }
              ].map((benefit, index) => (
                <Card key={index} className="hover:border-accent transition-colors">
                  <CardHeader>
                    <Icon name={benefit.icon} className="text-accent mb-3" size={40} />
                    <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                    <CardDescription className="text-foreground/70">
                      {benefit.description}
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
            <h2 className="text-4xl font-bold mb-12 text-center">Как мы работаем</h2>
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Анализ и стратегия',
                  description: 'Изучаем ваш бизнес, ЦА, конкурентов. Выбираем оптимальные каналы продвижения и составляем медиаплан.'
                },
                {
                  step: '02',
                  title: 'Настройка кампаний',
                  description: 'Создаём креативы, настраиваем таргетинги, пишем объявления. Устанавливаем системы аналитики.'
                },
                {
                  step: '03',
                  title: 'Запуск и тестирование',
                  description: 'Запускаем кампании с небольшим бюджетом, тестируем гипотезы, ищем наиболее эффективные связки.'
                },
                {
                  step: '04',
                  title: 'Масштабирование',
                  description: 'Увеличиваем бюджет на успешные кампании, отключаем неэффективные источники трафика.'
                },
                {
                  step: '05',
                  title: 'Оптимизация',
                  description: 'Постоянно улучшаем показатели: снижаем стоимость клика, повышаем CTR и конверсию.'
                },
                {
                  step: '06',
                  title: 'Отчётность',
                  description: 'Предоставляем детальные отчёты по всем показателям: лиды, продажи, ROMI, стоимость заявки.'
                }
              ].map((process, index) => (
                <Card key={index} className="hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="flex items-start gap-6">
                      <div className="text-6xl font-bold text-primary/20">{process.step}</div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{process.title}</CardTitle>
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
            <h2 className="text-4xl font-bold mb-8 text-center">Результаты наших клиентов</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-primary/20 text-center">
                <CardHeader>
                  <div className="text-5xl font-bold text-primary mb-2">-52%</div>
                  <CardTitle className="text-lg font-normal text-foreground/80">Снижение стоимости лида</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/60 text-sm">
                  За 3 месяца работы с контекстной рекламой
                </CardContent>
              </Card>
              <Card className="border-accent/20 text-center">
                <CardHeader>
                  <div className="text-5xl font-bold text-accent mb-2">+430%</div>
                  <CardTitle className="text-lg font-normal text-foreground/80">Рост продаж через соцсети</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/60 text-sm">
                  После запуска комплексного SMM
                </CardContent>
              </Card>
              <Card className="border-primary/20 text-center">
                <CardHeader>
                  <div className="text-5xl font-bold text-primary mb-2">340%</div>
                  <CardTitle className="text-lg font-normal text-foreground/80">Средний ROMI</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/60 text-sm">
                  Окупаемость рекламных инвестиций
                </CardContent>
              </Card>
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
                  price: '20 000',
                  description: 'Для тестирования и небольших бюджетов',
                  features: [
                    'Один канал на выбор',
                    'Настройка кампаний',
                    'Базовая аналитика',
                    'Отчёт раз в месяц',
                    'Чат-поддержка'
                  ]
                },
                {
                  name: 'Рост',
                  price: '40 000',
                  description: 'Комплексное продвижение',
                  features: [
                    '2-3 канала продвижения',
                    'Расширенная аналитика',
                    'A/B тестирование',
                    'Отчёты 2 раза в месяц',
                    'Созвоны по стратегии',
                    'Оптимизация воронки'
                  ],
                  popular: true
                },
                {
                  name: 'Максимум',
                  price: '80 000',
                  description: 'Для масштабного бизнеса',
                  features: [
                    'Все каналы маркетинга',
                    'Глубокая аналитика',
                    'Креативная студия',
                    'Еженедельные отчёты',
                    'Личный менеджер',
                    'Стратегические сессии',
                    'Приоритетная поддержка'
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

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Готовы начать привлекать клиентов?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Запустим первую рекламную кампанию за 3 дня и покажем результат
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
                  Запустить рекламу
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
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/development')}>Разработка сайтов</li>
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/seo')}>SEO-продвижение</li>
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/design')}>Веб-дизайн</li>
                <li className="cursor-pointer hover:text-primary">Цифровой маркетинг</li>
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