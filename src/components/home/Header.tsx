import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/3e363ff2-4f8b-4f00-a7ce-75460e851e6e.png" alt="Элегия" className="h-16" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" onClick={(e) => smoothScroll(e, '#services')} className="text-foreground/80 hover:text-primary transition-colors cursor-pointer">
            Услуги
          </a>
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
              <a href="#services" onClick={(e) => smoothScroll(e, '#services')} className="text-lg text-foreground/80 hover:text-primary transition-colors">
                Услуги
              </a>
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
