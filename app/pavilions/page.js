import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import PavilionCard from "../../components/pavilions/PavilionCard";
import { getAllPavilions } from "../../lib/pavilions";

export const dynamic = "force-dynamic";

export default async function PavilionsPage() {
  const pavilions = await getAllPavilions();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container-page">
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-brand-primary uppercase mb-3">
                  Studios
                </p>
                <h1 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-2">
                  Choose the perfect pavilion for your shoot.
                </h1>
                <p className="text-sm md:text-base text-slate-600 max-w-2xl">
                  Browse all Ani Hambardzumian studio spaces. Filter by size,
                  ceiling height and style to find the right pavilion for your
                  project.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-xs md:text-sm">
                <span className="pill">
                  Natural light
                </span>
                <span className="pill">
                  Cycloramas
                </span>
                <span className="pill">
                  Dressing rooms
                </span>
                <span className="pill">
                  Central locations
                </span>
              </div>
            </div>

            {/* Простая “панель фильтров” сверху (пока без логики) */}
            <div className="card-muted mb-6 p-4 md:p-5 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3 text-xs md:text-sm text-slate-600">
                <span>Capacity</span>
                <button className="pill border-slate-200">
                  Up to 6 people
                </button>
                <button className="pill border-slate-200">
                  6–12 people
                </button>
                <button className="pill border-slate-200">
                  12+ people
                </button>
              </div>
              <div className="flex flex-wrap gap-3 text-xs md:text-sm text-slate-600">
                <span>Type</span>
                <button className="pill border-slate-200">Photo</button>
                <button className="pill border-slate-200">Video</button>
                <button className="pill border-slate-200">Content</button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pavilions.map((pavilion) => (
                <PavilionCard key={pavilion.id} pavilion={pavilion} />
              ))}

              {pavilions.length === 0 && (
                <p className="text-sm text-slate-600">
                  No pavilions found. Make sure the database is initialized and
                  seeded.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
