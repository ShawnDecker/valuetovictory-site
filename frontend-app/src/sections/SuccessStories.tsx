import { useEffect, useRef, useState } from 'react';
import { Star, Quote, TrendingUp, Users, Clock, DollarSign, ArrowRight, Play, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface SuccessStory {
  id: number;
  name: string;
  title: string;
  company?: string;
  image: string;
  quote: string;
  fullStory: string;
  results: { metric: string; value: string; icon: React.ReactNode }[];
  before: string;
  after: string;
  program: string;
  rating: number;
  videoUrl?: string;
}

const SuccessStories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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

  const stories: SuccessStory[] = [
    {
      id: 1,
      name: "Michael Torres",
      title: "Former Restaurant Owner",
      company: "Now Tech Entrepreneur",
      image: "/testimonial-client.jpg",
      quote: "I was $340,000 in debt and ready to give up. The P.I.N.K. framework didn't just save my business—it saved my life.",
      fullStory: `When I first discovered the P.I.N.K. framework, I was at rock bottom. My restaurant had failed during the pandemic, leaving me with $340,000 in debt. I was sleeping in my car, too ashamed to tell my family.

The Time principle hit me first. I realized I'd been spending my days on urgent but unimportant tasks—firefighting instead of building. I started tracking every hour and discovered I was wasting 4+ hours daily on things that didn't move the needle.

The Numbers principle was brutal but necessary. I had to face the reality of my situation. I ran the numbers on every possible path forward. The data showed me that pivoting to food delivery technology was my best option, even though it meant starting over.

The People principle helped me rebuild my network. I reached out to mentors, joined entrepreneur groups, and slowly built a circle of people who believed in me. These relationships became my lifeline.

Today, 18 months later, I've built a successful food tech startup that's valued at $2.3 million. I'm debt-free, employed 12 people, and most importantly—I understand value in a way I never did before.

The P.I.N.K. framework didn't just change my business. It changed how I see everything.`,
      results: [
        { metric: "Debt Eliminated", value: "$340,000", icon: <DollarSign className="w-5 h-5" /> },
        { metric: "Company Valuation", value: "$2.3M", icon: <TrendingUp className="w-5 h-5" /> },
        { metric: "Jobs Created", value: "12", icon: <Users className="w-5 h-5" /> },
        { metric: "Time to Success", value: "18 months", icon: <Clock className="w-5 h-5" /> }
      ],
      before: "$340K debt, unemployed, sleeping in car",
      after: "Debt-free, $2.3M company, 12 employees",
      program: "Value Master (Elite) + 90-Day P.I.N.K. Mastery",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "Marketing Manager",
      company: "Fortune 500 Company",
      image: "/about-image.jpg",
      quote: "I negotiated a 47% salary increase using the negotiation scripts. I had been underpaid for years and didn't even know it.",
      fullStory: `I was a marketing manager at a Fortune 500 company, working 60-hour weeks, and making $68,000 a year. I thought I was doing well—until I discovered the Numbers principle.

I started researching market rates for my position and experience level. The data was shocking: the median salary for my role was $95,000-$110,000. I was being underpaid by $30,000+ annually.

But knowing the numbers wasn't enough. I needed the confidence to negotiate. The Negotiation Playbook gave me the exact scripts and strategies I needed. I learned the "whoever mentions a number first, loses" rule. I practiced the extreme offer technique.

When my annual review came, I was ready. Instead of accepting the standard 3% raise, I presented my market research and asked for $100,000. They countered with $95,000—and I got a $27,000 raise in one conversation.

That conversation changed my life. I realized I'd been leaving money on the table for years. Since then, I've helped three friends negotiate raises totaling over $80,000 combined.

The P.I.N.K. framework taught me that you're not paid what you're worth—you're paid what you negotiate.`,
      results: [
        { metric: "Salary Increase", value: "47%", icon: <TrendingUp className="w-5 h-5" /> },
        { metric: "Additional Annual Income", value: "$27,000", icon: <DollarSign className="w-5 h-5" /> },
        { metric: "10-Year Value", value: "$270K+", icon: <DollarSign className="w-5 h-5" /> }
      ],
      before: "$68K salary, working 60 hrs/week, afraid to negotiate",
      after: "$95K salary, better boundaries, confident negotiator",
      program: "Value Builder (Growth) + Negotiation Playbook",
      rating: 5
    },
    {
      id: 3,
      name: "David & Lisa Morrison",
      title: "Married Couple",
      company: "Parents of 3",
      image: "/transformation-bg.jpg",
      quote: "The People principle saved our marriage. We learned to value each other correctly for the first time in 15 years.",
      fullStory: `We were on the verge of divorce. After 15 years of marriage, three kids, and countless arguments about money, time, and priorities, we were done. We had tried couples therapy, read books, nothing worked.

Then a friend recommended the P.I.N.K. framework. We started with the book, reading it together each night. The People principle opened our eyes to something we'd never considered: we were valuing each other incorrectly.

I (David) had been treating Lisa like a Taker—someone who drained my energy—when really, she was a Giver who felt unappreciated. Lisa had been seeing me as a Matcher, keeping score of everything, when I was trying to be a Builder for our family.

The 4 Types of People assessment helped us see our patterns. We realized we'd been stuck in a cycle of miscommunication and misaligned expectations. We weren't bad people—we just didn't understand how to value each other.

We committed to the 30-Day Value Challenge together. Each day, we practiced one principle: valuing each other's time, expressing gratitude, running the numbers on our decisions together, learning about each other's needs.

Six months later, we're happier than we've ever been. We have weekly "value meetings" where we review our week through the P.I.N.K. lens. Our kids have noticed the difference. Our friends ask what changed.

The P.I.N.K. framework didn't just save our marriage—it transformed it into something better than we ever imagined.`,
      results: [
        { metric: "Marriage Satisfaction", value: "9/10", icon: <Star className="w-5 h-5" /> },
        { metric: "Weekly Arguments", value: "Down 90%", icon: <TrendingUp className="w-5 h-5" /> },
        { metric: "Family Activities", value: "3x/week", icon: <Users className="w-5 h-5" /> }
      ],
      before: "Near divorce, constant fighting, considering separation",
      after: "Strongest marriage ever, weekly value meetings, happy family",
      program: "Value Builder (Growth) + 30-Day Challenge (couples)",
      rating: 5
    },
    {
      id: 4,
      name: "Jennifer Walsh",
      title: "Single Mom",
      company: "Now Freelance Consultant",
      image: "/hero-image.jpg",
      quote: "As a single mom working two jobs, I thought I had no time. The Time Mastery Workshop showed me I had 28 hours a week I was wasting.",
      fullStory: `I was exhausted. Working two jobs, raising two kids alone, and barely making ends meet. I told myself I had no time for anything else—no time to learn, no time to grow, no time to build a better life.

Then I took the Time Mastery Workshop. The first exercise was a time audit. I tracked every 15 minutes for a week. The results shocked me: I was spending 4 hours a day on social media, 2 hours watching TV, and 1.5 hours commuting without using that time productively.

That's 7.5 hours a day—52.5 hours a week—of time I was wasting. Even accounting for necessary rest, I had 25-30 hours a week I could use differently.

I started using my commute to listen to business podcasts. I cut social media to 30 minutes a day. I used the evenings after my kids went to bed to learn digital marketing skills.

Within 6 months, I had built enough skills to quit one job and start freelance consulting. Within a year, I was making more from consulting than both my previous jobs combined—while working fewer hours and being home with my kids more.

The Time principle taught me that we all have the same 86,400 seconds. The difference is how we value them.`,
      results: [
        { metric: "Time Reclaimed", value: "28 hrs/week", icon: <Clock className="w-5 h-5" /> },
        { metric: "Income Increase", value: "340%", icon: <DollarSign className="w-5 h-5" /> },
        { metric: "Work Hours", value: "Cut in half", icon: <Clock className="w-5 h-5" /> }
      ],
      before: "Two jobs, exhausted, no time, barely making ends meet",
      after: "Successful consultant, more time with kids, financial security",
      program: "Value Seeker (Starter) + Time Mastery Workshop",
      rating: 5
    }
  ];

  return (
    <section ref={sectionRef} id="success-stories" className="relative w-full py-20 lg:py-32 bg-[var(--bg-light)]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Transformations</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            Real People, <span className="text-gradient">Real Results</span>
          </h2>

          <p className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            Thousands have transformed their lives using the P.I.N.K. framework. Here are their stories.
          </p>
        </div>

        {/* Stats bar */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          {[
            { value: "5,000+", label: "Success Stories" },
            { value: "$12M+", label: "Debt Eliminated" },
            { value: "47%", label: "Avg Salary Increase" },
            { value: "98%", label: "Would Recommend" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl lg:text-4xl font-bold text-[var(--gold)] mb-2">{stat.value}</div>
              <div className="text-sm text-[var(--text-body)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div 
              key={story.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image side */}
                <div className="md:col-span-2 relative h-64 md:h-full">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  
                  {/* Video play button (if video available) */}
                  {story.videoUrl && (
                    <button 
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-16 h-16 bg-[var(--gold)] rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-black ml-1" />
                      </div>
                    </button>
                  )}
                </div>
                
                {/* Content side */}
                <div className="md:col-span-3 p-6 lg:p-8">
                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="w-8 h-8 text-[var(--gold)]/30 absolute -top-2 -left-2" />
                    <p className="text-[var(--text-body)] italic pl-4">{story.quote}</p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <div className="font-bold text-black">{story.name}</div>
                      <div className="text-sm text-[var(--text-body)]">{story.title}</div>
                      {story.company && <div className="text-xs text-[var(--gold)]">{story.company}</div>}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>

                  {/* Results preview */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {story.results.slice(0, 2).map((result, i) => (
                      <div key={i} className="bg-[var(--bg-light)] rounded-lg p-3">
                        <div className="flex items-center gap-2 text-[var(--gold)] mb-1">
                          {result.icon}
                          <span className="text-xs font-semibold uppercase">{result.metric}</span>
                        </div>
                        <div className="text-lg font-bold text-black">{result.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button 
                    onClick={() => { setSelectedStory(story); setShowDialog(true); }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)] group-hover:underline"
                  >
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <p className="text-[var(--text-body)] mb-4">Ready to write your own success story?</p>
          <a href="#subscriptions" className="btn-primary inline-flex">
            Start Your Transformation
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>

      {/* Full Story Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedStory && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <img src={selectedStory.image} alt={selectedStory.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div>
                  <h3 className="text-2xl font-bold">{selectedStory.name}</h3>
                  <p className="text-[var(--text-body)]">{selectedStory.title}</p>
                  {selectedStory.company && <p className="text-[var(--gold)]">{selectedStory.company}</p>}
                  <div className="flex gap-1 mt-2">
                    {[...Array(selectedStory.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Before/After */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <div className="text-sm font-semibold text-red-600 mb-2">BEFORE</div>
                  <p className="text-[var(--text-body)]">{selectedStory.before}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="text-sm font-semibold text-green-600 mb-2">AFTER</div>
                  <p className="text-[var(--text-body)]">{selectedStory.after}</p>
                </div>
              </div>

              {/* Results */}
              <div>
                <h4 className="font-bold mb-3">Results</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedStory.results.map((result, i) => (
                    <div key={i} className="bg-[var(--bg-light)] rounded-xl p-4 text-center">
                      <div className="text-[var(--gold)] mb-2 flex justify-center">{result.icon}</div>
                      <div className="text-xl font-bold text-black">{result.value}</div>
                      <div className="text-xs text-[var(--text-body)]">{result.metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Story */}
              <div>
                <h4 className="font-bold mb-3">Their Story</h4>
                <div className="prose prose-lg max-w-none">
                  {selectedStory.fullStory.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-[var(--text-body)] leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Program */}
              <div className="bg-[var(--gold)]/10 rounded-xl p-4">
                <div className="text-sm text-[var(--text-body)] mb-1">Program Used:</div>
                <div className="font-semibold">{selectedStory.program}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="sm:max-w-4xl p-0">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center z-10 hover:bg-white/30"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Video testimonial would play here</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SuccessStories;
