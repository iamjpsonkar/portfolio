# Portfolio audit — confirmation-dependent work

This checklist records audit findings that should not be changed by inference. The implementation branch fixes only issues that can be verified from repository content without inventing personal facts or changing account privacy.

## Career facts and metrics

- [ ] Confirm the exact date of promotion from Software Development Engineer to Software Development Engineer II at Fynd. The homepage currently places the SDE II role from 2025, while the résumé presents SDE II as the current role without a separate promotion date.
- [ ] Confirm the source and definition for 499 tracked tasks and 97.8% completion (period, Jira/project scope, and whether reopened/cancelled tasks are excluded).
- [ ] Confirm whether 7,400+ commits across 19 repositories is still current and whether the count includes work and personal repositories.
- [ ] Confirm whether “15+ payment aggregators” and “15+ payment integrations” mean the same thing; use one precise definition consistently.
- [ ] Confirm whether DSA count should be 600+, 700+, or another current figure. An older public résumé contains 600+.
- [ ] Confirm the award count and exact names: six quarterly Fynd Star awards plus the annual “One Man Army” award, versus the homepage's 7× company recognition.
- [ ] Validate the “25+ version releases” and “30,000+ LOC” claims and describe how each was counted.

## Project repository links

These repository URLs were inaccessible during the audit and must not be replaced with guessed repository names:

- [ ] PRView — https://github.com/iamjpsonkar/PRView-by-JaySoft
- [ ] PED Tools — https://github.com/iamjpsonkar/JaySoft-PEDtool
- [ ] DBMocker — https://github.com/iamjpsonkar/JaySoft-DBMocker

Confirm whether each project is private, renamed, archived, or intentionally unpublished. If renamed, provide its canonical URL. Do not make private repositories public without an explicit decision.

## Résumé and personal information

- [ ] Confirm whether the phone number displayed on the public résumé should remain public.
- [ ] Provide an approved current résumé PDF/DOCX source before replacing the older files in `doc/`. Do not regenerate them from potentially stale legacy HTML.
- [ ] Confirm whether legacy résumé pages (`portfolio.html`, `doc/index.html`, `doc/home.html`, and `me/index.html`) should be retired, redirected, or retained as archival pages.

## External profiles

- [ ] Review LinkedIn headline, experience dates, skills, and Featured projects. This audit had no authenticated LinkedIn editing access; only public indexed content was available.
- [ ] Review GitHub profile README repository totals and pinned repositories. The profile README's 144-repository claim did not match the 70 public repository search results returned during the audit; these may count different scopes.

## Validation still requiring a browser or account access

- [ ] Run Lighthouse (mobile and desktop), axe/WCAG checks, keyboard-only navigation, and a real screen-reader pass.
- [ ] Verify print pagination and ATS parsing in current Chrome/Firefox.
- [ ] Run an authenticated external-link check for private or login-gated destinations.
- [ ] Review GitHub Pages deployment and custom-domain/indexing behavior after the branch is merged and deployed.
