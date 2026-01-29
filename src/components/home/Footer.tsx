import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="py-8 sm:py-10 md:py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-7 md:gap-8 mb-6 sm:mb-7 md:mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/ad88edee-174d-428d-8f2f-14b7f45fb7ed.png" alt="Элегия" className="h-8 sm:h-10" />
            </div>
            <p className="text-xs sm:text-sm text-foreground/60">
              Премиальная разработка сайтов и SEO-продвижение в Усть-Куте
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Услуги</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/70">
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/development')}>Разработка сайтов</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/seo')}>SEO-продвижение</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/design')}>Веб-дизайн</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/marketing')}>Цифровой маркетинг</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Компания</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/70">
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/')}>О нас</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/portfolio')}>Портфолио</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/blog')}>Блог</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Контакты</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/70">
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-accent" />
                г. Усть-Кут
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-accent" />
                <a href="tel:+79039885627" className="hover:text-primary transition-colors">+7 (903) 988-56-27</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-accent" />
                <a href="mailto:elegy38@yandex.ru" className="hover:text-primary transition-colors">elegy38@yandex.ru</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 sm:pt-7 md:pt-8 border-t border-border text-center text-xs sm:text-sm text-foreground/60">
          © 2026 Элегия. Все права защищены.
        </div>
      </div>
    </footer>
  );
}