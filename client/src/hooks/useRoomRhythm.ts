/**
 * Design philosophy: Tactile Storybook Quiet — the room notices only the local
 * clock, never private traits, and uses time as a soft environmental rhythm.
 */

import { useEffect, useState } from "react";

type RoomRhythm = {
  period: "early" | "day" | "late" | "night";
  greeting: string;
  suggestion: string;
};

function readRhythm(): RoomRhythm {
  const hour = new Date().getHours();
  if (hour < 7) return { period: "early", greeting: "The world is still unfolding.", suggestion: "A quiet beginning is enough." };
  if (hour < 12) return { period: "day", greeting: "The morning is making room.", suggestion: "There is time to begin gently." };
  if (hour < 18) return { period: "late", greeting: "The day is passing through.", suggestion: "You can pause without losing your place." };
  if (hour < 23) return { period: "night", greeting: "The room is keeping a little light.", suggestion: "The edges of the day can soften here." };
  return { period: "night", greeting: "The room is keeping a little light.", suggestion: "Nothing needs to be solved tonight." };
}

export function useRoomRhythm(): RoomRhythm {
  const [rhythm, setRhythm] = useState<RoomRhythm>(() => readRhythm());

  useEffect(() => {
    const refresh = () => setRhythm(readRhythm());
    const interval = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return rhythm;
}
