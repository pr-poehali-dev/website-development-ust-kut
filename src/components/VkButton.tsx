export default function VkButton() {
  return (
    <a
      href="https://vk.com/elegycreative"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Наша группа ВКонтакте"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#0077FF] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
        <div className="relative w-14 h-14 bg-[#0077FF] rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
          <svg
            className="w-8 h-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.77c-.24.73-.97 1.26-1.73 1.26h-1.22c-.82 0-1.06-.66-2.51-2.11-1.26-1.22-1.82-1.39-2.14-1.39-.43 0-.56.13-.56.75v1.92c0 .52-.17.83-1.52.83-2.26 0-4.76-1.37-6.52-3.92-2.64-3.75-3.37-6.58-3.37-7.16 0-.32.13-.62.75-.62h1.22c.56 0 .77.26.98.86.12.34 1.53 3.83 1.99 4.4.22.28.33.39.45.39.17 0 .28-.11.28-.65V8.51c-.06-.98-.57-1.06-.57-1.41 0-.26.21-.52.56-.52h1.92c.47 0 .64.25.64.82v3.47c0 .47.21.64.35.64.17 0 .39-.17.78-.56 1.2-1.34 2.05-3.42 2.05-3.42.11-.24.37-.47.94-.47h1.22c.73 0 .89.37.73.87-.23.85-2.33 3.93-2.33 3.93-.15.24-.2.35 0 .63.15.2.64.63 1.07 1.11.78.83 1.38 1.52 1.54 2z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
