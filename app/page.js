import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PavilionCard from "../components/pavilions/PavilionCard";
import { getAllPavilions } from "../lib/pavilions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const pavilions = await getAllPavilions();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="section">
          <div className="container-page grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-brand-primary uppercase mb-4">
                Ani Hambardzumian Studios
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold text-brand-dark leading-tight mb-6">
                Capture your most
                <br className="hidden sm:block" /> authentic moments in our
                studios.
              </h1>
              <p className="text-slate-600 text-sm md:text-base max-w-xl mb-8">
                Modern photo &amp; video pavilions in the center of Yerevan.
                Natural light, large cycloramas, dressing rooms and professional
                equipment — everything you need for your shoot.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/pavilions" className="btn-primary text-sm">
                  View Pavilions
                </Link>
                <Link
                  href="/pavilions/studio-1-khorenatsi"
                  className="btn-secondary text-sm"
                >
                  Book a Studio
                </Link>
              </div>
            </div>

            <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden shadow-card">
              <img
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80"
                alt="Studio interior"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/60" />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section bg-brand-muted">
          <div className="container-page grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs font-semibold tracking-[0.18em] text-brand-primary uppercase mb-3">
                About Us
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                A boutique studio space curated by Ani Hambardzumian.
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-4">
                We offer several carefully designed pavilions in two central
                locations in Yerevan. Every studio is created for photographers,
                filmmakers, content creators and brands who value aesthetics and
                comfort.
              </p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• Spacious pavilions with natural daylight and cycloramas</li>
                <li>• Dressing rooms, makeup area and lounge zones</li>
                <li>• Professional lighting equipment available on site</li>
                <li>• Convenient parking near both locations</li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="card-muted p-4 md:p-6">
                <img
                  src="https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1200&q=80"
                  alt="Studio window"
                  className="rounded-2xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* OUR PRICING / PAVILIONS */}
        <section className="section">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-2">
                Our Pavilions &amp; Pricing
              </h2>
              <p className="text-sm md:text-base text-slate-600">
                The rates include basic equipment, Wi-Fi and access to dressing
                rooms. Choose the studio that best matches your project.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pavilions.map((pavilion) => (
                <PavilionCard key={pavilion.id} pavilion={pavilion} />
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="section bg-brand-muted">
          <div className="container-page grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
                Why creators choose Ani Hambardzumian Studios
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-4">
                We designed our spaces for real production needs — from fashion
                shoots to commercial campaigns.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="card-muted p-4">
                <p className="font-semibold mb-1">Central locations</p>
                <p>Both branches are just minutes away from the city center.</p>
              </div>
              <div className="card-muted p-4">
                <p className="font-semibold mb-1">Natural light &amp; cycloramas</p>
                <p>Large windows and spacious white backgrounds.</p>
              </div>
              <div className="card-muted p-4">
                <p className="font-semibold mb-1">Professional equipment</p>
                <p>Lighting, stands and accessories available on request.</p>
              </div>
              <div className="card-muted p-4">
                <p className="font-semibold mb-1">Comfort for clients</p>
                <p>Dressing rooms, makeup area and cozy waiting zones.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section">
          <div className="container-page">
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark text-center mb-8">
              What our clients say
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-700">
              <div className="card p-5">
                <p className="mb-3">
                  “Beautiful light and very helpful team. We shot a full lookbook
                  in one day.”
                </p>
                <p className="font-semibold text-brand-dark">Mariam, designer</p>
              </div>
              <div className="card p-5">
                <p className="mb-3">
                  “Comfortable for both the crew and the client. Loved the
                  dressing room and parking.”
                </p>
                <p className="font-semibold text-brand-dark">Arman, director</p>
              </div>
              <div className="card p-5">
                <p className="mb-3">
                  “We booked online, everything was ready when we arrived. Very
                  smooth experience.”
                </p>
                <p className="font-semibold text-brand-dark">Lilit, photographer</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
