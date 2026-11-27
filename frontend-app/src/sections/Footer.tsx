import { useState } from 'react';
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { VTV, go } from '@/lib/vtv-links';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Hand off to the real newsletter / free-resource signup on the funnel app.
    go(email ? `${VTV.freeBook}?email=${encodeURIComponent(email)}` : VTV.freeBook);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Story', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' }
    ],
    services: [
      { label: 'Life Coaching', href: '#services' },
      { label: 'Business Coaching', href: '#services' },
      { label: 'Relationship Coaching', href: '#services' },
      { label: 'All Services', href: '#services' }
    ],
    support: [
      { label: 'Contact Us', href: '#cta' },
      { label: 'FAQ', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Privacy Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: VTV.facebook, label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: VTV.twitter, label: 'X (Twitter)' },
    { icon: <Instagram className="w-5 h-5" />, href: VTV.instagram, label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: VTV.linkedin, label: 'LinkedIn' }
  ];

  return (
    <footer className="relative w-full bg-black text-white">
      {/* Main footer content */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo & Newsletter */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <div className="mb-6">
              <a href="#hero" onClick={() => scrollToSection('hero')} className="flex items-center gap-2">
                <img src="/brand/vtv-crest-nav.png" alt="Value to Victory crest" width="40" height="46" className="h-11 w-auto" />
                <span className="text-2xl font-bold">Value to Victory</span>
              </a>
            </div>

            <p className="text-white/70 mb-6 max-w-sm">
              Guiding your journey to success through expert coaching across six life dimensions.
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-3">Stay Inspired</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] text-white placeholder:text-white/50"
                />
                <button 
                  type="submit"
                  className="px-4 py-3 bg-[var(--gold)] text-black rounded-lg font-semibold hover:bg-[var(--gold-dark)] transition-colors duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-6 grid sm:grid-cols-3 gap-8">
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-[var(--gold)]">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          scrollToSection(link.href.slice(1));
                        }
                      }}
                      className="text-white/70 hover:text-[var(--gold)] transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-[var(--gold)]">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          scrollToSection(link.href.slice(1));
                        }
                      }}
                      className="text-white/70 hover:text-[var(--gold)] transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4 text-[var(--gold)]">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          scrollToSection(link.href.slice(1));
                        }
                      }}
                      className="text-white/70 hover:text-[var(--gold)] transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-[var(--gold)]">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Roanoke Valley, Virginia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
                <a href={VTV.phoneHref} className="text-white/70 text-sm hover:text-[var(--gold)] transition-colors">
                  {VTV.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
                <a href={`mailto:${VTV.email}`} className="text-white/70 text-sm hover:text-[var(--gold)] transition-colors">
                  {VTV.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Value to Victory. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--gold)] hover:text-black transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
