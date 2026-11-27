import { useEffect, useRef, useState } from 'react';
import { Check, Star, ArrowRight, BookOpen, Video, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VTV, go } from '@/lib/vtv-links';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  period?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  type: string;
  format: string;
  category: string;
  features: string[];
  image: string;
  bestseller?: boolean;
  featured?: boolean;
  new?: boolean;
  preorder?: string;
}

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDialog, setShowDialog] = useState(false);
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

  const products: Product[] = [
    {
      id: 1,
      name: "The Lost Art of Value",
      slug: "lost-art-of-value-book",
      description: "The foundational guide to understanding value through the P.I.N.K. framework.",
      price: 17.77,
      type: "digital",
      format: "Digital book · releases December 1, 2026",
      category: "Foundation",
      features: ["Complete P.I.N.K. framework", "Author's success story", "5 core principles", "Action steps", "Reflection questions"],
      image: "/product-book.png",
      preorder: "https://shawnedecker.com/books.html"
    },
    {
      id: 2,
      name: "Time Mastery Workshop",
      slug: "time-mastery-workshop",
      description: "In development. Included free with membership when it ships. Transform how you value your 86,400 daily seconds.",
      price: 97,
      type: "workbook",
      format: "In development",
      category: "Time",
      features: ["Time audit methodology", "Peak performance window", "Commute learning", "Delegation mastery", "Calendar optimization"],
      image: "/product-time.jpg"
    },
    {
      id: 3,
      name: "People & Influence Blueprint",
      slug: "people-influence-blueprint",
      description: "In development. Included free with membership when it ships. Master the art of understanding people and creating lasting influence.",
      price: 147,
      type: "workbook",
      format: "In development",
      category: "People",
      features: ["4 Types of People assessment", "4 Alliances framework", "Trust-building", "Empathetic listening", "Role navigation"],
      image: "/product-people.jpg"
    },
    {
      id: 4,
      name: "Numbers & Financial Intelligence",
      slug: "numbers-financial-intelligence",
      description: "In development. Included free with membership when it ships. Decode the unbiased language of value.",
      price: 197,
      type: "workbook",
      format: "In development",
      category: "Numbers",
      features: ["5 Types of Value", "Linear computation", "Weighted analysis", "Cost vs Value", "Investment templates"],
      image: "/product-numbers.jpg"
    },
    {
      id: 5,
      name: "Knowledge Accelerator System",
      slug: "knowledge-accelerator",
      description: "In development. Included free with membership when it ships. Compress decades of learning into years.",
      price: 127,
      type: "workbook",
      format: "In development",
      category: "Knowledge",
      features: ["1,800-hour framework", "Vocabulary expansion", "Mentor acquisition", "Knowledge application", "Wisdom framework"],
      image: "/product-knowledge.jpg"
    },
    {
      id: 6,
      name: "30-Day Value Challenge",
      slug: "30-day-value-challenge",
      description: "In development. Included free with membership when it ships. A transformative month-long journey to rebuild your worth.",
      price: 67,
      type: "challenge",
      format: "In development",
      category: "Challenge",
      features: ["30 daily lessons", "Private community", "Daily prompts", "Progress tracking", "Weekly Q&A"],
      image: "/product-challenge.jpg"
    },
    {
      id: 7,
      name: "Gold Roof Fallacy Toolkit",
      slug: "gold-roof-toolkit",
      description: "Stop misplacing value. Learn personal vs market value.",
      price: 47,
      type: "toolkit",
      format: "PDF + Framework",
      category: "Tools",
      features: ["Value assessment", "Decision templates", "Bias elimination", "Market analysis", "Value guide"],
      image: "/product-goldroof.jpg"
    },
    {
      id: 8,
      name: "Negotiation Mastery Playbook",
      slug: "negotiation-playbook",
      description: "Get what you're worth in every transaction.",
      price: 87,
      type: "playbook",
      format: "Printable Playbook",
      category: "Tools",
      features: ["Who mentions number first", "Salary negotiation", "Contractor scripts", "Raise frameworks"],
      image: "/product-negotiation.jpg"
    },
    {
      id: 9,
      name: "P.I.N.K. Daily Journal",
      slug: "pink-daily-journal",
      description: "90-day guided journal to implement P.I.N.K. daily.",
      price: 24.99,
      type: "journal",
      format: "Printable Journal",
      category: "Tools",
      features: ["A daily page for 90 days", "Daily reflections", "Goal-setting", "Progress tracking", "Weekly reviews"],
      image: "/product-journal.jpg"
    },
    {
      id: 10,
      name: "Start Here: Victory VIP",
      slug: "complete-pink-bundle",
      description: "The complete membership, with personal coaching every month and the book before anyone else.",
      price: 497,
      period: "/mo",
      badge: "Start Here",
      type: "membership",
      format: "Monthly membership",
      category: "Membership",
      features: ["The Lost Art of Value, with early access November 1, 2026", "1 coaching session a month (1 hr personal or 30 min real estate)", "20% off real estate and personal coaching", "VIP Mastermind group", "Direct author access", "Every member workbook and the Running From Miracles audiobook"],
      image: "/product-book.png",
      ctaLabel: "Go VIP · $497/mo",
      ctaHref: VTV.joinVip,
      featured: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return <BookOpen className="w-4 h-4" />;
      case 'course': return <Video className="w-4 h-4" />;
      case 'challenge': return <Star className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <section ref={sectionRef} id="products" className="relative w-full py-20 lg:py-32 bg-[var(--bg-light)]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Products</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            Master the <span className="text-gradient">Lost Art of Value</span>
          </h2>

          <p className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            Member workbooks are <span className="font-semibold text-black">included with your membership</span>. <em>The Lost Art of Value</em> is included with annual and Victory VIP plans, with early access November 1; monthly members can pre-order it for $17.77. Three workbooks are ready now; the rest are in development and arrive free when they ship.
          </p>
        </div>

        {/* Featured Bundle */}
        <div className={`mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          {products.filter(p => p.featured).map(product => (
            <div key={product.id} className="bg-gradient-to-r from-black to-gray-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)] rounded-full opacity-10 blur-3xl" />
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[var(--gold)] text-black px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    <Star className="w-4 h-4" />
                    {product.badge || 'Best Value'}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">{product.name}</h3>
                  <p className="text-white/70 mb-6">{product.description}</p>
                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/80">
                        <Check className="w-5 h-5 text-[var(--gold)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-[var(--gold)]">${product.price}{product.period && <span className="text-xl text-white/60">{product.period}</span>}</span>
                    {product.originalPrice !== undefined && (
                      <>
                        <span className="text-xl text-white/50 line-through">${product.originalPrice}</span>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                          Save ${product.originalPrice - product.price}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <img src={product.image} alt={product.name} className="rounded-2xl shadow-2xl" />
                  <button
                    onClick={() => { if (product.ctaHref) { go(product.ctaHref); } else { setSelectedProduct(product); setShowDialog(true); } }}
                    className="absolute bottom-4 right-4 btn-primary"
                  >
                    {product.ctaLabel || 'Unlock with membership'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter(p => !p.featured).map((product, index) => (
            <div 
              key={product.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${400 + index * 50}ms` }}
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                {product.new && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    New
                  </div>
                )}
                {product.preorder && (
                  <div className="absolute top-4 left-4 bg-[var(--gold)] text-black px-3 py-1 rounded-full text-xs font-semibold">
                    Pre-order
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  {getTypeIcon(product.type)}
                  {product.type}
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xs text-[var(--gold)] font-semibold uppercase mb-2">{product.category}</div>
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-[var(--gold)] transition-colors">{product.name}</h3>
                <p className="text-[var(--text-body)] text-sm mb-4 line-clamp-2">{product.description}</p>
                
                {product.preorder ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-base font-bold text-[var(--gold)]">${product.price}</span>
                      <span className="text-sm text-[var(--text-body)]">releases Dec 1, 2026</span>
                      <span className="text-sm text-[var(--text-body)] ml-auto">included with annual and VIP</span>
                    </div>

                    <a
                      href={product.preorder}
                      className="w-full py-3 bg-[var(--gold)] text-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Pre-order for ${product.price}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-base font-bold text-[var(--gold)]">Included</span>
                      <span className="text-sm text-[var(--text-body)]">with membership</span>
                      {product.originalPrice !== undefined && <span className="text-sm text-[var(--text-body)] line-through ml-auto">${product.originalPrice} value</span>}
                    </div>

                    <button
                      onClick={() => { setSelectedProduct(product); setShowDialog(true); }}
                      className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-[var(--gold)] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Unlock with membership
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="rounded-xl" />
                <div>
                  <p className="text-[var(--text-body)] mb-4">{selectedProduct.description}</p>
                  <div className="text-sm text-[var(--gold)] font-semibold mb-4">{selectedProduct.format}</div>
                  
                  <ul className="space-y-2 mb-6">
                    {selectedProduct.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-[var(--gold)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-lg font-bold text-[var(--gold)]">Included</span>
                    <span className="text-sm text-[var(--text-body)]">with membership</span>
                    {selectedProduct.originalPrice !== undefined && <span className="text-sm text-[var(--text-body)] line-through ml-auto">${selectedProduct.originalPrice} value</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => go(VTV.join)}
                      className="w-full py-3 bg-[var(--gold)] text-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Become a Member
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => go(VTV.member)}
                      className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-[var(--gold)] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Products;
