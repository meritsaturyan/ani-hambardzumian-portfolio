export default function PavilionDetailsInfo({ pavilion }) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold">
          {pavilion.name}
        </h1>
        <p className="text-white/60 mt-2">
          {pavilion.location}
        </p>
      </div>
      <p className="text-sm md:text-base text-white/70">
        {pavilion.description}
      </p>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 text-xs md:text-sm">
        {pavilion.area_sqm && (
          <InfoTag label="Area" value={`${pavilion.area_sqm} m²`} />
        )}
        {pavilion.ceiling_height && (
          <InfoTag label="Ceiling height" value={`${pavilion.ceiling_height} m`} />
        )}
        {pavilion.capacity && (
          <InfoTag label="Capacity" value={`Up to ${pavilion.capacity} people`} />
        )}
        {pavilion.features?.naturalLight != null && (
          <InfoTag
            label="Natural light"
            value={pavilion.features.naturalLight ? "Yes" : "No"}
          />
        )}
        {pavilion.features?.makeupRoom != null && (
          <InfoTag
            label="Makeup room"
            value={pavilion.features.makeupRoom ? "Available" : "Not included"}
          />
        )}
        {pavilion.features?.parking != null && (
          <InfoTag
            label="Parking"
            value={pavilion.features.parking ? "On-site" : "Nearby"}
          />
        )}
      </div>
      {Array.isArray(pavilion.features?.includedEquipment) &&
        pavilion.features.includedEquipment.length > 0 && (
          <div className="text-xs md:text-sm text-white/70">
            <div className="font-semibold mb-1">Included equipment:</div>
            <ul className="list-disc list-inside space-y-1">
              {pavilion.features.includedEquipment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

function InfoTag({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/50">
        {label}
      </div>
      <div className="text-xs md:text-sm text-white mt-1">{value}</div>
    </div>
  );
}
