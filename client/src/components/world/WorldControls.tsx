/**
 * Design philosophy: Tactile Storybook Quiet — controls emerge as small contextual
 * objects, preserve agency, and keep the living world visually dominant.
 */

import { useState } from "react";
import { Moon, Music2, SlidersHorizontal, Sparkles, Volume2, VolumeX, WandSparkles } from "lucide-react";
import { useWorld } from "@/contexts/WorldContext";
import type { Atmosphere, WorldDensity } from "@/lib/world";

const atmosphereOptions: Array<{ value: Atmosphere; label: string; note: string }> = [
  { value: "morning", label: "Morning", note: "A clear beginning" },
  { value: "rain", label: "Rain", note: "Soft weather at the window" },
  { value: "evening", label: "Evening", note: "A warmer room" },
  { value: "quiet", label: "Quiet", note: "Fewer signals, more space" },
];

const densityOptions: Array<{ value: WorldDensity; label: string; note: string }> = [
  { value: "open", label: "Open", note: "Let the room breathe" },
  { value: "soft", label: "Soft", note: "A little less at once" },
  { value: "still", label: "Still", note: "Only the essentials" },
];

export function WorldControls() {
  const { state, setAtmosphere, setDensity, toggleMotion, toggleSound } = useWorld();
  const [open, setOpen] = useState(false);

  return (
    <div className="world-controls" data-open={open}>
      <button
        className="world-control-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="world-control-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <SlidersHorizontal aria-hidden="true" size={17} strokeWidth={1.8} />
        <span className="sr-only">{open ? "Close world controls" : "Open world controls"}</span>
        <span aria-hidden="true">The room</span>
      </button>

      {open ? (
        <section className="world-control-panel" id="world-control-panel" aria-label="World controls">
          <div className="control-group">
            <div className="control-group-heading">
              <Sparkles aria-hidden="true" size={15} />
              <span>Atmosphere</span>
            </div>
            <div className="control-options" role="group" aria-label="Atmosphere">
              {atmosphereOptions.map((option) => (
                <button
                  className="control-option"
                  data-active={state.atmosphere === option.value}
                  key={option.value}
                  type="button"
                  onClick={() => setAtmosphere(option.value)}
                >
                  <span>{option.label}</span>
                  <small>{option.note}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <div className="control-group-heading">
              <WandSparkles aria-hidden="true" size={15} />
              <span>Visual space</span>
            </div>
            <div className="control-options control-options--compact" role="group" aria-label="Visual density">
              {densityOptions.map((option) => (
                <button
                  className="control-option"
                  data-active={state.density === option.value}
                  key={option.value}
                  type="button"
                  onClick={() => setDensity(option.value)}
                >
                  <span>{option.label}</span>
                  <small>{option.note}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="control-toggles">
            <button className="control-toggle" type="button" aria-pressed={state.soundEnabled} onClick={toggleSound}>
              {state.soundEnabled ? <Volume2 aria-hidden="true" size={16} /> : <VolumeX aria-hidden="true" size={16} />}
              <span>{state.soundEnabled ? "Sound on" : "Sound off"}</span>
            </button>
            <button className="control-toggle" type="button" aria-pressed={state.motionReduced} onClick={toggleMotion}>
              <Moon aria-hidden="true" size={16} />
              <span>{state.motionReduced ? "Stillness on" : "Gentle motion"}</span>
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
