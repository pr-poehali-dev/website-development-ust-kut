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
        <div className="absolute inset-0 bg-[#0077FF] rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse group-hover:blur-2xl" />
        <div className="relative w-14 h-14 bg-gradient-to-br from-[#0077FF] to-[#0055CC] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:duration-500">
          <svg
            className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300"
            viewBox="0 0 48 48"
            fill="currentColor"
          >
            <path d="M25.86 29.36c.87 0 1.33-.6 1.33-1.66v-3.35c0-1.06-.46-1.66-1.33-1.66h-.39c-.87 0-1.33.6-1.33 1.66v3.35c0 1.06.46 1.66 1.33 1.66h.39zm8.94-6.02c-.87 0-1.46.67-2.13 1.6v-1.27h-2.93v11.09h3.06v-6.15c.47-.73.94-1.07 1.46-1.07.4 0 .6.27.6.8v6.42h3.06v-7.09c0-1.93-.93-2.86-2.52-2.86l-.6-.47zm-17.74 6.82v-3.82c0-1.2.54-1.86 1.54-1.86.93 0 1.4.6 1.4 1.73v.87h2.93v-1.27c0-2.53-1.4-3.93-3.93-3.93-1.13 0-2.06.4-2.8 1.2v-4.69h-3.06v11.76c0 2.53 1.4 3.93 3.93 3.93s3.93-1.4 3.93-3.93v-.87h-2.93c0 1.13-.47 1.73-1.4 1.73-1 .01-1.54-.66-1.54-1.85zm22.67-8.82h3.06v11.42h-3.06V21.34zm-25.6 5.62l2.06-5.62h-3.26l-1.2 4.09-1.27-4.09H7.2l2.13 5.75-2.26 5.67h3.26l1.33-4.22 1.4 4.22h3.26l-2.19-5.8z"/>
          </svg>
        </div>
      </div>
    </a>
  );
}