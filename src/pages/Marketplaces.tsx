import { useTilt } from '@/hooks/useTilt';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

import MobileHint from '@/components/MobileHint';
import Footer from '@/components/home/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import PageNav from '@/components/PageNav';

export default function Marketplaces() {
  return (
    <>
      <ParticlesBackground />
      <MobileHint />
      <MarketplacesContent />
    </>
  );
}

function MarketplacesContent() {
  const navigate = useNavigate();

  const platformTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const serviceTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const priceTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

  const platformRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 100 }),
    useScrollReveal<HTMLDivElement>({ delay: 200 }),
    useScrollReveal<HTMLDivElement>({ delay: 300 })
  ];

  const serviceRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 100 }),
    useScrollReveal<HTMLDivElement>({ delay: 200 }),
    useScrollReveal<HTMLDivElement>({ delay: 300 }),
    useScrollReveal<HTMLDivElement>({ delay: 400 }),
    useScrollReveal<HTMLDivElement>({ delay: 500 })
  ];

  const priceRevealRefs = [
    useScrollReveal<HTMLDivElement>({ delay: 0 }),
    useScrollReveal<HTMLDivElement>({ delay: 150 }),
    useScrollReveal<HTMLDivElement>({ delay: 300 })
  ];



  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Вывод на маркетплейсы Wildberries, Ozon | Элегия Усть-Кут</title>
        <meta name="description" content="Запуск и продвижение на маркетплейсах Wildberries, Ozon, Яндекс.Маркет. Регистрация, создание карточек товаров, настройка рекламы. От 40 000 ₽/мес" />
        <meta name="keywords" content="вывод на маркетплейсы, wildberries, ozon, яндекс маркет, карточки товаров, продвижение маркетплейс, реклама wildberries, усть-кут" />
        <link rel="canonical" href="https://elegiya-web.ru/marketplaces" />
        
        <meta property="og:title" content="Вывод на маркетплейсы Wildberries, Ozon | Элегия" />
        <meta property="og:description" content="Полный цикл запуска и продвижения на маркетплейсах. Регистрация магазина, создание карточек товаров, настройка рекламы, аналитика. Тарифы от 40 000 ₽/мес" />
        <meta property="og:url" content="https://elegiya-web.ru/marketplaces" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/dee9cd02-b518-4ea1-9a6c-8e82b1815400.png" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Вывод бизнеса на маркетплейсы",
            "name": "Запуск и продвижение на маркетплейсах",
            "description": "Полный цикл запуска и продвижения бизнеса на Wildberries, Ozon, Яндекс.Маркет и других маркетплейсах",
            "provider": {
              "@type": "Organization",
              "name": "Элегия",
              "url": "https://elegiya-web.ru",
              "telephone": "+7 (903) 988-56-27",
              "email": "elegy38@yandex.ru",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Усть-Кут",
                "addressRegion": "Иркутская область",
                "addressCountry": "RU"
              }
            },
            "areaServed": {
              "@type": "Country",
              "name": "Россия"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Тариф Старт",
                "description": "Для запуска на одной площадке",
                "price": "40000",
                "priceCurrency": "RUB",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "40000",
                  "priceCurrency": "RUB",
                  "referenceQuantity": {
                    "@type": "QuantitativeValue",
                    "value": "1",
                    "unitCode": "MON"
                  }
                }
              },
              {
                "@type": "Offer",
                "name": "Тариф Рост",
                "description": "Для активных продаж на 2-3 площадках",
                "price": "70000",
                "priceCurrency": "RUB"
              },
              {
                "@type": "Offer",
                "name": "Тариф Максимум",
                "description": "Полное ведение магазина на всех маркетплейсах",
                "price": "120000",
                "priceCurrency": "RUB"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги вывода на маркетплейсы",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Регистрация и настройка магазина",
                    "description": "Регистрация на Wildberries, Ozon, Яндекс.Маркет, настройка личного кабинета, подключение оплаты и доставки"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Создание карточек товаров",
                    "description": "Профессиональная фотосъемка, написание продающих описаний, заполнение характеристик"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Реклама на маркетплейсах",
                    "description": "Настройка и ведение рекламных кампаний на площадках"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      <PageNav currentPage="/marketplaces" />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                Вывод на маркетплейсы
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Выводим бизнес на <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">маркетплейсы</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-8">
                Полный цикл запуска и продвижения на Wildberries, Ozon, Яндекс.Маркет и других площадках
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8">
                    Начать продавать
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/dee9cd02-b518-4ea1-9a6c-8e82b1815400.png" 
                alt="Маркетплейсы Wildberries, Ozon" 
                className="w-full h-auto rounded-2xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">На каких площадках работаем</h2>
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
                <div key={index} ref={platformRevealRefs[index]}>
                  <Card ref={platformTiltRefs[index]} className="text-center transition-shadow duration-300 overflow-hidden h-full">
                    <CardHeader>
                      <Icon name={platform.icon} className={`${platform.color} mx-auto mb-4`} size={56} />
                      <CardTitle className="text-xl">{platform.name}</CardTitle>
                      <CardDescription>{platform.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Что мы делаем</h2>
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
                <div key={index} ref={serviceRevealRefs[index]}>
                  <Card ref={serviceTiltRefs[index]} className="transition-shadow duration-300 overflow-hidden h-full">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Тарифы</h2>
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
                <div key={index} ref={priceRevealRefs[index]}>
                <Card 
                  ref={priceTiltRefs[index]}
                  className={`relative overflow-hidden ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''} transition-shadow duration-300`}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Преимущества работы с маркетплейсами</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Готовы выйти на маркетплейсы?</h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-6 sm:mb-8">
              Оставьте заявку, и мы проведём бесплатную консультацию по запуску вашего бизнеса
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-8 sm:px-12">
                  Получить консультацию
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