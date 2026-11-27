import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Target, Trophy, Users, ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VTV, go } from '@/lib/vtv-links';

interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: string;
  includedIn: string[];
  standalonePrice: number;
  dailyCommitment: string;
  outcomes: string[];
  image: string;
  status: 'active' | 'upcoming' | 'completed';
  participants: number;
}

const Challenges = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
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

  const challenges: Challenge[] = [
    {
      id: '30-day-value',
      name: '30-Day Value Challenge',
      description: 'Transform your relationship with value in just 30 days. Daily micro-lessons and actionable steps.',
      duration: '30 days',
      includedIn: ['growth', 'elite'],
      standalonePrice: 67,
      dailyCommitment: '15-30 minutes',
      outcomes: [
        'Complete time audit and optimization',
        'Relationship value assessment',
        'Personal finance analysis',
        'Knowledge investment plan',
        'Influence building strategy'
      ],
      image: '/product-challenge.jpg',
      status: 'active',
      participants: 1247
    },
    {
      id: '90-day-mastery',
      name: '90-Day P.I.N.K. Mastery',
      description: 'Deep dive into all five principles over 90 days. The ultimate transformation journey.',
      duration: '90 days',
      includedIn: ['elite'],
      standalonePrice: 197,
      dailyCommitment: '30-45 minutes',
      outcomes: [
        'Master Time Management',
        'Build Powerful Relationships',
        'Understand Financial Numbers',
        'Accelerate Knowledge Growth',
        'Expand Your Influence'
      ],
      image: '/product-time.jpg',
      status: 'upcoming',
      participants: 0
    },
    {
      id: '21-day-negotiation',
      name: '21-Day Negotiation Sprint',
      description: 'Master the art of getting what you\'re worth in just 3 weeks.',
      duration: '21 days',
      includedIn: ['growth', 'elite'],
      standalonePrice: 47,
      dailyCommitment: '10-15 minutes',
      outcomes: [
        'Learn when to mention numbers first',
        'Master extreme offer strategies',
        'Negotiate salary raises',
        'Handle contractor negotiations',
        'Build confidence in any deal'
      ],
      image: '/product-negotiation.jpg',
      status: 'upcoming',
      participants: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Active Now</span>;
      case 'upcoming':
        return <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Coming Soon</span>;
      case 'completed':
        return <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Completed</span>;
    }
  };

  return (
    <section ref={sectionRef} id="challenges" className="relative w-full py-20 lg:py-32 bg-[var(--bg-light)]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[var(--gold)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">Challenges</span>
            <div className="w-8 h-[2px] bg-[var(--gold)]" />
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            Monthly <span className="text-gradient">Challenges</span>
          </h2>

          <p className={`text-lg text-[var(--text-body)] transition-all duration-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            Structured programs to accelerate your transformation. Join thousands of others on the journey.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <div 
              key={challenge.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="relative">
                <img src={challenge.image} alt={challenge.name} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(challenge.status)}
                </div>
                {challenge.status === 'upcoming' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Lock className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-[var(--gold)] transition-colors">
                  {challenge.name}
                </h3>
                <p className="text-[var(--text-body)] text-sm mb-4">{challenge.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-[var(--text-body)]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[var(--gold)]" />
                    {challenge.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[var(--gold)]" />
                    {challenge.dailyCommitment}/day
                  </div>
                </div>

                {challenge.status === 'active' && (
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Users className="w-4 h-4 text-[var(--gold)]" />
                    <span className="text-[var(--text-body)]">{challenge.participants.toLocaleString()} participants</span>
                  </div>
                )}

                {/* Outcomes preview */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-[var(--text-body)] uppercase mb-2">You'll achieve:</p>
                  <ul className="space-y-1">
                    {challenge.outcomes.slice(0, 3).map((outcome, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-body)]">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {outcome}
                      </li>
                    ))}
                    {challenge.outcomes.length > 3 && (
                      <li className="text-sm text-[var(--gold)]">+{challenge.outcomes.length - 3} more</li>
                    )}
                  </ul>
                </div>

                {/* Included in */}
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-4 h-4 text-[var(--gold)]" />
                  <span className="text-xs text-[var(--text-body)]">
                    Included in: {challenge.includedIn.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')} plans
                  </span>
                </div>

                <button 
                  onClick={() => { setSelectedChallenge(challenge); setShowDialog(true); }}
                  className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-[var(--gold)] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {challenge.status === 'active' ? 'Join Challenge' : 'Get Notified'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How Challenges Work */}
        <div className={`mt-20 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <h3 className="text-2xl font-bold text-center mb-12">How Challenges Work</h3>
          <div className="grid sm:grid-cols-4 gap-8">
            {[
              { icon: <Target className="w-8 h-8" />, title: 'Set Your Goal', desc: 'Choose a challenge aligned with your transformation goals' },
              { icon: <Calendar className="w-8 h-8" />, title: 'Daily Actions', desc: 'Complete bite-sized lessons and exercises each day' },
              { icon: <Users className="w-8 h-8" />, title: 'Community Support', desc: 'Connect with fellow challengers for accountability' },
              { icon: <Trophy className="w-8 h-8" />, title: 'Celebrate Wins', desc: 'Track progress and celebrate your transformation' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[var(--gold)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[var(--gold)]">
                  {step.icon}
                </div>
                <h4 className="font-bold text-black mb-2">{step.title}</h4>
                <p className="text-sm text-[var(--text-body)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedChallenge?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedChallenge && (
            <div className="space-y-6 py-4">
              <img src={selectedChallenge.image} alt={selectedChallenge.name} className="rounded-xl w-full" />
              
              <p className="text-[var(--text-body)]">{selectedChallenge.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--bg-light)] rounded-xl p-4">
                  <div className="text-sm text-[var(--text-body)]">Duration</div>
                  <div className="font-bold">{selectedChallenge.duration}</div>
                </div>
                <div className="bg-[var(--bg-light)] rounded-xl p-4">
                  <div className="text-sm text-[var(--text-body)]">Daily Time</div>
                  <div className="font-bold">{selectedChallenge.dailyCommitment}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">What You'll Achieve:</h4>
                <ul className="space-y-2">
                  {selectedChallenge.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--gold)]/10 rounded-xl p-4">
                <p className="text-sm">
                  <span className="font-semibold">Included in:</span>{' '}
                  {selectedChallenge.includedIn.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')} plans
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Or buy standalone:</span>{' '}
                  ${selectedChallenge.standalonePrice}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowDialog(false);
                  go(VTV.challenge);
                }}
                className="w-full btn-primary"
              >
                {selectedChallenge.status === 'active' ? 'Join Now' : 'Notify Me'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Challenges;
