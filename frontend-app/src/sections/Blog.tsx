import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Clock, User, Tag, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  tags: string[];
}

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showDialog, setShowDialog] = useState(false);
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

  const categories = ['All', 'Time', 'People', 'Numbers', 'Knowledge', 'Mindset', 'Success Stories'];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The 86,400 Second Rule: How to Value Your Time",
      excerpt: "Every day, you receive exactly 86,400 seconds. How you spend them determines the value of your life.",
      content: `Every morning, your account is credited with 86,400 seconds. You can't save them for tomorrow. You can't borrow from yesterday. You can only spend them today.

This is the fundamental truth about time that most people miss. We treat time as if it's infinite, as if there will always be more. But the reality is stark: time is the only resource you can never get back.

The P.I.N.K. framework teaches us that Time is the container for all value. Without time, People, Influence, Numbers, and Knowledge mean nothing. You need time to build relationships, to develop influence, to understand numbers, and to acquire knowledge.

So how do we value our time correctly?

First, audit where your time goes. For one week, track every 15-minute block. You'll be shocked at how much time leaks away on activities that add no value.

Second, identify your peak performance windows. When are you most creative? Most focused? Most energetic? Protect those hours fiercely.

Third, learn to say no. Every yes to something unimportant is a no to something that matters.

Remember: The rich and poor both have 86,400 seconds each day. The difference is how they value them.`,
      author: "Shawn Decker",
      date: "Jan 15, 2025",
      readTime: "5 min read",
      category: "Time",
      image: "/product-time.jpg",
      featured: true,
      tags: ["time management", "productivity", "P.I.N.K. framework"]
    },
    {
      id: 2,
      title: "The 4 Types of People: Who Should Be in Your Circle?",
      excerpt: "Not all relationships are created equal. Learn to identify the four types of people and build your circle strategically.",
      content: `In my years of studying value, I discovered a painful truth: I was surrounded by the wrong people.

The P.I.N.K. framework identifies four types of people you need to understand:

1. The Givers - These people add value to your life unconditionally. They're rare and precious. Identify them and nurture those relationships.

2. The Takers - They drain your energy, time, and resources. They always need something but never give back. Minimize time with these people.

3. The Matchers - They give when they receive. These relationships are transactional but can be valuable when balanced.

4. The Builders - They challenge you to grow. They push you out of your comfort zone. These are your mentors, coaches, and true friends.

The key insight? You need all four types in your life, but in different proportions. Surround yourself with Givers and Builders. Manage your relationships with Matchers. Limit your exposure to Takers.

Your circle determines your success. Choose wisely.`,
      author: "Shawn Decker",
      date: "Jan 10, 2025",
      readTime: "7 min read",
      category: "People",
      image: "/product-people.jpg",
      tags: ["relationships", "networking", "personal growth"]
    },
    {
      id: 3,
      title: "Why Your 'Gold Roof' Might Be Worthless",
      excerpt: "The Gold Roof Fallacy teaches us the dangerous gap between personal preference and actual market value.",
      content: `I once met a man who had spent $200,000 renovating his home. He was convinced it was now worth $500,000 more than he paid for it.

The market disagreed. When he tried to sell, the highest offer was $50,000 less than his purchase price.

This is the Gold Roof Fallacy: mistaking what you value for what the market values.

We see this everywhere:
- The entrepreneur who thinks their idea is worth millions
- The employee who believes they're underpaid
- The investor who falls in love with a stock

The Numbers principle of P.I.N.K. teaches us to be objective. Run the numbers. Get external validation. Understand that value is determined by the market, not by your feelings.

How to avoid the Gold Roof Fallacy:
1. Get multiple opinions on value
2. Look at comparable sales/data
3. Separate emotion from analysis
4. Be willing to accept uncomfortable truths

Your gold roof is only worth what someone will pay for it.`,
      author: "Shawn Decker",
      date: "Jan 5, 2025",
      readTime: "6 min read",
      category: "Numbers",
      image: "/product-goldroof.jpg",
      tags: ["finance", "decision making", "bias"]
    },
    {
      id: 4,
      title: "Where the P.I.N.K. Framework Came From",
      excerpt: "How 24 years of valuing homes led to a framework for valuing a life.",
      content: `For 24 years, my job has been to answer one question: what is this worth?

I've appraised nearly 12,000 homes — more than $4.2 billion in property. The longer I did it, the more I saw the same mistake far outside real estate: most people have no idea what they're truly worth, or what's quietly costing them.

I made that mistake myself. I chased money without understanding what creates it. I built relationships without understanding what sustains them. I made decisions without running the numbers — the one thing my whole career is built on.

The P.I.N.K. framework was born from that realization. Each principle represents a lesson I learned the hard way:

- Time: I wasted years on things that didn't matter
- People: I surrounded myself with the wrong circle
- Influence: I tried to lead without credibility
- Numbers: I made decisions based on hope, not data
- Knowledge: I thought I knew enough. I didn't.

Wherever you're starting from, the first step is the same: start valuing things correctly — your time, your relationships, your numbers, your knowledge. That's what the P.I.N.K. framework is built to help you do.`,
      author: "Shawn Decker",
      date: "Dec 28, 2024",
      readTime: "10 min read",
      category: "Success Stories",
      image: "/product-book.png",
      featured: true,
      tags: ["personal story", "transformation", "resilience"]
    },
    {
      id: 5,
      title: "The 1,800 Hour Rule: Compress Decades into Years",
      excerpt: "How focused learning can accelerate your growth and help you achieve in years what takes others decades.",
      content: `Malcolm Gladwell popularized the 10,000-hour rule for mastery. But what if you don't have 10,000 hours?

The Knowledge principle of P.I.N.K. introduces the 1,800-hour rule: the amount of focused, deliberate learning needed to become highly competent in most skills.

Here's how it breaks down:
- 1 hour per day = 5 years to mastery
- 3 hours per day = 1.6 years to mastery
- 5 hours per day = 1 year to mastery

The key is focused learning. Not passive consumption. Not scrolling through social media. Deliberate practice with feedback.

Strategies for accelerated learning:
1. Find a mentor who's already where you want to be
2. Learn by doing, not just reading
3. Teach what you learn to solidify understanding
4. Apply knowledge immediately in real situations
5. Review and refine continuously

I compressed decades of business knowledge into 3 years of intense study and application. You can do the same.

Time is passing anyway. Why not use it to become who you want to be?`,
      author: "Shawn Decker",
      date: "Dec 20, 2024",
      readTime: "8 min read",
      category: "Knowledge",
      image: "/product-knowledge.jpg",
      tags: ["learning", "skill development", "growth"]
    },
    {
      id: 6,
      title: "Negotiation Secrets: Never Be Underpaid Again",
      excerpt: "The counter-intuitive strategies that helped me go from broke to financially free through better negotiation.",
      content: `One conversation changed my financial life forever.

I was negotiating a consulting contract. The client asked my rate. I named a number. They immediately agreed.

I had underpriced myself by 300%.

That moment taught me the most important rule of negotiation: Whoever mentions a number first, loses.

Here are the negotiation principles from the P.I.N.K. framework:

1. Never name your price first. Ask them what their budget is. If they refuse, give a range that's 2-3x what you'd accept.

2. Use extreme offers. If they offer $50k, counter with $150k. The middle ground becomes $100k.

3. Always negotiate from a position of value. Show them what you'll deliver before discussing price.

4. Be willing to walk away. The person who can walk away has the power.

5. Silence is your friend. After making an offer, shut up. Let them fill the silence.

These strategies helped me increase my income by 400% in two years. They can do the same for you.

Remember: You're not paid what you're worth. You're paid what you negotiate.`,
      author: "Shawn Decker",
      date: "Dec 15, 2024",
      readTime: "6 min read",
      category: "Numbers",
      image: "/product-negotiation.jpg",
      tags: ["negotiation", "salary", "career"]
    }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);

  return (
    <section ref={sectionRef} id="blog" className="relative w-full py-20 lg:py-32 bg-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Insights</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            Latest from the <span className="text-gradient">Blog</span>
          </h2>

          <p className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            Weekly insights on mastering value in every area of your life
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

        {/* Featured post */}
        {featuredPost && activeCategory === 'All' && (
          <div 
            className={`mb-12 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="grid lg:grid-cols-2 gap-8 bg-[var(--bg-light)] rounded-3xl overflow-hidden">
              <div className="relative h-64 lg:h-auto">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[var(--gold)] text-black px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4 text-sm text-[var(--text-body)]">
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4 text-[var(--gold)]" />
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[var(--gold)]" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[var(--gold)]" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4">{featuredPost.title}</h3>
                <p className="text-[var(--text-body)] mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--gold)] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                  </div>
                  <span className="font-medium">{featuredPost.author}</span>
                </div>
                <button 
                  onClick={() => { setSelectedPost(featuredPost); setShowDialog(true); }}
                  className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold group"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <article 
              key={post.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
              onClick={() => { setSelectedPost(post); setShowDialog(true); }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-[var(--text-body)]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[var(--text-body)] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2">
                  {post.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-xs bg-[var(--bg-light)] text-[var(--text-body)] px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all CTA */}
        <div className={`text-center mt-12 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <button className="btn-secondary">
            <BookOpen className="w-5 h-5 mr-2" />
            View All Articles
          </button>
        </div>
      </div>

      {/* Article Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold leading-tight">{selectedPost.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover rounded-xl" />
                
                <div className="flex items-center gap-4 text-sm text-[var(--text-body)]">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[var(--gold)]" />
                    {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[var(--gold)]" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[var(--gold)]" />
                    {selectedPost.readTime}
                  </span>
                </div>

                <div className="flex gap-2">
                  {selectedPost.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-[var(--gold)]/10 text-[var(--gold)] px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-lg max-w-none">
                  {selectedPost.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-[var(--text-body)] leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="bg-[var(--bg-light)] rounded-xl p-6">
                  <p className="font-semibold mb-2">Enjoyed this article?</p>
                  <p className="text-sm text-[var(--text-body)] mb-4">Get weekly insights delivered to your inbox.</p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    />
                    <button className="btn-primary">Subscribe</button>
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

export default Blog;
