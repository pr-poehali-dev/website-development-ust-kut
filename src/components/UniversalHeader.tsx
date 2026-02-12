import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface UniversalHeaderProps {
  showHomeLinks?: boolean;
  onHomeNavClick?: (targetId: string) => void;
}

export default function UniversalHeader({ showHomeLinks = false, onHomeNavClick }: UniversalHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const services = [
    { name: 'Разработка сайтов', path: '/development', icon: 'Code' },
    { name: 'SEO-продвижение', path: '/seo', icon: 'TrendingUp' },
    { name: 'Веб-дизайн', path: '/design', icon: 'Palette' },
    { name: 'Цифровой маркетинг', path: '/marketing', icon: 'Megaphone' },
    { name: 'Вывод на маркетплейсы', path: '/marketplaces', icon: 'ShoppingBag' }
  ];

  const menuItems = [
    { name: 'Главная', path: '/', icon: 'Home' },
    ...services,
    { name: 'Портфолио', path: '/portfolio', icon: 'Briefcase' },
    { name: 'Блог', path: '/blog', icon: 'BookOpen' }
  ];

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
        if (typeof window !== 'undefined' && window.ym) {
          window.ym(106521597, 'reachGoal', 'contact_form');
        }
        
        toast({
          title: '✅ Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время.',
          className: 'border-green-500 bg-green-50 text-green-900',
        });
        setIsDialogOpen(false);
        (e.target as HTMLFormElement).reset();
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

  const handleHomeLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (location.pathname === '/' && onHomeNavClick) {
      onHomeNavClick(targetId);
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/119321e0-95b2-4cb8-a386-b4f1f1833d05.png" 
            alt="Элегия" 
            className="h-10 sm:h-12 md:h-14" 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground transition-all cursor-pointer flex items-center gap-1">
              Услуги
              <Icon name="ChevronDown" size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {services.map((service) => (
                <DropdownMenuItem 
                  key={service.path}
                  onClick={() => navigate(service.path)}
                  className="cursor-pointer"
                >
                  <Icon name={service.icon} size={16} className="mr-2" />
                  {service.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <span onClick={() => navigate('/portfolio')} className="text-muted-foreground hover:text-foreground transition-all cursor-pointer">
            Портфолио
          </span>

          {showHomeLinks && (
            <>
              <a href="#calculator" onClick={(e) => handleHomeLinkClick(e, '#calculator')} className="text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                Калькулятор
              </a>
              <a href="#reviews" onClick={(e) => handleHomeLinkClick(e, '#reviews')} className="text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                Отзывы
              </a>
            </>
          )}

          <span onClick={() => navigate('/blog')} className="text-muted-foreground hover:text-foreground transition-all cursor-pointer">
            Блог
          </span>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-mid-1))] hover:opacity-90 transition-opacity shadow-lg shadow-[hsl(var(--gradient-start))]/20">
                Связаться
              </Button>
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

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90" size="sm">
                Связаться
              </Button>
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

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/119321e0-95b2-4cb8-a386-b4f1f1833d05.png" 
                    alt="Элегия" 
                    className="h-10" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {menuItems.map((item) => (
                    <SheetClose key={item.path} asChild>
                      <Button
                        variant={location.pathname === item.path ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Icon name={item.icon} size={18} className="mr-3" />
                        {item.name}
                      </Button>
                    </SheetClose>
                  ))}
                </div>

                {showHomeLinks && location.pathname === '/' && (
                  <div className="flex flex-col gap-2 border-t border-border pt-4">
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          onHomeNavClick?.('#calculator');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Icon name="Calculator" size={18} className="mr-3" />
                        Калькулятор
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          onHomeNavClick?.('#reviews');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Icon name="Star" size={18} className="mr-3" />
                        Отзывы
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
