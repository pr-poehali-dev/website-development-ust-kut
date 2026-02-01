import { useEffect, useState } from 'react';
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
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Наши новости
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
              {posts.map((post) => (
                <Card 
                  key={post.id} 
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-muted hover:border-primary/50"
                >
                  {post.image && (
                    <div className="relative overflow-hidden bg-muted aspect-video">
                      <img
                        src={post.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                      className="w-full group/btn"
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
              <Button size="lg" asChild>
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
