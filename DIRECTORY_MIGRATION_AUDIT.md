# Directory migration audit

Audit completed July 22, 2026.

## Sources checked

- Legacy Crystal River directory: https://diamondsuitescrystalriver.com/directory/
- Existing approved portraits in `client/public/images/`, previously sourced from the legacy WordPress uploads
- Glow and Grace Crystal River website: https://www.glowandgraceaesthetics.com/crystal-river/home
- Glow and Grace Crystal River booking page: https://www.vagaro.com/glowandgraceaesthetics2

## Suite-by-suite verification

| Suite | Legacy listing | Migrated result | Contact and booking verification |
| --- | --- | --- | --- |
| 1 | Cindy Vanlue, Massage Therapist | Complete five-paragraph biography, Knots Kneaded Massage LLC name, portrait, and listed specialties migrated | The legacy profile displays “Book Now” as a heading but provides no phone number, email address, or actionable booking URL. No link was invented. |
| 2 | Suite number only | Retained as an unlisted directory suite with a neutral notice | The legacy directory does not name a professional or provide profile details. |
| 3 | Jenelle/Jenell Suleyman, Cornerstone Wellness Center, LLC | Complete eight-paragraph biography, portrait, credentials, and specialties migrated | The legacy profile displays “Book Now” as a heading but provides no actionable booking URL or contact field. No link was invented. |
| 4 | Malina Glaum, Lash and Brow Specialist | Complete biography, portrait, credentials, and specialties migrated | No business name, phone number, email address, or actionable booking URL is present in the legacy profile. |
| 5 | Samantha Jacks, Hair Stylist | Complete biography, portrait, and blonding, extensions, and color specialties migrated | No business name, phone number, email address, or actionable booking URL is present in the legacy profile. |
| 6 | Daniela Riley, Nail Technician | Complete biography, portrait, and nail specialties migrated | No business name, phone number, email address, or actionable booking URL is present in the legacy profile. |
| 7 | Aubrey Novy, Glow and Grace Aesthetic, LLC, Esthetician | Complete four-paragraph biography, portrait, phone number, services, certifications, and verified contact channels migrated | The phone number matches the legacy profile. The website, email, social links, and Crystal River Vagaro booking page were verified from the official Glow and Grace site before inclusion. |

## Documented source conflicts and formatting corrections

- Suite 3 uses three spellings on the same live legacy page: the directory card says “Jenelle Suleyman,” the profile heading says “Jenell Suleyman,” and the biography begins “Meet Jenelle, APRN.” The redesigned profile uses **Jenell Suleyman** to match the supplied migration brief while preserving “Jenelle” inside the biography verbatim.
- Cindy Vanlue’s biography contained the obvious typo “Cirus County.” It was corrected to “Citrus County.” Minor dash spacing was normalized without rewriting the biography.
- Aubrey Novy’s attributed statement had a closing quotation mark but no opening quotation mark. The missing opening mark was restored without changing the wording.
- The legacy “Book Now” headings for Suites 1 and 3–6 are not links in the rendered page or underlying page markup. Only Aubrey Novy receives a Book Now link because hers could be verified independently from the official business website.
