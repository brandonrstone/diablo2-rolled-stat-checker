import { useContext } from 'react';

import { StatDisplayContext } from '../contexts/StatDisplayContext';

export function useStatDisplayMode() {
  const context = useContext(StatDisplayContext);
  if (!context) throw new Error('useStatDisplayMode must be used within StatDisplayProvider');
  return context;
}