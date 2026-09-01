# Yuki Design Direction

## Three possible approaches

### Theme Name: Tactile Storybook Quiet
**Very Brief Intro:** A hand-painted digital room where soft materials, small living details, and gentle light make the world feel inhabited without becoming busy. The interface is spatial and discoverable, like opening a favorite illustrated book.

**Probability:** 0.06

### Theme Name: Botanical Observatory
**Very Brief Intro:** A calmer, more contemplative world built from plants, dusk skies, constellations, and slow celestial movement. The experience feels like a personal observatory for curiosity and pause.

**Probability:** 0.04

### Theme Name: Domestic Folklore
**Very Brief Intro:** A warm, slightly magical home shaped by everyday objects, tiny rituals, and quiet folk-art motifs. Familiar rooms become gentle portals to creativity, reflection, and real-life transitions.

**Probability:** 0.08

## Chosen approach: Tactile Storybook Quiet

### Design Movement
Contemporary pastoral storybook design: a digital interpretation of handmade picture books, botanical field journals, and quiet interior illustration. It uses the warmth of analog materials while keeping interaction clear, accessible, and responsive.

### Core Principles

1. **Place before interface.** Yuki opens as a lived-in environment, not a menu. Controls appear as small contextual objects only when needed.
2. **Warmth without spectacle.** Use softened contrast, natural material cues, and small environmental movements rather than loud effects, aggressive gradients, or ornamental clutter.
3. **Curiosity teaches.** A plant that leans toward touch, a window that changes light, or a lamp that warms the room should make interaction discoverable without tutorial overlays.
4. **Every action remains optional.** The world can welcome a user who explores, creates, reflects, speaks, or does nothing at all.

### Color Philosophy
Yuki’s color is meant to feel held rather than stimulated. Warm cream forms the light around the world; sage and moss create a sense of life; dusty rose and faded terracotta add human warmth; muted lavender carries quietness; soft gold marks moments of attention without becoming a reward signal. The palette should become slightly cooler and less saturated in low-stimulation mode while maintaining enough contrast for text and controls.

### Layout Paradigm
Use an illustrated threshold composition instead of a dashboard grid. The home scene is a broad spatial canvas with a clear visual path from window to table to doorway/garden edge. On small screens, the world becomes a vertically scrollable storybook viewport with layered depth and a persistent but quiet grounding point. Contextual controls tuck into the edge of the scene or emerge from the object being touched; they do not occupy a permanent navigation bar.

### Signature Elements

- **Pressed-paper halos:** subtle irregular light shapes behind active objects, as if pigment has soaked into handmade paper.
- **Thread-and-leaf connectors:** thin hand-drawn lines and small botanical marks that make transitions between spaces feel grown rather than routed.
- **The quiet gold dot:** a small warm-gold presence marker for Yuki or an available invitation; it should glow gently and never behave like a notification badge.

### Interaction Philosophy
Interactions should feel like handling objects slowly: tap to notice, hold to stay, drag to move, swipe to open a curtain or stir the air, and silence to decline. Feedback is tactile and environmental: a lamp warms, paper flexes, water ripples, a leaf shifts, or Yuki looks up. No interaction should require speed, precision, or completion. Every suggestion can be ignored, dismissed, or undone.

### Animation
Use slow, low-amplitude environmental motion as the default: curtain drift, leaf sway, dust motes, lamp warmth, water shimmer, and companion idle loops. Interaction responses should be short and physically legible, generally 160–280ms for controls and up to 700ms for rare environmental transitions. Animate transform and opacity where possible, avoid layout movement, and use a gentle ease-out for entering states. Disable non-essential motion under `prefers-reduced-motion` and provide a low-stimulation mode that also reduces simultaneous signals, not only animation duration.

### Typography System
Use **Fraunces** for expressive display moments and **DM Sans** for readable interface copy. Headlines should be compact and literary, with moderate weight and generous line-height. Body copy should stay at a comfortable reading size with relaxed leading. Labels and controls use DM Sans at medium weight with sentence case; avoid all-caps system language. Use italics sparingly for quiet invitations, never for essential instructions.

### Brand Essence
**Positioning:** Yuki is a private, adaptive digital place for people who want a gentle environment to pause, explore, make, or simply stay—without being measured or managed.

**Personality:** quiet, observant, tender.

### Brand Voice
Headlines are short and sensory. CTAs are invitations rather than commands. Microcopy is warm, specific, and comfortable with silence. Avoid productivity language, motivational clichés, clinical labels, and faux certainty.

Example lines:

- “You’re here. The room can stay quiet.”
- “Want to sit by the window, or wander a little?”

### Wordmark & Logo
The Yuki mark is a small four-point snow-flower / lantern hybrid: four soft leaf-like points around a warm center, drawn with an imperfect ink contour. The symbol should work without text and can sit beside a custom wordmark whose “Y” has a slightly branching stem and whose dot on the “i” becomes a tiny gold seed. The symbol must remain recognizable at touch size and as a favicon.

### Signature Brand Color
**Yuki Moss — `#809B72`.** This muted living green is calm enough for a resting environment, warm enough to feel botanical rather than corporate, and distinctive enough to own as the bridge between the room and the garden.

## File-level reminder

All frontend files created under this direction should begin with a short comment stating that they implement **Tactile Storybook Quiet**: place-before-interface, warm tactile palette, contextual interaction, optional participation, accessible contrast, and reduced-motion support. If a choice makes the interface feel more like a dashboard, ask whether it dilutes this philosophy and redesign it.
