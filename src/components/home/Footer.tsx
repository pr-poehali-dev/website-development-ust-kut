import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative py-8 sm:py-10 md:py-12 px-4 border-t border-[hsl(var(--border))] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-start))]/5 via-transparent to-[hsl(var(--gradient-end))]/5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-7 md:gap-8 mb-6 sm:mb-7 md:mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/ad88edee-174d-428d-8f2f-14b7f45fb7ed.png" alt="Элегия" className="h-8 sm:h-10" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Премиальная разработка сайтов и SEO-продвижение в Иркутске
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base gradient-text">Услуги</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/development')}>Разработка сайтов</li>
              <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/seo')}>SEO-продвижение</li>
              <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/design')}>Веб-дизайн</li>
              <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/marketing')}>Цифровой маркетинг</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base gradient-text">Компания</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/')}>О нас</li>
              <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/portfolio')}>Портфолио</li>
              <li className="cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/blog')}>Блог</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base gradient-text">Контакты</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-[hsl(var(--gradient-start))]" />
                Иркутск, Лермонтова 81/17 офис 1
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-[hsl(var(--gradient-mid-1))]" />
                <a href="tel:+79039885627" className="hover:text-foreground transition-colors">+7 (903) 988-56-27</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-[hsl(var(--gradient-mid-2))]" />
                <a href="mailto:elegy38@yandex.ru" className="hover:text-foreground transition-colors">elegy38@yandex.ru</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 sm:pt-7 md:pt-8 border-t border-[hsl(var(--border))] text-center text-xs sm:text-sm text-muted-foreground">
          © 2026 Элегия. Все права защищены.
        </div>
      </div>
    </footer>
  );
}