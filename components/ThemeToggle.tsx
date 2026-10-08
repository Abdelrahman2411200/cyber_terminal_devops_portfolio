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
      <div className="w-9 h-9 rounded-lg bg-[#14213D] border border-slate-700/50" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2 rounded-lg bg-[#E5E5E5] dark:bg-[#14213D] border border-slate-300 dark:border-[#FCA311]/30 text-slate-800 dark:text-[#E5E5E5] hover:text-[#FCA311] hover:border-[#FCA311] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FCA311]/50"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle-button"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#FCA311] animate-in spin-in-90 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-[#14213D] animate-in spin-in-90 duration-200" />
      )}
    </button>
  );
}
