import { useEffect, useState } from 'react';
import { ArrowRight, LogIn, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { VTV, go } from '@/lib/vtv-links';

// Welcome pop-up, shown once per browser session. Returning members can log in
// first; new visitors are sent to the free assessment. Storage can throw (private
// mode, blocked site data), so every read/write is guarded.
const SEEN_KEY = 'vtv_welcome_seen'; // sessionStorage: already shown this session
const VISITED_KEY = 'vtv_has_visited'; // localStorage: has been here before

const read = (store: () => Storage, key: string) => {
  try { return store().getItem(key); } catch { return null; }
};
const write = (store: () => Storage, key: string, value: string) => {
  try { store().setItem(key, value); } catch { /* storage blocked */ }
};

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    if (read(() => sessionStorage, SEEN_KEY)) return;
    setReturning(read(() => localStorage, VISITED_KEY) === '1');
    const timer = window.setTimeout(() => {
      setOpen(true);
      write(() => sessionStorage, SEEN_KEY, '1');
      write(() => localStorage, VISITED_KEY, '1');
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white border-0 p-0 gap-0 overflow-hidden rounded-2xl sm:max-w-2xl">
        <div className="h-1.5 bg-[var(--gold)]" />

        <div className="px-6 pt-7 pb-5 sm:px-8 text-center">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-black leading-tight">
            {returning ? 'Welcome back' : 'Welcome to Value to Victory'}
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-[var(--text-body)]">
            Members, log in to pick up where you left off. New here? Start with the free assessment.
          </DialogDescription>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 px-6 sm:px-8">
          {/* Returning member: login comes first */}
          <div className="flex flex-col rounded-xl border border-[var(--border-light)] p-5">
            <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center mb-3">
              <LogIn className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-black">Already a member?</h3>
            <p className="text-sm text-[var(--text-body)] mt-1 mb-4 flex-1">Log in to your member portal.</p>
            <button
              onClick={() => go(VTV.member)}
              className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-[var(--gold)] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
            >
              Log In
            </button>
          </div>

          {/* New visitor: free assessment */}
          <div className="flex flex-col rounded-xl border-2 border-[var(--gold)] bg-[var(--gold)]/5 p-5">
            <div className="w-10 h-10 rounded-lg bg-[var(--gold)] text-black flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-black">New here?</h3>
            <p className="text-sm text-[var(--text-body)] mt-1 mb-4 flex-1">See where your time and value stand. Free, no card needed.</p>
            <button
              onClick={() => go(VTV.assessment)}
              className="w-full py-3 bg-[var(--gold)] text-black rounded-xl font-semibold hover:bg-[var(--gold-dark)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Take the Free Assessment
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="py-5 text-center">
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-[var(--text-body)] underline underline-offset-4 hover:text-black"
          >
            Just browsing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
