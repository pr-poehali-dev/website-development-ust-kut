import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PageNavProps {
  currentPage?: string;
}

export default function PageNav({ currentPage }: PageNavProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const services = [
    { name: 'Разработка сайтов', path: '/development', icon: 'Code' },
    { name: 'SEO-продвижение', path: '/seo', icon: 'TrendingUp' },
    { name: 'Веб-дизайн', path: '/design', icon: 'Palette' },
    { name: 'Цифровой маркетинг', path: '/marketing', icon: 'Megaphone' },
    { name: 'Вывод на маркетплейсы', path: '/marketplaces', icon: 'ShoppingBag' }
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

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-glass border-b border-[hsl(var(--border))]">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/119321e0-95b2-4cb8-a386-b4f1f1833d05.png" 
            alt="Элегия" 
            className="h-12 sm:h-14 md:h-16" 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
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
          <span onClick={() => navigate('/blog')} className="text-muted-foreground hover:text-foreground transition-all cursor-pointer">
            Блог
          </span>
          <span onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-all cursor-pointer">
            Главная
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
                <Button type="submit" className="w-full bg-primary button-hover-effect">
                  Отправить заявку
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex flex-col gap-3">
                <div className="text-lg font-semibold text-foreground/90 mb-2">Услуги</div>
                {services.map((service) => (
                  <span 
                    key={service.path}
                    onClick={() => { navigate(service.path); setMobileMenuOpen(false); }} 
                    className="text-base text-foreground/70 hover:text-primary transition-colors cursor-pointer pl-4 flex items-center gap-2"
                  >
                    <Icon name={service.icon} size={16} />
                    {service.name}
                  </span>
                ))}
              </div>
              <span onClick={() => { navigate('/portfolio'); setMobileMenuOpen(false); }} className="text-lg text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                Портфолио
              </span>
              <span onClick={() => { navigate('/blog'); setMobileMenuOpen(false); }} className="text-lg text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                Блог
              </span>
              <span onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-lg text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                Главная
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 w-full">Связаться</Button>
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
                    <Button type="submit" className="w-full bg-primary button-hover-effect">
                      Отправить заявку
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}