const items = [
  {
    title: "Central location",
    description: "Studios located minutes from key spots in Yerevan, easy to reach for teams and clients."
  },
  {
    title: "Designed by a photographer",
    description: "Every pavilion is created by Ani with real shoots in mind — light, angles and workflow."
  },
  {
    title: "Professional equipment",
    description: "Essential lighting and stands included, with options to add more on request."
  },
  {
    title: "Comfort & privacy",
    description: "Makeup area, changing space and cozy lounge corner so your team can focus on the shoot."
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="section border-y border-white/5 bg-white/5/10">
      <div className="container-page">
        <div className="grid md:grid-cols-[1.2fr_minmax(0,1.5fr)] gap-10 items-start">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-brand.accent/70">
              Why choose Ani Hambardzumian Studios
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              A studio experience built around real production needs.
            </h2>
            <p className="text-sm md:text-base text-white/70">
              From natural light to industrial textures, each pavilion has its own
              mood. You focus on the creative direction — the space and logistics
              are taken care of.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5"
              >
                <h3 className="text-sm md:text-base font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-white/65">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
