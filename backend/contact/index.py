import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def handler(event: dict, context) -> dict:
    """Обработка заявок с формы обратной связи и отправка на email"""
    
    method = event.get('httpMethod', 'GET')
    
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
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        name = body.get('name', '').strip()
        email = body.get('email', '').strip()
        phone = body.get('phone', '').strip()
        message = body.get('message', '').strip()
        
        if not name or not email or not phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Все обязательные поля должны быть заполнены'}),
                'isBase64Encoded': False
            }
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        recipient_email = os.environ.get('RECIPIENT_EMAIL')
        
        if not all([smtp_host, smtp_user, smtp_password, recipient_email]):
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Отправка email не настроена. Обратитесь к администратору.'}),
                'isBase64Encoded': False
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка с сайта Элегия от {name}'
        msg['From'] = smtp_user
        msg['To'] = recipient_email
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #DC2626; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
                        Новая заявка с сайта
                    </h2>
                    <p style="font-size: 14px; color: #666;">
                        Дата и время: {datetime.now().strftime('%d.%m.%Y %H:%M')}
                    </p>
                    <table style="width: 100%; margin-top: 20px;">
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; font-weight: bold; width: 150px;">Имя:</td>
                            <td style="padding: 10px;">{name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold;">Email:</td>
                            <td style="padding: 10px;"><a href="mailto:{email}" style="color: #DC2626;">{email}</a></td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; font-weight: bold;">Телефон:</td>
                            <td style="padding: 10px;"><a href="tel:{phone}" style="color: #DC2626;">{phone}</a></td>
                        </tr>
                        {f'''<tr>
                            <td style="padding: 10px; font-weight: bold; vertical-align: top;">Сообщение:</td>
                            <td style="padding: 10px;">{message}</td>
                        </tr>''' if message else ''}
                    </table>
                    <div style="margin-top: 30px; padding: 15px; background-color: #f0f0f0; border-left: 4px solid #D4AF37;">
                        <p style="margin: 0; font-size: 13px; color: #666;">
                            Это автоматическое письмо с сайта elegia.ru. Пожалуйста, свяжитесь с клиентом в ближайшее время.
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
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
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
            }),
            'isBase64Encoded': False
        }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Некорректный формат данных'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка при отправке заявки: {str(e)}'}),
            'isBase64Encoded': False
        }
