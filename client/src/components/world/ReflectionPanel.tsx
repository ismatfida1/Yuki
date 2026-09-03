/**
 * Design philosophy: Tactile Storybook Quiet — reflection is private, optional,
 * reversible, and embedded in the world rather than presented as a dashboard.
 */

import { useEffect, useState, type FormEvent } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { BookOpen, Trash2, X } from "lucide-react";

type Reflection = {
  id: string;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = "yuki-reflections-v1";

function loadReflections(): Reflection[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Reflection[]) : [];
  } catch {
    return [];
  }
}

export function ReflectionPanel({ onClose }: { onClose: () => void }) {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [text, setText] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  useEscapeKey(onClose);

  useEffect(() => {
    setReflections(loadReflections());
  }, []);

  function persist(next: Reflection[]) {
    setReflections(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // The reflection still remains available for this session if storage is unavailable.
    }
  }

  function saveReflection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) return;
    persist([
      { id: crypto.randomUUID(), text: cleanText, createdAt: new Date().toISOString() },
      ...reflections,
    ]);
    setText("");
    setShowSaved(true);
  }

  function deleteReflection(id: string) {
    persist(reflections.filter((reflection) => reflection.id !== id));
  }

  return (
    <div className="reflection-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="reflection-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reflection-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="reflection-topline">
          <span className="reflection-kicker"><BookOpen aria-hidden="true" size={15} /> The sketchbook</span>
          <button type="button" onClick={onClose} aria-label="Close sketchbook">
            <X aria-hidden="true" size={17} />
          </button>
        </div>
        <h2 id="reflection-title">A place to leave a thought</h2>
        <p className="reflection-copy">Keep something here for yourself. Yuki does not interpret it or send it anywhere.</p>
        <form onSubmit={saveReflection}>
          <label className="reflection-label" htmlFor="reflection-input">Write, if you want to</label>
          <textarea
            id="reflection-input"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Today, I noticed…"
            rows={4}
          />
          <div className="reflection-actions">
            <span className="reflection-status" aria-live="polite">{showSaved ? "Kept in your sketchbook." : "Only save what feels right."}</span>
            <button className="reflection-save" type="submit">Save thought</button>
          </div>
        </form>

        {reflections.length ? (
          <div className="reflection-history">
            <p className="reflection-history-label">Earlier pages</p>
            {reflections.slice(0, 3).map((reflection) => (
              <article className="reflection-entry" key={reflection.id}>
                <p>{reflection.text}</p>
                <button type="button" onClick={() => deleteReflection(reflection.id)} aria-label="Delete this reflection">
                  <Trash2 aria-hidden="true" size={14} />
                </button>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
