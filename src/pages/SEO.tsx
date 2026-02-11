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

export default function SEO() {
  return (
    <>
      <ParticlesBackground />
      <MobileHint />
      <SEOContent />
    </>
  );
}

function SEOContent() {
  const navigate = useNavigate();

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
        <title>SEO-продвижение сайтов в ТОП Яндекс и Google | Элегия Усть-Кут</title>
        <meta name="description" content="Комплексное SEO-продвижение сайтов в Яндекс и Google. Технический аудит, семантика, ссылочное продвижение, контент-маркетинг. Тарифы от 25 000 ₽/мес. +340% рост трафика" />
        <meta name="keywords" content="seo продвижение, seo усть-кут, продвижение сайта, яндекс топ, google топ, технический аудит, семантическое ядро, ссылочное продвижение" />
        <link rel="canonical" href="https://elegiya-web.ru/seo" />
        
        <meta property="og:title" content="SEO-продвижение сайтов в ТОП | Элегия" />
        <meta property="og:description" content="Выведем ваш сайт в ТОП Яндекс и Google. Комплексное SEO: аудит, оптимизация, ссылки, контент. Результат +340% трафика" />
        <meta property="og:url" content="https://elegiya-web.ru/seo" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "SEO-продвижение сайтов",
            "name": "Комплексное SEO-продвижение",
            "description": "Продвижение сайтов в Яндекс и Google: техническая оптимизация, семантика, контент, ссылочное продвижение",
            "provider": {
              "@type": "Organization",
              "name": "Элегия",
              "url": "https://elegiya-web.ru",
              "telephone": "+7 (903) 988-56-27",
              "email": "elegy38@yandex.ru"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Россия"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Базовый тариф",
                "description": "Для небольших сайтов и локального бизнеса",
                "price": "25000",
                "priceCurrency": "RUB",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "25000",
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
                "name": "Оптимальный тариф",
                "description": "Для средних сайтов с конкуренцией",
                "price": "45000",
                "priceCurrency": "RUB"
              },
              {
                "@type": "Offer",
                "name": "Максимальный тариф",
                "description": "Для крупных проектов и высокой конкуренции",
                "price": "80000",
                "priceCurrency": "RUB"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "47"
            }
          })}
        </script>
      </Helmet>
      <PageNav currentPage="/seo" />

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-[hsl(var(--gradient-start))]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-[hsl(var(--gradient-mid-2))]/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge className="backdrop-blur-glass border-[hsl(var(--gradient-start))]">
                <span className="gradient-text">SEO-продвижение</span>
              </Badge>
              <h1 className="md:text-6xl font-bold leading-tight text-3xl">
                Выведем ваш сайт в <span className="gradient-text">ТОП</span> поисковых систем
              </h1>
              <p className="text-xl text-muted-foreground">
                Комплексное SEO-продвижение в Яндекс и Google для роста трафика и увеличения продаж
              </p>
              <Button size="lg" className="gradient-button button-hover-effect text-base sm:text-lg px-6 sm:px-8 shadow-lg shadow-[hsl(var(--gradient-start))]/30" onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}>
                Получить аудит сайта
              </Button>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid-1))] to-[hsl(var(--gradient-mid-2))] opacity-20 blur-3xl rounded-2xl animate-glow"></div>
              <img 
                src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/3307251c-c74c-493b-b7f0-2bdc269af8f0.png" 
                alt="SEO-продвижение сайтов" 
                className="relative w-full h-auto drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--gradient-mid-1))]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
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
                <div key={index} ref={priceRevealRefs[index]}>
                <Card 
                  ref={priceTiltRefs[index]}
                  className={`relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''} transition-shadow duration-300 overflow-hidden animate-card-appear delay-${(index + 1) * 100}`}
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
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}>
                      Выбрать тариф
                    </Button>
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
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-6 sm:mb-8">
              Проанализируем ваш сайт и подготовим рекомендации по продвижению
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12" onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}>
              Заказать аудит
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}