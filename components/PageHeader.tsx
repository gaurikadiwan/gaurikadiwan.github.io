import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
};

/** Top-of-page masthead used on every inner page. */
export function PageHeader({ eyebrow, title, lede, children }: Props) {
  return (
    <header className="page pt-14 pb-10 md:pt-20 md:pb-14">
      <p className="eyebrow rise">{eyebrow}</p>
      <h1 className="rise rise-1 mt-5 max-w-4xl text-[2.6rem] leading-[1.04] font-normal text-ink md:text-[4rem]">
        {title}
      </h1>
      {lede && <div className="rise rise-2 mt-6 max-w-2xl text-lg text-ink-2 md:text-xl md:leading-relaxed">{lede}</div>}
      {children && <div className="rise rise-3 mt-8">{children}</div>}
    </header>
  );
}
