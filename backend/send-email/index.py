import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event: dict, context) -> dict:
    """API для отправки заявок с сайта на email через SMTP"""
    
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Парсинг данных формы
    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    
    form_type = body.get('type', 'contact')
    name = body.get('name', '')
    email = body.get('email', '')
    phone = body.get('phone', '')
    message = body.get('message', '')
    
    # Валидация
    if form_type == 'callback':
        if not phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Телефон обязателен'}),
                'isBase64Encoded': False
            }
    elif not email:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email обязателен'}),
            'isBase64Encoded': False
        }
    
    # Получение настроек SMTP из secrets
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    
    if not all([smtp_host, smtp_user, smtp_password, recipient_email]):
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка принята (email не настроен)', 'warning': 'SMTP не настроен'}),
            'isBase64Encoded': False
        }
    
    # Формирование письма
    msg = MIMEMultipart('alternative')
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    msg['Subject'] = f'Новая заявка с сайта Elegia ({form_type})'
    
    # HTML-версия письма
    if form_type == 'contact':
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Новая заявка с формы обратной связи</h2>
            <p><strong>Время:</strong> {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}</p>
            <hr>
            <p><strong>Имя:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Телефон:</strong> {phone}</p>
            <p><strong>Сообщение:</strong><br>{message or 'Не указано'}</p>
        </body>
        </html>
        """
    elif form_type == 'newsletter':
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Новая подписка на рассылку</h2>
            <p><strong>Время:</strong> {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}</p>
            <hr>
            <p><strong>Email:</strong> {email}</p>
        </body>
        </html>
        """
    elif form_type == 'callback':
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Запрос обратного звонка</h2>
            <p><strong>Время:</strong> {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}</p>
            <hr>
            <p><strong>Имя:</strong> {name}</p>
            <p><strong>Телефон:</strong> {phone}</p>
            <p style="color: red;"><strong>⚠️ СРОЧНО! Перезвонить в течение 15 минут</strong></p>
        </body>
        </html>
        """
    else:  # request
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Новая заявка</h2>
            <p><strong>Время:</strong> {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}</p>
            <hr>
            <p><strong>Имя:</strong> {name}</p>
            <p><strong>Телефон:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
        </body>
        </html>
        """
    
    msg.attach(MIMEText(html_body, 'html'))
    
    # Отправка письма
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка принята', 'warning': f'Email не отправлен: {str(e)}'}),
            'isBase64Encoded': False
        }