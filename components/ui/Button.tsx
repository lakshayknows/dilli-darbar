import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "ink";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  target?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: "bg-saffron text-cream hover:brightness-110",
  outline:
    "bg-transparent border border-cream text-cream hover:bg-cream hover:text-ink",
  ink: "bg-ink text-cream hover:brightness-125",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  target,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center px-6 py-3 min-h-[44px] font-body font-bold text-sm tracking-wide uppercase transition-[filter,background-color,color] duration-200 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} target={target}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} type="button">
      {children}
    </button>
  );
}
