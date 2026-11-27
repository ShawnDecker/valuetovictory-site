import { useEffect, useRef, useState } from 'react';
import { BookOpen, Headphones, ExternalLink } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

// Running From Miracles — where to get it.
// Store links verified live 2026-11-17. Not listed (not buyable right now, re-checked on a schedule):
// Amazon Kindle (no edition), Amazon paperback ("Currently unavailable"), Barnes & Noble (no listing found).
const STORES = [
  { name: 'Apple Books', href: 'https://books.apple.com/us/book/running-from-miracles/id1447698134' },
  { name: 'Kobo', href: 'https://www.kobo.com/us/en/ebook/running-from-miracles' },
  { name: 'Everand', href: 'https://www.everand.com/book/396163823/Running-from-Miracles' },
];

const Book = () => {
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

  const fade = (delay: number) => ({
    className: `transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section ref={sectionRef} id="book" className="relative w-full py-20 lg:py-32 bg-white">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-center">
          <div {...fade(0)}>
            <img
              src="/rfm-cover.jpg"
              alt="Running From Miracles by Shawn E. Decker — book cover"
              width={794}
              height={1200}
              loading="lazy"
              className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
            />
          </div>

          <div>
            <div {...fade(100)}>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-[var(--gold)]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Books</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3">Running From Miracles</h2>
              <p className="text-lg font-semibold text-[var(--text-body)] mb-6">It&rsquo;s Time to Come Home &middot; Shawn E. Decker</p>
            </div>

            <div {...fade(200)}>
              <p className="text-lg text-[var(--text-body)] mb-4">
                A story of hope. Through the eyes of Shawn, his parents and others, you will see that even when a person
                doesn&rsquo;t see God in his or her life, He is there &mdash; even when Shawn was doing his best to run from Him.
              </p>
              <p className="text-lg text-[var(--text-body)] mb-8">
                Each chapter closes with reflections and prayers so you can apply the lessons to your own life.
              </p>
            </div>

            <div {...fade(300)}>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => go(VTV.freeBook)}
                  className="btn-primary flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold"
                >
                  <BookOpen className="w-5 h-5" /> Free ebook &mdash; only here
                </button>
                <button
                  onClick={() => go(VTV.audiobook)}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
                >
                  <Headphones className="w-5 h-5" /> Audiobook &mdash; $9.97
                </button>
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--text-body)] mb-3">Or read it on</p>
              <div className="flex flex-wrap gap-3">
                {STORES.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-black hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                  >
                    {s.name} <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
