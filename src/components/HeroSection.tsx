
import React from 'react';
import { Button } from '@/components/ui-custom/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimatedSection, StaggeredChildren } from './AnimatedSections';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100 bg-blur-circle"></div>
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-indigo-100 bg-blur-circle"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <AnimatedSection animation="fade-in" className="md:order-1 order-2">
            <div className="flex flex-col space-y-6 max-w-xl">
              <div className="flex items-center">
                <div className="px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium">
                  Join Our Limited Beta
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                <span className="inline">AI-Powered</span> <br/>
                <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">Brand-Creator</span> <br/>
                <span className="inline">Matchmaking</span>
              </h1>

              <p className="text-lg text-gray-600 md:pr-12">
                Connect brands with creators using AI to match the perfect partnerships based on audience, engagement, and content alignment.
              </p>

              <StaggeredChildren staggerDelay={150} className="pt-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-brand-600" />
                  <span className="text-sm">AI-powered profile analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-brand-600" />
                  <span className="text-sm">Automated sponsorship matching</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-brand-600" />
                  <span className="text-sm">Data-driven pricing recommendations</span>
                </div>
              </StaggeredChildren>

              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-brand-600 hover:bg-brand-700"
                  icon={<ArrowRight size={18} />} 
                  iconPosition="right"
                >
                  Join Waitlist
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-brand-200 hover:bg-brand-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Hero Image/Illustration */}
          <AnimatedSection animation="scale-in" delay={3} className="md:order-2 order-1">
            <div className="relative mx-auto max-w-md md:max-w-full">
              <div className="glass-panel rounded-2xl p-4 md:p-6 shadow-xl">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center px-6 py-8">
                    <div className="flex flex-col space-y-6 w-full max-w-sm">
                      <div className="glass-panel p-4 rounded-xl animate-float">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-medium">
                            AI
                          </div>
                          <div>
                            <div className="text-sm font-medium">Matching Algorithm</div>
                            <div className="text-xs text-gray-500">Analyzing profiles...</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {/* Creator Card */}
                        <div className="glass-panel p-3 rounded-xl">
                          <div className="flex flex-col space-y-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 mb-1"></div>
                            <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                            <div className="flex space-x-1">
                              <div className="h-1 w-6 bg-gray-200 rounded-full"></div>
                              <div className="h-1 w-10 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="h-1 w-full bg-brand-200 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Brand Card */}
                        <div className="glass-panel p-3 rounded-xl">
                          <div className="flex flex-col space-y-2">
                            <div className="w-8 h-8 rounded bg-blue-100 mb-1"></div>
                            <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
                            <div className="flex space-x-1">
                              <div className="h-1 w-8 bg-gray-200 rounded-full"></div>
                              <div className="h-1 w-5 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="h-1 w-full bg-blue-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="glass-panel p-4 rounded-xl self-center animate-pulse-slow">
                        <div className="flex items-center space-x-2">
                          <div className="text-xs font-medium text-brand-700">95% Match</div>
                          <div className="h-2 w-16 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-100 rounded-full blur-xl opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full blur-xl opacity-50"></div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
