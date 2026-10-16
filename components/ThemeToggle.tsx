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
      <div className="w-9 h-9 rounded-lg bg-[#283845] border border-[#B8B08D]/20" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2 rounded-lg bg-slate-100 dark:bg-[#283845] border border-slate-300 dark:border-[#B8B08D]/30 text-slate-700 dark:text-[#F6F4EE] hover:text-[#F29559] hover:border-[#F29559]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F29559]/50"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle-button"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#F2D492] animate-in spin-in-90 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-[#F29559] animate-in spin-in-90 duration-200" />
      )}
    </button>
  );
}
