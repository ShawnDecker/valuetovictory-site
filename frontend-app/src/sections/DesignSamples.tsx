import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';

const CONSULT = 'https://assessment.valuetovictory.com/consult';
const D = '/samples/design';

// Real published posts (vtv-queue-2026-10-23) and pieces built 2026-11-27
// (studio-kit/projects/vtv/design-samples-2026-11-27).
const POSTS = [
  { src: `${D}/post-m03.jpg`, alt: 'Quote post: Most people already know more than they are living' },
  { src: `${D}/post-n10.jpg`, alt: 'Objection post: Generic in, generic out' },
  { src: `${D}/post-m12.jpg`, alt: 'Quote post: The shortcuts almost always cost more than the long road would have' },
  { src: `${D}/post-m13.jpg`, alt: 'Post: Take it now. Take it again in 90 days' },
];
const SLIDES = Array.from({ length: 7 }, (_, i) => `${D}/carousel-${i + 1}.jpg`);

const Label = ({ title, fmt }: { title: string; fmt: string }) => (
  <div className="mt-3">
    <p className="text-base text-black" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{title}</p>
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--burgundy)]">{fmt}</p>
  </div>
);

const DesignSamples = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay: number, extra = '') => ({
    className: `${extra} transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`,
    style: { transitionDelay: `${delay}ms` },
  });

  const go = (dir: number) => {
    const el = trackRef.current; if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  const onScroll = () => {
    const el = trackRef.current; const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) setSlide(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };

  const kicker = (t: string) => (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--burgundy)]">{t}</span>
      <div className="flex-1 h-px bg-[var(--border-light)]" />
    </div>
  );

  return (
    <section ref={sectionRef} id="design-samples" className="relative w-full py-16 lg:py-24 bg-[var(--bg-light)]">
      <div className="section-container relative z-10">
        <div {...fade(0, 'text-center max-w-3xl mx-auto mb-12')}>
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--burgundy)]">Design</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black mb-4">
            Social posts, carousels and <span className="text-gradient">everyday marketing</span>
          </h2>
          <p className="text-lg text-[var(--text-body)]">
            The pieces a small business needs every week, designed as one system so every post, flyer and email looks like you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-14">
          {/* Feed posts */}
          <div {...fade(100)}>
            {kicker('Social posts · 4:5 for Instagram, Facebook and LinkedIn')}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {POSTS.map((p) => (
                <img key={p.src} src={p.src} alt={p.alt} loading="lazy" className="w-full aspect-[4/5] object-cover border border-[var(--border-light)] shadow-sm" />
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div {...fade(150)}>
            {kicker('Carousel · 7 slides, swipe through')}
            <div className="relative">
              <div ref={trackRef} onScroll={onScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin]">
                {SLIDES.map((s, i) => (
                  <img key={s} src={s} alt={`Carousel slide ${i + 1} of 7: 5 things AI can do for a local business this week`} loading="lazy"
                    className="snap-start flex-shrink-0 w-[78%] sm:w-[46%] lg:w-[31.5%] aspect-[4/5] object-cover border border-[var(--border-light)] shadow-sm" />
                ))}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  {SLIDES.map((_, i) => (
                    <span key={i} className={`h-1.5 transition-all ${i === slide ? 'w-6 bg-[var(--burgundy)]' : 'w-1.5 bg-[var(--border-light)]'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => go(-1)} aria-label="Previous slide" className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /></button>
                  <button onClick={() => go(1)} aria-label="Next slide" className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"><ArrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Everyday marketing */}
          <div {...fade(200)}>
            {kicker('Everyday marketing')}
            <div className="grid md:grid-cols-[1.25fr_1fr] gap-6 items-start">
              <div>
                <img src={`${D}/flyer.jpg`} alt="Event flyer for the free AI for Your Business webinar, with a QR code" loading="lazy" className="w-full border border-[var(--border-light)] shadow-sm" />
                <div className="flex items-end justify-between gap-3">
                  <Label title="Event flyer with QR code" fmt="Letter size · print and PDF" />
                  <a href={`${D}/flyer.pdf`} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--burgundy)] hover:underline"><Download className="w-4 h-4" /> PDF</a>
                </div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-[0.85fr_1fr] gap-4 items-end">
                  <div>
                    <img src={`${D}/story.jpg`} alt="Instagram story for the book launch" loading="lazy" className="w-full aspect-[9/16] object-cover border border-[var(--border-light)] shadow-sm" />
                    <Label title="Story" fmt="9:16 · Instagram, Facebook" />
                  </div>
                  <p className="text-sm text-[var(--text-body)] pb-12">
                    Every piece points somewhere people can act: a book page, a booking link or a QR code, each tracked so you can see what brought customers in.
                  </p>
                </div>
                <div>
                  <img src={`${D}/email-header.jpg`} alt="Email newsletter header for the book launch" loading="lazy" className="w-full border border-[var(--border-light)] shadow-sm" />
                  <Label title="Email header" fmt="Newsletters and announcements" />
                </div>
                <div>
                  <img src={`${D}/linkedin-banner.jpg`} alt="LinkedIn profile banner" loading="lazy" className="w-full border border-[var(--border-light)] shadow-sm" />
                  <Label title="Profile banner" fmt="LinkedIn · 1584 x 396" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div {...fade(250, 'flex flex-col items-center gap-3 mt-12 text-center')}>
          <p className="text-sm text-[var(--text-body)]">Samples from our own brand. Yours are built from your photos, your colors and your offers.</p>
          <a href={CONSULT} className="btn-primary flex items-center justify-center gap-2">
            Book a free 30-minute call <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DesignSamples;
