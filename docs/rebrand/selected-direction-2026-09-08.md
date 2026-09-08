# Selected direction: In relation

The user selected the existing brown/beige In relation homepage and explicitly discarded the Frame to frame alternative on 8 September 2026.

The supplied `35mmsvg.svg` is copied unchanged to `public/brand/35mm.svg` (SHA-256 `008796b6804702d18075d04669f8c15b4995386a07c870a0813234b6c541707a`). Its white textured lettering is displayed on a brown background in the 35mm practice detail, including mobile. Ordinary navigation and prose continue to use the practice name as text.

The rejected route, motion components, dedicated styles, verifier, review artifacts and active preview links are removed. Earlier dated strategy/audit documents remain historical records. The selected homepage and its existing interaction remain.

Verification: production build with lint and TypeScript passes; 587 HTTP checks pass; the removed English route returns 404; the selected homepage returns 200 and references the new logo. In-app browser review confirms the complete logo on desktop and at a 390px mobile viewport. No contact forms were submitted.

Changes are published only to `codex/in-relation-preview`. Production remains on `main`.
