/*
 * Design philosophy: Tactile Storybook Quiet — the user chooses the distance
 * and texture of presence; Yuki never assumes a need or performs a persona.
 */

import { Moon, PencilLine, Sprout } from "lucide-react";
import { useWorld } from "@/contexts/WorldContext";
import type { PresenceMode } from "@/lib/world";

const modes: Array<{ value: PresenceMode; label: string; copy: string; icon: typeof Moon }> = [
  { value: "nearby", label: "Stay nearby", copy: "Yuki shares the room quietly.", icon: Sprout },
  { value: "quiet", label: "Give me space", copy: "The room keeps a little more distance.", icon: Moon },
  { value: "making", label: "Make alongside me", copy: "The sketchbook and small objects come forward.", icon: PencilLine },
];

export function PresenceSelector() {
  const { state, setPresenceMode } = useWorld();

  return (
    <div className="presence-selector" role="group" aria-label="Choose how Yuki shares the room">
      <span className="presence-label">Yuki can</span>
      <div className="presence-options">
        {modes.map(({ value, label, copy, icon: Icon }) => (
          <button className="presence-option" data-active={state.presenceMode === value} type="button" key={value} onClick={() => setPresenceMode(value)} aria-pressed={state.presenceMode === value}>
            <Icon aria-hidden="true" size={15} />
            <span><strong>{label}</strong><small>{copy}</small></span>
          </button>
        ))}
      </div>
    </div>
  );
}
