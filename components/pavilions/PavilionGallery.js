// components/pavilions/PavilionGallery.js

// Галерея для каждой студии по ID
const galleryById = {
  1: [
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg",
    "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg",
  ],
  2: [
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg",
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
    "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg",
  ],
  3: [
    "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg",
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
    "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg",
  ],
};

const fallbackGallery = [
  "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
  "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg",
  "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg",
];

export default function PavilionGallery({ pavilion }) {
  const id = pavilion?.id;

  // БЕРЁМ ТОЛЬКО НАШИ CDN-КАРТИНКИ
  let images = galleryById[id];

  // НИКАКОЙ БД И НИКАКИХ pavilion-1-1.jpg тут нет
  if (!images || images.length === 0) {
    images = fallbackGallery;
  }

  const [main, ...thumbs] = images;

  return (
    <div className="card p-3 sm:p-4 md:p-5">
      <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-2xl mb-4">
        <img
          src={main}
          alt={`${pavilion.name} main view`}
          className="w-full h-full object-cover"
        />
      </div>

      {thumbs.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative h-14 sm:h-16 md:h-20 rounded-xl overflow-hidden border border-slate-200/60"
            >
              <img
                src={src}
                alt={`${pavilion.name} view ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
