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
    unique: 'text-gold',
    set: 'text-[rgb(3,192,34)]',
    runeword: 'text-ui-gold'
  }[type];

  return (
    <div
      className={`inline-flex flex-col items-center p-4 text-xl text-blueish font-exocet 
      bg-black/95 rounded-lg shadow-[0_1px_8px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.45)] 
      [content-visibility:auto] transition-transform duration-150 ease-out `}
    >
      <div className={`w-full text-center ${titleColor} [font-size:clamp(1.5rem,1rem+0.5vw,1.5rem)]`}>{title}</div>

      {subtitle && (
        <div className={`w-full text-center ${charmSubtitleGold ? 'text-gold' : 'text-muted'}`}>
          {subtitle}
        </div>
      )}

      {typeof requiredLevel !== 'undefined' && (
        <div className='text-white'>Required Level: {requiredLevel ?? '—'}</div>
      )}

      <div className='w-full flex-col gap-1 items-center mt-1 flex'>{children}</div>
    </div>
  );
}