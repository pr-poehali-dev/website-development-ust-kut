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
        <div className="relative w-16 h-16 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:duration-500 drop-shadow-2xl">
          <img
            src="https://cdn.poehali.dev/projects/9197360f-80fb-4765-9577-d256b27f806c/bucket/b874453c-da5f-4b92-9a39-ae24deb4e509.png"
            alt="VK"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </a>
  );
}