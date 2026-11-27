import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  rating: number;
  image?: string;
}

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials: Testimonial[] = [
    {
      quote: "VictoryPath didn't just change my business—it transformed my entire life. The holistic approach meant I grew as a leader, a partner, and as someone who finally understands what balance feels like.",
      name: "Sarah Mitchell",
      title: "CEO, TechStart Inc.",
      rating: 5
    },
    {
      quote: "The mental health coaching gave me tools I use every single day. I've never felt more centered and capable of handling whatever life throws at me.",
      name: "James Chen",
      title: "Entrepreneur",
      rating: 5
    },
    {
      quote: "My relationship with my team has never been stronger. The communication skills I learned have transformed not just my work life, but my home life too.",
      name: "Maria Rodriguez",
      title: "Operations Manager",
      rating: 5
    },
    {
      quote: "I finally achieved the work-life balance I thought was impossible. VictoryPath showed me that success doesn't have to come at the cost of my well-being.",
      name: "David Park",
      title: "Executive Director",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="relative w-full py-20 lg:py-32 bg-white"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute left-10 bottom-20 w-4 h-4 rounded-full bg-[var(--gold)] animate-float" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Testimonials</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '100ms' }}
          >
            What Our Clients{' '}
            <span className="text-gradient">Say</span>
          </h2>

          <p 
            className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
          >
            Real stories from real people who transformed their lives
          </p>
        </div>

        {/* Testimonials content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left - Featured image */}
          <div 
            className={`relative transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '300ms' }}
          >
            {/* Decorative blob */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[var(--gold)] rounded-full opacity-30 blur-2xl animate-float-slow" />
            
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/testimonial-client.jpg" 
                alt="Happy client" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating quote icon */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[var(--gold)] rounded-2xl flex items-center justify-center shadow-xl">
              <Quote className="w-8 h-8 text-black" />
            </div>
          </div>

          {/* Right - Carousel */}
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '400ms' }}
          >
            {/* Testimonial card */}
            <div className="relative bg-[var(--bg-light)] rounded-2xl p-8 lg:p-10">
              {/* Quote */}
              <div className="mb-8">
                <p className="text-xl lg:text-2xl text-black leading-relaxed italic">
                  "{testimonials[activeIndex].quote}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-black text-lg">{testimonials[activeIndex].name}</div>
                  <div className="text-[var(--text-body)]">{testimonials[activeIndex].title}</div>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[var(--gold)] hover:text-black transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[var(--gold)] hover:text-black transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-[var(--gold)]' : 'bg-black/20 hover:bg-black/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
