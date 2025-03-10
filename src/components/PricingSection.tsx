
import React, { useState } from 'react';
import { Button } from '@/components/ui-custom/Button';
import { Check, AlertCircle } from 'lucide-react';
import { AnimatedSection, StaggeredChildren } from './AnimatedSections';
import { cn } from '@/lib/utils';

interface PricingPlan {
  type: 'creator' | 'brand';
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  isMostPopular?: boolean;
}

const creatorPlans: PricingPlan[] = [
  {
    type: 'creator',
    name: 'Starter',
    price: '$10',
    description: 'Perfect for new content creators',
    features: [
      'Connect up to 2 social platforms',
      'Basic AI audience insights',
      'Apply to 5 brand opportunities monthly',
      'Standard creator profile',
      'Email support'
    ],
    cta: 'Start Free Trial'
  },
  {
    type: 'creator',
    name: 'Growth',
    price: '$29',
    description: 'For creators ready to scale their partnerships',
    features: [
      'Connect up to 5 social platforms',
      'Advanced audience analytics',
      'Apply to unlimited brand opportunities',
      'Featured creator profile',
      'Priority matching algorithm',
      'Negotiation templates',
      'Priority support'
    ],
    cta: 'Start Free Trial',
    isMostPopular: true
  },
  {
    type: 'creator',
    name: 'Pro',
    price: '$49',
    description: 'For established influencers and content professionals',
    features: [
      'Unlimited social platform connections',
      'Premium audience insights with demographics',
      'Brands can contact you directly',
      'Verified creator badge',
      'Custom contract templates',
      'Deal tracking dashboard',
      'Dedicated account manager'
    ],
    cta: 'Start Free Trial'
  }
];

const brandPlans: PricingPlan[] = [
  {
    type: 'brand',
    name: 'Startup',
    price: '$99',
    description: 'For new brands testing influencer marketing',
    features: [
      'Up to 10 active campaigns',
      'Basic creator search',
      'AI matching with 20 creators monthly',
      'Standard outreach templates',
      'Email support'
    ],
    cta: 'Start Free Trial'
  },
  {
    type: 'brand',
    name: 'Business',
    price: '$249',
    description: 'For growing businesses scaling their creator partnerships',
    features: [
      'Up to 30 active campaigns',
      'Advanced creator search with filters',
      'AI matching with 50 creators monthly',
      'Custom outreach templates',
      'Campaign performance analytics',
      'Priority support'
    ],
    cta: 'Start Free Trial',
    isMostPopular: true
  },
  {
    type: 'brand',
    name: 'Enterprise',
    price: '$499',
    description: 'For established brands with ongoing creator programs',
    features: [
      'Unlimited active campaigns',
      'Premium creator search with all filters',
      'Unlimited AI creator matching',
      'White-labeled outreach',
      'Advanced performance analytics',
      'Contract management tools',
      'Dedicated account manager'
    ],
    cta: 'Contact Sales'
  }
];

const PricingSection: React.FC = () => {
  const [activePlanType, setActivePlanType] = useState<'creator' | 'brand'>('creator');
  const plans = activePlanType === 'creator' ? creatorPlans : brandPlans;

  return (
    <section id="pricing" className="relative py-20 md:py-28">
      {/* Background Elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-50 bg-blur-circle"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-50 bg-blur-circle"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection animation="fade-in" className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-4">
            Pricing Plans
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your needs
          </p>
        </AnimatedSection>
        
        {/* Plan Type Toggle */}
        <div className="flex justify-center mb-12">
          <div className="glass-panel p-1.5 rounded-full flex items-center">
            <button
              onClick={() => setActivePlanType('creator')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activePlanType === 'creator' 
                  ? "bg-brand-600 text-white shadow-sm" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              For Creators
            </button>
            <button
              onClick={() => setActivePlanType('brand')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activePlanType === 'brand' 
                  ? "bg-brand-600 text-white shadow-sm" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              For Brands
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <AnimatedSection
              key={plan.name}
              animation="slide-up"
              delay={index + 1}
              className={cn(
                "glass-panel rounded-xl border overflow-hidden transition-all duration-300 relative",
                plan.isMostPopular 
                  ? "border-brand-300 shadow-lg md:scale-105" 
                  : "border-gray-100 hover:border-brand-200"
              )}
            >
              {plan.isMostPopular && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-600"></div>
              )}
              
              <div className="p-6 md:p-8">
                {plan.isMostPopular && (
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium mb-4">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                
                <div className="mt-8">
                  <Button 
                    variant={plan.isMostPopular ? "primary" : "outline"} 
                    fullWidth
                    className={plan.isMostPopular ? "bg-brand-600 hover:bg-brand-700" : ""}
                  >
                    {plan.cta}
                  </Button>
                </div>
                
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        {/* Additional Pricing Info */}
        <AnimatedSection animation="fade-in" delay={5} className="mt-16 md:mt-24 max-w-3xl mx-auto">
          <div className="glass-panel p-6 rounded-xl border border-gray-100">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Commission on Successful Deals</h4>
                <p className="text-gray-600">
                  We charge a small 5-10% commission on successful deals facilitated through our platform. 
                  This helps us maintain the platform and continue improving our AI matching algorithm.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PricingSection;
