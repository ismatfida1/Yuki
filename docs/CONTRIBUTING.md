# Contributing to Yuki

Yuki is developed in small, reviewable steps so the world remains coherent and the user remains in control.

## Step protocol

Every implementation step follows the same sequence:

1. Define the step and its acceptance criteria.
2. Pause for illustration approval if the step creates or materially changes core visuals.
3. Implement only that step.
4. Run the relevant checks and manually verify the primary user flow.
5. Review the diff for accidental changes, secrets, broken behavior, and large misplaced assets.
6. Create an atomic commit with a descriptive message.
7. Push immediately to the connected GitHub repository.
8. Report the step, validation result, and commit hash before continuing.

If the remote branch changed, reconcile safely before pushing. Never force-push without explicit approval.

## Product guardrails

The world is the interface. Do not introduce streaks, points, scores, levels, rankings, progress meters, forced activities, diagnosis, hidden surveillance, or constant companion chatter. Suggestions must remain optional and reversible. Silence and doing nothing are valid states.

## Visual guardrails

Use the approved Yuki visual language: warm tactile materials, original illustrations, organic shapes, calm lighting, and accessible contrast. Do not copy recognizable characters, environments, logos, or artwork from references. Keep large media outside the source tree and use the managed asset workflow.

## Mobile-first quality

Check the smallest supported viewport before widening the layout. Verify touch targets, focus states, keyboard access, sound-off behavior, reduced motion, text alternatives, and screen-reader labels. A desktop-only interaction is not complete.
