import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: 'Как выбрать платформу для интернет-магазина в 2026 году',
    slug: 'kak-vybrat-platformu-dlya-internet-magazina',
    excerpt: 'Обзор популярных CMS и фреймворков для создания интернет-магазинов. Сравниваем WordPress + WooCommerce, Shopify, CS-Cart, React и Next.js.',
    category: 'E-commerce',
    date: '15 января 2026',
    readTime: '8 мин',
    icon: '🛍️',
    gradient: 'from-blue-500/20 to-purple-500/20',
    tags: ['E-commerce', 'CMS', 'Выбор платформы']
  },
  {
    id: 2,
    title: 'SEO-тренды 2026: что важно для продвижения',
    slug: 'seo-trendy-2026',
    excerpt: 'Рассказываем о новых факторах ранжирования в Яндекс и Google. Core Web Vitals, E-E-A-T, AI-контент и другие важные тренды этого года.',
    category: 'SEO',
    date: '10 января 2026',
    readTime: '10 мин',
    icon: '📈',
    gradient: 'from-green-500/20 to-emerald-500/20',
    tags: ['SEO', 'Продвижение', 'Тренды']
  },
  {
    id: 3,
    title: 'Адаптивный дизайн: почему это критично для бизнеса',
    slug: 'adaptivnyj-dizajn',
    excerpt: 'Более 70% пользователей заходят на сайты с мобильных устройств. Разбираем, как адаптивный дизайн влияет на конверсию и продажи.',
    category: 'Веб-дизайн',
    date: '5 января 2026',
    readTime: '6 мин',
    icon: '📱',
    gradient: 'from-pink-500/20 to-rose-500/20',
    tags: ['Дизайн', 'Mobile-first', 'UX']
  },
  {
    id: 4,
    title: 'React vs WordPress: что выбрать для корпоративного сайта',
    slug: 'react-vs-wordpress',
    excerpt: 'Сравниваем современный фронтенд-фреймворк и классическую CMS. Плюсы, минусы, стоимость разработки и поддержки каждого решения.',
    category: 'Разработка',
    date: '28 декабря 2025',
    readTime: '12 мин',
    icon: '⚛️',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    tags: ['React', 'WordPress', 'Сравнение']
  },
  {
    id: 5,
    title: 'Контекстная реклама в 2026: гайд для начинающих',
    slug: 'kontekstnaya-reklama-gajd',
    excerpt: 'Пошаговая инструкция по запуску рекламы в Яндекс.Директ и Google Ads. Настройка кампаний, подбор ключевых слов, оптимизация бюджета.',
    category: 'Маркетинг',
    date: '22 декабря 2025',
    readTime: '15 мин',
    icon: '🎯',
    gradient: 'from-orange-500/20 to-red-500/20',
    tags: ['Реклама', 'Яндекс.Директ', 'Google Ads']
  },
  {
    id: 6,
    title: 'Как увеличить скорость загрузки сайта: 10 проверенных способов',
    slug: 'kak-uvelichit-skorost-zagruzki',
    excerpt: 'Скорость загрузки напрямую влияет на конверсию и SEO. Делимся техниками оптимизации: от сжатия изображений до CDN и кеширования.',
    category: 'Разработка',
    date: '18 декабря 2025',
    readTime: '9 мин',
    icon: '⚡',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    tags: ['Оптимизация', 'Performance', 'PageSpeed']
  },
  {
    id: 7,
    title: 'Психология цвета в веб-дизайне: как влиять на решения пользователей',
    slug: 'psihologiya-cveta-v-veb-dizajne',
    excerpt: 'Какие эмоции вызывают разные цвета? Как правильно подобрать цветовую схему для вашего бренда? Примеры успешных сайтов.',
    category: 'Веб-дизайн',
    date: '12 декабря 2025',
    readTime: '7 мин',
    icon: '🎨',
    gradient: 'from-purple-500/20 to-pink-500/20',
    tags: ['Дизайн', 'Психология', 'Цвет']
  },
  {
    id: 8,
    title: 'Локальное SEO для бизнеса в регионах: как выйти в топ',
    slug: 'lokalnoe-seo-dlya-regionov',
    excerpt: 'Особенности продвижения малого и среднего бизнеса в региональных городах. Яндекс.Бизнес, локальные запросы, карты.',
    category: 'SEO',
    date: '5 декабря 2025',
    readTime: '11 мин',
    icon: '📍',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    tags: ['SEO', 'Локальное SEO', 'Регионы']
  },
  {
    id: 9,
    title: 'Чат-боты для бизнеса: автоматизация продаж и поддержки',
    slug: 'chat-boty-dlya-biznesa',
    excerpt: 'Как чат-боты помогают экономить время и увеличивать продажи. Обзор платформ, кейсы использования, стоимость разработки.',
    category: 'Маркетинг',
    date: '28 ноября 2025',
    readTime: '8 мин',
    icon: '🤖',
    gradient: 'from-teal-500/20 to-cyan-500/20',
    tags: ['Чат-боты', 'Автоматизация', 'CRM']
  }
];

const categories = ['Все статьи', 'E-commerce', 'SEO', 'Веб-дизайн', 'Разработка', 'Маркетинг'];

export default function Blog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все статьи');
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
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

  const filteredArticles = selectedCategory === 'Все статьи' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/ad88edee-174d-428d-8f2f-14b7f45fb7ed.png" alt="Элегия" className="h-12" />
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
              Блог
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Полезные статьи о <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">веб-разработке</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Экспертные материалы о создании сайтов, SEO-продвижении и цифровом маркетинге
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-primary hover:bg-primary/90' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id}
                className="group overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20"
                onClick={() => setSelectedArticle(article)}
              >
                <div className={`aspect-video bg-gradient-to-br ${article.gradient} flex items-center justify-center text-7xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">{article.icon}</span>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-accent/20 text-accent">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-foreground/50">{article.date}</span>
                    <span className="text-xs text-foreground/50">• {article.readTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-foreground/70 line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-accent">
                    <span className="text-sm font-medium">Читать далее</span>
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="text-6xl mb-4">{selectedArticle?.icon}</div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-accent/10 text-accent border-accent/20">
                {selectedArticle?.category}
              </Badge>
              <span className="text-sm text-foreground/60">{selectedArticle?.date}</span>
              <span className="text-sm text-foreground/60">• {selectedArticle?.readTime}</span>
            </div>
            <DialogTitle className="text-3xl">{selectedArticle?.title}</DialogTitle>
            <DialogDescription className="text-base leading-relaxed mt-4">
              {selectedArticle?.excerpt}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/80 leading-relaxed">
                Это краткое содержание статьи. Полная версия материала находится в разработке. 
                Здесь будет подробный разбор темы с примерами, скриншотами и пошаговыми инструкциями.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Хотите узнать больше или получить консультацию по этой теме? 
                Наши эксперты готовы ответить на все ваши вопросы и помочь с реализацией.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Теги статьи</h4>
              <div className="flex flex-wrap gap-2">
                {selectedArticle?.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="border-primary/20 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-foreground/60 mb-4">
                Понравилась статья? Хотите обсудить ваш проект?
              </p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  setSelectedArticle(null);
                  setIsDialogOpen(true);
                }}
              >
                Получить консультацию
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Mail" className="text-accent" size={32} />
                  <CardTitle className="text-2xl">Подпишитесь на рассылку</CardTitle>
                </div>
                <CardDescription>
                  Получайте свежие статьи и полезные материалы о веб-разработке на почту
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex gap-3">
                  <Input 
                    type="email" 
                    placeholder="Ваш email" 
                    className="flex-1"
                    required
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Подписаться
                  </Button>
                </form>
                <p className="text-xs text-foreground/50 mt-3">
                  Отправляя форму, вы соглашаетесь с политикой конфиденциальности
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Нужна консультация?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Наши эксперты помогут разобраться в любом вопросе веб-разработки и продвижения
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
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/marketing')}>Цифровой маркетинг</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/')}>Главная</li>
                <li className="cursor-pointer hover:text-primary" onClick={() => navigate('/portfolio')}>Портфолио</li>
                <li className="cursor-pointer hover:text-primary">Блог</li>
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