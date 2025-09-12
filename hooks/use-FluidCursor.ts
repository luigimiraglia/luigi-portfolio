'use client';

import createFluidCursor from '@/hooks/useFluidCursor';

export default function fluidCursor() {
  // Delegate to underlying implementation; it queries #fluid itself.
  const cleanup = createFluidCursor();
  return cleanup as (() => void) | undefined;
}
