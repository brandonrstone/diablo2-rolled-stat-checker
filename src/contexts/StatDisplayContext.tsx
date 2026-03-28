/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from 'react';

export type StatDisplayMode = 'all' | 'rollable';

type StatDisplayModeContext = {
  mode: StatDisplayMode;
  setMode: (mode: StatDisplayMode) => void;
};

const LocalStorageKey = {
  StatDisplayMode: 'statDisplayMode',
  Rollable: 'rollable',
  All: 'all',
} as const

export const StatDisplayContext = createContext<StatDisplayModeContext | null>(null);

export function StatDisplayProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<StatDisplayMode>(() => {
    const saved = localStorage.getItem(LocalStorageKey.StatDisplayMode);
    return (saved === LocalStorageKey.Rollable || saved === LocalStorageKey.All) ? saved : LocalStorageKey.All;
  });

  useEffect(() => localStorage.setItem(LocalStorageKey.StatDisplayMode, mode), [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return (
    <StatDisplayContext.Provider value={value}>
      {children}
    </StatDisplayContext.Provider>
  );
};