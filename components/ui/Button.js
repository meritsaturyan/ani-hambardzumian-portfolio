import clsx from "clsx";

const base =
  "inline-flex items-center justify-center rounded-full text-xs md:text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
const variants = {
  solid: "bg-brand.primary text-black hover:bg-brand.primaryDark",
  outline: "border border-white/30 text-white hover:bg-white/10",
  ghost: "text-white/70 hover:bg-white/10"
};
const sizes = {
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  xs: "px-2 py-1 text-[11px]"
};

export default function Button({
  children,
  variant = "solid",
  size = "md",
  className,
  ...props
}) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
