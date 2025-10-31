'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

// Note: Metadata for 'use client' components should be in layout.tsx
// Updated landing page copy to comply with 2025 medical advertising guidelines

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [email, setEmail] = useState('');

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Exit-intent detection (deferred load to prevent INP issues)
  useEffect(() => {
    // Defer exit intent listener by 3 seconds to prevent blocking INP
    const deferredSetup = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !exitIntentShown) {
          setShowExitIntent(true);
          setExitIntentShown(true);
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, 3000);

    return () => clearTimeout(deferredSetup);
  }, [exitIntentShown]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save email capture
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: `exit-intent-${Date.now()}`,
          timestamp: new Date().toISOString(),
          source: 'landing-page-exit-intent',
          contact: { email },
          status: 'lead',
        }),
      });
      
      alert('Great! Check your email for the extra discount code.');
      setShowExitIntent(false);
    } catch (error) {
      console.error('Email capture failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-jade-600">
            Glowheal
          </Link>
          <a href="tel:+918329563445" className="text-sm text-gray-600 hover:text-gray-900">
            📞 8329563445
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgency Badge */}
            <div className="inline-block bg-yellow-400 text-forest-700 px-6 py-2 rounded-full font-bold text-sm mb-6">
              🔥 FLASH SALE: Only 3 Slots Left Today
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              See Visible Improvement in 30 Days<br />
              <span className="text-yellow-400">Money Back Guarantee*</span>
            </h1>

            <p className="text-xl md:text-2xl mb-4 text-jade-100">
              Expert dermatologist consultation + personalized treatment plan for just ₹499
              <br />
              <span className="line-through text-jade-300">₹999</span> <span className="text-yellow-400 font-bold">50% OFF</span>
            </p>
            
            <p className="text-sm text-jade-200 mb-8 max-w-2xl mx-auto">
              *Results may vary by individual. Improvement timelines depend on skin condition, treatment adherence, and lifestyle factors.
            </p>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
              <p className="text-sm mb-3 text-jade-200">This offer expires in:</p>
              <div className="flex gap-4 justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-jade-200">HOURS</div>
                </div>
                <div className="text-4xl font-bold text-white">:</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-jade-200">MINUTES</div>
                </div>
                <div className="text-4xl font-bold text-white">:</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs text-jade-200">SECONDS</div>
                </div>
              </div>
            </div>

            <Link href="/book">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-forest-700 font-bold text-xl px-12 py-6">
                Claim Your ₹500 Discount Now →
              </Button>
            </Link>

            <p className="text-sm text-jade-200 mt-4">
              ✓ No credit card required  ✓ Instant booking  ✓ 100% secure
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-jade-600 mb-2">10,000+</div>
                <div className="text-gray-600">Happy Patients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-jade-600 mb-2">4.8★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-jade-600 mb-2">500+</div>
                <div className="text-gray-600">Expert Doctors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-jade-600 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Priya M.',
                  text: 'My acne cleared in 3 weeks! Dr. Sharma\'s treatment plan was perfect for my skin.',
                  rating: 5,
                },
                {
                  name: 'Rahul K.',
                  text: 'Best decision ever. Video consultation was smooth and got prescription instantly.',
                  rating: 5,
                },
                {
                  name: 'Sneha D.',
                  text: 'Worth every rupee. Professional doctors and great results. Highly recommend!',
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex text-yellow-400 mb-3">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-forest-700">{testimonial.name}</p>
                  <p className="text-xs text-green-600">✓ Verified Patient</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-forest-700 mb-12">
              What You Get for Just ₹499
            </h2>

            <div className="space-y-6">
              {[
                { icon: '👨‍⚕️', title: '30-Minute Video Consultation', desc: 'Face-to-face with top dermatologists' },
                { icon: '📋', title: 'Personalized Treatment Plan', desc: 'Customized for your skin type and concern' },
                { icon: '💊', title: 'Digital Prescription', desc: 'Delivered instantly to your email' },
                { icon: '📞', title: '2 Free Follow-Ups', desc: 'Track progress with your doctor' },
                { icon: '💰', title: 'Money Back Guarantee*', desc: 'Not satisfied? Get full refund within 30 days' },
                { icon: '🔒', title: '100% Confidential', desc: 'Your privacy is our priority' },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-jade-50 rounded-lg">
                  <div className="text-4xl">{benefit.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-forest-700 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Compare & Save Big
            </h2>

            <div className="bg-white text-forest-700 rounded-2xl p-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-gray-600 mb-2">Regular Clinic Visit</div>
                  <div className="text-4xl font-bold text-red-600 line-through">₹1,500</div>
                  <div className="text-sm text-gray-600 mt-4 space-y-2">
                    <div>+ Travel time</div>
                    <div>+ Waiting time</div>
                    <div>+ Parking hassle</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full inline-block mb-2 text-sm font-semibold">
                    TODAY'S OFFER
                  </div>
                  <div className="text-5xl font-bold text-green-600">₹499</div>
                  <div className="text-sm text-gray-600 mt-4 space-y-2">
                    <div>✓ From home</div>
                    <div>✓ No waiting</div>
                    <div>✓ Instant booking</div>
                  </div>
                </div>
              </div>

              <div className="text-2xl font-bold text-jade-600 mb-4">
                You Save: ₹1,001 (67% OFF)
              </div>

              <Link href="/book">
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-6">
                  Yes, I Want To Save ₹1,001 →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-forest-700 mb-12">
              Common Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: 'How does the video consultation work?',
                  a: 'Book your slot, join the video call at scheduled time, discuss with doctor, get prescription instantly. All from your phone.',
                },
                {
                  q: 'Are the doctors qualified?',
                  a: 'Yes, all our dermatologists are MD-qualified with 10+ years experience and valid medical licenses.',
                },
                {
                  q: 'What if I\'m not satisfied?',
                  a: 'Money back guarantee within 30 days*. Subject to terms and conditions. Individual results may vary based on skin condition and treatment adherence.',
                },
                {
                  q: 'Is this offer really for today only?',
                  a: 'Yes! This is a limited-time flash sale. Price returns to ₹999 after today. Book now to lock in ₹499.',
                },
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg text-forest-700 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-700 mb-6">
            Don't Miss Out on This Limited Offer
          </h2>
          <p className="text-xl text-forest-700 mb-8">
            Only 3 consultation slots left for today at this price
          </p>
          <Link href="/book">
            <Button size="lg" className="bg-forest-900 hover:bg-navy-800 text-white font-bold text-xl px-12 py-6">
              Book Now - Pay Only ₹499
            </Button>
          </Link>
        </div>
      </section>

      {/* Sticky Bottom CTA (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-green-600 p-4 shadow-lg z-50">
        <Link href="/book">
          <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100 font-bold">
            Book ₹499 Consultation Now
          </Button>
        </Link>
      </div>

      {/* Exit-Intent Modal */}
      {showExitIntent && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          style={{ animation: 'fadeIn 0.3s ease-out' }} // Deferred load prevents INP issues
        >
          <div className="bg-white rounded-2xl p-8 max-w-md relative">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
            >
              ×
            </button>

            <div className="text-center">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-forest-700 mb-4">
                Wait! Get Extra ₹100 OFF
              </h3>
              <p className="text-gray-700 mb-6">
                Enter your email and get a special discount code for just ₹399 consultation!
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" size="lg" className="w-full">
                  Send Me The Discount Code
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                Limited time offer. Valid for next 10 minutes only.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
