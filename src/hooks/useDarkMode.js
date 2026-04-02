import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    const initial = saved ? JSON.parse(saved) : false;

    // Ensure the `dark` class reflects the initial state before first paint.
    // Without this, a leftover `dark` class can cause light mode to render using dark variables/classes.
    if (typeof document !== 'undefined') {
      if (initial) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    return initial;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;

      // Update class immediately for consistent Tailwind + CSS-var theming.
      if (typeof document !== 'undefined') {
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      return next;
    });
  };

  return { isDarkMode, toggleDarkMode };
};
