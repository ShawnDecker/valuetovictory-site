import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

const CTA = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative w-full py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 top-10 w-4 h-4 rounded-full bg-[var(--gold)] opacity-40 animate-float" />
        <div className="absolute right-20 top-20 w-3 h-3 rounded-full bg-[var(--gold)] opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/4 bottom-10 w-2 h-2 rounded-full bg-white opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute right-1/3 bottom-20 w-3 h-3 rounded-full bg-[var(--gold)] opacity-20 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--gold)] rounded-full opacity-10 blur-3xl" />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--gold)] rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <div
            className={`inline-flex items-center gap-2 mb-8 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Get Started</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          {/* Heading */}
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '100ms' }}
          >
            Ready to Transform{' '}
            <span className="text-[var(--gold)]">Your Life?</span>
          </h2>

          {/* Subtext */}
          <p
            className={`text-xl text-white/80 mb-10 max-w-2xl mx-auto transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
          >
            Take the free 5-minute value assessment and see your number. No card required — just clarity on what your time is really worth.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '300ms' }}
          >
            <button
              onClick={() => go(VTV.join)}
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--gold)] text-black font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group animate-pulse-glow"
            >
              Take the Free Assessment
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
            <a
              href={VTV.phoneHref}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call {VTV.phoneDisplay}
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className={`flex flex-wrap justify-center gap-8 text-white/60 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">5-Minute Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">100% Confidential</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
