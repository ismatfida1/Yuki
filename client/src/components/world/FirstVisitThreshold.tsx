/**
 * Design philosophy: Tactile Storybook Quiet — onboarding is a threshold into a
 * place, not a questionnaire; the user can enter, explore, or simply be quiet.
 */

import { useEffect, useState } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusReturn } from "@/hooks/useFocusReturn";
import { ArrowRight, Leaf, X } from "lucide-react";

const SEEN_KEY = "yuki-threshold-seen-v1";

export function FirstVisitThreshold({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  useEscapeKey(enter);
  useFocusReturn();

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(SEEN_KEY) !== "true");
    } catch {
      setVisible(true);
    }
  }, []);

  function enter() {
    try {
      window.localStorage.setItem(SEEN_KEY, "true");
    } catch {
      // The threshold can still close if persistent storage is unavailable.
    }
    setVisible(false);
    onClose();
  }

  if (!visible) return null;

  return (
    <div className="threshold-backdrop" role="presentation">
      <section className="threshold-panel" role="dialog" aria-modal="true" aria-labelledby="threshold-title">
        <div className="threshold-skyline" aria-hidden="true">
          <span className="threshold-moon" />
          <span className="threshold-star threshold-star--one" />
          <span className="threshold-star threshold-star--two" />
          <span className="threshold-hill threshold-hill--one" />
          <span className="threshold-hill threshold-hill--two" />
        </div>
        <button autoFocus className="threshold-close" type="button" onClick={enter} aria-label="Enter Yuki quietly">
          <X aria-hidden="true" size={17} />
        </button>
        <div className="threshold-content">
          <span className="threshold-leaf" aria-hidden="true"><Leaf size={17} /></span>
          <p className="threshold-kicker">A small place to return to</p>
          <h1 id="threshold-title">This is your little world.</h1>
          <p className="threshold-copy">Yuki can be a quiet room, a garden path, a sketchbook, or a little company. You can explore, leave something here, or do absolutely nothing.</p>
          <button className="threshold-enter" type="button" onClick={enter}>
            Enter the room <ArrowRight aria-hidden="true" size={16} />
          </button>
          <p className="threshold-footnote">Nothing is required when you arrive.</p>
        </div>
      </section>
    </div>
  );
}
