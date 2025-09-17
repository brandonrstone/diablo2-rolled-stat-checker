import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';

import { UniqueItems } from './data/UniqueItems';
import { SetItems } from './data/SetItems';
import { Runewords } from './data/Runewords';

import type { RunewordType, SetItemType, UniqueItemType } from './types';

import { Runeword } from './components/Runeword';
import { SetItem } from './components/SetItem';
import { UniqueItem } from './components/UniqueItem';
import { useDebounced } from './hooks/useDebounced';

import { type StatDisplayMode } from './contexts/StatDisplayContext';
import { useStatDisplayMode } from './hooks/useStatDisplayMode';

// TODO: Add OpenGraph meta tags, favicon, etc.

function normalize(str: string) {
  return str.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
}
function squashRunes(str: string) {
  return normalize(str).replace(/[\s\-/|,_.]+/g, '');
}
function includesAllTokens(haystack: string, tokens: string[]) {
  if (!tokens.length) return true;
  return tokens.every(t => haystack.includes(t));
}

function runewordHaystack(runeword: RunewordType): string {
  const parts: string[] = [];
  if (runeword.name) parts.push(runeword.name);
  if (runeword.base) parts.push(runeword.base);

  const types = (runeword.itemTypes?.length
    ? runeword.itemTypes
    : [runeword.itype1, runeword.itype2, runeword.itype3].filter(Boolean)) as string[];
  parts.push(...types);

  const runes = Array.isArray(runeword.runes) && runeword.runes.length
    ? (runeword.runes as string[])
    : Array.from({ length: 7 }, (_, i) => runeword[`Rune${i + 1}`]).filter(Boolean) as string[];
  parts.push(...runes);

  if (Array.isArray(runeword.stats) && runeword.stats.length) {
    parts.push(...(runeword.stats.map(stat => stat.code).filter(Boolean) as string[]));
  } else {
    for (let i = 1; i <= 12; i++) {
      const k = runeword[`Stat${i}`];
      if (k) parts.push(String(k));
    }
  }

  if (runeword.RequiredRunes) parts.push(runeword.RequiredRunes);
  const joined = parts.join(' ');
  return normalize(joined) + ' ' + squashRunes(joined);
}

function setItemHaystack(item: SetItemType): string {
  return normalize(item.name);
}
function uniqueItemHaystack(item: UniqueItemType): string {
  const base = item.itemBase ?? item.base;
  return normalize([item.name, base].filter(Boolean).join(' '));
}

export default function App() {
  const { mode, setMode } = useStatDisplayMode();
  const [search, setSearch] = useState('');
  const [blurred, setBlurred] = useState(false);
  const [headerHeight, setHeaderH] = useState(0);
  const deferred = useDeferredValue(search);
  const itemQuery = useDebounced(deferred, 150).trim();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const change = (mode: StatDisplayMode) => setMode(mode);

  useEffect(() => {
    const measure = () => setHeaderH(headerRef.current?.offsetHeight ?? 0);
    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (headerRef.current) resizeObserver.observe(headerRef.current);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setBlurred(window.scrollY > 2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tokens = useMemo(() => {
    if (!itemQuery) return [];
    const parts = itemQuery.split(/\s+/).filter(Boolean);
    const expanded = parts.flatMap(part => [normalize(part), squashRunes(part)]);
    return Array.from(new Set(expanded));
  }, [itemQuery]);

  const filteredRunewords = useMemo(() => {
    if (!tokens.length) return [];
    return Runewords.filter((runeword: RunewordType) => includesAllTokens(runewordHaystack(runeword), tokens));
  }, [tokens]);

  const filteredSetItems = useMemo(() => {
    if (!tokens.length) return [];
    return SetItems.filter((setItem: SetItemType) => includesAllTokens(setItemHaystack(setItem), tokens));
  }, [tokens]);

  const filteredUniqueItems = useMemo(() => {
    if (!tokens.length) return [];
    return (UniqueItems as UniqueItemType[]).filter(uniqueItem => includesAllTokens(uniqueItemHaystack(uniqueItem), tokens));
  }, [tokens]);

  const total = (filteredRunewords?.length || 0) + (filteredSetItems?.length || 0) + (filteredUniqueItems?.length || 0);
  const showEmpty = itemQuery.trim() === '';

  return (
    <div
      className='w-full min-h-[100dvh] grid grid-rows-[auto_1fr] justify-items-center overflow-x-clip'
      style={{ paddingTop: headerHeight }} // spacer equal to fixed header height
    >
      {/* Fixed, centered, capped header */}
      <div className='fixed top-0 left-0 right-0 z-20'>
        <div className={['absolute inset-0 transition', blurred ? 'bg-black/40 backdrop-blur-[2px]' : 'bg-transparent'].join(' ')} aria-hidden />
        {/* Foreground content */}
        <div className='relative flex flex-col items-center mx-auto px-4 pt-2 pb-4 gap-2' ref={headerRef}>
          <div className={`relative top-0 flex flex-col items-center ${blurred && 'text-white/90'}`}>
            <img className='max-w-[360px] h-auto m-0 select-none' src='/Diablo_II_Logo.webp' alt='Diablo II logo' draggable={false} />
            <span className='mb-1 text-ui-gold font-system-ui [font-size:clamp(0.95rem,0.8rem+0.4vw,1.1rem)]'>
              Rolled Stat Checker v1.2.3
            </span>

            {/* Search field */}
            <label className='w-full'>
              <div
                className='relative rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_8px_rgba(0,0,0,0.25)]
                hover:bg-white/7 transition focus-within:ring-2 focus-within:ring-yellow-700/40'
              >
                <input
                  className={[
                    "w-full pl-4 pr-4 py-1 box-border bg-transparent border-0 outline-none text-base font-sans",
                    "selection:bg-yellow-700/40 transition-colors",
                    blurred
                      ? "text-white/95 placeholder:text-white/60 caret-white"
                      : "text-black placeholder:text-black/60 caret-black"
                  ].join(" ")}
                  type='text'
                  placeholder='Search name, base, runes, stats…'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label='Search items'
                />
              </div>
            </label>

            {/* Stat mode toggle */}
            <div className={`flex w-full items-center gap-3 mt-2 ${blurred ? 'text-white/80' : 'text-black/80'}`}>
              <div
                className={[
                  'inline-flex rounded-xl overflow-hidden border border-white/10 bg-white/5',
                  'shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                ].join(' ')}
                role="radiogroup"
                aria-label="Stat display mode"
              >
                {(['rollable', 'all'] as const).map(option => (
                  <button
                    key={option}
                    role="radio"
                    aria-checked={mode === option}
                    onClick={() => change(option)}
                    className={[
                      'px-3 py-1 text-sm font-medium transition cursor-pointer',
                      mode === option ? 'bg-yellow-700/30 text-yellow-100' : 'hover:bg-white/10'
                    ].join(' ')}
                  >
                    {option === 'rollable' ? 'Rollable Only' : 'All Stats'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results grid (scrolls behind the header) */}
      <div className='grid gap-3 w-[95%] max-w-[1100px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {showEmpty ? (
          <div className='col-span-full text-center text-white/90'>
            <div>Type to search uniques, sets, and runewords.</div>
            <div className='mt-1 text-muted font-sans text-[0.95rem]'>Try: “enigma”, “archon plate”, “Tal Thul Ort Amn”, “all resistances”</div>
          </div>
        ) : total === 0 ? (
          <div className='col-span-full text-center text-white/90'>
            <div>No results for “<span className='italic'>{search}</span>”.</div>
            <div className='mt-1 text-muted font-sans text-[0.95rem]'>Check spelling or try a different keyword.</div>
          </div>
        ) : (
          <>
            {filteredUniqueItems.length > 0 && (
              <>
                <h2 className='col-span-full mt-3 text-ui-gold font-sans [font-size:clamp(1rem,0.9rem+0.4vw,1.15rem)]'>Unique Items ({filteredUniqueItems.length})</h2>
                {filteredUniqueItems.map((uniqueItem) => <UniqueItem key={(uniqueItem as UniqueItemType).id} {...(uniqueItem as UniqueItemType)} />)}
              </>
            )}

            {filteredSetItems.length > 0 && (
              <>
                <h2 className='col-span-full mt-3 text-ui-gold font-sans [font-size:clamp(1rem,0.9rem+0.4vw,1.15rem)]'> Set Items ({filteredSetItems.length})</h2>
                {filteredSetItems.map((setItem: SetItemType) => <SetItem key={setItem.id} {...setItem} />)}
              </>
            )}

            {filteredRunewords.length > 0 && (
              <>
                <h2 className='col-span-full mt-3 text-ui-gold font-sans [font-size:clamp(1rem,0.9rem+0.4vw,1.15rem)]'>
                  Runewords ({filteredRunewords.length})
                </h2>
                {filteredRunewords.map((rw: RunewordType) => (
                  <Runeword key={rw.id} runeword={rw} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
