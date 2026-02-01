import json
import re
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError
from html import unescape


def handler(event: dict, context) -> dict:
    '''Получение последних постов из публичного Telegram-канала'''
    
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        # Парсим параметры
        params = event.get('queryStringParameters') or {}
        limit = min(int(params.get('limit', 6)), 20)  # Максимум 20 постов
        
        # Публичный канал elegycreative
        channel = 'elegycreative'
        url = f'https://t.me/s/{channel}'
        
        # Получаем HTML страницу канала
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
        
        # Парсим посты из HTML
        posts = []
        
        # Ищем блоки с постами
        post_pattern = r'<div class="tgme_widget_message.*?data-post="[^"]+/(\d+)".*?>(.*?)</div>\s*</div>\s*</div>'
        matches = re.finditer(post_pattern, html, re.DOTALL)
        
        for match in matches[:limit]:
            post_id = match.group(1)
            post_html = match.group(2)
            
            # Извлекаем текст
            text_match = re.search(r'<div class="tgme_widget_message_text[^"]*"[^>]*>(.*?)</div>', post_html, re.DOTALL)
            text = ''
            if text_match:
                text_raw = text_match.group(1)
                # Убираем HTML теги
                text = re.sub(r'<[^>]+>', '', text_raw)
                text = unescape(text).strip()
                # Ограничиваем длину
                if len(text) > 300:
                    text = text[:300] + '...'
            
            # Извлекаем изображение
            image = None
            image_match = re.search(r'<a[^>]+style="background-image:url\(\'([^\']+)\'\)"', post_html)
            if image_match:
                image = image_match.group(1)
            
            # Извлекаем дату
            date = None
            date_match = re.search(r'<time[^>]+datetime="([^"]+)"', post_html)
            if date_match:
                date = date_match.group(1)
            
            # Формируем ссылку на пост
            post_url = f'https://t.me/{channel}/{post_id}'
            
            if text or image:  # Добавляем только если есть контент
                posts.append({
                    'id': post_id,
                    'text': text,
                    'image': image,
                    'date': date,
                    'url': post_url
                })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=600'  # Кеш 10 минут
            },
            'body': json.dumps({
                'channel': channel,
                'posts': posts,
                'total': len(posts)
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except (HTTPError, URLError) as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to fetch Telegram data: {str(e)}'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Internal error: {str(e)}'}),
            'isBase64Encoded': False
        }
