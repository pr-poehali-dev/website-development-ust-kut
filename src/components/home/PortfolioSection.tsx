import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTilt } from '@/hooks/useTilt';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function PortfolioSection() {
  const navigate = useNavigate();
  const portfolioRef = useScrollReveal();
  
  const projectTiltRefs = [
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>(),
    useTilt<HTMLDivElement>()
  ];

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

  return (
    <section id="portfolio" className="py-20 px-4 scroll-reveal" ref={portfolioRef}>
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
            <Card key={project.id} ref={projectTiltRefs[index]} className={`overflow-hidden hover:border-primary transition-shadow duration-300 group cursor-pointer animate-card-appear delay-${(index + 1) * 100} hover:shadow-lg hover:shadow-primary/20`} onClick={() => navigate('/portfolio')}>
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
  );
}
