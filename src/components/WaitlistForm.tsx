
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-custom/Button';
import { Check, Loader2 } from 'lucide-react';
import { AnimatedSection } from './AnimatedSections';
import { useAuth } from '@/contexts/AuthContext';

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<'creator' | 'brand' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!userType) {
      setError('Please select if you are a creator or a brand');
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // In a real app, you'd send this data to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Redirect to registration page after successful submission
      setTimeout(() => {
        navigate('/register');
      }, 1500);
    }, 1500);
  };

  return (
    <section id="waitlist" className="relative py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-in" className="glass-panel rounded-2xl border border-gray-100 p-8 md:p-12 shadow-lg">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-4">
                Limited Beta Access
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Join Our Waitlist
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Be among the first to try BrandMatchBot and start matching with the perfect partners for your brand or creator profile.
              </p>
            </div>
            
            {isAuthenticated ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're Already Registered!</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  You've already signed up for BrandMatchBot. Access your dashboard to start exploring sponsorship opportunities.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-brand-600 hover:bg-brand-700"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              </div>
            ) : isSubmitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  You've been added to our waitlist. We'll notify you when we're ready to welcome you to BrandMatchBot.
                </p>
                <p className="text-gray-600 mt-4">Redirecting to registration...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setUserType('creator')}
                        className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                          userType === 'creator' 
                            ? 'border-brand-600 bg-brand-50 text-brand-700' 
                            : 'border-gray-300 text-gray-600 hover:border-brand-300'
                        }`}
                      >
                        Content Creator
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType('brand')}
                        className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                          userType === 'brand' 
                            ? 'border-brand-600 bg-brand-50 text-brand-700' 
                            : 'border-gray-300 text-gray-600 hover:border-brand-300'
                        }`}
                      >
                        Brand
                      </button>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    className="bg-brand-600 hover:bg-brand-700 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining Waitlist...
                      </>
                    ) : (
                      'Join Waitlist'
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By joining, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
