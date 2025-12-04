import Link from "next/link";

// ТРИ КРАСИВЫЕ ФОТО, ПРИВЯЗАННЫЕ К ID СТУДИЙ
const imagesById = {
  1: "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
  2: "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg",
  3: "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg",
};

// запасные картинки, если вдруг id другой
const fallbackImages = [
  "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/e6e479f225a0de3c0a69a3ca1fb103c1.jpeg",
  "https://cdn.fotores.ru/5f03b9a872a946c0a940a11f3e8ab775/2735bae424272760dae20fb28b412641.jpeg",
  "https://cdn.fotores.ru/bc829876619d41b4b45b22dbb306438b/fa433cc6344f575beb497e5fa8b77a30.jpeg",
];

export default function PavilionCard({ pavilion }) {
  const slug = pavilion.slug || `studio-${pavilion.id}`;

  // 1) СНАЧАЛА пробуем наши привязанные фотки
  const mappedImage = imagesById[pavilion.id];

  // 2) ПОКА ЧТО main_image_url ИГНОРИРУЕМ, что бы не ломал нам фото
  // Если потом настроишь нормальные URL в базе — можно поменять приоритет.
  const dbImage = null;
  // если захочешь включить обратно:
  // const dbImage =
  //   pavilion.main_image_url && pavilion.main_image_url.trim() !== ""
  //     ? pavilion.main_image_url
  //     : null;

  // 3) Фоллбек
  const fallback =
    fallbackImages[(pavilion.id || 0) % fallbackImages.length];

  const imageSrc = mappedImage || dbImage || fallback;

  const price = pavilion.price_per_hour || 0;

  return (
    <article className="card overflow-hidden flex flex-col">
      {/* КАРТИНКА */}
      <div className="relative h-40 sm:h-44 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={pavilion.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* ТЕКСТ */}
      <div className="flex-1 flex flex-col px-5 pt-4 pb-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-sm font-semibold text-brand-dark leading-snug">
            {pavilion.name}
          </h3>
          {price ? (
            <div className="text-right text-xs">
              <div className="font-semibold text-brand-dark">
                {Number(price).toLocaleString("en-US")} AMD
              </div>
              <div className="text-slate-500">per hour</div>
            </div>
          ) : null}
        </div>

        <p className="text-xs text-slate-500 mb-3">
          {pavilion.location || "Central Yerevan"}
        </p>

        <div className="text-[11px] text-slate-600 space-y-1 mb-4">
          {pavilion.area_sqm && (
            <p>
              <span className="font-semibold">Area:</span>{" "}
              {pavilion.area_sqm} m²
            </p>
          )}
          {pavilion.ceiling_height && (
            <p>
              <span className="font-semibold">Ceiling:</span>{" "}
              {pavilion.ceiling_height} m
            </p>
          )}
          {pavilion.capacity && (
            <p>
              <span className="font-semibold">Capacity:</span>{" "}
              {pavilion.capacity} people
            </p>
          )}
        </div>

        <Link
          href={`/pavilions/${slug}`}
          className="mt-auto btn-primary w-full justify-center text-xs"
        >
          Details &amp; Booking
        </Link>
      </div>
    </article>
  );
}
