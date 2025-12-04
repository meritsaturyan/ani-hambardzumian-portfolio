import clsx from "clsx";

const variants = {
  error: "border-red-400/60 bg-red-500/10 text-red-100",
  success: "border-emerald-400/60 bg-emerald-500/10 text-emerald-100",
  info: "border-brand.accent/60 bg-brand.accent/10 text-brand.accent"
};

export default function Alert({ children, variant = "info", className }) {
  return (
    <div
      className={clsx(
        "rounded-xl border px-3 py-2 text-xs md:text-sm",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
