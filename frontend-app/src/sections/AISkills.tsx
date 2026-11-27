import { useEffect, useRef, useState } from 'react';
import { Bot, Layers, Workflow, ArrowRight } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

// What each membership level includes is taken from the live pricing page (2026-11-17).
const LEVELS = [
  {
    level: 'Level 1 · Basic',
    plan: 'Included in every plan',
    icon: <Bot className="w-6 h-6" />,
    points: ['100 ready-to-use prompts', 'Which AI to use for what', '12 simple workflows', 'The safety basics'],
  },
  {
    level: 'Level 2 · Skill Packs',
    plan: 'Value Builder and Victory VIP',
    icon: <Layers className="w-6 h-6" />,
    points: ['All 10 Top-10 AI Skill Packs', 'Playbooks for 10 professions', 'Real estate, coaches, authors, pastors, small business and more'],
  },
  {
    level: 'Level 3 · Advanced',
    plan: 'Victory VIP',
    icon: <Workflow className="w-6 h-6" />,
    points: ['Your own AI assistants', 'Multi-step workflows and automations', 'Agents, with a human trust check'],
  },
];

const AISkills = () => {
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: number, extra = '') => ({
    className: `${extra} transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section ref={sectionRef} id="ai-skills" className="relative w-full py-16 lg:py-24 bg-[var(--bg-light)]">
      <div className="section-container relative z-10">
        <div {...fade(0, "text-center max-w-3xl mx-auto mb-10")}>
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--burgundy)]">AI Skills</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            AI skills for your <span className="text-gradient">business</span>
          </h2>
          <p className="text-lg text-[var(--text-body)]">
            Put AI on the busywork, keep the judgment yours. Every membership includes it, and each level builds on the one before.
          </p>
        </div>

        {/* Condensed: one line per level. The full detail sits in each membership card below. */}
        <div {...fade(100, "max-w-4xl mx-auto bg-white border border-[var(--border-light)] divide-y divide-[var(--border-light)]")}>
          {LEVELS.map((l) => (
            <div key={l.level} className="flex items-start sm:items-center gap-4 px-5 sm:px-6 py-4">
              <div className="w-10 h-10 rounded-sm bg-[#14161a] text-[var(--gold)] flex items-center justify-center flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5">{l.icon}</div>
              <div className="flex-1 sm:flex sm:items-baseline sm:gap-4">
                <h3 className="text-lg text-black sm:w-48 flex-shrink-0">{l.level}</h3>
                <p className="md:hidden text-xs font-semibold uppercase tracking-[0.14em] text-[var(--burgundy)] mb-1">{l.plan}</p>
                <p className="text-sm text-[var(--text-body)] flex-1">{l.points.join(' · ')}</p>
              </div>
              <span className="hidden md:block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--burgundy)] text-right w-40 flex-shrink-0">{l.plan}</span>
            </div>
          ))}
        </div>

        <div {...fade(250, "flex flex-col sm:flex-row gap-3 justify-center mt-10")}>
          <a href="#subscriptions" className="btn-primary flex items-center justify-center gap-2">
            See which plan includes what <ArrowRight className="w-5 h-5" />
          </a>
          <button
            onClick={() => go(VTV.skillPack)}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            Browse the Skill Packs
          </button>
        </div>
      </div>
    </section>
  );
};

export default AISkills;
