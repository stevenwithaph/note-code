import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Select } from './select';

export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Select value={theme} onChange={setTheme}>
      <option value="system">System</option>
      {mounted && (
        <>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </>
      )}
    </Select>
  );
}
