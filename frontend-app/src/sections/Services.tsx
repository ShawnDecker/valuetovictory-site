import { useEffect, useRef, useState } from 'react';
import { Heart, Briefcase, Users, Brain, Dumbbell, Sparkles, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}

const ServiceCard = ({ icon, title, description, delay, isVisible }: ServiceCardProps) => {
  // Condensed 2026-11-27: icon + title + one line. Feature bullets and per-card links removed.
  return (
    <a
      href="#subscriptions"
      className={`group flex items-start gap-4 bg-white border border-[var(--border-light)] border-t-[3px] border-t-[var(--burgundy)] p-5 hover:shadow-[0_18px_40px_-24px_rgba(20,22,26,.35)] transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-sm bg-[#14161a] text-[var(--gold)] flex items-center justify-center flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5">
        {icon}
      </div>
      <div>
        <h3 className="text-lg text-black leading-tight mb-1 group-hover:text-[var(--burgundy)] transition-colors">{title}</h3>
        <p className="text-sm text-[var(--text-body)] leading-snug">{description}</p>
      </div>
    </a>
  );
};

const Services = () => {
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

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Life Coaching',
      description: 'Find balance, clarity, and purpose in your daily life through personalized guidance.',
      features: ['Goal Setting', 'Work-Life Balance', 'Personal Growth', 'Mindfulness']
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Business Coaching',
      description: 'Scale with strategy, lead with confidence, and achieve sustainable business growth.',
      features: ['Leadership Development', 'Strategic Planning', 'Team Building', 'Performance Optimization']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Relationship Coaching',
      description: 'Build deeper, more meaningful connections in both personal and professional spheres.',
      features: ['Communication Skills', 'Conflict Resolution', 'Emotional Intelligence', 'Trust Building']
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Mental Health Coaching',
      description: 'Develop resilience, emotional strength, and mental clarity for life\'s challenges.',
      features: ['Stress Management', 'Anxiety Relief', 'Mindset Shifts', 'Emotional Regulation']
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: 'Physical Health Coaching',
      description: 'Create sustainable wellness habits that energize and transform your body.',
      features: ['Fitness Planning', 'Nutrition Guidance', 'Sleep Optimization', 'Energy Management']
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Spiritual Health Coaching',
      description: 'Discover purpose, inner peace, and a deeper connection to what matters most.',
      features: ['Purpose Discovery', 'Meditation Practice', 'Values Alignment', 'Inner Peace']
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative w-full py-16 lg:py-24 bg-white"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute left-10 bottom-20 w-3 h-3 rounded-full bg-[var(--gold)] animate-float" />
        <div className="absolute right-20 top-20 w-2 h-2 rounded-full bg-black opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div 
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--burgundy)]">Coaching</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl text-black mb-4 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '100ms' }}
          >
            Six Paths to{' '}
            <span className="text-gradient">Transformation</span>
          </h2>

          <p 
            className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
          >
            One-on-one coaching for every part of your life. Pick the path that fits where you are.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={200 + index * 60}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-10 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '900ms' }}
        >
          <p className="text-[var(--text-body)] mb-4">Not sure where to start? Fifteen minutes, no charge.</p>
          <a 
            href="https://calendly.com/valuetovictory/15min?utm_source=valuetovictory.com&utm_campaign=services_cta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Book a Free 15-Minute Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
