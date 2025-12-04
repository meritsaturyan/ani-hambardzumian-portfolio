export default function Checkbox({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-start gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border border-white/30 bg-black/40 text-brand.primary focus:ring-brand.primary"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="text-xs text-white/80">{label}</span>
    </label>
  );
}
