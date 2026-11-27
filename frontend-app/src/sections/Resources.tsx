import { useEffect, useRef, useState } from 'react';
import { Download, FileText, Calculator } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  icon: React.ReactNode;
}

const Resources = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
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

  // Free tools are delivered live as the interactive P.I.N.K. assessment
  // ("The Value Engine") on the funnel app — assess & improve all five areas.
  const freeResources: Resource[] = [
    {
      id: 1,
      title: 'P.I.N.K. Framework Worksheet',
      description: 'Assess and improve your value across all five areas — People, Influence, Numbers, Knowledge, and Time — with the free interactive assessment.',
      type: 'Free interactive tool',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 2,
      title: 'Time Audit Tool',
      description: 'See where your 86,400 seconds a day are really going, and where they leak — built into the same free assessment.',
      type: 'Free interactive tool',
      icon: <Calculator className="w-6 h-6" />
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hand the visitor to the real free-resource signup on the funnel app.
    go(email ? `${VTV.freeBook}?email=${encodeURIComponent(email)}` : VTV.freeBook);
  };

  return (
    <section ref={sectionRef} id="resources" className="relative w-full py-20 lg:py-32 bg-[var(--bg-light)]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Free Tools</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            Start with the free <span className="text-gradient">assessment</span>
          </h2>

          <p className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            Your P.I.N.K. worksheet is a free, interactive assessment — no download required. Score all five areas and get a personalized action plan in minutes.
          </p>
        </div>

        {/* Free tools */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {freeResources.map((resource, index) => (
            <div
              key={resource.id}
              className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${300 + index * 80}ms` }}
            >
              <div className="w-12 h-12 bg-[var(--gold)]/10 rounded-xl flex items-center justify-center mb-4 text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black transition-all duration-300">
                {resource.icon}
              </div>
              <div className="text-xs text-[var(--gold)] font-semibold mb-2">{resource.type}</div>
              <h4 className="text-lg font-bold text-black mb-2 group-hover:text-[var(--gold)] transition-colors">{resource.title}</h4>
              <p className="text-sm text-[var(--text-body)] mb-5">{resource.description}</p>
              <button
                onClick={() => go(VTV.assessment)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-black group-hover:text-[var(--gold)] transition-colors"
              >
                <Download className="w-4 h-4" />
                Open the free tool
              </button>
            </div>
          ))}
        </div>

        {/* Email signup for free resources */}
        <div className={`mt-4 bg-black rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="min-w-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Get New Resources First</h3>
              <p className="text-white/70">Free tools, templates, and insights — delivered to your inbox.</p>
            </div>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full min-w-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 min-w-0 w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
              <button
                type="submit"
                className="shrink-0 whitespace-nowrap px-6 py-4 bg-[var(--gold)] text-black font-semibold rounded-xl hover:bg-[var(--gold-dark)] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Get Access
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
