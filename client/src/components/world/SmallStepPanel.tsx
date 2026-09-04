/*
 * Design philosophy: Tactile Storybook Quiet — reduce friction to one optional,
 * practical next step without diagnosis, urgency, or a productivity system.
 */

import { useState, type FormEvent } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { Footprints, X } from "lucide-react";

const suggestions = [
  "Write the very first sentence, even if it is rough.",
  "Put the next object you need within reach.",
  "Take one sip of water, then look at the thing again.",
  "Set aside five quiet minutes and do only the smallest part.",
];

export function SmallStepPanel({ onClose }: { onClose: () => void }) {
  const [difficulty, setDifficulty] = useState("");
  const [suggestion, setSuggestion] = useState("");
  useEscapeKey(onClose);

  function findStep(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const index = difficulty.trim().length % suggestions.length;
    setSuggestion(suggestions[index]);
  }

  return (
    <div className="small-step-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="small-step-panel" role="dialog" aria-modal="true" aria-labelledby="small-step-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="small-step-topline">
          <span className="small-step-kicker"><Footprints aria-hidden="true" size={15} /> A smaller path</span>
          <button autoFocus type="button" onClick={onClose} aria-label="Close small step panel"><X aria-hidden="true" size={17} /></button>
        </div>
        <h2 id="small-step-title">What feels tangled?</h2>
        <p className="small-step-copy">You can describe the difficulty in a few words. Yuki will not diagnose it or turn it into a plan.</p>
        <form onSubmit={findStep}>
          <label className="small-step-label" htmlFor="small-step-input">Only share what you want to share</label>
          <textarea id="small-step-input" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} placeholder="The first part feels too big…" rows={3} />
          <div className="small-step-actions">
            <button className="small-step-skip" type="button" onClick={onClose}>Not now</button>
            <button className="small-step-submit" type="submit">Find one small step</button>
          </div>
        </form>
        {suggestion ? (
          <div className="small-step-result" aria-live="polite">
            <span className="small-step-result-dot" aria-hidden="true" />
            <div><strong>Maybe just this:</strong><p>{suggestion}</p></div>
            <button type="button" onClick={() => setSuggestion("")}>Leave it</button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
