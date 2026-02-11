import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTilt } from '@/hooks/useTilt';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

import MobileHint from '@/components/MobileHint';
import Footer from '@/components/home/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

interface Project {
  id: number;
  title: string;
  category: string;
  icon: string;
  image: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  results: string[];
  gradient: string;
  challenges: string[];
  solutions: string[];
  features: string[];
}

const projectsData: Record<string, Project> = {
  'technomarket': {
    id: 1,
    title: 'Интернет-магазин электроники TechnoMarket',
    category: 'E-commerce',
    icon: '🛒',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/4ad246e1-8249-4953-9ee1-2e9e716661c8.png',
    description: 'Полнофункциональный интернет-магазин с интеграцией 1С, онлайн-оплатой и системой лояльности',
    fullDescription: 'Разработали современный интернет-магазин электроники с удобной навигацией, быстрым поиском и интеграцией с 1С. Внедрили систему онлайн-оплаты через Stripe и программу лояльности для постоянных клиентов.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', '1C'],
    results: ['+280% конверсия', '15 000+ товаров', '500+ заказов/день'],
    gradient: 'from-blue-500/20 to-purple-500/20',
    challenges: ['Интеграция с 1С в реальном времени', 'Оптимизация загрузки каталога из 15000+ товаров', 'Система автоматического расчета доставки'],
    solutions: ['Реализовали WebSocket для синхронизации остатков', 'Внедрили виртуальную прокрутку и ленивую загрузку', 'Интегрировали API служб доставки СДЭК и Boxberry'],
    features: ['Онлайн-оплата банковскими картами', 'Программа лояльности с бонусами', 'Сравнение товаров', 'Отложенная покупка', 'Трекинг заказов']
  },
  'stroygrad': {
    id: 2,
    title: 'Корпоративный сайт строительной компании СтройГрад',
    category: 'Бизнес',
    icon: '🏢',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/9748ced2-4fb7-48ed-a1cb-37559a136828.jpg',
    description: 'Представительский сайт с каталогом объектов, калькулятором стоимости и CRM-интеграцией',
    fullDescription: 'Создали премиальный корпоративный сайт для строительной компании с портфолио реализованных проектов, калькулятором стоимости строительства и интеграцией с CRM Битрикс24.',
    technologies: ['WordPress', 'PHP', 'MySQL', 'Битрикс24'],
    results: ['+150% заявок', 'ТОП-5 по региону', '85% клиентов из сайта'],
    gradient: 'from-orange-500/20 to-red-500/20',
    challenges: ['Презентация сложных строительных проектов', 'Калькулятор с множеством параметров', 'Автоматизация обработки заявок'],
    solutions: ['3D-туры и дрон-съемка объектов', 'Многошаговый калькулятор с визуализацией', 'Автоматическая передача лидов в CRM'],
    features: ['Онлайн-калькулятор стоимости', '3D-туры по объектам', 'Каталог готовых проектов', 'Блог о строительстве', 'Интеграция с Битрикс24']
  },
  'speakup': {
    id: 3,
    title: 'Лендинг онлайн-школы английского Speak Up',
    category: 'Landing',
    icon: '🚀',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/49b1fa27-649d-4d45-ae14-9bd126509554.png',
    description: 'Продающий лендинг с видео-презентацией, отзывами учеников и системой записи на пробный урок',
    fullDescription: 'Разработали высококонверсионный лендинг для онлайн-школы английского языка с акцентом на социальные доказательства и простоту записи на пробный урок.',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    results: ['18% конверсия', '400+ заявок/месяц', '2 секунды загрузка'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    challenges: ['Высокая конверсия с холодного трафика', 'Быстрая загрузка с видео', 'Доверие к онлайн-образованию'],
    solutions: ['А/В тестирование 15+ вариантов', 'Ленивая загрузка и оптимизация видео', 'Блок с сертификатами и отзывами учеников'],
    features: ['Видео-презентация курсов', 'Форма записи на пробный урок', 'Отзывы с фото учеников', 'Калькулятор стоимости обучения', 'Live-чат с менеджером']
  },
  'avtopoisk': {
    id: 4,
    title: 'Портал объявлений АвтоПоиск',
    category: 'Портал',
    icon: '🚗',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/f94cc994-2b77-46aa-b428-f7dc72d1e2eb.jpeg',
    description: 'Классифайд-портал для продажи авто с личным кабинетом, фильтрами и системой платных объявлений',
    fullDescription: 'Разработали масштабный портал объявлений по продаже автомобилей с расширенными фильтрами, личным кабинетом продавца и системой монетизации через платные объявления.',
    technologies: ['Next.js', 'PostgreSQL', 'Redis', 'AWS S3'],
    results: ['25 000+ объявлений', '100K посещений/месяц', 'Монетизация с 1 месяца'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
    challenges: ['Быстрый поиск по 25000+ объявлениям', 'Модерация контента', 'Монетизация портала'],
    solutions: ['Elasticsearch для полнотекстового поиска', 'Автоматическая модерация + ручная проверка', 'Платные тарифы: выделение, подъем, топ'],
    features: ['Расширенный поиск с фильтрами', 'Сравнение автомобилей', 'Избранное и сохраненные поиски', 'Статистика просмотров', 'Платные услуги продвижения']
  },
  'zdorovie': {
    id: 5,
    title: 'Медицинский центр Здоровье+',
    category: 'Медицина',
    icon: '🏥',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/827cb6cb-c305-4f02-a9da-64c3a5ddbc3b.jpg',
    description: 'Сайт клиники с онлайн-записью к врачам, личным кабинетом пациента и интеграцией с МИС',
    fullDescription: 'Создали функциональный сайт медицинского центра с системой онлайн-записи к врачам, личным кабинетом пациента и интеграцией с медицинской информационной системой для автоматической синхронизации расписания.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'МИС'],
    results: ['70% онлайн-записи', '-40% нагрузка на регистратуру', '4.9★ рейтинг'],
    gradient: 'from-pink-500/20 to-rose-500/20',
    challenges: ['Интеграция с МИС клиники', 'Безопасность медицинских данных', 'Удобство записи для пожилых пациентов'],
    solutions: ['API-интеграция с МИС в реальном времени', 'Шифрование данных и соответствие 152-ФЗ', 'Упрощенный интерфейс с крупными кнопками'],
    features: ['Онлайн-запись к врачам', 'Личный кабинет пациента', 'История визитов и анализов', 'Напоминания о приемах', 'Онлайн-консультации']
  },
  'sibirskie-traditsii': {
    id: 6,
    title: 'Ресторан Сибирские традиции',
    category: 'HoReCa',
    icon: '🍽️',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/0f8bd6a9-3a1c-484b-9929-3c830c52e104.jpeg',
    description: 'Сайт с онлайн-бронированием столиков, меню и интеграцией с системой доставки',
    fullDescription: 'Разработали аппетитный сайт для ресторана с системой онлайн-бронирования столиков, интерактивным меню с фотографиями блюд и интеграцией с сервисами доставки.',
    technologies: ['WordPress', 'PHP', 'Яндекс.Еда API'],
    results: ['+200% бронирований', '50% заказов онлайн', 'Окупился за 2 месяца'],
    gradient: 'from-amber-500/20 to-orange-500/20',
    challenges: ['Презентация меню с фото блюд', 'Система бронирования столов', 'Интеграция с доставкой'],
    solutions: ['Профессиональная фуд-фотосъемка', 'Календарь бронирования с выбором зоны', 'API Яндекс.Еды для приема заказов'],
    features: ['Онлайн-бронирование столиков', 'Интерактивное меню с фото', 'Заказ доставки на сайте', 'Программа лояльности', 'Отзывы с фото гостей']
  },
  'mastera-rf': {
    id: 7,
    title: 'Маркетплейс изделий ручной работы Мастера.рф',
    category: 'E-commerce',
    icon: '🎨',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/ad28e558-46ba-49fb-a673-9c31cae2536f.jpg',
    description: 'Платформа для продажи hand-made товаров с личными магазинами продавцов и эскроу-счетами',
    fullDescription: 'Создали маркетплейс для мастеров ручной работы с личными витринами продавцов, системой безопасных сделок через эскроу и встроенной системой отзывов.',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'AWS S3'],
    results: ['500+ продавцов', '10K товаров', '₽2М оборот/месяц'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    challenges: ['Доверие между покупателями и продавцами', 'Комиссия платформы', 'Качество товаров'],
    solutions: ['Эскроу-счета для безопасных сделок', 'Прозрачная комиссия 8% за транзакцию', 'Система рейтингов и верификации продавцов'],
    features: ['Личные магазины мастеров', 'Безопасные сделки через эскроу', 'Система отзывов и рейтингов', 'Чат с продавцом', 'Индивидуальные заказы']
  },
  'codeacademy': {
    id: 8,
    title: 'Образовательная платформа CodeAcademy',
    category: 'Образование',
    icon: '📚',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/3c5e7b59-3dd2-4fb4-bc6a-c6c0a8d99ed2.jpeg',
    description: 'LMS-система с видеокурсами, тестами, сертификатами и системой менторства',
    fullDescription: 'Разработали полноценную образовательную платформу для обучения программированию с видеокурсами, интерактивными тестами, системой выдачи сертификатов и программой менторства.',
    technologies: ['React', 'Node.js', 'AWS', 'FFmpeg'],
    results: ['5 000+ студентов', '150+ курсов', '92% завершаемость'],
    gradient: 'from-indigo-500/20 to-violet-500/20',
    challenges: ['Высокая стоимость видеохостинга', 'Мотивация студентов', 'Практические задания'],
    solutions: ['Собственный CDN на AWS CloudFront', 'Геймификация с достижениями и рейтингом', 'Интерактивная IDE прямо в браузере'],
    features: ['Видеокурсы с субтитрами', 'Интерактивные тесты', 'Онлайн-IDE для практики', 'Сертификаты об окончании', 'Менторская поддержка']
  },
  'athletezone': {
    id: 9,
    title: 'Фитнес-клуб AthleteZone',
    category: 'Бизнес',
    icon: '💪',
    image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/e1e6e8cc-ccd1-4dc3-950e-dc07870f3aec.jpg',
    description: 'Сайт с онлайн-расписанием, покупкой абонементов и личным кабинетом клиента',
    fullDescription: 'Создали функциональный сайт фитнес-клуба с онлайн-расписанием групповых занятий, системой покупки и продления абонементов, личным кабинетом для отслеживания тренировок.',
    technologies: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
    results: ['+320% продаж абонементов', '80% оплата онлайн', 'ROI 450%'],
    gradient: 'from-red-500/20 to-orange-500/20',
    challenges: ['Автоматизация продажи абонементов', 'Запись на групповые занятия', 'Удержание клиентов'],
    solutions: ['Онлайн-оплата абонементов с автопродлением', 'Календарь с лимитом мест на занятия', 'Push-уведомления о занятиях и акциях'],
    features: ['Онлайн-расписание занятий', 'Покупка абонементов онлайн', 'Запись на групповые тренировки', 'Личный кабинет клиента', 'История тренировок']
  }
};

const projectSlugs = ['technomarket', 'stroygrad', 'speakup', 'avtopoisk', 'zdorovie', 'sibirskie-traditsii', 'mastera-rf', 'codeacademy', 'athletezone'];

export default function PortfolioProject() {
  return (
    <>
      <ParticlesBackground />
      <MobileHint />
      <ProjectContent />
    </>
  );
}

function ProjectContent() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const resultTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const challengeTiltRef = useTilt<HTMLDivElement>();
  const solutionTiltRef = useTilt<HTMLDivElement>();

  const featureTiltRefs = [
    useTilt<HTMLDivElement>(),
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
    useTilt<HTMLDivElement>()
  ];

  const prevProjectTiltRef = useTilt<HTMLDivElement>();
  const nextProjectTiltRef = useTilt<HTMLDivElement>();

  const challengeRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 100 }),
    useScrollReveal<HTMLDivElement>({ delay: 200 })
  ];

  const featureRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 100 }),
    useScrollReveal<HTMLDivElement>({ delay: 200 }),
    useScrollReveal<HTMLDivElement>({ delay: 300 }),
    useScrollReveal<HTMLDivElement>({ delay: 400 })
  ];

  const techRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 100 }),
    useScrollReveal<HTMLDivElement>({ delay: 200 }),
    useScrollReveal<HTMLDivElement>({ delay: 300 }),
    useScrollReveal<HTMLDivElement>({ delay: 400 })
  ];

  const project = slug ? projectsData[slug] : null;
  
  const currentIndex = slug ? projectSlugs.indexOf(slug) : -1;
  const nextSlug = currentIndex >= 0 && currentIndex < projectSlugs.length - 1 ? projectSlugs[currentIndex + 1] : projectSlugs[0];
  const prevSlug = currentIndex > 0 ? projectSlugs[currentIndex - 1] : projectSlugs[projectSlugs.length - 1];
  
  const nextProject = projectsData[nextSlug];
  const prevProject = projectsData[prevSlug];

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
          email: formData.get('email'),
          message: `Интересует проект: ${project?.title}`
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

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Проект не найден</h1>
          <Button onClick={() => navigate('/portfolio')}>Вернуться к портфолио</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/119321e0-95b2-4cb8-a386-b4f1f1833d05.png" alt="Элегия" className="h-12 sm:h-14 md:h-16" />
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate('/portfolio')}>
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              К портфолио
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">Обсудить проект</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Обсудить похожий проект</DialogTitle>
                  <DialogDescription>
                    Заполните форму, и мы свяжемся с вами для обсуждения деталей
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

      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Button variant="ghost" onClick={() => navigate('/portfolio')} className="mb-8">
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Вернуться к портфолио
          </Button>

          <div className="mb-8">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-foreground/70">
              {project.fullDescription}
            </p>
          </div>

          <div className="rounded-xl mb-12 shadow-2xl overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-auto rounded-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div 
              className={`aspect-video rounded-xl bg-gradient-to-br ${project.gradient} items-center justify-center text-9xl shadow-2xl hidden`}
              style={{ display: 'none' }}
            >
              <span>{project.icon}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {project.results.map((result: string, index: number) => (
              <div key={index} ref={challengeRevealRefs[index]}>
                <Card ref={resultTiltRefs[index]} className="text-center h-full transition-shadow duration-300 overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{result.split(' ')[0]}</div>
                    <div className="text-foreground/70">{result.split(' ').slice(1).join(' ')}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Технологии</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string, index: number) => (
              <div key={index} ref={techRevealRefs[index % 5]}>
                <Badge variant="outline" className="text-base px-4 py-2">
                  {tech}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Вызовы проекта</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card ref={challengeTiltRef} className="transition-shadow duration-300 overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <Icon name="AlertCircle" className="text-accent mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Проблемы</h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge: string, index: number) => (
                        <li key={index} className="text-foreground/70 flex items-start gap-2">
                          <Icon name="ChevronRight" size={16} className="mt-1 flex-shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card ref={solutionTiltRef} className="transition-shadow duration-300 overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <Icon name="CheckCircle" className="text-green-500 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Решения</h3>
                    <ul className="space-y-2">
                      {project.solutions.map((solution: string, index: number) => (
                        <li key={index} className="text-foreground/70 flex items-start gap-2">
                          <Icon name="ChevronRight" size={16} className="mt-1 flex-shrink-0" />
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Ключевые возможности</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature: string, index: number) => (
              <div key={index} ref={featureRevealRefs[index % 5]}>
                <Card ref={featureTiltRefs[index % 5]} className="h-full transition-shadow duration-300 overflow-hidden">
                  <CardContent className="pt-6 flex items-center gap-3">
                    <Icon name="Check" className="text-accent flex-shrink-0" size={20} />
                    <span className="text-foreground/80">{feature}</span>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card 
              ref={prevProjectTiltRef}
              className="group cursor-pointer hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden"
              onClick={() => navigate(`/portfolio/${prevSlug}`)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="ArrowLeft" className="text-accent" size={24} />
                  <div className="text-sm text-foreground/60">Предыдущий проект</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${prevProject.gradient} flex items-center justify-center text-3xl`}>
                    {prevProject.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{prevProject.title}</h3>
                    <p className="text-sm text-foreground/60">{prevProject.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              ref={nextProjectTiltRef}
              className="group cursor-pointer hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden"
              onClick={() => navigate(`/portfolio/${nextSlug}`)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-end gap-3 mb-4">
                  <div className="text-sm text-foreground/60">Следующий проект</div>
                  <Icon name="ArrowRight" className="text-accent" size={24} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{nextProject.title}</h3>
                    <p className="text-sm text-foreground/60">{nextProject.category}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${nextProject.gradient} flex items-center justify-center text-3xl`}>
                    {nextProject.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Хотите похожий проект?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Мы разработаем индивидуальное решение для вашего бизнеса
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Icon name="MessageSquare" className="mr-2" size={20} />
                  Обсудить проект
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