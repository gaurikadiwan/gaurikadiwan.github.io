import type { ReactNode } from "react";
import { SmartLink } from "./SmartLink";

const styles = {
  primary:
    "bg-ink text-paper hover:bg-accent border-ink hover:border-accent",
  accent:
    "bg-accent text-paper hover:bg-accent-deep border-accent hover:border-accent-deep",
  secondary:
    "bg-transparent text-ink border-ink/80 hover:bg-ink hover:text-paper",
  night:
    "bg-on-night text-night border-on-night hover:bg-accent-night hover:border-accent-night",
  nightOutline:
    "bg-transparent text-on-night border-on-night/50 hover:border-on-night hover:bg-on-night/10",
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  asset?: boolean;
  download?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", asset, download, className = "" }: Props) {
  return (
    <SmartLink
      href={href}
      asset={asset}
      download={download}
      showExternalIcon={false}
      className={`inline-flex min-h-11 items-center gap-2 rounded-[4px] border px-4.5 py-2.5 text-[0.95rem] font-medium leading-none transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </SmartLink>
  );
}
