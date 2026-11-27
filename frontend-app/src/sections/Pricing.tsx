import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, Star, Zap, Crown } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  icon: React.ReactNode;
  featured?: boolean;
  badge?: string;
}

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const plans: PricingPlan[] = [
    {
      name: 'Starter Plan',
      price: 99,
      period: 'month',
      description: 'Perfect for those beginning their transformation journey',
      features: [
        '2 coaching sessions/month',
        'Email support',
        'Progress tracking dashboard',
        'Resource library access',
        'Community forum access'
      ],
      cta: 'Get Started',
      icon: <Star className="w-6 h-6" />
    },
    {
      name: 'Growth Plan',
      price: 199,
      period: 'month',
      description: 'Our most popular choice for serious transformation',
      features: [
        '4 coaching sessions/month',
        'Priority email & chat support',
        'Advanced progress analytics',
        'Full resource library access',
        'Monthly group workshops',
        'Personalized action plans'
      ],
      cta: 'Start Growing',
      icon: <Zap className="w-6 h-6" />,
      featured: true,
      badge: 'Most Popular'
    },
    {
      name: 'Elite Plan',
      price: 499,
      period: 'month',
      description: 'The ultimate coaching experience for maximum results',
      features: [
        'Unlimited coaching sessions',
        '24/7 priority support',
        'Custom transformation plan',
        'All resources & workshops',
        '1-on-1 intensive sessions',
        'VIP community access',
        'Quarterly retreats'
      ],
      cta: 'Go Elite',
      icon: <Crown className="w-6 h-6" />
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full py-20 lg:py-32 bg-[var(--bg-light)]"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Pricing</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '100ms' }}
          >
            Investment in Your{' '}
            <span className="text-gradient">Transformation</span>
          </h2>

          <p
            className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
          >
            Flexible plans designed for every stage of your journey. Choose the path that fits your goals.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl transition-all duration-700 ${plan.featured ? 'lg:-mt-4 lg:mb-4 shadow-2xl' : 'shadow-lg hover:shadow-xl'} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{
                transitionTimingFunction: 'var(--ease-expo-out)',
                transitionDelay: `${300 + index * 100}ms`
              }}
            >
              {/* Featured badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-black text-sm font-semibold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className={`p-8 ${plan.featured ? 'pt-10' : ''}`}>
                {/* Plan header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.featured ? 'bg-[var(--gold)]' : 'bg-[var(--gold)]/10'}`}>
                    <div className={plan.featured ? 'text-black' : 'text-[var(--gold)]'}>
                      {plan.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black">{plan.name}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-black">${plan.price}</span>
                    <span className="text-[var(--text-body)]">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-[var(--text-body)] mt-2">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.featured ? 'bg-[var(--gold)]' : 'bg-[var(--gold)]/20'}`}>
                        <Check className={`w-3 h-3 ${plan.featured ? 'text-black' : 'text-[var(--gold)]'}`} />
                      </div>
                      <span className="text-[var(--text-body)] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button — routes to the real pricing/checkout on the funnel app */}
                <button
                  onClick={() => go(VTV.pricing)}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${plan.featured ? 'bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]' : 'bg-black text-white hover:bg-[var(--gold)] hover:text-black'}`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`text-center mt-12 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '800ms' }}
        >
          <p className="text-[var(--text-body)] text-sm">
            Plans and checkout are handled securely on our membership portal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
