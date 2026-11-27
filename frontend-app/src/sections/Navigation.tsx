import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Sparkles, LogIn, ArrowRight } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'About', href: 'about' },
    { label: 'Books', href: 'book' },
    { label: 'Coaching', href: 'services' },
    { label: 'AI Skills', href: 'ai-skills' },
    { label: 'Video Design', href: 'video-design' },
    { label: 'Membership', href: 'subscriptions' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Top bar: free assessment + member login, on every screen size */}
        <div className="bg-black text-white text-xs sm:text-sm">
          <div className="section-container h-9 flex items-center justify-between gap-3">
            <button
              onClick={() => go(VTV.assessment)}
              className="flex items-center gap-2 min-w-0 group"
            >
              <Sparkles className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
              <span className="hidden md:inline text-white/80">New here? See where your time and value stand.</span>
              <span className="flex items-center gap-1 font-semibold text-[var(--gold)] whitespace-nowrap group-hover:underline underline-offset-4">
                Take the Free Assessment
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            <button
              onClick={() => go(VTV.member)}
              className="flex items-center gap-1.5 font-semibold whitespace-nowrap hover:text-[var(--gold)] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Member</span> Log In
            </button>
          </div>
        </div>

        <div className={`section-container transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              className="flex items-center gap-2"
            >
              <img src="/brand/vtv-crest-nav.png" alt="Value to Victory crest" width="40" height="46" className="h-11 w-auto" />
              <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-black'}`}>
                Value to Victory
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={`#${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative font-medium transition-colors duration-300 group text-sm ${
                    isScrolled ? 'text-black hover:text-[var(--gold)]' : 'text-black hover:text-[var(--gold)]'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => go(VTV.audiobook)}
                className="p-2 hover:bg-[var(--bg-light)] rounded-lg transition-colors"
                aria-label="Shop"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button
                onClick={() => go(VTV.join)}
                className="px-6 py-3 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dark)] transition-all duration-300 hover:scale-105"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden w-10 h-10 flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-32">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={`#${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="block py-3 text-lg font-medium text-black hover:text-[var(--gold)] transition-colors duration-300 border-b border-[var(--border-light)]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => go(VTV.member)}
                className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-[var(--gold)] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Member Log In
              </button>
              <button
                onClick={() => go(VTV.freeBook)}
                className="w-full py-3 border-2 border-black text-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300"
              >
                Get the Free Book
              </button>
              <button
                onClick={() => go(VTV.join)}
                className="w-full btn-primary"
              >
                Join Membership
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
