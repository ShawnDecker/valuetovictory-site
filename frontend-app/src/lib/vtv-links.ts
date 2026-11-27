// Real, verified destinations for valuetovictory.com CTAs.
// The live commerce funnel (Stripe-wired) is the assessment app subdomain.
// Verified live 2026-06-09. Pricing canon: VictoryPath $29 / Value Builder $47 / Victory VIP $497.

const FUNNEL = 'https://assessment.valuetovictory.com';

export const VTV = {
  // commerce funnel (real checkouts)
  assessment: FUNNEL,                       // free P.I.N.K. assessment ("The Value Engine")
  join: `${FUNNEL}/join`,                   // free assessment + $29/mo membership conversion page
  // Per-tier membership checkout — the proven /api/checkout?tier=X flow the live $29 member used.
  // Tier prices verified live in Stripe 2026-07-10 (cs_live sessions returned for all three).
  joinIndividual: `${FUNNEL}/api/checkout?tier=victorypath`, // $29/mo VictoryPath
  joinBuilder:    `${FUNNEL}/api/checkout?tier=builder`,     // $47/mo Value Builder
  joinVip:        `${FUNNEL}/api/checkout?tier=vip`,         // $497/mo Victory VIP
  // Annual plans (Shawn 2026-09-14; checkout lands with vtv-assessment PR #56). Book included, early access Nov 1.
  joinIndividualAnnual: `${FUNNEL}/api/checkout?tier=victorypath-annual`, // $290/yr VictoryPath
  joinBuilderAnnual:    `${FUNNEL}/api/checkout?tier=builder-annual`,     // $470/yr Value Builder
  freeBook: `${FUNNEL}/free-book.html`,     // free Running From Miracles e-book signup
  audiobook: `${FUNNEL}/audiobook.html`,    // Running From Miracles audiobook ($9.97)
  pricing: `${FUNNEL}/pricing.html`,        // full pricing
  member: `${FUNNEL}/member.html`,          // member portal / login
  skillPack: `${FUNNEL}/professionals.html`,// VTV Top-10 Pro Skill Pack ($197)
  challenge: `${FUNNEL}/challenge.html`,     // 30-Day Value Challenge

  // contact (real)
  email: 'valuetovictory@gmail.com',
  phoneDisplay: '540-632-6503',
  phoneHref: 'tel:+15406326503',

  // socials (real)
  facebook: 'https://www.facebook.com/valuetovictory',
  instagram: 'https://www.instagram.com/valuetovictory',
  twitter: 'https://x.com/valuetovictory',
  youtube: 'https://www.youtube.com/@valuetovictory2791',
  linkedin: 'https://www.linkedin.com/in/shawnedecker',
} as const;

// Ad tags a visitor arrived with (saved by /js/vtv-tracking.js). localStorage isn't shared with
// the assessment subdomain, so carry them across on the URL or the lead loses its ad source.
const AD_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
const withAdTags = (url: string): string => {
  try {
    const u = new URL(url, window.location.href);
    if (u.host !== new URL(FUNNEL).host) return url;
    const a = JSON.parse(localStorage.getItem('vtv_attribution') || '{}') || {};
    AD_KEYS.forEach((k) => { if (a[k] && !u.searchParams.has(k)) u.searchParams.set(k, String(a[k])); });
    return u.toString();
  } catch {
    return url;
  }
};

// Send the visitor to a real funnel page (same tab keeps the conversion flow).
export const go = (url: string) => { window.location.href = withAdTags(url); };
