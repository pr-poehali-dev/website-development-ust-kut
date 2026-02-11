import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';

interface TelegramPost {
  id: string;
  text: string;
  image: string | null;
  date: string | null;
  url: string;
}

export default function TelegramPosts() {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useScrollReveal();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://functions.poehali.dev/telegram-posts?limit=6');
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить посты');
      }
      
      const data = await response.json();
      setPosts(data.posts || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      console.error('Error fetching Telegram posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  if (error) {
    return null; // Скрываем секцию при ошибке
  }

  return (
    <section className="py-20 relative overflow-hidden scroll-reveal" ref={sectionRef}>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[hsl(var(--gradient-end))]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[hsl(var(--gradient-start))]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Наши новости</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Следите за нашими работами и новостями в Telegram-канале
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-6">Пока нет постов</p>
            <Button asChild>
              <a href="https://t.me/elegycreative" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={18} className="mr-2" />
                Подписаться на канал
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className={`group gradient-border backdrop-blur-glass hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[hsl(var(--gradient-start))]/20 animate-card-appear delay-${(index + 1) * 100} overflow-hidden`}
                >
                  {post.image && (
                    <div className="relative overflow-hidden bg-muted aspect-video">
                      <img
                        src={post.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--gradient-start))]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    {post.date && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Icon name="Calendar" size={14} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    )}
                    
                    {post.text && (
                      <p className="text-sm text-foreground/80 line-clamp-4 mb-4">
                        {post.text}
                      </p>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full group/btn hover:bg-gradient-to-r hover:from-[hsl(var(--gradient-start))]/10 hover:to-[hsl(var(--gradient-mid-1))]/10"
                      asChild
                    >
                      <a 
                        href={post.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Читать в Telegram
                        <Icon name="ExternalLink" size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-mid-1))] hover:opacity-90 transition-opacity shadow-lg shadow-[hsl(var(--gradient-start))]/30" asChild>
                <a href="https://t.me/elegycreative" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" size={18} className="mr-2" />
                  Подписаться на канал
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}