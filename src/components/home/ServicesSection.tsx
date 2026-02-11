import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ServicesSection() {
  const navigate = useNavigate();
  const sectionRef = useScrollReveal();

  const services = [
    {
      icon: 'Code',
      title: 'Разработка сайтов',
      description: 'Корпоративные сайты, лендинги, интернет-магазины',
      features: ['React & Vue.js', 'Адаптивный дизайн', 'SEO-оптимизация'],
      gradient: 'from-blue-500/20 to-purple-500/20',
      path: '/development'
    },
    {
      icon: 'TrendingUp',
      title: 'SEO-продвижение',
      description: 'Комплексное продвижение в поисковых системах',
      features: ['Техническая оптимизация', 'Контент-маркетинг', 'Аналитика'],
      gradient: 'from-green-500/20 to-emerald-500/20',
      path: '/seo'
    },
    {
      icon: 'Palette',
      title: 'Веб-дизайн',
      description: 'Уникальный UI/UX дизайн для вашего проекта',
      features: ['Фирменный стиль', 'Прототипирование', 'Дизайн-система'],
      gradient: 'from-pink-500/20 to-rose-500/20',
      path: '/design'
    },
    {
      icon: 'Megaphone',
      title: 'Цифровой маркетинг',
      description: 'Привлечение клиентов через digital-каналы',
      features: ['Контекстная реклама', 'SMM-продвижение', 'Email-маркетинг'],
      gradient: 'from-orange-500/20 to-red-500/20',
      path: '/marketing'
    },
    {
      icon: 'ShoppingBag',
      title: 'Вывод на маркетплейсы',
      description: 'Запуск и продвижение на Wildberries, Ozon, Яндекс.Маркет',
      features: ['Регистрация магазина', 'Карточки товаров', 'Реклама и аналитика'],
      gradient: 'from-cyan-500/20 to-blue-500/20',
      path: '/marketplaces'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 relative overflow-hidden scroll-reveal" ref={sectionRef}>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(var(--gradient-mid-1))]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[hsl(var(--gradient-mid-2))]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <Badge className="mb-3 sm:mb-4 backdrop-blur-glass border-[hsl(var(--gradient-start))]">
            <span className="gradient-text">Наши услуги</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Что мы предлагаем</h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
            Полный спектр услуг для развития вашего бизнеса в интернете
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {services.slice(0, 3).map((service, index) => (
            <Card key={index} className={`gradient-border backdrop-blur-glass hover:scale-105 transition-all duration-300 group hover:shadow-2xl hover:shadow-[hsl(var(--gradient-start))]/20 animate-card-appear delay-${(index + 1) * 100} flex flex-col`}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--gradient-start))]/20 to-[hsl(var(--gradient-mid-1))]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Icon name={service.icon} className="gradient-text" size={24} />
                </div>
                <CardTitle className="text-xl sm:text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 mb-4 flex-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm sm:text-base text-foreground/80">
                      <Icon name="Check" className="text-accent flex-shrink-0" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-[hsl(var(--gradient-start))]/10 group-hover:to-[hsl(var(--gradient-mid-1))]/10 mt-auto transition-all" 
                  onClick={() => navigate(service.path)}
                >
                  Подробнее
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mt-4 sm:mt-6">
          {services.slice(3).map((service, index) => (
            <Card key={index + 3} className={`gradient-border backdrop-blur-glass hover:scale-105 transition-all duration-300 group hover:shadow-2xl hover:shadow-[hsl(var(--gradient-start))]/20 animate-card-appear delay-${(index + 4) * 100} flex flex-col`}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--gradient-start))]/20 to-[hsl(var(--gradient-mid-1))]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Icon name={service.icon} className="gradient-text" size={24} />
                </div>
                <CardTitle className="text-xl sm:text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 mb-4 flex-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm sm:text-base text-foreground/80">
                      <Icon name="Check" className="text-accent flex-shrink-0" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-[hsl(var(--gradient-start))]/10 group-hover:to-[hsl(var(--gradient-mid-1))]/10 mt-auto transition-all" 
                  onClick={() => navigate(service.path)}
                >
                  Подробнее
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}