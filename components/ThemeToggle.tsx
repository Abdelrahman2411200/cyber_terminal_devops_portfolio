'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-[#0D1527] border border-slate-800" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2 rounded-lg bg-slate-100 dark:bg-[#0D1527] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle-button"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-cyan-400 animate-in spin-in-90 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500 animate-in spin-in-90 duration-200" />
      )}
    </button>
  );
}
