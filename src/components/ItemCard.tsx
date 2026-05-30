import { useState, type PropsWithChildren } from 'react';
import type { ReactNode } from 'react';

import type { BaseStats } from '../types';
import { BaseStatsView } from './StatLineView';

type ItemCardProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  requiredLevel?: number;
  base?: BaseStats;
  type: 'unique' | 'set' | 'runeword';
  charmSubtitleGold?: boolean;
  imageUrl?: string;
  imageSlotContent?: ReactNode;
}>;

export function ItemCard({ title, subtitle, requiredLevel, base, type, charmSubtitleGold, imageUrl, imageSlotContent, children }: ItemCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
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
      {imageSlotContent ? (
        <div className='mb-2'>{imageSlotContent}</div>
      ) : (
        imageUrl && !imageFailed && (
          <img
            src={imageUrl}
            alt={`${title} item icon`}
            className='w-16 h-16 object-contain mb-2 select-none'
            loading='lazy'
            decoding='async'
            onError={() => setImageFailed(true)}
          />
        )
      )}

      <div className={`w-full text-center ${titleColor} [font-size:clamp(1.5rem,1rem+0.5vw,1.5rem)]`}>{title}</div>

      {subtitle && (
        <div className={`w-full text-center ${charmSubtitleGold ? 'text-gold' : 'text-muted'}`}>
          {subtitle}
        </div>
      )}

      <BaseStatsView base={base} requiredLevel={requiredLevel} />

      <div className='w-full flex-col gap-1 items-center mt-1 flex'>{children}</div>
    </div>
  );
}