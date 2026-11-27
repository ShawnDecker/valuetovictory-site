import { useEffect, useRef, useState } from 'react';
import { Check, X, Sparkles, Crown, Star, ArrowRight, Zap } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

interface Subscription {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyDiscount: string;
  features: string[];
  notIncluded: string[];
  ai: { level: string; detail: string };
  cta: string;
  popular: boolean;
  icon: React.ReactNode;
  crest: 'bronze' | 'silver' | 'gold';
}

const Subscriptions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const subscriptions: Subscription[] = [
    {
      id: 'starter',
      name: 'VictoryPath',
      description: 'Begin your journey to understanding value',
      monthlyPrice: 29,
      yearlyPrice: 290,
      yearlyDiscount: '17%',
      features: [
        'The free P.I.N.K. Value Assessment',
        'Daily coaching sequence',
        'Running From Miracles devotional',
        'Community access',
        '10% member discount on coaching'
      ],
      notIncluded: [
        'Spouse or partner seat',
        'Priority coaching'
      ],
      ai: { level: 'AI Skills · Level 1', detail: '100 ready-to-use prompts, 12 simple workflows, which AI to use for what, and the safety basics' },
      cta: 'Become a Member',
      popular: true,
      icon: <Star className="w-6 h-6" />,
      crest: 'bronze'
    },
    {
      id: 'growth',
      name: 'Value Builder',
      description: 'For a spouse or partner, building value together',
      monthlyPrice: 47,
      yearlyPrice: 470,
      yearlyDiscount: '17%',
      features: [
        'Everything in VictoryPath',
        'Two seats (you + your spouse or partner)',
        'Shared progress + reports',
        'Priority community support',
        '15% member discount on coaching'
      ],
      notIncluded: [
        'Premium 1-on-1 access'
      ],
      ai: { level: 'AI Skills · Level 2', detail: 'Everything in Level 1, plus all 10 Top-10 AI Skill Packs and playbooks for 10 professions' },
      cta: 'Build Your Value',
      popular: false,
      icon: <Zap className="w-6 h-6" />,
      crest: 'silver'
    },
    {
      id: 'elite',
      name: 'Victory VIP',
      description: 'The complete transformation experience',
      monthlyPrice: 497,
      yearlyPrice: 0, // Victory VIP is monthly only (Shawn, 2026-09-14)
      yearlyDiscount: '17%',
      features: [
        'Everything in Value Builder',
        'Premium coaching access',
        'Custom value strategy',
        'Direct line to the team',
        '20% member discount on coaching'
      ],
      notIncluded: [],
      ai: { level: 'AI Skills · Level 3', detail: 'Everything in Level 2, plus your own AI assistants, multi-step automations, and agents with a human trust check' },
      cta: 'Go VIP',
      popular: false,
      icon: <Crown className="w-6 h-6" />,
      crest: 'gold'
    }
  ];

  return (
    <section ref={sectionRef} id="subscriptions" className="relative w-full py-20 lg:py-32 bg-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 w-[800px] h-[800px] bg-[var(--gold)] rounded-full opacity-5 blur-3xl -translate-x-1/2" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Membership</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            Join the <span className="text-gradient">Value Revolution</span>
          </h2>

          <p className={`text-lg text-[var(--text-body)] mb-8 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            Start free with your value assessment, then keep growing every month
          </p>

          {/* Billing Toggle */}
          <div className={`inline-flex items-center gap-4 p-2 bg-[var(--bg-light)] rounded-full transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-sm font-semibold transition-all duration-300 ${!isYearly ? 'bg-[var(--burgundy)] text-white' : 'text-[var(--text-body)]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isYearly ? 'bg-[var(--burgundy)] text-white' : 'text-[var(--text-body)]'}`}
            >
              Yearly
              <span className="border border-[var(--gold)] text-[#8a6d35] text-xs px-2 py-0.5 rounded-sm bg-white">Save 17%</span>
            </button>
          </div>

          <p className={`mt-6 text-sm text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '350ms' }}>
            Already a member?{' '}
            <button
              onClick={() => go(VTV.member)}
              className="font-semibold text-black underline underline-offset-4 hover:text-[var(--gold)] transition-colors"
            >
              Log in
            </button>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {subscriptions.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative flex flex-col h-full bg-white border border-[var(--border-light)] border-t-[3px] ${plan.popular ? 'border-t-[var(--burgundy)] shadow-xl z-10' : plan.id === 'elite' ? 'border-t-[var(--gold)] shadow-lg hover:shadow-xl' : 'border-t-[var(--text-body)] shadow-lg hover:shadow-xl'} transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--burgundy)] text-white px-4 py-1 rounded-sm text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
              )}

              <div className="p-8 pt-10 flex flex-col flex-1">
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={`/brand/vtv-crest-${plan.crest}.png`}
                    alt={`${plan.crest[0].toUpperCase() + plan.crest.slice(1)} crest`}
                    className="h-14 w-auto flex-shrink-0 drop-shadow-sm"
                    loading="lazy"
                  />
                  <h3 className="text-2xl text-black">{plan.name}</h3>
                </div>

                <p className="text-[var(--text-body)] text-sm mb-5 md:min-h-[2.5rem]">{plan.description}</p>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-light ${plan.popular ? 'text-[var(--burgundy)]' : 'text-black'}`} style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                      ${isYearly && plan.yearlyPrice > 0 ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-[var(--text-body)]">{isYearly && plan.yearlyPrice > 0 ? '/year' : '/month'}</span>
                  </div>
                  {isYearly && plan.yearlyPrice > 0 && (
                    <p className="text-sm text-[var(--text-body)] mt-1">
                      Billed once a year, 2 months free. Includes <em>The Lost Art of Value</em>.
                    </p>
                  )}
                  {isYearly && plan.yearlyPrice === 0 && (
                    <p className="text-sm text-[var(--text-body)] mt-1">
                      Monthly plan only. Includes <em>The Lost Art of Value</em>.
                    </p>
                  )}
                </div>

                {/* AI Skills level for this plan (condensed from the AI Skills section) */}
                <div className="mb-5 border-l-[3px] border-[var(--gold)] bg-[var(--bg-light)] px-4 py-3 md:min-h-[7.5rem]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--burgundy)] mb-1">{plan.ai.level}</p>
                  <p className="text-sm text-[var(--text-body)] leading-snug">{plan.ai.detail}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 border-[1.5px] border-[var(--gold)] rotate-45 flex-shrink-0 mt-[7px]" />
                      <span className="text-sm text-[var(--text-body)]">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 opacity-50">
                      <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--text-body)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => go(plan.id === 'elite' ? VTV.joinVip : isYearly ? (plan.id === 'growth' ? VTV.joinBuilderAnnual : VTV.joinIndividualAnnual) : (plan.id === 'growth' ? VTV.joinBuilder : VTV.joinIndividual))}
                  className={`w-full py-4 rounded-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${plan.popular ? 'bg-[var(--burgundy)] text-white hover:bg-[var(--burgundy-dark)]' : 'bg-[#14161a] text-white hover:bg-[#2a2e36]'}`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className={`flex flex-wrap justify-center gap-8 mt-12 text-[var(--text-body)] text-sm transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-[var(--gold)]" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-[var(--gold)]" />
            Free assessment — no card needed
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-[var(--gold)]" />
            Secure Stripe checkout
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscriptions;
