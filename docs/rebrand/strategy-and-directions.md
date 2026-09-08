# Syntax: strategic and visual direction

## Strategic decision

Syntax is where separate specialist practices develop a shared creative idea. It earns its existence through the conversation between disciplines, rather than breadth of services. Public message: “Three specialists. One creative house.” Norwegian: “Tre spesialister. Ett kreativt hus.” Work should demonstrate image and film together; technology should be demonstrated by the website's behavior. Do not retroactively claim the new practices made older projects: practice filters describe discipline relevance, with original project credit retained as Syntax Studio.

Two entry paths: a practice-specific enquiry, and a project enquiry to Syntax. Both use the same concise contact route, carrying a selected practice. Practice URLs remain configurable and absent until verified. Specialist capabilities appear in short contextual lists, not separate service sales pages. Existing educational service URLs remain accessible for search continuity.

## Three territories explored before implementation

| System | Common Ground | The Edit | Open House |
|---|---|---|---|
| Central idea | Independent elements share a baseline, then rearrange into a new composition | The studio as an authored sequence, where a cut creates meaning | A studio visit: different practice spaces connected by one continuous passage |
| Why Syntax | The actual independent/collaborative business structure becomes spatial behavior | Image, film and technology are media with different relationships to time | A human house of three makers, without corporate hierarchy |
| Relationship to name | Meaning through arrangement; no code costume | Meaning through order and omission | Meaning through proximity and encounters |
| Typography | Archivo variable grotesk; broad, concise statements; normal sentence-case supporting copy; supplied practice lettering | Newsreader editorial serif and compact grotesk credits; large sentence fragments | Humanist sans, intimate text size, expressive vertical wayfinding |
| Grid and spacing | Three unequal media tracks, one common edge; four-column mobile grid; 8px rhythm | Alternating full-screen media and quiet margins; sparse frames; timing-led spacing | Continuous offset gallery bays; consistent walkable margins; human-scale text |
| Color | Cobalt as the shared connective surface; cool white paper and black screening rooms; work retains its colors | Silver, charcoal and changing film light; palette primarily set by projects | Deep timber brown, gallery white and cool blue daylight; practices occupy rooms |
| Image | Hard rectangular crops; stills form wide/portrait pairs; image always visible | Full-image editorial plates, with deliberate cuts between subjects | Object-like prints and contact sheets, with optional closer inspection |
| Film | Poster first; user-triggered playback in a frame that expands in the composition | A timeline as navigation; direct cuts, opt-in sound; posters on touch | Screening bay with native video controls; sound remains opt-in |
| Motion | 420ms seam shifts and crop changes; user initiates; crisp 180ms controls | Cuts and short dissolves, no entrance choreography | Spatial moves between bays; small distance/scale transitions |
| Signature interaction | Select a medium to change the proportions of the shared triptych; all information stays present | Scrub a published work sequence; still/film/interactive chapters alternate | Move through practice rooms with an always-visible floor-level navigation |
| Navigation | Work, Practices, Studio, Contact; familiar placement, expressive media below | Work and Studio plus a persistent contact action; project sequence index | Clear room names with a standard menu fallback |
| Work index | Variable two-column compositions with always-visible title and disciplines; filter by relevance | Chronological strip with large previews and chapter links | Gallery index grouped by practice, cross-linked collaborations |
| Case study | Flexible text, full media, portrait pair, credits and next work | Sequential story with chapter anchors and video breaks | Project exhibition with captions, process objects and people |
| Practice identity | Independent supplied marks in a common structural frame; visual behavior differs | Distinct editing pace for each practice | Different room composition and materials per practice |
| Mobile | Three visible compact frames, tap controls below; stacked editorial case media | Swipe optional, explicit buttons required; one chapter in view | Vertical room sequence; no mandatory 3D navigation |
| Desktop | Expanded active track; negative space keeps the opening readable | Wide-screen timeline and cinematic preview | Offset compositions in a larger gallery canvas |
| Technical | CSS grid and small client islands; no WebGL dependency; static SEO content | More media orchestration, timeline state and preload discipline | Spatial routing adds state, focus and loading complexity |
| Accessibility | Buttons with pressed state, visible focus, fixed DOM order, reduced-motion instant changes | Scrubber must have discrete links and keyboard equivalents | Requires explicit navigation and focus restoration; spatial cues cannot carry meaning alone |
| Performance | Lowest media/JS risk; responsive stills and deliberate video loading | Highest video bandwidth risk, especially with missing portfolio media | Moderate complexity; easy to overbuild empty spaces |
| Homepage concept | Cobalt identity, three media windows, immediate campaign proof, practice composition, founders, direct contact | A short statement opens into an immersive edit of selected work | A visitor arrives inside a digitally interpreted creative studio |

## Selection

Common Ground has the strongest combination of distinctiveness, commercial clarity, mobile potential, engineering feasibility and longevity. It makes the name and the structure tangible. The Edit depends on a broader film library than exists. Open House risks turning the business into a navigation metaphor. Their useful discipline is retained as principles: edit ruthlessly; show the actual people.

Seven grounded systems considered: a collaborative editing table; a film sequence; a studio visit; a photographic contact sheet; variable-width publishing columns; a musical ensemble score; a shared typographic specimen. The category ruts are an enormous headline over autoplay film and its opposite, a severe text-only portfolio. Common Ground must avoid both by putting working media beside identity in the first viewport.

The Impeccable context and concept-seed launchers were attempted and both returned “The system cannot execute the specified program.” No automatic direction assignment was available. The user explicitly delegates selecting and developing the strongest territory in Phase 4; that instruction governs selection and avoids an unnecessary approval gate. Existing real media and code-native geometry are the design material, not generated portfolio imagery.

## Information architecture

- `/` and `/en`: identity + visible media; selected campaign; shared practice composition; founders; contact.
- `/work`: filtered published work. Burger campaign and a restrained factual Snatched case; Tokyo excluded until media is ready.
- `/work/burger`: image/film campaign, actual footage, portrait artwork, credits.
- `/work/snatched`: project narrative using the real logo; film not represented by fake media.
- `/studio`: studio idea, three founders, practice model, contact.
- `/contact`: direct email, phone, concise functioning form and selected practice.
- `/about-us` redirects to `/studio`; `/book` redirects to `/contact` with a booking link retained there. Existing case aliases remain.
- `/services` redirects to `/work`, `/pricing` redirects to `/contact`, and `/en/blog` redirects to the Norwegian archive; specialist service detail pages, blog and guides remain secondary editorial archives with the new shared navigation. No invented redirect-equity guarantees: rankings/backlinks/Search Console are unavailable.

## Page compositions before build

Home: quiet navigation on cobalt → short left statement, right location/contact → three differently proportioned media windows → campaign image pair on cool white → cobalt practice selector with one shared changing visual → three portrait columns → expansive contact close.

Work: compact cobalt title → sentence-case practice filters → image-led large campaign + smaller typographic Snatched project → clear contact. Empty filters explain that selected work is being prepared and link to the relevant practice enquiry.

Case: compact title and factual discipline credits → poster-first full-width visual → short contextual statement → full image/film and portrait pair → original studio credit → next case.

Studio: large plain statement with concise reason for the house → three real portraits with names → distinct practice names and roles → contact.

Contact: large invitation → visible email/phone beside a compact three-field form; practice selector adds intent without making selection mandatory. Server errors remain near the form with a direct email fallback.

Mobile: header exposes contact and menu, all navigation remains keyboard reachable; opening media stays a three-part composition with touch controls; project pairs stack when necessary; contact has one reading column.
