/**
 * Design philosophy: Tactile Storybook Quiet — user-provided context gently shapes
 * the room, with no diagnosis, hidden profiling, or forced interpretation.
 */

import { FormEvent, useState } from "react";
import { Feather, X } from "lucide-react";
import { useWorld } from "@/contexts/WorldContext";
import type { Atmosphere } from "@/lib/world";

const moodOptions: Array<{ value: Atmosphere; label: string }> = [
  { value: "morning", label: "Clear" },
  { value: "rain", label: "A little heavy" },
  { value: "evening", label: "Winding down" },
  { value: "quiet", label: "Need less" },
];

export function MomentNote() {
  const { setAtmosphere, selectObject } = useWorld();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [mood, setMood] = useState<Atmosphere>("morning");

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAtmosphere(mood);
    setOpen(false);
    selectObject("companion");
  }

  return (
    <>
      <button className="moment-note-trigger" type="button" onClick={() => setOpen(true)}>
        <Feather aria-hidden="true" size={15} strokeWidth={1.6} />
        <span>Leave a note for the room</span>
      </button>

      {open ? (
        <div className="moment-note-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="moment-note-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="moment-note-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="moment-note-topline">
              <span className="moment-note-kicker">A small signal</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close note panel">
                <X aria-hidden="true" size={17} />
              </button>
            </div>
            <h2 id="moment-note-title">What kind of room would help?</h2>
            <p className="moment-note-copy">Tell Yuki only what you want to share. This note stays in this moment.</p>
            <form onSubmit={submitNote}>
              <label className="moment-note-label" htmlFor="moment-note-input">A few words, if you have them</label>
              <textarea
                id="moment-note-input"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="I’m taking things slowly today…"
                rows={3}
              />
              <div className="moment-moods" role="group" aria-label="Choose the room’s tone">
                {moodOptions.map((option) => (
                  <button
                    className="moment-mood"
                    data-active={mood === option.value}
                    key={option.value}
                    type="button"
                    onClick={() => setMood(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="moment-note-actions">
                <button className="moment-note-skip" type="button" onClick={() => setOpen(false)}>Not now</button>
                <button className="moment-note-submit" type="submit">Let the room adjust</button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
