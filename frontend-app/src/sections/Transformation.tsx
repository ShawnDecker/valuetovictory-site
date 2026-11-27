import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  isVisible: boolean;
  delay: number;
}

const Counter = ({ end, suffix = '', label, isVisible, delay }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, delay]);

  return (
    <div 
      ref={countRef}
      className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: `${delay}ms` }}
    >
      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2 animate-counter">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-white/80 text-lg">{label}</div>
    </div>
  );
};

const Transformation = () => {
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

  const stats = [
    { end: 12000, suffix: '+', label: 'Clients' },
    { end: 100, suffix: '+', label: 'Hundreds Helped' },
    { end: 100, suffix: '%', label: 'Designed To Bring Value to You' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="transformation"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="/transformation-bg.jpg" 
          alt="Transformation background" 
          className={`w-full h-full object-cover transition-transform duration-1000 ${isVisible ? 'scale-100' : 'scale-110'}`}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-10 top-10 w-4 h-4 rounded-full bg-[var(--gold)] opacity-40 animate-float" />
        <div className="absolute right-20 bottom-20 w-3 h-3 rounded-full bg-[var(--gold)] opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/3 bottom-10 w-2 h-2 rounded-full bg-white opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Our Impact</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '100ms' }}
          >
            Transformations That{' '}
            <span className="text-[var(--gold)]">Speak Volumes</span>
          </h2>

          <p 
            className={`text-lg text-white/80 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
          >
            Real results from real people who dared to transform their lives
          </p>
        </div>

        {/* Counters */}
        <div className="grid sm:grid-cols-3 gap-12 lg:gap-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Counter
              key={index}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
              delay={400 + index * 200}
            />
          ))}
        </div>

        {/* Bottom quote */}
        <div 
          className={`text-center mt-16 max-w-2xl mx-auto transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '1000ms' }}
        >
          <blockquote className="text-2xl sm:text-3xl text-white font-bold not-italic tracking-tight">
            Real Tools, Real Life
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Transformation;
