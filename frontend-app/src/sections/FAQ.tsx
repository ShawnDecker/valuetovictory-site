import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');
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

  const categories = ['All', 'General', 'Subscriptions', 'Products', 'Challenges', 'Support'];

  const faqs: FAQItem[] = [
    {
      question: "What is the P.I.N.K. framework?",
      answer: "P.I.N.K. stands for People, Influence, Numbers, and Knowledge — all contained within Time. It's a comprehensive framework for understanding and maximizing value in every area of your life. The framework teaches you to value your time correctly, build meaningful relationships, develop genuine influence, understand the numbers that matter, and continuously acquire knowledge that multiplies your success.",
      category: "General"
    },
    {
      question: "How is this different from other self-help programs?",
      answer: "Unlike generic self-help content, the P.I.N.K. framework is based on real-world experience — specifically, 24 years of valuing homes and businesses and seeing what actually creates worth. Every principle has been tested and refined through actual success and failure. The framework is also holistic: it addresses all five dimensions of value simultaneously, rather than focusing on just one area like productivity or mindset.",
      category: "General"
    },
    {
      question: "What's included in the Value Seeker subscription?",
      answer: "The Value Seeker plan ($29/month) includes access to The Lost Art of Value book, monthly P.I.N.K. newsletter, community forum access, weekly value tips, and basic challenge participation. It's perfect for those beginning their value journey who want to understand the fundamentals.",
      category: "Subscriptions"
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes! All subscriptions can be cancelled at any time with no penalties. If you cancel, you'll continue to have access until the end of your current billing period. We also offer a 14-day money-back guarantee for all new subscriptions.",
      category: "Subscriptions"
    },
    {
      question: "What's the difference between monthly and yearly billing?",
      answer: "Yearly billing saves you 17% compared to monthly. For example, the Value Builder plan is $79/month ($948/year) on monthly billing, but only $790/year on yearly — a savings of $158. Yearly subscribers also get early access to new content and exclusive bonuses.",
      category: "Subscriptions"
    },
    {
      question: "Do I get lifetime access to products I purchase?",
      answer: "Yes! All products you purchase individually are yours forever. You can access them anytime through your account dashboard. This includes the book, courses, toolkits, and playbooks. Subscription content is available as long as your subscription is active.",
      category: "Products"
    },
    {
      question: "What's included in the Complete P.I.N.K. Mastery Bundle?",
      answer: "The bundle includes everything: The Lost Art of Value book, all 4 core courses (Time, People, Numbers, Knowledge), the 30-Day Value Challenge, Gold Roof Toolkit, Negotiation Playbook, P.I.N.K. Daily Journal (digital), and 1 year of Premium Membership access. It's a $1,297 value for just $497.",
      category: "Products"
    },
    {
      question: "How do the monthly challenges work?",
      answer: "Each challenge runs for a specific duration (21, 30, or 90 days) with daily micro-lessons and actionable steps. You'll receive a new lesson each day, track your progress in our dashboard, and connect with other participants in the community. Challenges are included in Growth and Elite subscriptions, or can be purchased standalone.",
      category: "Challenges"
    },
    {
      question: "What if I fall behind in a challenge?",
      answer: "No problem! All challenge content remains available even after the official end date. You can complete it at your own pace. However, we recommend staying on schedule when possible because the community support and live Q&A sessions are most valuable during the active period.",
      category: "Challenges"
    },
    {
      question: "Is there a community I can join?",
      answer: "Yes! All subscribers get access to our private community forum where you can connect with other value-seekers, share your journey, ask questions, and get support. Elite members also get access to a private mastermind group with quarterly virtual meetups.",
      category: "Support"
    },
    {
      question: "How can I get 1-on-1 coaching?",
      answer: "1-on-1 coaching is included in the Value Master (Elite) subscription, which includes quarterly coaching calls. If you're not ready for the Elite plan, you can also book individual coaching sessions separately through our coaching page.",
      category: "Support"
    },
    {
      question: "What if I have questions about the content?",
      answer: "We offer multiple support channels: the community forum (all subscribers), monthly live Q&A sessions (Growth and Elite), priority email support (Growth and Elite), and direct email access to the author (Elite only). We're committed to your success and are here to help!",
      category: "Support"
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Absolutely. We offer a 14-day money-back guarantee on all subscriptions and products. If you're not completely satisfied, just email us within 14 days for a full refund — no questions asked. We want you to be confident in your investment.",
      category: "Support"
    },
    {
      question: "Do you offer corporate or team pricing?",
      answer: "Yes! We offer special pricing for teams of 5 or more. This includes bulk licenses, team dashboards, and optional private workshops. Contact us at valuetovictory@gmail.com for a custom quote based on your team size and needs.",
      category: "Support"
    }
  ];

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section ref={sectionRef} id="faq" className="relative w-full py-20 lg:py-32 bg-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 w-[600px] h-[600px] bg-[var(--gold)] rounded-full opacity-5 blur-3xl -translate-x-1/2" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">FAQ</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>

          <p className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            Everything you need to know about the P.I.N.K. framework and our programs
          </p>
        </div>

        {/* Category filters */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[var(--gold)] text-black'
                  : 'bg-[var(--bg-light)] text-[var(--text-body)] hover:bg-[var(--gold)]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index}
              className={`border-b border-[var(--border-light)] transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${400 + index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-semibold text-black group-hover:text-[var(--gold)] transition-colors pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[var(--gold)] flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'}`}
              >
                <p className="text-[var(--text-body)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className={`mt-16 text-center transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-[var(--bg-light)] rounded-2xl p-8 lg:p-12 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[var(--gold)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-[var(--gold)]" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Still have questions?</h3>
            <p className="text-[var(--text-body)] mb-6">Can't find the answer you're looking for? Our team is here to help.</p>
            <a 
              href="mailto:valuetovictory@gmail.com"
              className="inline-flex items-center gap-2 btn-primary"
            >
              Contact Support
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
