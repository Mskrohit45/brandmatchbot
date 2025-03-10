
import React from 'react';
import { 
  UserPlus, 
  Sparkles, 
  MessageSquare, 
  CreditCard, 
  ChevronRight 
} from 'lucide-react';
import { AnimatedSection, StaggeredChildren } from './AnimatedSections';
import { cn } from '@/lib/utils';

interface StepCardProps {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
  isLeft?: boolean;
  delay?: number;
}

const StepCard: React.FC<StepCardProps> = ({ 
  icon, 
  number, 
  title, 
  description, 
  isLeft = true,
  delay = 0
}) => (
  <AnimatedSection 
    animation="slide-up" 
    delay={delay} 
    className={cn(
      "relative p-6 md:p-8 glass-panel rounded-xl",
      isLeft ? "md:mr-12 lg:mr-20" : "md:ml-12 lg:ml-20"
    )}
  >
    <div className="absolute -top-3 left-6 px-4 py-2 bg-brand-600 text-white text-sm font-bold rounded-full">
      Step {number}
    </div>
    <div className="pt-6 flex flex-col space-y-4">
      <div className="p-3 rounded-lg bg-brand-50 w-fit text-brand-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </AnimatedSection>
);

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-purple-50 bg-blur-circle"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-brand-50 bg-blur-circle"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection animation="fade-in" className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How BrandMatchBot Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From sign-up to successful partnerships in four easy steps
          </p>
        </AnimatedSection>
        
        <div className="flex flex-col space-y-16 md:space-y-24 relative">
          {/* Connector Line (only visible on md+ screens) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-300 to-brand-600"></div>
          
          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-0">
            <StepCard 
              icon={<UserPlus className="h-6 w-6" />}
              number={1}
              title="Create Your Profile"
              description="Sign up and connect your social media accounts. Our AI will analyze your content and audience metrics."
              isLeft={true}
              delay={1}
            />
            <div className="hidden md:flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-brand-100 border-4 border-white flex items-center justify-center text-brand-700 shadow-lg">
                1
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-0">
            <div className="hidden md:flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-brand-200 border-4 border-white flex items-center justify-center text-brand-700 shadow-lg">
                2
              </div>
            </div>
            <StepCard 
              icon={<Sparkles className="h-6 w-6" />}
              number={2}
              title="Get Matched"
              description="Our AI algorithm matches creators with brands based on audience alignment, engagement metrics, and content themes."
              isLeft={false}
              delay={2}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-0">
            <StepCard 
              icon={<MessageSquare className="h-6 w-6" />}
              number={3}
              title="Connect & Negotiate"
              description="Use AI-assisted templates to reach out to matches. Negotiate terms with suggested pricing based on your analytics."
              isLeft={true}
              delay={3}
            />
            <div className="hidden md:flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-brand-300 border-4 border-white flex items-center justify-center text-brand-700 shadow-lg">
                3
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-0">
            <div className="hidden md:flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-brand-400 border-4 border-white flex items-center justify-center text-white shadow-lg">
                4
              </div>
            </div>
            <StepCard 
              icon={<CreditCard className="h-6 w-6" />}
              number={4}
              title="Finalize & Collaborate"
              description="Secure payment through our platform and track campaign performance with integrated analytics."
              isLeft={false}
              delay={4}
            />
          </div>
        </div>
        
        <AnimatedSection animation="fade-in" delay={5} className="mt-16 md:mt-24 text-center">
          <a href="#waitlist" className="inline-flex items-center text-brand-700 font-medium hover:text-brand-800 transition-colors">
            Join our waitlist to get early access
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowItWorks;
