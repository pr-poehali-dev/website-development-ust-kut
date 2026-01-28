import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4 cursor-pointer" onClick={() => navigate('/')}>
              <img src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/3e363ff2-4f8b-4f00-a7ce-75460e851e6e.png" alt="Элегия" className="h-12" />
            </div>
            <p className="text-sm text-foreground/60">
              Веб-студия полного цикла в Усть-Куте: от идеи до запуска
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/development')}>Разработка сайтов</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/seo')}>SEO-продвижение</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/design')}>Веб-дизайн</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/marketing')}>Цифровой маркетинг</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/portfolio')}>Портфолио</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/blog')}>Блог</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => window.open('https://vk.com/elegycreative', '_blank')}>VK</li>
              <li className="cursor-pointer hover:text-primary transition-colors" onClick={() => window.open('https://t.me/elegycreative', '_blank')}>Telegram</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="text-accent mt-0.5" />
                <span>Иркутская область,<br />г. Усть-Кут</span>
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
        <div className="pt-8 border-t border-border text-center text-sm text-foreground/60">
          © 2026 Элегия. Все права защищены.
        </div>
      </div>
    </footer>
  );
}