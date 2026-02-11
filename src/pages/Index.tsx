import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import MobileHint from '@/components/MobileHint';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TelegramPosts from '@/components/home/TelegramPosts';
import Footer from '@/components/home/Footer';

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('https://functions.poehali.dev/facfc1c0-72cc-4f8e-8c21-113d5964b377', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message')
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Отправка цели в Яндекс.Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106521597, 'reachGoal', 'contact_form');
        }
        
        toast({
          title: '✅ Сообщение успешно отправлено!',
          description: 'Спасибо за обращение! Мы ответим вам в течение 24 часов.',
          className: 'border-green-500 bg-green-50 text-green-900',
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось отправить сообщение',
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('https://functions.poehali.dev/facfc1c0-72cc-4f8e-8c21-113d5964b377', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email: formData.get('email')
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Отправка цели в Яндекс.Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106521597, 'reachGoal', 'newsletter_subscribe');
        }
        
        toast({
          title: '📧 Подписка успешно оформлена!',
          description: 'Спасибо! Теперь вы будете получать наши новости и полезные материалы.',
          className: 'border-green-500 bg-green-50 text-green-900',
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось оформить подписку',
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
        // Отправка цели в Яндекс.Метрику
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106521597, 'reachGoal', 'header_request');
        }
        
        toast({
          title: '🚀 Заявка успешно отправлена!',
          description: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
          className: 'border-green-500 bg-green-50 text-green-900',
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

  const projects = [
    {
      id: 1,
      title: 'Интернет-магазин одежды Garderob',
      category: 'E-commerce',
      icon: '🛒',
      image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/dc183883-74db-46d6-a447-5ef5d32bc05b.png',
      description: 'Адаптивный магазин одежды и аксессуаров',
      gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
      id: 2,
      title: 'Строительная компания СтройГрад',
      category: 'Бизнес',
      icon: '🏢',
      image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/9748ced2-4fb7-48ed-a1cb-37559a136828.jpg',
      description: 'Корпоративный сайт с каталогом объектов',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: 3,
      title: 'Онлайн-школа английского Speak Up',
      category: 'Landing',
      icon: '🚀',
      image: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/49b1fa27-649d-4d45-ae14-9bd126509554.png',
      description: 'Продающий лендинг с высокой конверсией',
      gradient: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  const reviews = [
    {
      name: 'Анна Петрова',
      company: 'ООО "ТехноМаркет"',
      rating: 5,
      text: 'Отличная работа! Сайт получился современным и функциональным. Команда профессионально подошла к проекту.',
      avatar: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/files/c15ea360-eeb2-4a9d-9f39-fad4d3aead6d.jpg'
    },
    {
      name: 'Михаил Сидоров',
      company: 'СтройГрад',
      rating: 5,
      text: 'Благодарю за качественную работу над корпоративным сайтом. Увеличили поток заявок в 2 раза!',
      avatar: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/files/ebde9473-07ff-4fb4-993c-eab6df77130b.jpg'
    },
    {
      name: 'Елена Иванова',
      company: 'Speak Up School',
      rating: 5,
      text: 'Сделали лендинг быстро и качественно. Конверсия превзошла все ожидания - 18%!',
      avatar: 'https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/files/cc8a6e81-daf7-4c75-8ce7-cb7b313abc3b.jpg'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Элегия — веб-студия в Иркутске | Создание и продвижение сайтов</title>
        <meta name="description" content="Веб-студия Элегия в Иркутске: разработка сайтов, интернет-магазинов, SEO-продвижение, дизайн и маркетинг. Современные решения для вашего бизнеса." />
        <meta name="keywords" content="веб-студия иркутск, создание сайтов иркутск, разработка сайтов иркутск, интернет-магазин иркутск, SEO продвижение иркутск, веб-дизайн иркутск, лендинг иркутск, сайт под ключ иркутск, веб разработка иркутская область" />
        <link rel="canonical" href="https://elegiya-web.ru/" />
        
        <meta property="og:title" content="Элегия — веб-студия в Иркутске | Создание и продвижение сайтов" />
        <meta property="og:description" content="Веб-студия Элегия в Иркутске: разработка сайтов, интернет-магазинов, SEO-продвижение, дизайн и маркетинг. Офис в центре города, работаем с бизнесом по всей Иркутской области." />
        <meta property="og:url" content="https://elegiya-web.ru/" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <MobileHint />
        
        <Header
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          smoothScroll={smoothScroll}
          handleFormSubmit={handleFormSubmit}
        />

        <HeroSection smoothScroll={smoothScroll} />

        <ServicesSection />

      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Портфолио</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши работы</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Примеры реализованных проектов различной сложности
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {projects.map((project, index) => (
              <Card key={project.id} className={`overflow-hidden hover:border-primary transition-all duration-300 group cursor-pointer animate-card-appear delay-${(index + 1) * 100} hover:shadow-lg hover:shadow-primary/20`} onClick={() => navigate('/portfolio')}>
                <div className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center text-6xl relative overflow-hidden`}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <span className="transition-transform duration-500 group-hover:scale-110">{project.icon}</span>
                  )}
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-accent/10 text-accent border-accent/20">{project.category}</Badge>
                  <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" variant="outline" onClick={() => navigate('/portfolio')}>
              Смотреть все проекты
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Калькулятор</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Рассчитайте стоимость</h2>
            <p className="text-xl text-foreground/70">
              Примерная стоимость вашего проекта
            </p>
          </div>
          <Card className="p-8">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-lg font-medium">Количество страниц</label>
                  <span className="text-lg font-bold text-primary">{calculatorValues.pages[0]}</span>
                </div>
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
                <div className="flex justify-between mb-3">
                  <label className="text-lg font-medium">Сложность функционала</label>
                  <span className="text-lg font-bold text-primary">{calculatorValues.features[0]}/10</span>
                </div>
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
                <div className="flex justify-between mb-3">
                  <label className="text-lg font-medium">Уровень дизайна</label>
                  <span className="text-lg font-bold text-primary">{calculatorValues.design[0]}/10</span>
                </div>
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
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-semibold">Примерная стоимость:</span>
                  <span className="text-4xl font-bold text-primary">{calculatePrice().toLocaleString('ru-RU')} ₽</span>
                </div>
                <p className="text-sm text-foreground/60 mb-6">
                  * Это примерный расчет. Точная стоимость определяется после обсуждения проекта.
                </p>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(true)}>
                  <Icon name="MessageSquare" className="mr-2" size={20} />
                  Получить точный расчет
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <TelegramPosts />

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Отзывы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что говорят клиенты</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Отзывы компаний, которые доверили нам свои проекты
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className={`hover:border-primary transition-all duration-300 animate-card-appear delay-${(index + 1) * 100} group hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1`}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.company}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Контакты</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-foreground/70">
              Расскажите о своём проекте, и мы обсудим детали
            </p>
          </div>
          <Card className="p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя *</label>
                  <Input name="name" required placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input name="email" type="email" required placeholder="ivan@example.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Телефон</label>
                <Input name="phone" type="tel" placeholder="+7 (999) 123-45-67" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Сообщение *</label>
                <Textarea name="message" required placeholder="Расскажите о вашем проекте..." rows={5} />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                <Icon name="Send" className="mr-2" size={20} />
                Отправить сообщение
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Icon name="Mail" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Подпишитесь на рассылку</h3>
              <p className="text-foreground/70 mb-6">
                Получайте актуальные статьи о веб-разработке и digital-маркетинге
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Ваш email"
                  className="flex-1"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Подписаться
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}