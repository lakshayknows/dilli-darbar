import { ReactNode } from "react";

type SectionBg = "maroon" | "cream" | "ink" | "saffron" | "transparent";
type SectionSize = "hero" | "lg" | "md" | "none";

type SectionProps = {
  children: ReactNode;
  bg?: SectionBg;
  size?: SectionSize;
  /** Extra classes on the outer <section> (backgrounds, overflow, min-height). */
  className?: string;
  /** Extra classes on the inner max-width container. */
  innerClassName?: string;
  id?: string;
};

const bgClasses: Record<SectionBg, string> = {
  maroon: "bg-maroon text-cream",
  cream: "bg-cream text-ink",
  ink: "bg-ink text-cream",
  saffron: "bg-saffron text-ink",
  transparent: "",
};

// Consistent vertical rhythm so every section shares the same sizing.
const sizeClasses: Record<SectionSize, string> = {
  hero: "pt-28 md:pt-32 pb-12 md:pb-16",
  lg: "py-20 md:py-28",
  md: "py-12 md:py-16",
  none: "",
};

// Shared horizontal gutter (matches Nav) + a capped content width.
const GUTTER = "px-6 md:px-[76px]";
const CONTAINER = "w-full max-w-[1400px] mx-auto";

export default function Section({
  children,
  bg = "transparent",
  size = "lg",
  className = "",
  innerClassName = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${bgClasses[bg]} ${GUTTER} ${sizeClasses[size]} ${className}`}
    >
      <div className={`${CONTAINER} ${innerClassName}`}>{children}</div>
    </section>
  );
}
