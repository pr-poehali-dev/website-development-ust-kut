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

const projects = [
  {
    id: 1,
    slug: 'technomarket',
    title: 'Интернет-магазин электроники TechnoMarket',
    category: 'E-commerce',
    icon: '🛒',
    description: 'Полнофункциональный интернет-магазин с интеграцией 1С, онлайн-оплатой и системой лояльности',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    results: [
      '+280% конверсия',
      '15 000+ товаров',
      '500+ заказов/день'
    ],
    gradient: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 2,
    slug: 'stroygrad',
    title: 'Корпоративный сайт строительной компании СтройГрад',
    category: 'Бизнес',
    icon: '🏢',
    description: 'Представительский сайт с каталогом объектов, калькулятором стоимости и CRM-интеграцией',
    technologies: ['WordPress', 'PHP', 'MySQL'],
    results: [
      '+150% заявок',
      'ТОП-5 по региону',
      '85% клиентов из сайта'
    ],
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 3,
    slug: 'speakup',
    title: 'Лендинг онлайн-школы английского Speak Up',
    category: 'Landing',
    icon: '🚀',
    description: 'Продающий лендинг с видео-презентацией, отзывами учеников и системой записи на пробный урок',
    technologies: ['React', 'Tailwind CSS'],
    results: [
      '18% конверсия',
      '400+ заявок/месяц',
      '2 секунды загрузка'
    ],
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 4,
    slug: 'avtopoisk',
    title: 'Портал объявлений АвтоПоиск',
    category: 'Портал',
    icon: '🚗',
    description: 'Классифайд-портал для продажи авто с личным кабинетом, фильтрами и системой платных объявлений',
    technologies: ['Next.js', 'PostgreSQL', 'Redis'],
    results: [
      '25 000+ объявлений',
      '100K посещений/месяц',
      'Монетизация с 1 месяца'
    ],
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    id: 5,
    title: 'Медицинский центр Здоровье+',
    category: 'Медицина',
    icon: '🏥',
    description: 'Сайт клиники с онлайн-записью к врачам, личным кабинетом пациента и интеграцией с МИС',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    results: [
      '70% онлайн-записи',
      '-40% нагрузка на регистратуру',
      '4.9★ рейтинг'
    ],
    gradient: 'from-pink-500/20 to-rose-500/20'
  },
  {
    id: 6,
    title: 'Ресторан Сибирские традиции',
    category: 'HoReCa',
    icon: '🍽️',
    description: 'Сайт с онлайн-бронированием столиков, меню и интеграцией с системой доставки',
    technologies: ['WordPress', 'PHP'],
    results: [
      '+200% бронирований',
      '50% заказов онлайн',
      'Окупился за 2 месяца'
    ],
    gradient: 'from-amber-500/20 to-orange-500/20'
  },
  {
    id: 7,
    title: 'Маркетплейс изделий ручной работы Мастера.рф',
    category: 'E-commerce',
    icon: '🎨',
    description: 'Платформа для продажи hand-made товаров с личными магазинами продавцов и эскроу-счетами',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
    results: [
      '500+ продавцов',
      '10K товаров',
      '₽2М оборот/месяц'
    ],
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 8,
    title: 'Образовательная платформа CodeAcademy',
    category: 'Образование',
    icon: '📚',
    description: 'LMS-система с видеокурсами, тестами, сертификатами и системой менторства',
    technologies: ['React', 'Node.js', 'AWS'],
    results: [
      '5 000+ студентов',
      '150+ курсов',
      '92% завершаемость'
    ],
    gradient: 'from-indigo-500/20 to-violet-500/20'
  },
  {
    id: 9,
    title: 'Фитнес-клуб AthleteZone',
    category: 'Бизнес',
    icon: '💪',
    description: 'Сайт с онлайн-расписанием, покупкой абонементов и личным кабинетом клиента',
    technologies: ['React', 'Node.js', 'Stripe'],
    results: [
      '+320% продаж абонементов',
      '80% оплата онлайн',
      'ROI 450%'
    ],
    gradient: 'from-red-500/20 to-orange-500/20'
  }
];

const categories = ['Все проекты', 'E-commerce', 'Бизнес', 'Landing', 'Портал', 'Медицина', 'HoReCa', 'Образование'];

export default function Portfolio() {
  return (
    <>
      <VkButton />
      <TelegramButton />
      <CallbackButton />
      <MobileHint />
      <PortfolioContent />
    </>
  );
}

function PortfolioContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все проекты');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
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

  const filteredProjects = selectedCategory === 'Все проекты' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

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
              Портфолио
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Наши <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">проекты</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              Более 150 успешных проектов в различных сферах бизнеса
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
            {filteredProjects.map((project) => (
              <Card 
                key={project.id}
                className="group overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20"
                onClick={() => project.slug ? navigate(`/portfolio/${project.slug}`) : setSelectedProject(project)}
              >
                <div className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center text-7xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">{project.icon}</span>
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-accent/10 text-accent border-accent/20">
                    {project.category}
                  </Badge>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-foreground/70">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {project.results.map((result, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Icon name="CheckCircle2" className="text-accent flex-shrink-0" size={16} />
                        <span className="text-foreground/70">{result}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="text-6xl mb-4">{selectedProject?.icon}</div>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Технологии</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.technologies.map((tech, i) => (
                  <Badge key={i} className="bg-accent/10 text-accent border-accent/20">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Результаты</h4>
              <div className="space-y-2">
                {selectedProject?.results.map((result, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon name="TrendingUp" className="text-primary flex-shrink-0" size={20} />
                    <span className="text-foreground/80">{result}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => {
                setSelectedProject(null);
                setIsDialogOpen(true);
              }}
            >
              Хочу такой же проект
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Готовы реализовать ваш проект?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Мы создадим для вас сайт, который принесёт реальные результаты
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
                  Обсудить проект
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
                <li className="cursor-pointer hover:text-primary">Портфолио</li>
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