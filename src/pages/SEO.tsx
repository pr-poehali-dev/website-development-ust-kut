import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function SEO() {
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
              SEO-продвижение
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Выведем ваш сайт в <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">ТОП</span> поисковых систем
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Комплексное SEO-продвижение в Яндекс и Google для роста трафика и увеличения продаж
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Получить аудит сайта
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Что мы делаем</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Search',
                  title: 'Технический аудит',
                  description: 'Проверяем скорость загрузки, мобильную версию, структуру сайта и исправляем технические ошибки'
                },
                {
                  icon: 'FileText',
                  title: 'Сбор семантики',
                  description: 'Подбираем ключевые запросы с учётом конкуренции и потенциала трафика'
                },
                {
                  icon: 'PenTool',
                  title: 'Оптимизация контента',
                  description: 'Дорабатываем тексты, заголовки, мета-теги под поисковые запросы'
                },
                {
                  icon: 'Link',
                  title: 'Ссылочное продвижение',
                  description: 'Наращиваем качественную ссылочную массу с тематических ресурсов'
                },
                {
                  icon: 'BarChart3',
                  title: 'Аналитика и отчёты',
                  description: 'Отслеживаем позиции, трафик, конверсии. Ежемесячные детальные отчёты'
                },
                {
                  icon: 'Target',
                  title: 'Коммерческие факторы',
                  description: 'Улучшаем юзабилити, добавляем отзывы, сертификаты, улучшаем поведенческие факторы'
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
            <h2 className="text-4xl font-bold mb-12 text-center">Тарифы SEO-продвижения</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Базовый',
                  price: '25 000',
                  description: 'Для небольших сайтов и локального бизнеса',
                  features: [
                    'До 300 запросов',
                    'Технический аудит',
                    'Внутренняя оптимизация',
                    '20 внешних ссылок/мес',
                    'Отчёт раз в месяц'
                  ]
                },
                {
                  name: 'Оптимальный',
                  price: '45 000',
                  description: 'Для средних сайтов с конкуренцией',
                  features: [
                    'До 1000 запросов',
                    'Расширенный аудит',
                    'Контент-маркетинг',
                    '50 внешних ссылок/мес',
                    'Отчёты 2 раза в месяц',
                    'Работа с поведенческими'
                  ],
                  popular: true
                },
                {
                  name: 'Максимальный',
                  price: '80 000',
                  description: 'Для крупных проектов и высокой конкуренции',
                  features: [
                    'Неограниченно запросов',
                    'Полный технический аудит',
                    'Продвинутый контент',
                    '100+ внешних ссылок/мес',
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

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Этапы работы</h2>
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Аудит и анализ',
                  description: 'Проводим полный технический и коммерческий аудит сайта, анализируем конкурентов и составляем стратегию продвижения'
                },
                {
                  step: '02',
                  title: 'Сбор семантики',
                  description: 'Формируем семантическое ядро с приоритетными запросами, распределяем их по страницам'
                },
                {
                  step: '03',
                  title: 'Техническая оптимизация',
                  description: 'Исправляем технические ошибки, улучшаем скорость загрузки, настраиваем правильную структуру'
                },
                {
                  step: '04',
                  title: 'Контентная оптимизация',
                  description: 'Оптимизируем существующий контент, создаём новые тексты, настраиваем мета-теги и заголовки'
                },
                {
                  step: '05',
                  title: 'Наращивание ссылочной массы',
                  description: 'Размещаем ссылки на качественных площадках, работаем с анкор-листом'
                },
                {
                  step: '06',
                  title: 'Мониторинг и отчётность',
                  description: 'Отслеживаем позиции, анализируем трафик и конверсии, предоставляем детальные отчёты'
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
            <h2 className="text-4xl font-bold mb-8 text-center">Результаты продвижения</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">+340%</div>
                    <div className="text-lg font-normal text-foreground/80">Рост органического трафика</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-foreground/60">
                  В среднем за первые 6 месяцев продвижения
                </CardContent>
              </Card>
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-5xl font-bold text-accent mb-2">ТОП-10</div>
                    <div className="text-lg font-normal text-foreground/80">70% запросов в топе</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-foreground/60">
                  К концу первого года работы
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Получите бесплатный аудит</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Проанализируем ваш сайт и подготовим рекомендации по продвижению
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
                  Заказать аудит
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
                <li className="cursor-pointer hover:text-primary">SEO-продвижение</li>
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
