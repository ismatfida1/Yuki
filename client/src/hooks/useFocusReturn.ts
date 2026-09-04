/**
 * Design philosophy: Tactile Storybook Quiet — when a doorway closes, the user
 * returns to the same place in the world rather than being left in empty space.
 */

import { useEffect } from "react";

export function useFocusReturn() {
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    return () => {
      window.setTimeout(() => previous?.focus(), 0);
    };
  }, []);
}
