/**
 * Design philosophy: Tactile Storybook Quiet — the world is the interface, state is
 * reversible, participation is optional, and motion/sound remain user-controlled.
 */

import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import {
  initialWorldState,
  type Atmosphere,
  type WorldDensity,
  type WorldObjectId,
  type WorldState,
} from "@/lib/world";

type WorldAction =
  | { type: "setAtmosphere"; atmosphere: Atmosphere }
  | { type: "setDensity"; density: WorldDensity }
  | { type: "toggleSound" }
  | { type: "toggleMotion" }
  | { type: "selectObject"; objectId: WorldObjectId | null }
  | { type: "dismissInvitation" };

type WorldContextValue = {
  state: WorldState;
  setAtmosphere: (atmosphere: Atmosphere) => void;
  setDensity: (density: WorldDensity) => void;
  toggleSound: () => void;
  toggleMotion: () => void;
  selectObject: (objectId: WorldObjectId | null) => void;
  dismissInvitation: () => void;
};

const WorldContext = createContext<WorldContextValue | null>(null);
const WORLD_PREFERENCES_KEY = "yuki-world-preferences-v1";

type SavedPreferences = Pick<WorldState, "atmosphere" | "density" | "soundEnabled" | "motionReduced">;

function loadSavedPreferences(): Partial<SavedPreferences> {
  try {
    const stored = window.localStorage.getItem(WORLD_PREFERENCES_KEY);
    return stored ? (JSON.parse(stored) as Partial<SavedPreferences>) : {};
  } catch {
    return {};
  }
}

function initialPersistedState(): WorldState {
  return { ...initialWorldState, ...loadSavedPreferences() };
}

function worldReducer(state: WorldState, action: WorldAction): WorldState {
  switch (action.type) {
    case "setAtmosphere":
      return { ...state, atmosphere: action.atmosphere };
    case "setDensity":
      return { ...state, density: action.density };
    case "toggleSound":
      return { ...state, soundEnabled: !state.soundEnabled };
    case "toggleMotion":
      return { ...state, motionReduced: !state.motionReduced };
    case "selectObject":
      return { ...state, selectedObject: action.objectId };
    case "dismissInvitation":
      return { ...state, invitationVisible: false };
    default:
      return state;
  }
}

export function WorldProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(worldReducer, undefined, initialPersistedState);

  useEffect(() => {
    const preferences: SavedPreferences = {
      atmosphere: state.atmosphere,
      density: state.density,
      soundEnabled: state.soundEnabled,
      motionReduced: state.motionReduced,
    };
    try {
      window.localStorage.setItem(WORLD_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch {
      // Preferences remain available for this session when storage is unavailable.
    }
  }, [state.atmosphere, state.density, state.soundEnabled, state.motionReduced]);

  const value = useMemo<WorldContextValue>(
    () => ({
      state,
      setAtmosphere: (atmosphere) => dispatch({ type: "setAtmosphere", atmosphere }),
      setDensity: (density) => dispatch({ type: "setDensity", density }),
      toggleSound: () => dispatch({ type: "toggleSound" }),
      toggleMotion: () => dispatch({ type: "toggleMotion" }),
      selectObject: (objectId) => dispatch({ type: "selectObject", objectId }),
      dismissInvitation: () => dispatch({ type: "dismissInvitation" }),
    }),
    [state],
  );

  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
}

export function useWorld() {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error("useWorld must be used within WorldProvider");
  }
  return context;
}
