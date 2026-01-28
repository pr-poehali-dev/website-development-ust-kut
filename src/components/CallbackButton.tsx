import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function CallbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('https://functions.poehali.dev/facfc1c0-72cc-4f8e-8c21-113d5964b377', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'callback',
          name: formData.get('name'),
          phone: formData.get('phone')
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Заявка принята!',
          description: 'Мы перезвоним вам в течение 15 минут.',
        });
        setIsOpen(false);
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

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-52 right-6 z-50 group"
        aria-label="Заказать обратный звонок"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse group-hover:blur-2xl" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-300 drop-shadow-2xl">
            <Icon name="Phone" className="text-white" size={28} />
          </div>
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Заказать обратный звонок</DialogTitle>
            <DialogDescription>
              Оставьте свой номер, и мы перезвоним вам в течение 15 минут
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Ваше имя</label>
              <Input 
                name="name" 
                required 
                placeholder="Иван Иванов"
                className="bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Телефон</label>
              <Input 
                name="phone" 
                required 
                type="tel" 
                placeholder="+7 (903) 988-56-27"
                className="bg-background"
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
              <Icon name="Phone" className="mr-2" size={18} />
              Заказать звонок
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}