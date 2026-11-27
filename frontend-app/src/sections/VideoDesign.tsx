import { useEffect, useRef, useState } from 'react';
import { Clapperboard, Smartphone, Captions, Megaphone, ArrowRight } from 'lucide-react';

const CONSULT = 'https://assessment.valuetovictory.com/consult';

// Samples rendered 2026-11-27 from Shawn's own footage (studio-kit/projects/vtv/video-samples-2026-11-27).
const SERVICES = [
  { key: 'brand', title: 'Brand and promo videos', text: 'Story-driven videos that explain what you do and why it matters, cut for each platform.', icon: <Clapperboard className="w-5 h-5" />, src: '/samples/brand-promo.mp4', poster: '/samples/brand-promo.jpg', fmt: '16:9 · website and YouTube' },
  { key: 'reel', title: 'Short-form reels', text: 'Vertical video for Instagram, Facebook, TikTok and YouTube Shorts, built to stop the scroll in the first seconds.', icon: <Smartphone className="w-5 h-5" />, src: '/samples/short-form-reel.mp4', poster: '/samples/short-form-reel.jpg', fmt: '9:16 · Reels, TikTok, Shorts' },
  { key: 'captions', title: 'Captions and editing', text: 'On-screen captions, clean cuts and sound, using your own footage and photos.', icon: <Captions className="w-5 h-5" />, src: '/samples/captions-editing.mp4', poster: '/samples/captions-editing.jpg', fmt: 'Before and after' },
  { key: 'ad', title: 'Video ads', text: 'Ad-ready versions with a clear call to action, so every post points somewhere people can act.', icon: <Megaphone className="w-5 h-5" />, src: '/samples/video-ad.mp4', poster: '/samples/video-ad.jpg', fmt: '4:5 · feed ad with call to action' },
];

const VideoDesign = () => {
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
    <section ref={sectionRef} id="video-design" className="relative w-full py-20 lg:py-32 bg-white">
      <div className="section-container relative z-10">
        <div {...fade(0, "text-center max-w-3xl mx-auto mb-14")}>
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--burgundy)]">Video Design</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black mb-6">
            Video design help for <span className="text-gradient">social media</span>
          </h2>
          <p className="text-lg text-[var(--text-body)]">
            Need videos for your business but don&rsquo;t have the time or the tools? We help small businesses plan, edit and
            design social media video that tells your story and gives people a next step.
          </p>
        </div>

        {/* Brand promo: full width */}
        {SERVICES.filter((x) => x.key === 'brand').map((s) => (
          <div key={s.key} {...fade(100, "max-w-6xl mx-auto mb-8 bg-white border border-[var(--border-light)] border-t-[3px] border-t-[var(--burgundy)] grid lg:grid-cols-[1.6fr_1fr]")}>
            <div className="bg-[#0f1114] aspect-video">
              <video className="w-full h-full object-cover" src={s.src} poster={s.poster} controls playsInline preload="none" aria-label={`${s.title} sample`} />
            </div>
            <div className="p-7 lg:p-9 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-sm bg-[#14161a] text-[var(--gold)] flex items-center justify-center">{s.icon}</div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--burgundy)]">{s.fmt}</span>
              </div>
              <h3 className="text-2xl text-black mb-2">{s.title}</h3>
              <p className="text-[var(--text-body)]">{s.text}</p>
            </div>
          </div>
        ))}

        {/* Vertical and feed samples */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SERVICES.filter((x) => x.key !== 'brand').map((s, i) => (
            <div key={s.key} {...fade(180 + i * 80, "bg-white border border-[var(--border-light)] border-t-[3px] border-t-[var(--gold)] flex flex-col")}>
              <div className="bg-[#0f1114] aspect-[9/16]">
                <video className={`w-full h-full ${s.key === 'ad' ? 'object-contain' : 'object-cover'}`} src={s.src} poster={s.poster} controls playsInline preload="none" aria-label={`${s.title} sample`} />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-sm bg-[#14161a] text-[var(--gold)] flex items-center justify-center">{s.icon}</div>
                  <h3 className="text-xl text-black">{s.title}</h3>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--burgundy)] mb-2">{s.fmt}</p>
                <p className="text-sm text-[var(--text-body)]">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <p {...fade(400, "text-center text-sm text-[var(--text-body)] mt-6")}>Samples made from our own footage. Tap a video to play it with sound.</p>

        <div {...fade(450, "flex justify-center mt-12")}>
          <a href={CONSULT} className="btn-primary flex items-center justify-center gap-2">
            Book a free 30-minute call <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoDesign;
