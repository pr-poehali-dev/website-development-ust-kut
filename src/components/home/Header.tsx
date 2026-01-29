import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  smoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function Header({
  isDialogOpen,
  setIsDialogOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  smoothScroll,
  handleFormSubmit
}: HeaderProps) {
  const navigate = useNavigate();

  const services = [
    { name: 'Разработка сайтов', path: '/development', icon: 'Code' },
    { name: 'SEO-продвижение', path: '/seo', icon: 'TrendingUp' },
    { name: 'Веб-дизайн', path: '/design', icon: 'Palette' },
    { name: 'Цифровой маркетинг', path: '/marketing', icon: 'Megaphone' },
    { name: 'Вывод на маркетплейсы', path: '/marketplaces', icon: 'ShoppingBag' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/119321e0-95b2-4cb8-a386-b4f1f1833d05.png" alt="Элегия" className="h-12 sm:h-14 md:h-16" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground/80 hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
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
                  <Icon name={service.icon as any} size={16} className="mr-2" />
                  {service.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <span onClick={() => navigate('/portfolio')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
            Портфолио
          </span>
          <a href="#calculator" onClick={(e) => smoothScroll(e, '#calculator')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
            Калькулятор
          </a>
          <a href="#reviews" onClick={(e) => smoothScroll(e, '#reviews')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
            Отзывы
          </a>
          <span onClick={() => navigate('/blog')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
            Блог
          </span>
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
                    <Icon name={service.icon as any} size={16} />
                    {service.name}
                  </span>
                ))}
              </div>
              <span onClick={() => { navigate('/portfolio'); setMobileMenuOpen(false); }} className="text-lg text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                Портфолио
              </span>
              <a href="#calculator" onClick={(e) => smoothScroll(e, '#calculator')} className="text-lg text-foreground/80 hover:text-primary transition-colors">
                Калькулятор
              </a>
              <a href="#reviews" onClick={(e) => smoothScroll(e, '#reviews')} className="text-lg text-foreground/80 hover:text-primary transition-colors">
                Отзывы
              </a>
              <span onClick={() => { navigate('/blog'); setMobileMenuOpen(false); }} className="text-lg text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                Блог
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
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
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