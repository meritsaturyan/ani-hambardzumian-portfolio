const testimonials = [
  {
    name: "Mariya S.",
    role: "Fashion photographer",
    quote:
      "The light in Studio 1 is beautiful and consistent. My team loves shooting here — everything feels smooth and professional."
  },
  {
    name: "Alex V.",
    role: "Creative director",
    quote:
      "We booked the loft-style pavilion for a campaign and it saved so much time on set design. The industrial textures looked amazing on camera."
  },
  {
    name: "Content agency",
    role: "Production team",
    quote:
      "It is very convenient to book a pavilion, park, set up and start shooting. Clients are always impressed with the space."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container-page space-y-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand.accent/70">
              Kind words
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Teams that already shot with Ani.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/70 md:max-w-md">
            These are demo testimonials to show the layout. Replace them with real
            quotes from your clients later.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 flex flex-col justify-between"
            >
              <p className="text-sm text-white/80 mb-4">“{item.quote}”</p>
              <div className="text-xs text-white/60">
                <div className="font-medium text-white">{item.name}</div>
                <div>{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
