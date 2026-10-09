# figma-design — Orbit Figma Fidelity, Design Tokens, and UI Implementation Contract

## Purpose

The approved Figma file is the visual source of truth for this application.
Implementation must reproduce its colors, typography, spacing, dimensions,
radii, borders, shadows, layout, responsive behavior, component variants,
interaction states, iconography, and motion without independent redesign.

This document defines how Figma decisions become reusable code. It does not
invent visual values. Exact values must be read from the approved Figma file and
stored as shared design tokens before the corresponding UI is implemented.

`stack.md` remains the source of truth for technologies. `architecture.md`
remains the source of truth for feature ownership and file boundaries. If this
document conflicts with either file, stop implementation and update the relevant
context documents before writing UI code.

## Application context

Orbit is an English-language task management application for organizing tasks,
groups, and notes, with account profiles, notifications, and productivity
insights. Its interface uses a calm, compact desktop workspace with a persistent
navigation sidebar, clear task status and priority cues, and light and dark
themes. The product defaults to English, `en-US`, and left-to-right layout.

Use the approved Orbit Figma frames as the visual source of truth. Keep shared
colors, type, spacing, dimensions, radii, and elevation in the semantic tokens
below and in `app/globals.css`; shared UI primitives consume those tokens, while
feature screens compose the primitives. Do not introduce an independent visual
language. The supplied exact target is desktop at 1440px; smaller layouts must
remain usable but are not exact Figma targets until approved frames exist.

## Figma source registry

| Item | Orbit source |
|---|---|
| Figma file | `Orbit` |
| Canonical URL | `https://www.figma.com/design/laiZSESHpTPjtjhrWSU4aK/Orbit?node-id=0-1&p=f` |
| File key | `laiZSESHpTPjtjhrWSU4aK` |
| Page | `Page 1` — node `0:1` |
| Design-system reference | `Task management design system` — node `2:37735` |
| Theme coverage | Light and dark |
| Supplied viewport class | Desktop only; width `1440px` |
| Handoff label | `October 2026 · v1.0`, as displayed inside node `2:37735` |

The `t` query parameter in a shared Figma URL is transient and must not be
stored as the design identity. File key plus node ID form the stable reference.
Node `0:1` identifies the page, not an implementable screen; every UI task must
resolve a concrete frame from the inventory below.

### Screen inventory

| Area | Theme/state | Frame node | Viewport |
|---|---|---:|---:|
| Design system | Light and dark foundations | `2:37735` | `1440 × 1000` |
| Authentication | Login · Light | `21:3338` | `1440 × 1000` |
| Authentication | Register · Light | `21:3452` | `1440 × 1000` |
| Authentication | Login · Dark | `26:1252` | `1440 × 1000` |
| Authentication | Register · Dark | `26:1370` | `1440 × 1000` |
| Tasks | Table View · Light | `2:35588` | `1440 × 1000` |
| Tasks | Table View · Selected | `2:35996` | `1440 × 1080` |
| Tasks | Drag & Drop View · Light | `2:36433` | `1440 × 1000` |
| Tasks | Details drawer · Light | `8:2169` | `1440 × 1000` |
| Tasks | Create task dialog · Light | `12:674` | `1440 × 1000` |
| Tasks | Edit task dialog · Light | `1:2056` | `1440 × 1000` |
| Tasks | Status filter open · Light | `29:1560` | `1440 × 1000` |
| Tasks | Priority open · Light | `31:6411` | `1440 × 1000` |
| Tasks | Group open · Light | `31:6961` | `1440 × 1000` |
| Tasks | Due date open · Light | `31:7524` | `1440 × 1000` |
| Tasks | Last update open · Light | `31:8092` | `1440 × 1000` |
| Tasks | Collapsed sidebar · Light | `82:2033` | `1440 × 1000` |
| Tasks | Table View · Dark | `2:36880` | `1440 × 1000` |
| Tasks | Drag & Drop View · Dark | `2:37288` | `1440 × 1000` |
| Tasks | Details drawer · Dark | `10:3368` | `1440 × 1000` |
| Tasks | Create task dialog · Dark | `12:1400` | `1440 × 1000` |
| Tasks | Edit task dialog · Dark | `1:3012` | `1440 × 1000` |
| Tasks | Status filter open · Dark | `31:17397` | `1440 × 1000` |
| Tasks | Priority open · Dark | `31:17944` | `1440 × 1000` |
| Tasks | Group open · Dark | `31:18494` | `1440 × 1000` |
| Tasks | Due date open · Dark | `31:19057` | `1440 × 1000` |
| Tasks | Last update open · Dark | `31:19688` | `1440 × 1000` |
| Dashboard | Analytics overview · Light | `54:6997` | `1440 × 2451` |
| Dashboard | Analytics overview · Dark | `60:586` | `1440 × 2451` |

No tablet or mobile frame was found in the supplied page. Responsive behavior
may be engineered so the application remains usable, but it must not be called
an exact Figma match until corresponding frames are approved.

### Current Figma structure audit

- The file currently exposes no local Figma Variables.
- It exposes no local paint, text, effect, or grid styles.
- It exposes no local Components or Component Sets on `Page 1`.
- The values below were therefore audited from the actual layers inside node
  `2:37735`, not from a formal Figma variable collection.
- Code must improve this handoff weakness by centralizing every repeated value;
  it must not copy raw values from generated Figma code into feature files.

No screen is considered ready for exact implementation until its frame/node ID
and intended viewport are known. A screenshot is reference material, not a
replacement for inspectable Figma properties when the original file is
available.

## Orbit token baseline

The following values are the initial audited contract for Orbit. Preserve the
semantic names even when two roles currently share a value. Any later Figma
change must update this table and the canonical CSS tokens together.

### Foundation colors

| Code token | Light | Dark | Role |
|---|---:|---:|---|
| `--color-primary` | `#635BFF` | `#635BFF` | Primary action and selection |
| `--color-background` | `#F6F7FA` | `#101116` | Application canvas |
| `--color-surface` | `#FFFFFF` | `#17181F` | Card, control, dialog surface |
| `--color-surface-muted` | `#F0F1F5` | `#1D1F27` | Muted/header/status surface |
| `--color-surface-selected` | `#F7F6FF` | `#222331` | Selected row/surface |
| `--color-primary-subtle` | `#EEECFF` | `#2A2851` | Subtle accent surface |
| `--color-border` | `#E4E6ED` | `#2C2E38` | Default border and divider |
| `--color-text` | `#171822` | `#F4F4F7` | Primary text |
| `--color-text-secondary` | `#6F7282` | `#A2A5B3` | Secondary/body text |
| `--color-text-muted` | `#9A9DAC` | `#717582` | Labels and subdued metadata |

`#ECEEF3` is the presentation-board background of the design-system reference;
do not use it as the application canvas unless a concrete screen uses it.

### Status and priority colors

| Semantic role | Light background | Light foreground | Dark background | Dark foreground |
|---|---:|---:|---:|---:|
| Low / Done / Success | `#E7F6EE` | `#21875A` | `#183B2D` | `#7BD5A8` |
| Medium / Warning | `#FFF3D6` | `#A86500` | `#44351B` | `#F0BD66` |
| High / Danger | `#FDECEF` | `#D84A5D` | `#41232A` | `#F18A99` |
| Todo / Neutral | `#F0F1F5` | `#606474` | `#1D1F27` | `#A2A5B3` |
| In progress / Info | `#E9F2FC` | `#3478C7` | `#1C3048` | `#80B8F1` |

Never replace these pairs with opacity applied to a single hue. Background and
foreground are independently approved values.

### Typography

| Property | Audited values |
|---|---|
| Figma family | `Inter` |
| Weights | Regular `400`, Medium `500`, Semi Bold `600`, Bold `700` |
| Font sizes | `10`, `11`, `12`, `14`, `16`, `20`, `26`, `28px` |
| Body line height | `145%` where explicitly set; otherwise Figma `Auto` |
| Letter spacing observed | `-0.6`, `-0.5`, `0`, `0.6`, `0.8px` |

Do not apply one letter-spacing value globally. Map size, weight, line height,
and tracking as a named typography role only after inspecting the target text
node. Inter is the verified Latin font in Orbit; it is not approval for a
Persian font substitution.

### Geometry and elevation

| Domain | Audited values |
|---|---|
| Repeated spacing | `3`, `4`, `5`, `6`, `7`, `8`, `10`, `12`, `14`, `18`, `20px` |
| Additional container padding | `9`, `16`, `28`, `30px` |
| Radii | `5`, `8`, `10`, `14`, `18`, `999px` |
| Primary/compact button height | `32px` |
| Standard input/button height | `38px` |
| Icon button box | `34 × 34px` |
| Checkbox | `18 × 18px`, radius `5px` |
| Common icon boxes | `12`, `13`, `14`, `15`, `16px` |
| Default border | `1px solid` |
| Card shadow | `0 8px 24px rgba(24, 26, 36, 0.13)` |
| Dialog shadow | `0 18px 48px rgba(9, 10, 15, 0.25)` |

These sets are not permission to use any value in any place. The selected token
must still match the inspected node and component role.

## Authority order

When two visual sources disagree, use this order:

1. The explicitly approved Figma frame or component variant.
2. Figma Variables used by that frame.
3. Published Figma component and text/effect/grid styles.
4. This document's token and component rules.
5. Existing shared code tokens and components.
6. A user decision for anything still ambiguous.

Do not silently choose the most convenient value. Record unresolved differences
and ask for a decision when they materially affect the result.

## Non-negotiable fidelity rules

1. Do not redesign, simplify, embellish, or “improve” the approved Figma UI.
2. Do not guess missing colors, sizes, breakpoints, shadows, typography, or states.
3. Do not use Tailwind defaults merely because they are visually close.
4. Do not hardcode reusable visual values inside feature components.
5. Do not create a second token source in TypeScript, component files, or a
   feature stylesheet.
6. Repeated Figma instances become one reusable code component with equivalent
   variants and states.
7. A shared Figma component must not be rebuilt separately inside multiple
   features.
8. Preserve Figma's hierarchy, density, alignment, and whitespace at the exact
   target viewport.
9. Use CSS layout—not screenshot slicing or absolute positioning—to reproduce
   responsive structure. Absolute positioning is reserved for genuine overlays,
   decorative layers, and elements positioned that way by design.
10. Do not add desktop, mobile, hover, dark-mode, empty, loading, or error states
    that contradict the approved design. If a required state is missing, pause
    that state and request a design decision.

## Design-token architecture

Tokens have three levels:

| Level | Purpose | Example names |
|---|---|---|
| Reference | Raw design values extracted from Figma Variables | `--ref-color-blue-600`, `--ref-space-4`, `--ref-radius-8` |
| Semantic | Meaning that remains stable across themes | `--background`, `--foreground`, `--primary`, `--border`, `--surface-raised` |
| Component | Exceptional values owned by one reusable component | `--sidebar-width`, `--header-height`, `--dialog-max-width` |

Feature components consume semantic tokens. Reference tokens may define semantic
tokens but must not be used directly throughout feature code. Component tokens
are allowed only when a value is truly specific to that shared component and
cannot be expressed through a semantic token.

### Required token domains

| Domain | Must capture from Figma |
|---|---|
| Color | Brand palette, neutral palette, surfaces, text, icons, borders, overlays, status colors, charts, light/dark values |
| Typography | Font family, weight, size, line height, letter spacing, text transform, paragraph spacing |
| Spacing | Reusable gaps, padding, margins, section spacing, control spacing |
| Sizing | Control heights, icon sizes, avatar sizes, sidebar/header dimensions, content widths, min/max sizes |
| Radius | Control, card, popover, dialog, badge, avatar, and container radii |
| Border | Width, style, color, divider treatment, selected and focus borders |
| Shadow | Card, raised surface, dropdown, popover, dialog, tooltip, and focus shadows |
| Opacity | Disabled, muted, overlay, decorative, hover, and pressed opacity |
| Blur | Backdrop and decorative blur values |
| Motion | Duration, easing, delay, movement distance, scale, and reduced-motion behavior |
| Layering | Base, sticky, dropdown, popover, drawer, dialog, toast, tooltip, and maximum overlay levels |
| Layout | Grid columns, gutters, page padding, content max width, breakpoints, safe areas |
| Data visualization | Chart series, grid, axes, tooltip, positive/negative and comparison colors |

If Figma repeats an exact value, define one token and reuse it. Near-identical
values are not automatically merged; preserve them until the designer confirms
that they represent the same token.

## Canonical code ownership

`app/globals.css` is the single runtime source of truth for visual tokens. It
contains reference and semantic CSS custom properties for the default theme and
theme overrides. Tailwind maps utilities to those variables. shadcn/ui and all
application components consume the mapped semantic tokens.

```css
:root {
  color-scheme: light;
  --background: #f6f7fa;
  --foreground: #171822;
  --card: #ffffff;
  --card-foreground: #171822;
  --popover: #ffffff;
  --popover-foreground: #171822;
  --primary: #635bff;
  --primary-foreground: #ffffff;
  --muted: #f0f1f5;
  --muted-foreground: #6f7282;
  --accent: #eeecff;
  --accent-foreground: #635bff;
  --destructive: #fdecef;
  --destructive-foreground: #d84a5d;
  --border: #e4e6ed;
  --input: #e4e6ed;
  --ring: #635bff;

  --radius-checkbox: 5px;
  --radius-control: 8px;
  --radius-card: 10px;
  --radius-section: 14px;
  --radius-shell: 18px;
  --radius-pill: 999px;

  --shadow-card: 0 8px 24px rgb(24 26 36 / 13%);
  --shadow-dialog: 0 18px 48px rgb(9 10 15 / 25%);
}

.dark {
  color-scheme: dark;
  --background: #101116;
  --foreground: #f4f4f7;
  --card: #17181f;
  --card-foreground: #f4f4f7;
  --popover: #17181f;
  --popover-foreground: #f4f4f7;
  --muted: #1d1f27;
  --muted-foreground: #a2a5b3;
  --accent: #2a2851;
  --accent-foreground: #f4f4f7;
  --destructive: #41232a;
  --destructive-foreground: #f18a99;
  --border: #2c2e38;
  --input: #2c2e38;
}
```

This is the minimum verified mapping, not a complete shadcn theme. Add missing
roles only after tracing them to a concrete Orbit layer. Status pairs from the
baseline table must also be defined as semantic variables before use.

### Tailwind mapping

- Map semantic CSS variables through the project's Tailwind theme mechanism.
- Prefer named utilities such as `bg-background`, `text-foreground`,
  `border-border`, `shadow-card`, and `rounded-control`.
- Arbitrary visual values such as `bg-[#...]`, `text-[13px]`, `mt-[7px]`,
  `rounded-[11px]`, and `shadow-[...]` are forbidden when the value is reusable.
- An arbitrary value is allowed only for genuinely dynamic geometry or a
  one-off value explicitly present in Figma. Add a short code comment explaining
  why it is not a token.
- Do not use Tailwind palette colors such as `blue-500` or `slate-200` unless
  that exact palette is the approved token source.

### JavaScript-accessible tokens

Prefer CSS variables. If a charting, animation, or canvas library requires a
JavaScript value, expose a read-only adapter in `lib/design-tokens/` that reads
or mirrors the canonical CSS token. It must not become an independently edited
token source.

## Token naming rules

- Names describe purpose, not a temporary appearance: `--text-muted`, not
  `--gray-text`; `--surface-danger`, not `--red-box`.
- Use lowercase kebab-case.
- Theme names do not appear in semantic token names.
- State suffixes follow one vocabulary: `default`, `hover`, `active`, `focus`,
  `selected`, `disabled`.
- Size suffixes follow the approved component variants: for example `sm`, `md`,
  and `lg`. Do not introduce a size that does not exist in Figma.
- Use the same token name in Figma and code when practical. If normalization is
  necessary, maintain one explicit Figma-to-code mapping table in this file.
- Never name tokens after a page or feature when the value is globally reusable.

## Color contract

Every color visible in code must trace back to a Figma Variable or approved
style. Capture at least:

- page, section, card, elevated, overlay, and inverse surfaces;
- primary, secondary, muted, accent, and destructive actions;
- primary, secondary, muted, inverse, link, and disabled text;
- default, subtle, strong, selected, error, and focus borders;
- default, muted, active, inverse, and status icons;
- success, warning, error, and information states;
- chart series, axes, grids, tooltips, and selection colors;
- scrims, gradients, and decorative transparency.

Semantic foreground/background pairs must preserve the contrast intended by the
design. Never reuse a token in a different role solely because its current hex
value matches another token; the two roles may diverge in a later theme.

## Typography contract

Typography must use the exact Figma text styles: font family, weight, size, line
height, letter spacing, casing, alignment, and wrapping behavior. Define named
roles such as display, page title, section title, heading, body, label, caption,
helper, and code only when corresponding styles exist in Figma.

- Load the approved local font through `next/font/local` as defined in
  `stack.md`.
- Use actual available font files and weights. Do not rely on synthetic bold or
  italic rendering.
- Do not substitute a nearby Tailwind text size.
- Match fixed, minimum, and auto-resizing behavior from Figma.
- Preserve deliberate single-line truncation, multi-line clamp, and wrapping.
- Technical fragments such as usernames, URLs, IDs, file names, and code follow
  the bidirectional-text rules in `architecture.md`.

## Spacing, sizing, radius, and shadow contract

- Extract Auto Layout padding and item spacing directly from Figma.
- Map repeated spacing values to the shared scale before building pages.
- Preserve fixed sizes only where Figma requires them. Use min/max and fluid
  layout when Figma Auto Layout indicates hug or fill behavior.
- Control heights, icon boxes, avatars, sidebars, headers, and content containers
  must use named tokens.
- Border radius is part of component identity. Do not normalize different Figma
  radii to a convenient Tailwind default.
- Reproduce every shadow layer, including offset, blur, spread, color, and
  opacity. Do not replace multi-layer shadows with `shadow-md`.
- Use `box-sizing: border-box` assumptions consistently when translating Figma
  dimensions.

## Layout and responsive behavior

Figma frames define the expected layout at their recorded viewport sizes.
Translate Figma Auto Layout to Flexbox or Grid based on the actual relationship
between children—not by copying coordinates.

For every page, record:

| Property | Required evidence |
|---|---|
| Viewport | Exact width and height of each approved frame |
| Shell | Sidebar, header, content, and optional panel dimensions |
| Container | Max width, fluid behavior, horizontal padding, centering |
| Grid | Column count, width rules, gutters, row spacing |
| Breakpoints | The width at which the composition changes, justified by approved frames |
| Overflow | Scroll owner, sticky regions, clipping, and visible overflow |
| Density | Row height, card density, and mobile touch target changes |

Do not choose framework-default breakpoints without verifying that they reproduce
the Figma frames. Between supplied breakpoints, interpolate responsibly using
fluid CSS while preserving hierarchy and avoiding overflow.

Responsive implementation must define, where applicable:

- sidebar collapse, drawer, or disappearance;
- header wrapping and action prioritization;
- table-to-card or horizontal-scroll behavior;
- modal-to-drawer behavior;
- grid column changes;
- navigation changes;
- filter and toolbar compaction;
- touch-target and spacing changes;
- content order and visibility.

## Persian and RTL behavior

The current `architecture.md` defines the product as Persian-first and RTL. The
supplied Orbit frames, however, contain English copy, use Inter, and are laid
out LTR. This is an explicit handoff conflict—not permission to silently mirror
the file and still claim pixel-perfect equivalence.

Until Persian/RTL frames and an approved Persian font are added to Figma:

- use Orbit as the source of truth for colors, spacing, dimensions, radii,
  shadows, component anatomy, and interaction states;
- use `architecture.md` as the source of truth for Persian product copy and RTL
  behavior;
- treat font metrics, text wrapping, directional layout, and direction-sensitive
  icons as requiring an explicit RTL visual review;
- do not mark a localized page as an exact Figma match in the acceptance report;
- record any geometry adjustment caused by Persian metrics in the deviation log.

Once approved RTL frames exist, they supersede this temporary conflict policy.

- Use logical properties and Tailwind start/end utilities.
- Do not blindly mirror icons. Directional icons mirror only when their meaning
  changes with reading direction; universal symbols keep their orientation.
- Render URLs, email addresses, usernames, code, file names, IDs, and similar
  technical values inside `dir="ltr"` or `dir="auto"` boundaries.
- Validate text expansion and line wrapping with realistic Persian content.
- All visible copy must follow the language contract in `architecture.md`. A
  language change requires updating both context files in the same change.

## shadcn/ui implementation rules

shadcn/ui supplies accessible behavior and editable source code; its default
appearance is not the design source of truth.

1. Add only components that the approved screens require.
2. Keep reusable primitives in `components/ui/`.
3. Replace default shadcn colors, radii, shadows, spacing, type, and animation
   with approved tokens.
4. Preserve Radix accessibility, keyboard navigation, focus management, and ARIA
   behavior while restyling.
5. Express Figma variants with typed props and `class-variance-authority`.
6. Implement every approved size and state in the shared primitive before using
   it in a feature.
7. Feature-specific composition belongs in
   `features/<feature>/components/`; it must not fork a shared primitive.
8. If Figma conflicts with an accessibility requirement, preserve accessibility
   and request a design resolution rather than silently removing behavior.

## Component contract

For every reusable Figma component, the code implementation must document and
match:

| Area | Required match |
|---|---|
| Anatomy | Child elements, slots, leading/trailing content, labels, helper text |
| Variants | Visual intent and structural variants |
| Sizes | Height, padding, typography, icon size, gap, radius |
| States | Default, hover, active, focus-visible, selected, disabled, loading, error |
| Content | Truncation, wrapping, empty content, long content, localization |
| Behavior | Click, keyboard, open/close, selection, validation, drag/drop |
| Responsive | Reflow, hiding, stacking, drawer/dialog conversion |
| Accessibility | Accessible name, description, roles, focus order, contrast |

Do not encode visual variants with scattered boolean props when Figma defines a
single variant axis. Keep the code variant model aligned with the Figma component
property model.

## Feature-based UI ownership

The feature boundaries in `architecture.md` apply to design implementation:

- `components/ui/` owns domain-neutral primitives corresponding to shared Figma
  components.
- `features/<feature>/components/` owns domain composition for that feature.
- `app/` route files arrange page-level feature exports and contain no duplicated
  component implementation.
- A page-specific composition may remain inside its feature; a visually reusable
  primitive moves to `components/ui/` only after its API is domain-neutral.
- Tokens never live inside a feature folder.
- Feature components may choose semantic variants; they may not introduce raw
  color, spacing, radius, or shadow values.

## Icons, illustrations, and media

- Use the icon source declared in `stack.md`; do not mix unrelated icon families.
- Match the exact Figma icon name, style, weight, size, optical alignment, and
  state color.
- Do not substitute a “similar” icon without approval.
- Preserve the icon's vector viewBox and use the shared icon-size tokens.
- Export custom vectors from the approved Figma node as SVG when no declared
  library icon matches.
- Store static assets under `public/` with stable, descriptive English file names.
- Preserve crop, focal point, aspect ratio, corner radius, overlay, and object-fit
  behavior from Figma.
- Optimize assets without changing their visible appearance.

## Motion and interaction

Every animation must correspond to an approved Figma prototype, component state,
or shared motion token. Tailwind transitions/keyframes and `tw-animate-css` are
the default implementation tools.

Capture:

- property being animated;
- start and end values;
- duration and delay;
- easing curve;
- movement distance or scale;
- enter and exit behavior;
- interruption and rapid-repeat behavior;
- reduced-motion fallback.

Motion must communicate state or hierarchy, not decorate arbitrarily. Never
animate layout in a way that blocks input, causes content jumps, or ignores
`prefers-reduced-motion`.

## Forms and validation states

Figma form controls must be implemented through the shared shadcn primitives,
React Hook Form, and Zod defined in `stack.md`.

- Match default, hover, focus-visible, filled, disabled, read-only, loading,
  success, and error states where designed.
- Preserve label position, required marker, placeholder, helper text, character
  count, error message, and icon placement.
- Validation text comes from product rules; its layout and styling come from
  Figma.
- Reserve or intentionally animate message space exactly as designed to avoid
  unexpected layout shifts.
- Browser autofill, password managers, long values, and multiline errors must
  not break the design.

## Loading, empty, error, and destructive states

Every data-driven surface must account for its complete state model:

- initial loading;
- background refreshing;
- empty collection;
- no search results;
- partial data;
- recoverable error;
- permission denied;
- offline/reconnecting where realtime is used;
- destructive confirmation;
- success feedback.

Use the exact approved component/frame for each state. If Figma omits a state
required by the feature contract, do not improvise a polished final design;
record the missing state and obtain approval.

## Figma-to-code workflow

For each screen or component:

1. Resolve the exact approved Figma frame/node and viewport.
2. Inspect its Variables, styles, component properties, Auto Layout, constraints,
   prototype interactions, assets, and nested instances.
3. Create or update the token audit before component code.
4. Map every repeated visual value to the canonical token layer.
5. Identify existing shared components and extend approved variants rather than
   duplicating them.
6. Implement shared primitives first, then feature composition, then the route.
7. Use realistic application data, Persian content, long values, and empty values
   during implementation.
8. Render at the exact Figma viewport and compare geometry, color, typography,
   shadows, borders, and assets.
9. Verify interaction states, keyboard behavior, dark/light themes if provided,
   RTL, responsive frames, and reduced motion.
10. Record and resolve every deviation before marking the work complete.

## Token audit

### Comparison with the current implementation

The canonical token definitions live in `app/globals.css`. The current theme
already matches the audited foundation colors, status pairs, Inter typography
scale, radii, card shadow, and dark table-header surface. Two mismatches found
during this audit have been aligned: the dialog shadow now uses the audited
48px blur, and the light table header now uses the audited muted surface
(`--muted`, exposed as `bg-muted`, `#F0F1F5`). Keep these values synchronized with the
baseline above when the Figma source changes.

Before implementing the first screen—and whenever Figma source layers or future
Variables change—keep a token audit using this format:

| Figma variable/style/layer | Figma mode | Exact value | Code token | Used by | Status |
|---|---|---|---|---|---|
| Approved Figma name | Light/Dark/etc. | Inspected value | CSS variable | Components/screens | Mapped/Missing/Conflict |

Rules:

- `Missing` blocks exact implementation of affected UI.
- `Conflict` records two approved sources that disagree; it requires a user or
  designer decision.
- Renaming a code token updates all consumers in the same change.
- Deleted Figma variables are not silently retained as undocumented legacy
  tokens.

## Visual verification and acceptance

A screen is complete only when all applicable checks pass:

- The implementation is compared at every approved Figma viewport.
- Major geometry, component dimensions, spacing, alignment, typography metrics,
  colors, radii, borders, shadows, and asset crops match the approved frame.
- Differences caused only by browser font rasterization or platform rendering
  are distinguished from actual token/layout mismatches.
- Light and dark modes match their corresponding Figma modes when both exist.
- Hover, active, focus-visible, selected, disabled, loading, error, and open
  states match approved variants.
- Responsive transitions preserve the supplied mobile/tablet/desktop designs.
- No unintended horizontal overflow exists.
- Keyboard navigation, focus order, accessible names, contrast, and reduced
  motion work without visual regressions.
- RTL and mixed Persian/Latin content are visually correct.
- Browser zoom at 200% remains usable.
- No reusable visual value is hardcoded in feature code.
- No console error, hydration warning, missing asset, or font fallback remains.

Use screenshot comparison or overlay inspection at exact viewport dimensions.
Do not approve a screen based only on subjective side-by-side viewing at a
different size.

## Deviation log

Any intentional difference from Figma must be recorded before delivery:

| Frame/node | Difference | Reason | Approved by | Follow-up |
|---|---|---|---|---|
| Exact Figma ID | What differs | Accessibility, technical constraint, or explicit request | User/designer | None or tracked task |

Unrecorded deviations are defects. Technical convenience is not sufficient
reason for a visual deviation.

## Change management

- A Figma token change updates `app/globals.css`, Tailwind mappings, affected
  shared components, visual tests, and this document's token audit in the same
  change.
- A Figma component change updates the shared primitive before feature usages.
- A new component variant must exist in approved Figma or receive explicit user
  approval before code implementation.
- Do not edit old screens one by one to imitate a new token; update the token so
  all consumers change consistently.
- Do not detach a Figma instance merely to make handoff easier. Resolve whether
  the difference is a legitimate variant or a design inconsistency.
- Pin implementation to the approved Figma revision for the active task. New
  design changes are separate work unless the user explicitly includes them.

## Decision log

| Decision | Why | Trade-off accepted |
|---|---|---|
| Figma is the visual source of truth | The user requires exact reproduction | Implementation pauses when the approved design is ambiguous or incomplete |
| CSS variables in `globals.css` own tokens | One runtime source prevents drift across features | Token changes affect the whole application and require coordinated verification |
| Semantic tokens are the component API | Themes can change values without rewriting features | Initial mapping requires a deliberate token audit |
| shadcn behavior, Figma appearance | Keeps accessible interaction while matching the custom design | Default shadcn styling must be fully reconciled |
| No raw reusable values in features | Colors, spacing, radii, and shadows remain consistent | One-off exceptions require explanation |
| Exact node and viewport references | Makes visual verification reproducible | Every implementation task needs Figma handoff metadata |
| Missing states are surfaced, not invented | Prevents design drift | Some feature work may wait for a design decision |
| RTL is verified as part of fidelity | Direction affects layout, icons, text, and interaction | Every component needs bidi testing |
| Node `2:37735` bootstraps Orbit tokens | The file has no formal Variables or local styles | Source-layer changes require a fresh audit |
| Desktop is the only exact responsive target | All supplied implementation frames are `1440px` wide | Smaller layouts remain provisional until designed |
| Persian/RTL is an explicit localization adaptation | Architecture requires Persian while Orbit is English/LTR | Localized screens need review and cannot yet claim exact Figma equivalence |

Any change to the approved design source, token architecture, component variant
model, responsive contract, theme behavior, or visual acceptance process updates
this file in the same change as the implementation.
