import PavilionCard from "../pavilions/PavilionCard";

export default function PavilionsPreviewSection({ pavilions }) {
  const preview = pavilions.slice(0, 3);

  return (
    <section className="section">
      <div className="container-page space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Explore our studio pavilions
            </h2>
            <p className="text-sm md:text-base text-white/60 mt-2 max-w-xl">
              Each space is curated by Ani Hambardzumian with light, texture and
              comfort in mind — ready for editorial, commercial and content shoots.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
          {preview.map((pavilion) => (
            <PavilionCard key={pavilion.id} pavilion={pavilion} />
          ))}
        </div>
      </div>
    </section>
  );
}
