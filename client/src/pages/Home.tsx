/**
 * Design philosophy: Tactile Storybook Quiet — this page is a living threshold,
 * not a dashboard; interactions are contextual, optional, readable, and reversible.
 */

import { useMemo, useState } from "react";
import { BookOpen, CloudRain, Droplets, Leaf, LampDesk, PenLine, Sparkles, X } from "lucide-react";
import { ActivityNook } from "@/components/world/ActivityNook";
import { FirstVisitThreshold } from "@/components/world/FirstVisitThreshold";
import { MomentNote } from "@/components/world/MomentNote";
import { PreferencesPanel } from "@/components/world/PreferencesPanel";
import { PresenceSelector } from "@/components/world/PresenceSelector";
import { ReflectionPanel } from "@/components/world/ReflectionPanel";
import { SmallStepPanel } from "@/components/world/SmallStepPanel";
import { WorldControls } from "@/components/world/WorldControls";
import { WorldObjectButton } from "@/components/world/WorldObjectButton";
import { useWorld } from "@/contexts/WorldContext";
import { useRoomRhythm } from "@/hooks/useRoomRhythm";
import { worldObjects, type Atmosphere, type PresenceMode, type WorldObjectId } from "@/lib/world";

const presenceCopy = {
  nearby: "Yuki is sharing the room quietly.",
  quiet: "The room is holding more space around you.",
  making: "A few things are ready to be made alongside you.",
} as const;

const objectDetails: Record<WorldObjectId, { title: string; copy: string; action: string }> = {
  window: {
    title: "A little weather",
    copy: "The light can stay soft. You can change the room whenever you feel like it.",
    action: "Keep looking",
  },
  lamp: {
    title: "A warmer corner",
    copy: "The lamp is here when you want a little more glow, and quiet when you do not.",
    action: "Stay a while",
  },
  garden: {
    title: "The garden path",
    copy: "There is a small green place beyond the room. It will grow patiently, even when you are away.",
    action: "Notice the path",
  },
  pool: {
    title: "The reflection pool",
    copy: "A word, a color, a drawing, or nothing at all can make a ripple here.",
    action: "Let it be",
  },
  sketchbook: {
    title: "The sketchbook",
    copy: "The first mark does not need to become anything. It can simply be a mark.",
    action: "Imagine a mark",
  },
  companion: {
    title: "Yuki is nearby",
    copy: "No need to talk. Yuki can sit with you, listen when invited, or keep the room quiet.",
    action: "Sit together",
  },
};

const atmosphereCopy = {
  morning: "The room is opening slowly.",
  rain: "Rain is making a softer kind of light.",
  evening: "The day can settle at its own pace.",
  quiet: "Nothing needs your attention right now.",
};

function ObjectArt({ id }: { id: WorldObjectId }) {
  switch (id) {
    case "window":
      return (
        <span className="window-art">
          <span className="window-sky" />
          <span className="window-cross window-cross--vertical" />
          <span className="window-cross window-cross--horizontal" />
          <span className="window-curtain window-curtain--left" />
          <span className="window-curtain window-curtain--right" />
        </span>
      );
    case "lamp":
      return (
        <span className="lamp-art">
          <span className="lamp-shade" />
          <span className="lamp-stem" />
          <span className="lamp-base" />
          <span className="lamp-glow" />
        </span>
      );
    case "garden":
      return (
        <span className="garden-art">
          <span className="garden-door" />
          <Leaf className="garden-leaf garden-leaf--one" aria-hidden="true" />
          <Leaf className="garden-leaf garden-leaf--two" aria-hidden="true" />
          <span className="garden-path" />
        </span>
      );
    case "pool":
      return (
        <span className="pool-art">
          <span className="pool-water" />
          <span className="pool-ripple pool-ripple--one" />
          <span className="pool-ripple pool-ripple--two" />
          <Droplets className="pool-drop" aria-hidden="true" />
        </span>
      );
    case "sketchbook":
      return (
        <span className="sketchbook-art">
          <BookOpen aria-hidden="true" size={48} strokeWidth={1.2} />
          <PenLine className="sketchbook-pen" aria-hidden="true" size={18} strokeWidth={1.6} />
        </span>
      );
    case "companion":
      return (
        <span className="companion-art">
          <span className="companion-halo" />
          <span className="companion-body" />
          <span className="companion-ear companion-ear--left" />
          <span className="companion-ear companion-ear--right" />
          <span className="companion-face">
            <span />
            <span />
          </span>
        </span>
      );
  }
}

export default function Home() {
  const { state, selectObject, setAtmosphere, setPresenceMode, dismissInvitation } = useWorld();
  const roomRhythm = useRoomRhythm();
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [thresholdOpen, setThresholdOpen] = useState(true);
  const [smallStepOpen, setSmallStepOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const selectedDetail = state.selectedObject ? objectDetails[state.selectedObject] : null;
  const selectedObject = useMemo(
    () => worldObjects.find((object) => object.id === state.selectedObject),
    [state.selectedObject],
  );

  function handleActivityChoice(title: string) {
    if (title === "Rest here") {
      setAtmosphere("quiet");
      setPresenceMode("quiet");
      setActionNotice("The room is making more space around you.");
    }
    if (title === "Make something") {
      setAtmosphere("morning");
      setPresenceMode("making");
      setActionNotice("A little morning light has found the sketchbook.");
    }
    if (title === "Step outside") {
      setAtmosphere("morning");
      setPresenceMode("nearby");
      setActionNotice("The garden path is open whenever you want it.");
    }
    if (title === "Reach outward") {
      setAtmosphere("evening");
      setPresenceMode("nearby");
      setActionNotice("A warmer corner is waiting when you return.");
    }
  }

  function activateObject(id: WorldObjectId) {
    const atmosphereOrder: Atmosphere[] = ["morning", "rain", "evening", "quiet"];
    if (id === "window") {
      const next = atmosphereOrder[(atmosphereOrder.indexOf(state.atmosphere) + 1) % atmosphereOrder.length];
      setAtmosphere(next);
      setActionNotice(next === "rain" ? "Rain has found the window." : "The window is holding a new kind of light.");
    }
    if (id === "lamp") {
      setAtmosphere(state.atmosphere === "evening" ? "quiet" : "evening");
      setActionNotice("The lamp is keeping a small pool of warmth.");
    }
    if (id === "garden") {
      setAtmosphere("morning");
      setActionNotice("The garden path is still there.");
    }
    if (id === "pool") {
      setAtmosphere("quiet");
      setActionNotice("The water is listening without asking for words.");
    }
    if (id === "companion") {
      setPresenceMode("nearby" as PresenceMode);
      setActionNotice("Yuki settles nearby, without needing anything.");
    }
    selectObject(id);
  }

  return (
    <main
      className={`yuki-app atmosphere-${state.atmosphere} rhythm-${roomRhythm.period} density-${state.density} presence-${state.presenceMode}${state.motionReduced ? " motion-reduced" : ""}`}
    >
      {thresholdOpen ? <FirstVisitThreshold onClose={() => setThresholdOpen(false)} /> : null}
      <div className="paper-grain" aria-hidden="true" />
      <div className="ambient-dust ambient-dust--one" aria-hidden="true" />
      <div className="ambient-dust ambient-dust--two" aria-hidden="true" />

      <header className="world-header">
        <a className="brand-lockup" href="#world" aria-label="Yuki home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="brand-name">Yuki</span>
        </a>
        <div className="header-note" aria-live="polite">
          <span className="header-note-dot" aria-hidden="true" />
          <span>{roomRhythm.greeting}</span>
        </div>
        <div className="header-actions">
          <button className="preference-trigger" type="button" onClick={() => setPreferencesOpen(true)} aria-label="Open preferences">
            <span aria-hidden="true">✦</span>
            <span>Preferences</span>
          </button>
          <WorldControls />
        </div>
      </header>

      <section className="home-world" id="world" aria-labelledby="world-title">
        <div className="world-copy">
          <p className="eyebrow"><Sparkles aria-hidden="true" size={14} /> Your small world</p>
          <h1 id="world-title">You’re here.<br /><em>You don’t have to do anything.</em></h1>
          <p className="world-subtitle">{presenceCopy[state.presenceMode]}</p>
          <PresenceSelector />
        </div>

        <div className="room-stage" aria-label="Yuki’s home world. Explore the objects or stay in the room." role="region">
          <div className="room-wall" aria-hidden="true">
            <img
              className="world-illustration-layer"
              src="/manus-storage/yuki-proof-pixel-fantasy-v2_d03feb24.png"
              alt=""
              aria-hidden="true"
            />
            <span className="world-illustration-tint" />
            <span className="wall-shadow wall-shadow--one" />
            <span className="wall-shadow wall-shadow--two" />
          </div>
          <div className="floor-plane" aria-hidden="true" />
          <div className="window-light" aria-hidden="true" />

          <WorldObjectButton
            id="window"
            label="Window. Let a little weather into the room."
            hint="The window"
            className="world-object--window"
            onActivate={() => activateObject("window")}
          >
            <ObjectArt id="window" />
          </WorldObjectButton>

          <WorldObjectButton
            id="lamp"
            label="Lamp. Warm the light, or leave it as it is."
            hint="The lamp"
            className="world-object--lamp"
            onActivate={() => activateObject("lamp")}
          >
            <ObjectArt id="lamp" />
          </WorldObjectButton>

          <WorldObjectButton
            id="companion"
            label="Yuki. A quiet companion is nearby."
            hint="Yuki"
            className="world-object--companion"
            onActivate={() => activateObject("companion")}
          >
            <ObjectArt id="companion" />
          </WorldObjectButton>

          <div className="room-table" aria-hidden="true"><span /><span /><span /></div>

          <WorldObjectButton
            id="sketchbook"
            label="Sketchbook. Make a mark if you feel like it."
            hint="The sketchbook"
            className="world-object--sketchbook"
            onActivate={() => setReflectionOpen(true)}
          >
            <ObjectArt id="sketchbook" />
          </WorldObjectButton>

          <WorldObjectButton
            id="pool"
            label="Reflection pool. Let a word, color, or silence make a ripple."
            hint="The reflection pool"
            className="world-object--pool"
            onActivate={() => activateObject("pool")}
          >
            <ObjectArt id="pool" />
          </WorldObjectButton>

          <WorldObjectButton
            id="garden"
            label="Garden path. A little green place is waiting outside."
            hint="The garden path"
            className="world-object--garden"
            onActivate={() => activateObject("garden")}
          >
            <ObjectArt id="garden" />
          </WorldObjectButton>

          <div className="room-scribble room-scribble--one" aria-hidden="true">✦</div>
          <div className="room-scribble room-scribble--two" aria-hidden="true">⌁</div>
          <div className="room-plant room-plant--one" aria-hidden="true"><span /><span /><span /></div>
          <div className="room-plant room-plant--two" aria-hidden="true"><span /><span /><span /></div>
        </div>

        <div className="world-footer">
          <p className="world-caption"><CloudRain aria-hidden="true" size={16} /> {state.atmosphere === "rain" ? "The rain can stay." : "A little weather is passing by."}</p>
          <MomentNote />
          <button className="small-step-trigger" type="button" onClick={() => setSmallStepOpen(true)}>I’m stuck</button>
          <button className="small-step-trigger" type="button" onClick={() => setActivityOpen(true)}>A little nook</button>
          <p className="world-caption world-caption--right">{state.soundEnabled ? "A soft room tone is ready." : roomRhythm.suggestion}</p>
        </div>
      </section>

      {state.invitationVisible ? (
        <aside className="quiet-invitation" aria-label="A gentle invitation">
          <div>
            <span className="quiet-invitation-mark" aria-hidden="true" />
            <p>Want to sit by the window, or wander a little?</p>
          </div>
          <button type="button" onClick={dismissInvitation} aria-label="Dismiss invitation">
            <X aria-hidden="true" size={17} strokeWidth={1.7} />
          </button>
        </aside>
      ) : null}

      {preferencesOpen ? <PreferencesPanel onClose={() => setPreferencesOpen(false)} /> : null}
      {smallStepOpen ? <SmallStepPanel onClose={() => setSmallStepOpen(false)} /> : null}
      {activityOpen ? <ActivityNook onClose={() => setActivityOpen(false)} onChoose={handleActivityChoice} /> : null}
      {reflectionOpen ? <ReflectionPanel onClose={() => setReflectionOpen(false)} /> : null}

      {selectedDetail && selectedObject ? (
        <aside className="object-whisper" aria-live="polite" aria-label={`${selectedObject.label} details`}>
          <div className="object-whisper-topline">
            <span>{selectedObject.location}</span>
            <button type="button" onClick={() => selectObject(null)} aria-label="Close object details">
              <X aria-hidden="true" size={16} />
            </button>
          </div>
          <h2>{selectedDetail.title}</h2>
          <p>{selectedDetail.copy}</p>
          <button className="whisper-action" type="button" onClick={() => selectObject(null)}>{selectedDetail.action}</button>
        </aside>
      ) : null}

      <p className="world-status" aria-live="polite">{actionNotice ?? (state.motionReduced ? "Stillness is on." : "The room moves gently.")}</p>
    </main>
  );
}
