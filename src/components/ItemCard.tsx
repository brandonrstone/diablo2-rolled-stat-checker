import type { PropsWithChildren } from 'react';

type ItemCardProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  requiredLevel?: number;
  type: 'unique' | 'set' | 'runeword';
  charmSubtitleGold?: boolean;
}>;

export function ItemCard({ title, subtitle, requiredLevel, type, charmSubtitleGold, children }: ItemCardProps) {
  const titleColor = {
    unique: 'text-[var(--color-gold)]',
    set: 'text-[rgb(3,192,34)]',
    runeword: 'text-[var(--color-ui-gold)]'
  }[type];

  return (
    <div
      className={`inline-flex flex-col items-center p-4 rounded-lg bg-black/95 text-[var(--color-blueish)] shadow-[0_1px_8px_rgba(0,0,0,0.35)] 
      transition-transform duration-150 ease-out hover:shadow-[0_6px_18px_rgba(0,0,0,0.45)] [content-visibility:auto] font-exocet text-xl `}
    >
      <div className={`w-full text-center ${titleColor} [font-size:clamp(1.1rem,1rem+0.5vw,1.35rem)]`}>{title}</div>

      {subtitle && (
        <div className={`w-full text-center ${charmSubtitleGold ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'}`}>
          {subtitle}
        </div>
      )}

      {typeof requiredLevel !== 'undefined' && (
        <div className="text-white">Required Level: {requiredLevel ?? '—'}</div>
      )}

      <div className="w-full flex-col gap-1 items-center mt-1 flex">{children}</div>
    </div>
  );
}