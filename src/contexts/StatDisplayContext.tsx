/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from 'react';

export type StatDisplayMode = 'all' | 'rollable';

type StatDisplayModeContext = {
  mode: StatDisplayMode;
  setMode: (mode: StatDisplayMode) => void;
};

export const StatDisplayContext = createContext<StatDisplayModeContext | null>(null);

export function StatDisplayProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<StatDisplayMode>(() => {
    const saved = localStorage.getItem('statDisplayMode');
    return (saved === 'rollable' || saved === 'all') ? saved : 'all';
  });

  useEffect(() => localStorage.setItem('statDisplayMode', mode), [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return (
    <StatDisplayContext.Provider value={value}>
      {children}
    </StatDisplayContext.Provider>
  );
};