import { createContext, useEffect, useMemo, useState } from 'react';

export enum LocalStorageKey {
  StatDisplayMode = 'statDisplayMode',
  Rollable = 'rollable',
  All = 'all',
}

type StatDisplayModeContext = {
  mode: LocalStorageKey;
  setMode: (mode: LocalStorageKey) => void;
};

export const StatDisplayContext = createContext<StatDisplayModeContext | null>(null);

export function StatDisplayProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<LocalStorageKey>(() => {
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