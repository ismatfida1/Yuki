/*
 * Design philosophy: Tactile Storybook Quiet — activities appear as a small nook
 * in the world and point gently back toward real life, never toward completion.
 */

import { useState } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { Coffee, DoorOpen, Pencil, Phone, Wind, X } from "lucide-react";

const activities = [
  { icon: Coffee, title: "Rest here", copy: "Make a warm drink and let the next ten minutes be unclaimed." },
  { icon: Pencil, title: "Make something", copy: "Put one color, sentence, sound, or shape somewhere it did not exist before." },
  { icon: DoorOpen, title: "Step outside", copy: "Open a window or stand where you can feel a little real air." },
  { icon: Phone, title: "Reach outward", copy: "Send a small message to someone you already trust, if that feels right." },
];

export function ActivityNook({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  useEscapeKey(onClose);

  return (
    <div className="activity-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="activity-panel" role="dialog" aria-modal="true" aria-labelledby="activity-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="activity-topline">
          <span className="activity-kicker"><Wind aria-hidden="true" size={15} /> A few possible paths</span>
          <button type="button" onClick={onClose} aria-label="Close activities"><X aria-hidden="true" size={17} /></button>
        </div>
        <h2 id="activity-title">What would feel kind to your day?</h2>
        <p className="activity-copy">Choose one, ignore all of them, or come back later. Yuki will not keep score.</p>
        <div className="activity-options">
          {activities.map(({ icon: Icon, title, copy }) => (
            <button className="activity-option" data-selected={selected === title} type="button" key={title} onClick={() => setSelected(title)}>
              <span className="activity-icon"><Icon aria-hidden="true" size={17} /></span>
              <span><strong>{title}</strong><small>{copy}</small></span>
            </button>
          ))}
        </div>
        {selected ? <p className="activity-confirmation" aria-live="polite">That path is here if you want it. Nothing else needs to happen.</p> : null}
      </section>
    </div>
  );
}
