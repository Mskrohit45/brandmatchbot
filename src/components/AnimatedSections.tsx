
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in increments of 100ms
  threshold?: number; // visibility threshold (0-1)
  animation?: 'fade-in' | 'slide-up' | 'slide-in' | 'scale-in';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  animation = 'fade-in',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Start animation a bit before scrolling into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        isVisible ? `animate-${animation}` : 'opacity-0',
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay * 100}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

interface StaggeredChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number; // delay between children in ms
  containerAnimation?: 'fade-in' | 'slide-up' | 'slide-in' | 'scale-in';
  childAnimation?: 'fade-in' | 'slide-up' | 'slide-in' | 'scale-in';
  threshold?: number;
}

export const StaggeredChildren: React.FC<StaggeredChildrenProps> = ({
  children,
  className,
  staggerDelay = 100,
  containerAnimation = 'fade-in',
  childAnimation = 'slide-up',
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold]);

  // Clone children and add staggered animation
  const staggeredChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        className: cn(
          child.props.className,
          isVisible ? `animate-${childAnimation}` : 'opacity-0'
        ),
        style: {
          ...child.props.style,
          animationDelay: isVisible ? `${index * staggerDelay}ms` : '0ms',
        },
      });
    }
    return child;
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        isVisible ? `animate-${containerAnimation}` : 'opacity-0',
        className
      )}
    >
      {staggeredChildren}
    </div>
  );
};
