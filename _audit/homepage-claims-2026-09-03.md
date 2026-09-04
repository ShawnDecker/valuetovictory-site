# valuetovictory.com homepage — claim-by-claim audit (2026-09-03)
Live build: dpl_GNmCDg4 / commit eaa5ce7. Verdicts from Shawn, line by line.

## CONFIRMED TRUE — no change (Shawn, 9/03)
1. Hero "24+ Years Valuing" — TRUE
2. Hero "$4.2B+ Homes Valued" — TRUE
3. Hero "12K+ Homes Appraised" — TRUE
4. Hero byline "Shawn Decker, Author & Appraiser" — TRUE
5. Story "24 years... nearly 12,000 of them, more than $4.2 billion in property" — TRUE
6. Story "leaving a six-figure appraisal career to teach it full-time" — TRUE
7. Pull quote attributed to Shawn re: The Lost Art of Value — TRUE (his words)

## RESOLVED WITH CORRECTION
8. Impact counter "12,000+ Clients" — Shawn: clients INCLUDE appraisal clients, so the
   count is accurate. Caveat carried to #11: the heading above it frames the number as
   coaching transformations. Number stays; the framing must change.
   NEW CREDENTIAL from Shawn: has spoken on TV in front of 92 million viewers.
   PENDING: which appearance (show / network / date) so the line is worded to survive scrutiny.

## RESOLVED (Shawn, 9/03 cont.)
9. "100+ / Hundreds Helped" — TRUE, likely low. Revisit with statistics later.
10. "100% Designed To Bring Value to You" — KEEP as-is.
11. Impact heading "Real results from real people..." — TRUE, stands. Testimonials
    (Sandi / Cameron / L.B.) will sit under it.
12. Services — SIX are listed, only THREE are offered. PENDING: which three.
    The other three must come off the page or be marked as not-yet-available.
13. Mental Health card — KEEP, but must be clarified:
    - state plainly that this is coaching, NOT therapy/clinical treatment
    - carry a suicide disclaimer
    - Shawn discloses he has personally struggled with it (his explicit instruction)
    - direct people to counseling / professional help for this specifically
    - ACTION: include 988 Suicide & Crisis Lifeline; run final wording past
      vtv-yale-lawyer before it ships. Shawn approves exact wording first.

## RESOLVED (Shawn, 9/03 cont. 2)
14. "Book a Free Consultation" — Shawn: Calendly, free = 15 min.
    calendly.com/valuetovictory/15min is LIVE (200). /30min live. /60min now 404 (memory stale).
    FOUND: the button currently links to NOTHING. Dead CTA. Must be wired to the 15min link.
15. "Members download the whole library" — Shawn: "fix all of them and make sure they work."
    DONE (copy side, shipped 9/03 ~7pm): the five unwritten products now read "In development.
    Included free with membership when it ships." and format reads "In development" instead of
    naming video courses / private community / weekly Q&A that were never made.
    STILL TO DO: author the 5 (Time, People, Numbers, Knowledge courses + 30-Day Challenge),
    and wire the 3 finished workbooks behind member auth (api/entitlements.js exists).

## CORRECTION TO AN EARLIER CLAIM I MADE
I told Shawn the "bestseller: true" flag and the "bankruptcy-to-success story" line were LIVE.
They were NOT. Both lived only in app/public/products.json, which is ORPHANED - the live product
list is baked into main-D-tsLGmi.js and nothing fetches products.json. The shipped bundle already
read "Author's success story" with no bestseller flag. Cleaning products.json was hygiene, not a
live-claim fix. Same is true of subscriptions.json (stale $29/$79/$199 vs the real $29/$47/$497).

## OPEN — awaiting verdict
14. "Book a Free Consultation" — real, with a booking destination?
15. "Every product below is included with your $29/mo membership. Members download the whole library"
    (downloads library NOT deployed — promises what a paying member cannot get today)
16. Bundle "$497 from $1297, Save $800" — was $1,297 ever real? (FTC: fake strikethrough)
17. Eight product "value" tags: $197 / $297 / $397 / $247 / $147 / $97 / $177 / $39.99
18. Do all eight products exist and ship today?
19. VictoryPath $29/mo, $290/yr
20. Value Builder positioning "for couples, two seats"
21. Victory VIP "$4,970 billed annually"
22. 10% / 15% / 20% member discount on coaching
23. "Direct line to the team" — is there a team?
24. "Premium 1-on-1 access"
25. Footer "expert coaching across six life dimensions"
26. Footer links: About Us, Our Story, Careers, Press, FAQ, Help Center (expected dead)
27. Footer contact: Roanoke Valley VA / 540-632-6503 / valuetovictory@gmail.com
28. Testimonials — Sandi, Cameron, L.B. confirmed REAL by Shawn. Need exact approved wording,
    display names, and confirmation they agreed to appear publicly. None render on the site today.

## SEPARATE DEFECTS (no verdict needed)
- Impact counters read "0+ Clients / 0+ / 0%" until the IntersectionObserver fires. Anyone
  deep-linking or on a browser that doesn't fire it sees a section advertising zeros.
- app/public/subscriptions.json is STALE and contradicts the page: Value Seeker $29,
  Value Builder $79, Value Master $199. Page shows VictoryPath/Value Builder/Victory VIP
  at $29/$47/$497. Dead data; delete or correct.
- Five files under app/public/shawnedecker/ named .png/.jpg are 4.5KB saved HTML error pages.

## FOUNDING OFFER + TIER GATING (Shawn, 9/03 evening)

Offer as Shawn designed it: first 100 pay $29 and are upgraded to the $47 Value Builder
tier free for the life of their account. Next 250, then 500 = rungs 2 and 3, benefits TBD.
Count: 2 purchasers + 4 helpers/integrators = 94 left by his count. RECOMMENDED: comp the
4 helpers via lib/comp-access.js COMP_EMAILS instead, keeping them off the founder cap (98 left).

Tier vocabulary (written only by the Stripe webhook, never the client):
  free | individual ($29 VictoryPath) | couple ($47 Value Builder) | premium ($497 Victory VIP)

CONFIRMED BUG — the two relationship gates disagree:
  api/relationships.js  allowedTiers = ['couple','premium']        <- correct
  api/dating.js         tier !== 'free'  (lines 321, 382, 519)     <- LEAK
So an 'individual' $29 member gets the full dating / Faith Match product, which Shawn says
is supposed to be $47-and-up only. That guts the reason to buy the couple tier.
Shawn's economics: two singles at $29 = $58/mo vs one couple tier at $47 = $11/mo saving.

FIX: dating.js three checks -> ['couple','premium'].includes(tier).
BLAST RADIUS TO VERIFY FIRST (binding: verify_before_destructive_remedy): are either of the
2 existing purchasers on 'individual' and using dating? If so they lose access on deploy.
DEPLOY CAUTION: vtv-assessment is the repo where git HEAD != prod. Diff via `vercel ls` + mtimes.

RECOMMENDED IMPLEMENTATION of the founding upgrade: put founders on the $47 Stripe price with
a forever $18-off coupon. They pay $29, Stripe reports Value Builder, the webhook sets tier
'couple' by itself, relationships + skill-packs unlock with no new code path, and "life of the
account" enforces itself because a Stripe coupon dies with the subscription.

## WORK ORDER PUBLISHED 2026-09-03
https://claude.ai/code/artifact/ed382c9f-65bd-4440-a83d-4ba302fc2f47
Local copy: valuetovictory-site/_audit/work-order-2026-09-03.html
11-item build queue in dependency order; 4 answers from Shawn unblock 9 of them.

Later decisions from Shawn (9/03 evening):
- Dating long-term MAY connect a user to a potential match, optional not required.
- Two individuals who pair up can MERGE to one couple account: separate logins,
  shared dashboard, one subscription. Faith Match becomes the feeder for the couple tier.
  UNDECIDED: whose card continues + proration; what happens to two founding locks when
  one is needed (and whether the freed seat returns to the 100); how a SEPARATION unwinds
  (must be first-class: dashboard dissolves, each keeps only own data, billing splits).
- Founding rungs 2 and 3 DEFERRED on purpose - do not publish terms for seats 101-850.
- Future individual price is $79/mo (corroborated by the stale subscriptions.json).
  A founding couple then holds two seats for $47 against $158.

## CORRECTION 2 (9/03 late) — THE DATING "LEAK" WAS NOT A LEAK
Shawn: "if they are on the $29 tier, they get dating, the member stuff, if they go to $47
two people and use one if a couple." So the intended model is:
  $29 individual = assessment + member content + dating/Faith Match
  $47 couple     = TWO people on ONE account + the couple modules
The existing gates already enforce exactly that. api/dating.js `tier !== 'free'` is CORRECT.
api/relationships.js ['couple','premium'] is CORRECT. NO CHANGE NEEDED. I had misread his
earlier "relationship stuff is for the higher tier" as covering dating. Removed from queue.

## SHIPPED SINCE (all verified live on production)
- Consultation CTA: was href="#cta" (scrolled, booked nobody) -> calendly.com/valuetovictory/15min,
  new tab, relabelled "Book a Free 15-Minute Call". NOTE my earlier "links to nothing" was
  imprecise; it linked to an on-page anchor.
- Tier wording -> "spouse or partner" (3 strings: seat name, tier description, feature line).

## 92 MILLION VIEWERS — VERIFIED, AND THE NUMBER DOES NOT HOLD
Show = God Made Millionaire TV, host TC Bradley, GEB Network / DIRECTV ch 363 (their
materials also cite the WORD Network). The millions are NETWORK CARRIAGE (65M homes GEB,
93M homes WORD), NOT viewers of Shawn's segment. No per-segment count exists.
The show also charges guests travel + a share of production costs => booked appearance,
not earned media. RECOMMENDED LINE: "Featured on God Made Millionaire TV, nationally
syndicated on the GEB Network." No number. Let a clip carry it.
PENDING: Shawn said "plus news, etc" — need outlets + rough dates to verify separately.

## STILL OWED BY SHAWN
- Approve the services rewrite (six programs -> one coaching relationship, six areas)
- Disclaimer: first person under his name, or unattributed notice
- News outlets + dates
- Testimonials: approved wording, display names, permission (Sandi, Cameron, L.B.)
