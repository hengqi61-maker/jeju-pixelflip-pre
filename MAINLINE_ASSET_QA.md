# Mainline Asset QA

> Superseded by `QA_REHEARSAL_REPORT.md` on 2026-05-02. This file is retained as historical draft QA context.

Date: 2026-04-28

Scope: draft browser QA for newly integrated mainline backgrounds `recommended-routes` and `travel-advice-summary`.

## Test Context

- Local app: `http://localhost:5173/`
- Browser: Google Chrome via Computer Use
- Checked URLs:
  - `/?scene=recommended-routes&qa=1`
  - `/?scene=travel-advice-summary&qa=1`
- Note: Chrome's translation popup appeared during the QA screenshots. It is browser UI, not project UI.

## Summary Table

| Scene | Background Loaded | Hotspot Regions | Panel Obstruction | Visual Continuity | Presenter Copy | Verdict |
|---|---|---|---|---|---|---|
| `recommended-routes` | PASS | PASS | PASS | PASS | PASS | PASS |
| `travel-advice-summary` | PASS | PASS | PASS | PASS | PASS | PASS |

## Scene Notes

### recommended-routes

- The new draft background loads as a real asset, not fallback.
- The scene reads as the same Jeju atlas world with route overlays, which is the right direction for mainline page 4.
- Route arcs are visually clear and presentation-friendly.
- The collapsed content pill does not block the main island route structure.
- The `Best Seasons` hotspot currently sits over a relatively calm ocean/UI-safe area, so its final target region should be recalibrated after the image is accepted.
- Follow-up calibration moved the route hotspots onto the yellow short-route loop, the larger blue/pink multi-day route system, and the sunrise/time-of-day area. The `Best Seasons` target is still conceptual on this route page, but now has a visible atmosphere anchor instead of floating in empty ocean.

### travel-advice-summary

- The new draft background loads as a real asset, not fallback.
- The page has a calmer closing mood and successfully separates seasonal mood from practical travel cues.
- The right-side ocean/sky negative space works well for UI.
- The practical/wind zone is readable, but hotspot boundaries need a calibration pass before this can be considered reviewed.
- The scene feels like a closing atlas page rather than a generic checklist or infographic.
- Follow-up calibration moved `Best Seasons` over the seasonal island zones and `Travel Tips` over the transport/wind/practical area. The page is now ready for normal presentation rehearsal while remaining `draft`.

## Issues

### P0

- None found. Both new backgrounds load and the app remains navigable.

### P1

- `recommended-routes` still has a softer visual anchor for `Best Seasons` than the other two route hotspots. It is acceptable for draft, but if this page is revised later, the seasonal/time cue should become more explicit.
- Both scenes need one more Presenter View rehearsal pass before they can be promoted beyond `draft`.

### P2

- Optional foreground, ambient, and thumbnail layers remain missing.
- Narrow-window behavior has not been rechecked for the two new mainline pages.

## Recommendation

Historical recommendation from 2026-04-28: keep both scenes as `draft`. This recommendation is superseded by the final 2026-05-02 rehearsal pass in `QA_REHEARSAL_REPORT.md`.
