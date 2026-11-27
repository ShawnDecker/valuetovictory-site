import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Users, TrendingUp, Brain, BookOpen } from 'lucide-react';

const About = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pinkElements = [
    { letter: 'P', word: 'People', icon: <Users className="w-6 h-6" />, desc: 'The relationships that shape your life' },
    { letter: 'I', word: 'Influence', icon: <TrendingUp className="w-6 h-6" />, desc: 'Your ability to impact others' },
    { letter: 'N', word: 'Numbers', icon: <BookOpen className="w-6 h-6" />, desc: 'The unbiased language of value' },
    { letter: 'K', word: 'Knowledge', icon: <Brain className="w-6 h-6" />, desc: 'Wisdom that multiplies success' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative w-full py-20 lg:py-32 bg-[var(--bg-light)]"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-1/4 w-64 h-64 bg-[var(--gold)] rounded-full opacity-10 blur-3xl" />
        <div className="absolute right-10 bottom-10 w-4 h-4 rounded-full bg-[var(--gold)] animate-float" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content - P.I.N.K. Framework */}
          <div className="relative order-2 lg:order-1">
            <div 
              className={`relative transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              {/* Decorative blob */}
              <div 
                className={`absolute -bottom-8 -left-8 w-48 h-48 bg-[var(--gold)] rounded-full opacity-60 blur-xl transition-all duration-800 ${isVisible ? 'scale-100' : 'scale-0'}`}
                style={{ transitionDelay: '400ms', transitionTimingFunction: 'var(--ease-elastic)' }}
              />
              
              {/* P.I.N.K. Cards */}
              <div className="relative grid grid-cols-2 gap-4">
                {pinkElements.map((element, index) => (
                  <div 
                    key={index}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-[var(--gold)]/10 rounded-xl flex items-center justify-center mb-4 text-[var(--gold)]">
                      {element.icon}
                    </div>
                    <div className="text-3xl font-bold text-[var(--gold)] mb-1">{element.letter}</div>
                    <div className="font-bold text-black mb-2">{element.word}</div>
                    <div className="text-sm text-[var(--text-body)]">{element.desc}</div>
                  </div>
                ))}
              </div>

              {/* Time container */}
              <div 
                className={`mt-4 bg-black rounded-2xl p-6 text-center transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[var(--gold)]" />
                  <span className="text-[var(--gold)] font-semibold">All Contained Within</span>
                </div>
                <div className="text-2xl font-bold text-white">TIME</div>
                <div className="text-white/60 text-sm mt-1">86,400 seconds every day</div>
              </div>
            </div>
          </div>

          {/* Right content - Text */}
          <div className="order-1 lg:order-2">
            {/* Section label */}
            <div 
              className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              <div className="w-8 h-[2px] bg-[var(--gold)]" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">The Story</span>
            </div>

            {/* Heading */}
            <h2 
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '100ms' }}
            >
              Value Is the{' '}
              <span className="text-gradient">Currency of Life</span>
            </h2>

            {/* Body text */}
            <div 
              className={`space-y-4 mb-8 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
            >
              <p className="text-lg text-[var(--text-body)] leading-relaxed">
                For 24 years I've valued homes for a living — nearly 12,000 of them, more than $4.2 billion in property. That work taught me a truth that reaches far beyond real estate: <strong>value is the currency of life</strong>.
              </p>
              <p className="text-lg text-[var(--text-body)] leading-relaxed">
                Out of years of study and practice, I built the <strong>P.I.N.K. framework</strong>: a system for understanding and maximizing value across People, Influence, Numbers, Knowledge, and Time.
              </p>
              <p className="text-lg text-[var(--text-body)] leading-relaxed">
                Now I'm leaving a six-figure appraisal career to teach it full-time — through coaching, courses, and speaking.
              </p>
            </div>

            {/* Book quote */}
            <div 
              className={`bg-white rounded-2xl p-6 shadow-lg mb-8 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '300ms' }}
            >
              <blockquote className="text-[var(--text-body)] italic mb-4">
                "The Lost Art of Value isn't just a book — it's a roadmap for measuring what truly matters and building a life that reflects it."
              </blockquote>
              <cite className="font-semibold text-black not-italic">— Shawn Decker, Author</cite>
            </div>

            {/* CTA Link */}
            <a
              href="#subscriptions"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('subscriptions')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 text-black font-semibold group transition-all duration-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '400ms' }}
            >
              <span className="relative">
                Explore the Products
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
