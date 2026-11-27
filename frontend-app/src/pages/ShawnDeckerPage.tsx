import { useState } from 'react';
import { Star, BookOpen, Gift, Tv, Quote, Mail, User, MapPin, Flame, AlertTriangle, Facebook, Phone, Headphones, BookText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VTV, go } from '@/lib/vtv-links';

const IMG = '/shawnedecker';

export default function ShawnDeckerPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    // Hand off to the real free-book signup on the funnel app.
    go(formData.email ? `${VTV.freeBook}?email=${encodeURIComponent(formData.email)}` : VTV.freeBook);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] texture-overlay">
      {/* Hero Section */}
      <section className="gritty-bg text-gray-300 py-16 md:py-24 relative">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Flame className="w-5 h-5 rust-accent" />
            <p className="text-sm md:text-base rust-accent tracking-widest uppercase">
              Still Fighting. Still Standing. Not Done Yet.
            </p>
            <Flame className="w-5 h-5 rust-accent" />
          </div>
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-gray-500 mb-6 italic">
              "I thought I had it all figured out. I was wrong."
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl stressed-heading mb-6 leading-tight text-gray-200">
              I've Built Success<br />
              <span className="rust-text">But Something's Missing</span><br />
              <span className="text-2xl md:text-4xl text-gray-500">And I'm Not Afraid To Admit It</span>
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="text-center px-4 py-2 border border-gray-800 bg-black/30">
              <p className="text-lg md:text-xl rust-accent font-bold">"Raw"</p>
            </div>
            <div className="text-center px-4 py-2 border border-gray-800 bg-black/30">
              <p className="text-lg md:text-xl rust-accent font-bold">"Unfiltered"</p>
            </div>
            <div className="text-center px-4 py-2 border border-gray-800 bg-black/30">
              <p className="text-lg md:text-xl rust-accent font-bold">"Real"</p>
            </div>
          </div>
          <div className="weathered-card rounded-sm p-6 md:p-8 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-center leading-relaxed text-gray-400">
              I'm giving away 1 million copies of my book <em className="rust-accent font-bold not-italic">Running From Miracles</em> because I know what it's like to have everything and still feel empty. This isn't about selling books. This is about finding peace.
            </p>
            <div className="scratched-divider my-6"></div>
            <p className="text-center text-gray-500 text-sm">
              Featured on national television reaching millions
            </p>
          </div>
        </div>
      </section>

      {/* Book & Author Section */}
      <section className="py-16 md:py-24 dimmed-section">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={`${IMG}/book-cover.jpg`}
                  alt="Book Cover"
                  className="w-full max-w-md rounded-lg shadow-2xl mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#1a1a1a] border border-gray-800 px-4 py-2">
                  <p className="text-xs rust-accent uppercase tracking-wider">Limited Giveaway</p>
                </div>
              </div>
              <div className="flex justify-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 rust-accent fill-current opacity-70" />
                ))}
              </div>
            </div>
            <div className="text-center md:text-left">
              <div className="relative inline-block mb-6">
                <img
                  src={`${IMG}/shawn-real.png`}
                  alt="Shawn Decker"
                  className="w-48 h-48 md:w-56 md:h-56 object-cover mx-auto md:mx-0 border-2 border-gray-800 shadow-xl"
                />
                <div className="absolute -bottom-2 -left-2 w-full h-full border-2 border-[#5a4a3a] -z-10"></div>
              </div>
              <h2 className="text-3xl md:text-4xl stressed-heading text-gray-200 mb-2">Shawn Decker</h2>
              <p className="text-lg text-gray-500 mb-6 italic">"I'm still figuring it out, just like you."</p>
              <div className="space-y-4 text-gray-400">
                <p className="text-sm leading-relaxed">
                  Father. Coach. Author. Entrepreneur. Founder of <span className="rust-accent">Value to Victory</span>. Motivational speaker with <span className="rust-accent">The Power of Value</span>. I've worn all these hats. I've built businesses. I've been on TV. From the outside, it looks like success.
                </p>
                <p className="text-sm leading-relaxed">
                  But here's what they don't tell you: <span className="rust-accent">success without purpose is just noise.</span> I spent years running from the very thing I needed most.
                </p>
                <p className="text-sm leading-relaxed">
                  This book is my confession. My struggle. My unfinished journey.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-600">
                  <span className="rust-accent">4,136</span> followers · Roanoke, VA · Savannah native
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 rust-accent" />
                  <span className="text-xs rust-accent uppercase tracking-wider">Reader Warning</span>
                </div>
                <p className="text-gray-500 text-sm italic">
                  "This book doesn't give you easy answers. It gives you honest questions."
                </p>
                <p className="text-gray-600 text-xs mt-1">- Early Reader</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Raw Truth Section */}
      <section className="py-16 md:py-20 gritty-bg">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-700"></div>
            <Flame className="w-6 h-6 rust-accent" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-700"></div>
          </div>
          <h2 className="text-2xl md:text-4xl stressed-heading text-gray-200 mb-8">
            The Truth Nobody Wants To Hear
          </h2>
          <div className="weathered-card p-8 md:p-12 mb-10">
            <Quote className="w-8 h-8 rust-accent mx-auto mb-6 opacity-50" />
            <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed mb-6">
              "You can have the house, the cars, the recognition, the bank account... and still wake up at 3 AM wondering if any of it matters."
            </p>
            <p className="text-gray-500">- Shawn Decker</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="border border-gray-800 p-6 bg-black/20">
              <p className="text-3xl rust-accent font-bold mb-2">93M</p>
              <p className="text-gray-500 text-sm">Homes Reached</p>
              <p className="text-gray-600 text-xs mt-2">And I still feel like I'm shouting into the void</p>
            </div>
            <div className="border border-gray-800 p-6 bg-black/20">
              <p className="text-3xl rust-accent font-bold mb-2">200</p>
              <p className="text-gray-500 text-sm">Nations</p>
              <p className="text-gray-600 text-xs mt-2">But I'm still searching for where I belong</p>
            </div>
            <div className="border border-gray-800 p-6 bg-black/20">
              <p className="text-3xl rust-accent font-bold mb-2">1M</p>
              <p className="text-gray-500 text-sm">Books To Give Away</p>
              <p className="text-gray-600 text-xs mt-2">Because I can't keep this to myself anymore</p>
            </div>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="worn-button text-gray-200 font-bold text-lg px-10 py-4 uppercase tracking-widest"
          >
            Get The Book — It's Free
          </button>
          <p className="text-gray-600 text-sm mt-4">Plus instant access to the Free Members Resource Area</p>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-16 md:py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs rust-accent uppercase tracking-widest mb-4">They Let Me On TV Anyway</p>
            <h2 className="text-3xl md:text-4xl stressed-heading text-gray-300">AS FEATURED ON</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-12">
            <div className="border border-gray-800 px-8 py-4 bg-black/40">
              <span className="text-xl font-bold text-gray-500">WORD Network</span>
            </div>
            <div className="border border-gray-800 px-8 py-4 bg-black/40">
              <span className="text-xl font-bold text-gray-500">BNC</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src={`${IMG}/shawn-tv.png`}
              alt="Shawn Decker on TV set"
              className="rounded-sm shadow-xl w-full grayscale-[40%] contrast-110 border border-gray-800"
            />
            <div>
              <p className="text-gray-500 mb-4 text-sm">
                On set with TC Bradley. Nationally syndicated. Millions watching.
              </p>
              <div className="worn-quote pl-6 py-4">
                <Quote className="w-6 h-6 rust-accent mb-3 opacity-50" />
                <p className="text-gray-400 italic leading-relaxed text-lg">
                  "Shawn Decker doesn't pretend to have all the answers. That's exactly why people need to hear what he has to say. He's proof that you can be successful and still be searching."
                </p>
                <p className="text-gray-500 mt-4 font-bold">- TC Bradley</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Section - From Email */}
      <section className="py-16 md:py-20 dimmed-section border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Gift className="w-5 h-5 rust-accent" />
            <span className="text-sm rust-accent uppercase tracking-widest">A Special Offer</span>
          </div>
          <h2 className="text-2xl md:text-3xl stressed-heading text-gray-200 mb-4">
            Want To Listen While You Work Or Drive?
          </h2>
          <h3 className="text-lg md:text-xl text-gray-500 mb-8">
            Prefer To Turn Real Pages?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="weathered-card p-8 text-center">
              <Headphones className="w-12 h-12 rust-accent mx-auto mb-4" />
              <h4 className="text-xl stressed-heading text-gray-300 mb-2">AUDIOBOOK</h4>
              <p className="text-gray-500 text-sm mb-4">Listen on the go. In your car. At the gym. While you work.</p>
              <p className="text-3xl rust-accent font-bold mb-2">$9.97</p>
              <button onClick={() => go(VTV.audiobook)} className="worn-button text-gray-200 font-bold px-6 py-2 uppercase tracking-wider text-sm mt-4">
                Get Audiobook
              </button>
            </div>
            <div className="weathered-card p-8 text-center border-gray-700 relative">
              <div className="absolute top-4 right-4 bg-red-900/80 text-red-200 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Sold Out
              </div>
              <BookText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h4 className="text-xl stressed-heading text-gray-500 mb-2">PAPERBACK</h4>
              <p className="text-gray-600 text-sm mb-4">Hold it in your hands. Underline the parts that hit home.</p>
              <p className="text-3xl text-gray-600 font-bold mb-2 line-through">$11.97</p>
              <p className="text-xs text-gray-600 uppercase tracking-wider line-through">FREE Shipping</p>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-3">Get notified when back in stock:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-[#0a0a0a] border border-gray-700 text-gray-300 text-sm px-3 py-2 placeholder:text-gray-600"
                  />
                  <button type="button" className="bg-gray-700 text-gray-300 text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-gray-600 transition-colors">
                    Notify Me
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            It's great to have options! Order your own copy today.
          </p>
        </div>
      </section>

      {/* The Invitation */}
      <section className="py-16 md:py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 rust-accent" />
            <span className="text-sm rust-accent uppercase tracking-widest">Free Book</span>
          </div>
          <h2 className="text-2xl md:text-3xl stressed-heading text-gray-200 mb-4">
            I'm Not Here To Sell You Anything
          </h2>
          <h3 className="text-lg md:text-xl text-gray-500 mb-8 italic">
            I'm here because I can't keep running anymore. And maybe you can't either.
          </h3>
          <div className="weathered-card p-8 md:p-12 mb-8">
            <Quote className="w-10 h-10 rust-accent mx-auto mb-6 opacity-40" />
            <p className="text-lg md:text-xl text-gray-400 italic leading-relaxed">
              "No matter how far you are from God, where you are in your life, where you grew up, or from which side of the tracks you came — God is waiting for you to come home to Him. And I'm still learning what that means."
            </p>
            <div className="scratched-divider my-6 mx-auto max-w-xs"></div>
            <p className="text-gray-500">- Shawn Decker</p>
          </div>
          <div className="bg-black/30 border border-gray-800 p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-gray-400 text-sm leading-relaxed">
              This book won't fix your life. I can't promise that. But it might help you stop running from the things that matter most. It helped me start my journey back. Maybe it can help you start yours.
            </p>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="worn-button text-gray-200 font-bold text-lg px-10 py-4 uppercase tracking-widest"
          >
            Get Your Free Copy
          </button>
          <p className="text-gray-600 text-sm mt-4">Delivered to your inbox. No spam. Just the book.</p>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm italic">
              <span className="rust-accent font-bold not-italic">P.S.</span> Watch your inbox for another special offer from me!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-gray-900 text-gray-500 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Gift className="w-5 h-5 rust-accent" />
                The Giveaway
              </h3>
              <p className="text-sm text-gray-600">
                1 million copies. Not because I'm rich. Because I believe in this message more than I believe in making money from it.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <BookOpen className="w-5 h-5 rust-accent" />
                The Book
              </h3>
              <p className="text-sm text-gray-600">
                Raw. Unfiltered. The story of a man who had it all and realized he had nothing. And the journey back.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Tv className="w-5 h-5 rust-accent" />
                The Platform
              </h3>
              <p className="text-sm text-gray-600">
                They put me on TV. Millions watched. And I'm still just a guy trying to figure it out.
              </p>
            </div>
          </div>
          <div className="scratched-divider mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-xs">3735 Franklin Rd SW, #143, Roanoke, VA 24014</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-xs">540-632-6503</span>
            </div>
            <p className="text-gray-700 text-xs">Shawn E. Decker - ©2020 All Rights Reserved</p>
          </div>
          <div className="text-center mt-8">
            <p className="text-xl rust-accent tracking-widest uppercase">Value to Victory</p>
            <p className="text-xs text-gray-700 mt-2">Still under construction. Like all of us.</p>
            <a
              href="https://www.facebook.com/ShawnVTV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-gray-500 hover:text-[#cd7f32] transition-colors"
              aria-label="Shawn Decker on Facebook"
            >
              <Facebook className="w-5 h-5" />
              <span className="text-sm">Facebook</span>
            </a>
          </div>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#141414] border-gray-800 text-gray-300">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-200 uppercase tracking-wider">
              Get The Book
            </DialogTitle>
          </DialogHeader>
          <div className="text-center mb-4">
            <p className="text-gray-500 text-sm">No sales pitch. No upsells. Just the book.</p>
            <p className="rust-accent text-xs mt-2 uppercase tracking-wider">
              + Free Members Resource Area Access
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 bg-[#0a0a0a] border-gray-800 text-gray-300 placeholder:text-gray-600"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 bg-[#0a0a0a] border-gray-800 text-gray-300 placeholder:text-gray-600"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full worn-button text-gray-200 font-bold py-3 uppercase tracking-widest"
            >
              Send Me The Book
            </Button>
          </form>
          <p className="text-xs text-gray-600 text-center mt-4">
            Running From Miracles will be delivered to your inbox.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
