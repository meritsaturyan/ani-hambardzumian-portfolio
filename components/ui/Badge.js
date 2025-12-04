export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-white/70">
      {children}
    </span>
  );
}
