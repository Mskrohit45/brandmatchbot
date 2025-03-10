
import React from 'react';
import { 
  Users, 
  LineChart, 
  Link2, 
  CreditCard, 
  Zap, 
  Shield 
} from 'lucide-react';
import { AnimatedSection, StaggeredChildren } from './AnimatedSections';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => (
  <AnimatedSection 
    animation="slide-up" 
    delay={delay} 
    className="glass-panel rounded-xl p-6 transition-all duration-300 hover:shadow-lg group"
  >
    <div className="flex flex-col space-y-4">
      <div className="p-3 rounded-lg bg-brand-50 w-fit text-brand-600 group-hover:bg-brand-100 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </AnimatedSection>
);

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "AI-Powered Matching",
    description: "Our algorithm analyzes content, audience demographics, and engagement patterns to find perfect brand-creator partnerships."
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Audience Insights",
    description: "Get detailed analytics on creator audiences including demographics, interests, and engagement rates to ensure alignment."
  },
  {
    icon: <Link2 className="h-6 w-6" />,
    title: "Social Integration",
    description: "Connect your YouTube, Instagram, TikTok, or Twitter accounts to automatically import engagement statistics."
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Price Recommendations",
    description: "Data-driven pricing suggestions based on creator metrics, industry standards, and campaign requirements."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Automated Outreach",
    description: "AI-generated outreach templates personalized to each creator to maximize response rates and collaboration success."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Verified Profiles",
    description: "Every creator and brand is verified to ensure legitimacy and build trust in the partnership marketplace."
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="relative py-20 md:py-28">
      {/* Background Elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-50 bg-blur-circle"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-50 bg-blur-circle"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection animation="fade-in" className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-4">
            Core Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Smarter Brand Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Match brands with creators using AI-powered insights and analytics
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              delay={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
