export default function TelegramButton() {
  return (
    <a
      href="https://t.me/elegycreative"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 right-6 z-50 group"
      aria-label="Наш канал в Telegram"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#0088cc] rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse group-hover:blur-2xl" />
        <div className="relative w-16 h-16 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:duration-500 drop-shadow-2xl">
          <img
            src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/7c19cf41-b40a-445c-acd4-5cf1ed5e3bc4.png"
            alt="Telegram"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </a>
  );
}