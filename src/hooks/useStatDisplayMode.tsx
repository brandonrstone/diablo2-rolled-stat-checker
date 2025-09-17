import { useContext } from 'react';

import { StatDisplayContext } from '../contexts/StatDisplayContext';

export function useStatDisplayMode() {
  const ctx = useContext(StatDisplayContext);
  if (!ctx) throw new Error('useStatDisplayMode must be used within StatDisplayProvider');
  return ctx;
}