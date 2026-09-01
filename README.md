# Yuki — Living World ❄️

Yuki is a gentle, adaptive digital environment. It is a place to enter, explore, stay, or simply do nothing for a while—not a productivity dashboard, therapy tool, game, or conventional chatbot.

Yuki is an adaptive AI environment that transforms everyday moments into personalized interactive worlds. Instead of simply talking to users, Yuki adapts the digital environment around their context, needs, and interactions.

## Vision

AI should not merely respond to the user. It should shape an experience around what the user needs while keeping the underlying intelligence mostly invisible.

The goal is to make technology feel less like a tool the user operates and more like a world the user experiences.

## Current direction

This repository is the web-first implementation of Yuki. The web app is being built mobile-first and will establish the shared world model, visual language, interaction grammar, and accessibility rules that the later mobile app will reuse.

The first web milestone is one persistent home world with a subtle Yuki companion, gentle atmosphere changes, and discoverable paths toward the garden, reflection pool, and sketchbook. The world is the interface; visible AI machinery, metrics, streaks, scores, diagnoses, forced check-ins, and performance language are intentionally excluded.

The attached product blueprint is the product-direction source. Its conceptual “Luma” references are normalized to the canonical product name **Yuki** in implementation.

## What Yuki does

Yuki combines AI, personalization, memory, multimodal interaction, and adaptive environments to create a digital world that evolves with the user. The visible experience stays calm and simple while the underlying architecture remains capable of supporting richer context, creativity, learning, rest, and everyday-life experiences over time.

## Development rules

- Build the experience as a place before an app.
- Keep every activity optional; doing nothing is valid.
- Preserve user agency and make adaptive behavior reversible.
- Never imply memory or personalization that the user did not provide or intentionally save.
- Keep wellbeing interactions non-clinical and body-neutral.
- Test small screens first, then tablet and desktop.
- Respect reduced motion, sound-off use, readable contrast, keyboard navigation, screen-reader semantics, and generous touch targets.
- Keep visual assets original and coherent with the approved Yuki art direction.

## Illustration approval

Illustrations are core product visuals. Before any core illustration is created, replaced, or materially changed, the implementation must pause for user approval of the proposed scene, perspective, companion form, palette, texture, lighting, interaction states, responsive behavior, and asset strategy. See [`docs/illustration-approval.md`](docs/illustration-approval.md).

## GitHub synchronization

Each completed implementation step is validated, reviewed for accidental changes and misplaced large assets, committed atomically, and pushed to the connected GitHub repository before the next step begins. No force-push is used without explicit approval. See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## Local development

```bash
pnpm install
pnpm run dev
```

Validation commands:

```bash
pnpm run check
pnpm run build
```

The web project uses the managed web-static scaffold. Large media must remain outside the source tree and be referenced through the project asset workflow rather than committed to `client/public/` or `client/src/assets/`.
