import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, BookOpen, Users, Star } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute -right-20 top-1/4 w-[500px] h-[500px] rounded-full bg-[var(--gold)] opacity-20 blur-3xl transition-all duration-1000 ${isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'}`}
          style={{ transitionDelay: '400ms' }}
        />
        <div className="absolute right-10 bottom-20 w-32 h-32 rounded-full bg-[var(--gold)] opacity-30 animate-float-slow" />
        <div className="absolute left-20 top-40 w-4 h-4 rounded-full bg-[var(--gold)] animate-float" />
        <div className="absolute right-1/3 top-20 w-3 h-3 rounded-full bg-black opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/3 bottom-40 w-2 h-2 rounded-full bg-[var(--gold)] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="section-container relative z-10 flex min-h-screen items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full pt-32 pb-20 lg:py-0">
          {/* Left content */}
          <div className="order-2 lg:order-1 max-w-2xl">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 bg-[var(--gold)]/10 text-[var(--gold)] px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-all duration-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <BookOpen className="w-4 h-4" />
              Based on "The Lost Art of Value" Book
            </div>

            {/* Title */}
            <div className="overflow-hidden mb-6">
              <h1 
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight transition-all duration-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '300ms' }}
              >
                Master the{' '}
                <span className="relative inline-block">
                  <span className="text-gradient">P.I.N.K.</span>
                </span>{' '}
                Framework
              </h1>
            </div>

            {/* Subtitle */}
            <p 
              className={`text-lg sm:text-xl text-[var(--text-body)] mb-8 max-w-lg transition-all duration-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '500ms' }}
            >
              Transform your life through the 5 principles of value: <span className="font-semibold text-black">P</span>eople, <span className="font-semibold text-black">I</span>nfluence, <span className="font-semibold text-black">N</span>umbers, <span className="font-semibold text-black">K</span>nowledge — all within the container of <span className="font-semibold text-black">T</span>ime.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '700ms' }}
            >
              <button
                onClick={() => go(VTV.join)}
                className="btn-primary group"
              >
                Take the Free Assessment
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
              <button
                onClick={() => scrollToSection('subscriptions')}
                className="btn-secondary group"
              >
                <Play className="mr-2 w-5 h-5" />
                See Membership
              </button>
            </div>

            {/* Stats */}
            <div 
              className={`flex gap-8 mt-12 pt-8 border-t border-[var(--border-light)] transition-all duration-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '900ms' }}
            >
              <div>
                <div className="text-3xl font-bold text-black">24+</div>
                <div className="text-sm text-[var(--text-body)]">Years Valuing</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black">$4.2B+</div>
                <div className="text-sm text-[var(--text-body)]">Homes Valued</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black">12K+</div>
                <div className="text-sm text-[var(--text-body)]">Homes Appraised</div>
              </div>
            </div>
          </div>

          {/* Right content - Book Image */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <div 
              className={`relative transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100 rotate-0' : 'translate-x-24 opacity-0 -rotate-6'}`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '600ms' }}
            >
              {/* Decorative blob behind image */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--gold)] rounded-full opacity-60 blur-2xl animate-float-slow" />
              
              {/* Main book image */}
              <div className="relative animate-float">
                <img
                  src="/product-book.png"
                  alt="The Lost Art of Value — Time for P.I.N.K. by Shawn E. Decker"
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating badges */}
              <div 
                className={`absolute -left-8 bottom-32 bg-white rounded-2xl shadow-xl p-4 transition-all duration-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: '1000ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[var(--gold)] rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Shawn Decker</div>
                    <div className="text-sm text-[var(--text-body)]">Author & Appraiser</div>
                  </div>
                </div>
              </div>

              <div 
                className={`absolute -right-4 top-20 bg-white rounded-2xl shadow-xl p-4 transition-all duration-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: '1100ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-[var(--gold)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">24 Years</div>
                    <div className="text-sm text-[var(--text-body)]">Real Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="var(--bg-light)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
