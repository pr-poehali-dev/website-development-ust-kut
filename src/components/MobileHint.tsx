import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function MobileHint() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenHint = localStorage.getItem('hasSeenMobileHint');
    const isMobile = window.innerWidth <= 768;

    if (!hasSeenHint && isMobile) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenMobileHint', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <div 
        className="absolute bottom-32 right-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-2xl max-w-[280px] pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500"
        role="alert"
      >
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 w-6 h-6 bg-background rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          aria-label="Закрыть"
        >
          <X size={14} className="text-foreground" />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-0.5">👋</div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Нужна помощь?</p>
            <p className="text-xs opacity-90">
              Закажите обратный звонок или напишите нам в VK — ответим за 15 минут!
            </p>
          </div>
        </div>

        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-primary transform rotate-45"></div>
      </div>
    </div>
  );
}
