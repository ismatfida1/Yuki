/**
 * Design philosophy: Tactile Storybook Quiet — sound is an optional material in
 * the room, started by the user, kept very soft, and always easy to turn off.
 */

import { useEffect, useRef } from "react";
import type { Atmosphere } from "@/lib/world";

export function useRoomSound(enabled: boolean, atmosphere: Atmosphere) {
  const contextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    function stop() {
      nodesRef.current.forEach((node) => {
        try { node.stop(); } catch { /* already stopped */ }
        node.disconnect();
      });
      nodesRef.current = [];
      gainRef.current?.disconnect();
      gainRef.current = null;
    }

    if (!enabled) {
      stop();
      return;
    }

    const context = contextRef.current ?? new AudioContext();
    contextRef.current = context;
    const master = context.createGain();
    const destination = context.destination;
    const frequencies: Record<Atmosphere, [number, number]> = {
      morning: [174, 261.63],
      rain: [130.81, 196],
      evening: [146.83, 220],
      quiet: [110, 164.81],
    };
    const [first, second] = frequencies[atmosphere];

    master.gain.setValueAtTime(0, context.currentTime);
    master.gain.linearRampToValueAtTime(0.018, context.currentTime + 0.8);
    master.connect(destination);
    gainRef.current = master;

    [first, second].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.detune.setValueAtTime(index === 0 ? -3 : 4, context.currentTime);
      oscillator.connect(master);
      oscillator.start();
      nodesRef.current.push(oscillator);
    });

    context.resume().catch(() => undefined);

    const handleVisibility = () => {
      if (document.hidden) {
        context.suspend().catch(() => undefined);
      } else {
        context.resume().catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      stop();
    };
  }, [enabled, atmosphere]);

  useEffect(() => () => {
    nodesRef.current.forEach((node) => {
      try { node.stop(); } catch { /* already stopped */ }
      node.disconnect();
    });
    contextRef.current?.close().catch(() => undefined);
  }, []);
}
