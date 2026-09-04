/**
 * Design philosophy: Tactile Storybook Quiet — user control stays visible but quiet,
 * privacy is explained plainly, and low-stimulation choices are reversible.
 */

import { useEffect, useState } from "react";
import { Eye, ShieldCheck, Volume2, VolumeX, X } from "lucide-react";
import { useWorld } from "@/contexts/WorldContext";
import { useEscapeKey } from "@/hooks/useEscapeKey";

const REFLECTION_KEY = "yuki-reflections-v1";

export function PreferencesPanel({ onClose }: { onClose: () => void }) {
  const { state, toggleMotion, toggleSound, setDensity, resetPreferences } = useWorld();
  const [reflectionCount, setReflectionCount] = useState(0);
  const [cleared, setCleared] = useState(false);
  useEscapeKey(onClose);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(REFLECTION_KEY);
      setReflectionCount(stored ? JSON.parse(stored).length : 0);
    } catch {
      setReflectionCount(0);
    }
  }, []);

  function clearReflections() {
    window.localStorage.removeItem(REFLECTION_KEY);
    setReflectionCount(0);
    setCleared(true);
  }

  function resetRoom() {
    resetPreferences();
    setCleared(false);
    setReflectionCount(0);
    try {
      window.localStorage.removeItem(REFLECTION_KEY);
    } catch {
      // The room preferences still reset for this session if storage is unavailable.
    }
  }

  return (
    <div className="preferences-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="preferences-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferences-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="preferences-topline">
          <span className="preferences-kicker"><Eye aria-hidden="true" size={15} /> Your room, your rules</span>
          <button autoFocus type="button" onClick={onClose} aria-label="Close preferences"><X aria-hidden="true" size={17} /></button>
        </div>
        <h2 id="preferences-title">Make the world gentler</h2>
        <p className="preferences-copy">These choices change what Yuki shows you. Nothing here is a test, and you can change it whenever you like.</p>

        <div className="preferences-list">
          <button className="preference-row" type="button" aria-pressed={state.motionReduced} onClick={toggleMotion}>
            <span className="preference-icon" aria-hidden="true">✦</span>
            <span><strong>{state.motionReduced ? "Stillness is on" : "Gentle motion"}</strong><small>{state.motionReduced ? "The room keeps movement to a minimum." : "Leaves, light, and Yuki can move softly."}</small></span>
            <span className="preference-state">{state.motionReduced ? "On" : "Off"}</span>
          </button>
          <button className="preference-row" type="button" aria-pressed={state.soundEnabled} onClick={toggleSound}>
            <span className="preference-icon" aria-hidden="true">{state.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</span>
            <span><strong>{state.soundEnabled ? "Room sound is on" : "Room sound is off"}</strong><small>Sound starts off and never plays without your choice.</small></span>
            <span className="preference-state">{state.soundEnabled ? "On" : "Off"}</span>
          </button>
          <button className="preference-row" type="button" aria-pressed={state.density === "still"} onClick={() => setDensity(state.density === "still" ? "open" : "still")}>
            <span className="preference-icon" aria-hidden="true">◌</span>
            <span><strong>{state.density === "still" ? "Fewer things are visible" : "Open visual space"}</strong><small>Quiet mode keeps only the clearest objects in view.</small></span>
            <span className="preference-state">{state.density === "still" ? "On" : "Off"}</span>
          </button>
        </div>

        <div className="privacy-note">
          <ShieldCheck aria-hidden="true" size={18} />
          <p><strong>Your sketchbook stays here.</strong> Reflections are stored only in this browser. Yuki does not read, interpret, or send them anywhere.</p>
        </div>
        <div className="preference-data-row">
          <span>{cleared ? "Your local reflections were cleared." : `${reflectionCount} saved reflection${reflectionCount === 1 ? "" : "s"} on this device.`}</span>
          {reflectionCount > 0 && !cleared ? <button type="button" onClick={clearReflections}>Clear them</button> : null}
        </div>
        <div className="preference-reset-row">
          <span>Return the room to its starting preferences and clear local reflections.</span>
          <button type="button" onClick={resetRoom}>Reset the room</button>
        </div>
      </section>
    </div>
  );
}
