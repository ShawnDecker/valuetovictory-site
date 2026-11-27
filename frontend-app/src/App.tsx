import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Book from './sections/Book';
import Services from './sections/Services';
import AISkills from './sections/AISkills';
import VideoDesign from './sections/VideoDesign';
import DesignSamples from './sections/DesignSamples';
import Transformation from './sections/Transformation';
import Subscriptions from './sections/Subscriptions';
import Resources from './sections/Resources';
import Products from './sections/Products';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import WelcomePopup from './sections/WelcomePopup';

// Template sections with fabricated content are intentionally NOT rendered until the
// marketing-page rebuild replaces them with REAL content:
//   SuccessStories + Testimonials — fabricated endorsements + "98%/5,000+" stats
//   Blog          — fake posts
//   Pricing       — duplicate fake card-collection checkout + wrong prices + false money-back
//   Challenges    — fake "redirect to purchase" alert
//   FAQ           — wrong prices/tiers + false 14-day money-back + placeholder email
// Kept sections were verified free of false stats/testimonials/guarantees.

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Book />
        <Services />
        <AISkills />
        <VideoDesign />
        <DesignSamples />
        <Products />
        <Transformation />
        {/* Resources re-added 2026-07-10 as an honest section: free tools open the
            real assessment, email -> real signup, no fake downloads. */}
        <Resources />
        <Subscriptions />
        <CTA />
      </main>
      <Footer />
      <WelcomePopup />
    </div>
  );
}

export default App;
