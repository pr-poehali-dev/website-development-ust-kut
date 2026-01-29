import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function ServicesSection() {
  const navigate = useNavigate();

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
    <section id="services" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Наши услуги</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Что мы предлагаем</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Полный спектр услуг для развития вашего бизнеса в интернете
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.slice(0, 3).map((service, index) => (
            <Card key={index} className={`bg-gradient-to-br ${service.gradient} border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg animate-card-appear delay-${(index + 1) * 100} flex flex-col`}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={service.icon as any} className="text-primary" size={24} />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 mb-4 flex-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground/80">
                      <Icon name="Check" className="text-accent" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary/10 mt-auto" 
                  onClick={() => navigate(service.path)}
                >
                  Подробнее
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          {services.slice(3).map((service, index) => (
            <Card key={index + 3} className={`bg-gradient-to-br ${service.gradient} border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg animate-card-appear delay-${(index + 4) * 100} flex flex-col`}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={service.icon as any} className="text-primary" size={24} />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 mb-4 flex-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground/80">
                      <Icon name="Check" className="text-accent" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary/10 mt-auto" 
                  onClick={() => navigate(service.path)}
                >
                  Подробнее
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}