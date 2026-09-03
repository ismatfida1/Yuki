/**
 * Design philosophy: Tactile Storybook Quiet — place-before-interface, warm tactile
 * atmosphere, contextual interaction, optional participation, and accessible states.
 */

export type Atmosphere = "morning" | "rain" | "evening" | "quiet";
export type WorldDensity = "open" | "soft" | "still";
export type PresenceMode = "nearby" | "quiet" | "making";
export type WorldObjectId = "window" | "lamp" | "garden" | "pool" | "sketchbook" | "companion";

export type WorldObject = {
  id: WorldObjectId;
  label: string;
  hint: string;
  location: string;
};

export type WorldState = {
  atmosphere: Atmosphere;
  density: WorldDensity;
  soundEnabled: boolean;
  motionReduced: boolean;
  presenceMode: PresenceMode;
  selectedObject: WorldObjectId | null;
  invitationVisible: boolean;
};

export const worldObjects: WorldObject[] = [
  {
    id: "window",
    label: "Window",
    hint: "Let a little weather into the room.",
    location: "The window",
  },
  {
    id: "lamp",
    label: "Lamp",
    hint: "Warm the light, or leave it as it is.",
    location: "The side table",
  },
  {
    id: "garden",
    label: "Garden path",
    hint: "A little green place is waiting outside.",
    location: "Beyond the window",
  },
  {
    id: "pool",
    label: "Reflection pool",
    hint: "Let a word, color, or silence make a ripple.",
    location: "The quiet corner",
  },
  {
    id: "sketchbook",
    label: "Sketchbook",
    hint: "Make a mark if you feel like it.",
    location: "The low table",
  },
  {
    id: "companion",
    label: "Yuki",
    hint: "A quiet companion is nearby.",
    location: "By the window",
  },
];

export const initialWorldState: WorldState = {
  atmosphere: "morning",
  density: "open",
  soundEnabled: false,
  motionReduced: false,
  presenceMode: "nearby",
  selectedObject: null,
  invitationVisible: true,
};
