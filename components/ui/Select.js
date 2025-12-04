export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand.primary focus:ring-1 focus:ring-brand.primary ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
