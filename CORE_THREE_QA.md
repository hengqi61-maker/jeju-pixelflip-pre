# Core Three QA

> Superseded by `QA_REHEARSAL_REPORT.md` on 2026-05-02. This file is retained as historical draft QA context.

Date: 2026-04-28

Scope: browser QA for the first three draft scenes only. No new artwork, scene graph edits, asset manifest edits, or feature work were performed during this pass.

## Test Context

- Local app: `http://localhost:5173/`
- Dev command: `pnpm dev`
- Browser: Google Chrome via Computer Use
- Checked flows: scene URL restore, audience-mode landing state, `qa=1` hotspot/debug visibility, mainline next/previous, hotspot branch entry, back/overview return, desktop 16:9 view, and presenter mode visibility.
- Limitation: Computer Use does not provide a reliable mouse-move hover primitive in this session. Keyboard focus and clickable hotspot affordances were inspected; true pointer-hover tooltip behavior should receive one more human/browser pass before `reviewed`.

## Summary Table

| Scene | Background Loaded | Hotspot Alignment | Hover Discoverability | Click Zoom | Back/Overview | Panel Obstruction | Presenter Readability | Verdict |
|---|---|---|---|---|---|---|---|---|
| cover-overview | PASS | NEEDS_TUNING | NEEDS_TUNING | NEEDS_TUNING | PASS | PASS | NEEDS_TUNING | NEEDS_TUNING |
| spatial-structure | PASS | NEEDS_TUNING | NEEDS_TUNING | NEEDS_TUNING | PASS | PASS | NEEDS_TUNING | NEEDS_TUNING |
| core-sight-map | PASS | NEEDS_TUNING | NEEDS_TUNING | NEEDS_TUNING | PASS | PASS | NEEDS_TUNING | NEEDS_TUNING |

## Scene Notes

### cover-overview

- Background loads as a real image, with no background fallback in audience mode.
- Large visual composition is strong and presentation-worthy.
- Audience mode now lands much cleaner: the content panel is collapsed to a small top-right pill instead of a large blocking card.
- `qa=1` correctly re-enables hotspot outlines and debug overlays for inspection, while normal audience mode keeps them hidden.
- The accessibility tree exposes the expected hotspot buttons: Hallasan, Seongsan Ilchulbong, Udo, Waterfalls, Dongmun Market, and Food.
- Clicking Hallasan enters the Hallasan extension and Back returns to the parent scene.
- The content panel no longer visibly rides with the scene transition, which improves the “camera vs. UI layer” separation.
- The current transition is stronger than before, but the "camera drilling into the object" feeling is still not strong enough to mark as PASS.

### spatial-structure

- Background loads as a real image, with no background fallback in audience mode.
- Overall visual reads clearly as a spatial / island-structure scene.
- Hotspot buttons are present for Central Mountain Core, East Coast, Udo Link, Geological Coast, and South Scenic Belt.
- Central Mountain Core branch navigation works and Back returns to Spatial Structure.
- The collapsed panel now reduces obstruction substantially compared with the previous large card layout.
- Hotspot placement appears plausible but still needs coordinate calibration against the final visible landmarks.

### core-sight-map

- Background loads as a real image, with no background fallback in audience mode.
- Visual density is high and suitable for a branching hub.
- Hotspot buttons are present for Hallasan, Seongsan Ilchulbong, Udo, Jusangjeolli Cliffs, Waterfalls, Jeju Culture, Food, and Dongmun Market.
- In normal audience mode the scene now feels cleaner because debug pills and hotspot rings are hidden by default.
- In `qa=1`, hotspot rings are discoverable again for calibration, but several overlaps make exact target meaning less clear without hover tooltip confirmation.
- The content panel is now a compact pill and no longer blocks the right-side landmark region the way the previous card did.
- Presenter mode content exists in the DOM, but the panel did not become reliably readable in the captured viewport; this needs layout QA before live demo use.

## Issue List

### P0

- None found in this QA pass. The app loads, the first three backgrounds render, mainline navigation works, branch entry works, and Back/Overview are functional.

### P1

- Hotspot coordinates are still draft-level. They are visible, but not yet calibrated tightly enough to the final rendered artwork.
- Click zoom is functional as a scene transition, but the "zoom into the visual object" feeling is subtle and not yet strong enough for the intended Zain-style interaction.
- Presenter mode needs layout tuning. The content is available, but in the tested viewport it was not reliably visible/readable as a separate cockpit.
- True pointer-hover tooltip behavior still needs direct manual/browser validation because this Computer Use session could not reliably perform mouse hover without activation.
- Audience mode and QA mode are now intentionally different. This is correct, but QA must continue to use `?qa=1` when hotspot outlines or asset-debug overlays are needed.

### P2

- Optional foreground, ambient, and thumbnail assets are still missing, which is acceptable for draft and now only visible in `qa=1` / debug inspection.
- Narrow-window behavior remains usable for inspection, but it is not yet presentation-grade; the frame competes with the header and panels.
- Extension scenes are mostly fallback art, so branch destinations do not yet visually feel like enlarged parts of the same world.

## Recommendation

Historical recommendation from 2026-04-28: do not mark the core three scenes as `reviewed` yet. This recommendation is superseded by the final 2026-05-02 rehearsal pass in `QA_REHEARSAL_REPORT.md`.

Recommended next step: enter hotspot coordinate calibration for the three core scenes. The panel-layer split is now in the right direction, so the next meaningful improvement is coordinate tuning plus one more hover/click pass in a real pointer-driven browser session.
