import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import BookingSidebar from "../../../components/BookingSidebar";
import { getPavilionBySlug } from "../../../lib/pavilions";

export const dynamic = "force-dynamic";

export default async function PavilionPage({ params }) {
  const pavilion = await getPavilionBySlug(params.slug);

  if (!pavilion) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container-page section">
          <p className="text-sm text-slate-600">Pavilion not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  let gallery = [];
  if (pavilion.gallery_image_urls) {
    try {
      gallery =
        typeof pavilion.gallery_image_urls === "string"
          ? JSON.parse(pavilion.gallery_image_urls)
          : pavilion.gallery_image_urls;
    } catch {
      gallery = [];
    }
  }

  let features = {};
  if (pavilion.features) {
    try {
      features =
        typeof pavilion.features === "string"
          ? JSON.parse(pavilion.features)
          : pavilion.features;
    } catch {
      features = {};
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container-page">
            {/* ОБЩИЙ КОНТЕЙНЕР ДЛЯ БРОНИ + КОНТЕНТА */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
              {/* БЛОК БРОНИРОВАНИЯ */}
              <div className="w-full lg:w-auto flex justify-center lg:justify-start mb-10 lg:mb-0">
                <div className="w-full max-w-[420px]">
                  <BookingSidebar pavilion={pavilion} />
                </div>
              </div>

              {/* ПРАВАЯ КОЛОНКА — КОНТЕНТ СТУДИИ */}
              <div className="flex-1 min-w-0 space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-semibold tracking-[0.18em] text-brand-primary uppercase">
                    Pavilion
                  </p>
                  <h1 className="text-3xl md:text-4xl font-semibold text-brand-dark">
                    {pavilion.name}
                  </h1>
                  <p className="text-sm md:text-base text-slate-600 max-w-2xl">
                    {pavilion.description ||
                      "A bright, spacious studio pavilion suitable for editorials, campaign shoots, video production and content days."}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {pavilion.location && (
                      <span className="pill">Location: {pavilion.location}</span>
                    )}
                    {pavilion.area_sqm && (
                      <span className="pill">Area: {pavilion.area_sqm} m²</span>
                    )}
                    {pavilion.ceiling_height && (
                      <span className="pill">
                        Ceiling: {pavilion.ceiling_height} m
                      </span>
                    )}
                    {pavilion.capacity && (
                      <span className="pill">
                        Capacity: {pavilion.capacity} people
                      </span>
                    )}
                  </div>

                  <div className="relative rounded-3xl overflow-hidden shadow-card mt-4">
                    <img
                      src={
                        pavilion.main_image_url ||
                        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1600&q=80"
                      }
                      alt={pavilion.name}
                      className="w-full h-[260px] md:h-[340px] object-cover"
                    />
                  </div>
                </div>

                {/* характеристики */}
                <section className="grid sm:grid-cols-3 gap-4 text-sm text-slate-700">
                  <div className="card-muted p-4">
                    <p className="font-semibold mb-1">Area</p>
                    <p>
                      {pavilion.area_sqm
                        ? `${pavilion.area_sqm} m²`
                        : "Spacious"}
                    </p>
                  </div>
                  <div className="card-muted p-4">
                    <p className="font-semibold mb-1">Ceiling</p>
                    <p>
                      {pavilion.ceiling_height
                        ? `${pavilion.ceiling_height} m`
                        : "High ceilings"}
                    </p>
                  </div>
                  <div className="card-muted p-4">
                    <p className="font-semibold mb-1">Cyclorama</p>
                    <p>{features.cyclorama || "White cyclorama available"}</p>
                  </div>
                </section>

                {/* оборудование */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-brand-dark">
                    Equipment and accessories
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl">
                    Lighting and additional equipment can be added to your
                    booking. We prepare everything before you arrive.
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-1 text-xs">
                    {[
                      "Strobe lighting",
                      "Continuous lighting",
                      "RGB LED panels",
                      "Fog machine",
                      "Studio fan",
                      "Light stands",
                      "Paper backdrops",
                      "Other accessories"
                    ].map((item) => (
                      <div
                        key={item}
                        className="card-muted px-4 py-3 flex items-center whitespace-nowrap"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                {/* галерея */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-brand-dark">
                    Gallery
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {(gallery && gallery.length > 0
                      ? gallery
                      : [
                          "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80",
                          "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&w=800&q=80",
                          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
                          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
                          "https://images.unsplash.com/photo-1512427691650-1e0c2f9a81b3?auto=format&fit=crop&w=800&q=80",
                          "https://images.unsplash.com/photo-1518895949257-7621c3c786d4?auto=format&fit=crop&w=800&q=80"
                        ]
                    ).map((src, idx) => (
                      <div
                        key={idx}
                        className="overflow-hidden rounded-2xl border border-slate-100"
                      >
                        <img
                          src={typeof src === "string" ? src : src.url}
                          alt={`${pavilion.name} ${idx + 1}`}
                          className="w-full h-40 object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* правила */}
                <section className="space-y-4 pb-10">
                  <h2 className="text-xl md:text-2xl font-semibold text-brand-dark">
                    Rules and conditions
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-700">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Reservation</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Studio operates daily from 10:00 to 22:00.</li>
                        <li>
                          You can reserve the pavilion online or by phone before
                          the shoot.
                        </li>
                        <li>
                          Please arrive on time; your reservation covers the
                          full booked slot.
                        </li>
                        <li>
                          Parking options are available near both studio
                          locations.
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">
                        Pavilions &amp; cancelation
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          Food, drinks and colored substances are allowed only
                          with prior approval.
                        </li>
                        <li>
                          Equipment is handled by our team; please do not move
                          fixtures by yourself.
                        </li>
                        <li>
                          Cancelations and time changes are possible in advance
                          depending on schedule.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
