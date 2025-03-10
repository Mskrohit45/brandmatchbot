
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui-custom/Button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 py-10">
      <div className="glass-panel rounded-2xl border border-gray-100 p-8 md:p-12 shadow-lg max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-gray-400">?</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        
        <Button 
          variant="primary" 
          size="lg"
          className="bg-brand-600 hover:bg-brand-700"
          icon={<Home size={18} />} 
          iconPosition="left"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
