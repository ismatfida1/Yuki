/**
 * Design philosophy: Tactile Storybook Quiet — objects teach interaction through
 * presence, movement, and soft feedback instead of instructional overlays.
 */

import type { ReactNode } from "react";
import type { WorldObjectId } from "@/lib/world";

export function WorldObjectButton({
  id,
  label,
  hint,
  className,
  children,
  onActivate,
}: {
  id: WorldObjectId;
  label: string;
  hint: string;
  className: string;
  children: ReactNode;
  onActivate: () => void;
}) {
  return (
    <button
      className={`world-object ${className}`}
      data-object={id}
      type="button"
      aria-label={label}
      aria-describedby={`${id}-hint`}
      onClick={onActivate}
    >
      <span className="world-object-art" aria-hidden="true">
        {children}
      </span>
      <span className="world-object-hint" id={`${id}-hint`}>
        {hint}
      </span>
    </button>
  );
}
