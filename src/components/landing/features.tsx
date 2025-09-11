
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, Map, ShieldCheck, Ticket, Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Map className="h-8 w-8" />,
    title: 'Real-Time Bus Tracking',
    description: 'See exactly where your bus is on a live map, with accurate ETA predictions to your stop.',
    color: 'from-blue-500 to-cyan-500',
    stats: '99.9% Accuracy',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
    benefits: ['Live GPS tracking', 'ETA predictions', 'Route optimization'],
  },
  {
    icon: <Ticket className="h-8 w-8" />,
    title: 'Seamless Seat Booking',
    description: 'Book your seat in advance with a visual seat map and download your digital ticket instantly.',
    color: 'from-purple-500 to-pink-500',
    stats: '3-Click Booking',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
    benefits: ['Visual seat selection', 'Digital tickets', 'Instant confirmation'],
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: 'Instant Notifications',
    description: 'Receive timely alerts for booking confirmations, departure times, and potential delays.',
    color: 'from-green-500 to-emerald-500',
    stats: 'Real-time Alerts',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
    benefits: ['Push notifications', 'SMS alerts', 'Email updates'],
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'AI-Powered Route Insights',
    description: 'Get smart summaries of routes, including key stops and points of interest, to plan your travel better.',
    color: 'from-orange-500 to-red-500',
    stats: 'Smart Analytics',
    bgPattern: 'radial-gradient(circle at 70% 30%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)',
    benefits: ['Smart recommendations', 'Traffic analysis', 'Route optimization'],
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: 'Safe and Secure',
    description: 'Built with role-based access and security-first principles to protect your data.',
    color: 'from-indigo-500 to-purple-500',
    stats: 'Bank-level Security',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
    benefits: ['Data encryption', 'Secure payments', '24/7 monitoring'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

const EnhancedFeatureCard = ({ 
  feature, 
  index, 
  setIndex 
}: { 
  feature: (typeof features)[0], 
  index: number,
  setIndex: number
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div 
      className="flex-shrink-0 h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, z: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="feature-card group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer">
        {/* Animated Background Pattern */}
        <motion.div 
          className="absolute inset-0"
          style={{ background: feature.bgPattern }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.7 }}
        />
        
        {/* Dynamic Gradient Overlay */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
          animate={{ 
            opacity: isHovered ? 0.08 : 0,
            rotate: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.7 }}
        />
        
        {/* Mega Icon Background with Rotation */}
        <motion.div 
          className="absolute -top-16 -right-16 text-[240px] leading-none opacity-[0.03]"
          animate={{ 
            opacity: isHovered ? 0.1 : 0.03,
            rotate: isHovered ? 15 : 5,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.8 }}
        >
          {feature.icon}
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${feature.color}`}
              style={{
                top: `${20 + i * 15}%`,
                right: `${15 + i * 8}%`,
              }}
              animate={{
                opacity: isHovered ? [0, 1, 0] : 0,
                y: isHovered ? [0, -20, -40] : 0,
                scale: isHovered ? [0, 1, 0] : 0,
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: isHovered ? Infinity : 0,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Enhanced Stats Badge */}
          <motion.div 
            className="mb-6"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -5 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${feature.color} text-white shadow-xl`}>
              ✨ {feature.stats}
            </span>
          </motion.div>

          {/* Dynamic Icon */}
          <motion.div 
            className="mb-6 flex justify-center"
            animate={{ 
              y: isHovered ? -10 : 0,
              rotate: isHovered ? [0, -5, 5, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              rotate: { duration: 0.6, repeat: isHovered ? Infinity : 0 }
            }}
          >
            <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-2xl`}>
              {feature.icon}
            </div>
          </motion.div>

          {/* Enhanced Content */}
          <div className="flex-1 text-center">
            <motion.h3 
              className="font-headline text-xl font-bold text-card-foreground mb-3"
              animate={{ 
                color: isHovered ? "hsl(var(--primary))" : "hsl(var(--card-foreground))"
              }}
              transition={{ duration: 0.3 }}
            >
              {feature.title}
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground leading-relaxed text-sm mb-4"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {feature.description}
            </motion.p>
            
            {/* Enhanced Benefits with Staggered Animation */}
            <motion.div 
              className="space-y-2"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {feature.benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit}
                  className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10 
                  }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${feature.color}`} />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Interactive CTA with Enhanced Animation */}
          <motion.div 
            className="pt-4 mt-auto"
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.button 
              className={`w-full px-4 py-2 rounded-xl bg-gradient-to-r ${feature.color} text-white font-semibold text-sm shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="flex items-center justify-center gap-2">
                Explore More
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Bottom Glow */}
        <motion.div 
          className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t ${feature.color} blur-2xl`}
          animate={{ 
            opacity: isHovered ? 0.15 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </motion.div>
  );
};

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container relative max-w-7xl px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              🚀 Powerful Features
            </span>
          </motion.div>
          
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Everything You Need for a{' '}
            <span className="gradient-text">Smooth Journey</span>
          </h2>
          
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            From live tracking to easy booking, our platform simplifies campus transportation 
            with cutting-edge technology and user-centric design.
          </p>
        </motion.div>

        {/* Enhanced Features Carousel - All Devices */}
        <div className="relative">
          <div
            className="group/container relative w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
            {/* Pause overlay for better control */}
            <div className="absolute inset-0 z-10 pointer-events-none group-hover/container:bg-black/5 transition-colors duration-300" />
            
            <motion.div 
              className="flex items-stretch gap-6 group-hover/container:[animation-play-state:paused] hover:[animation-play-state:paused]"
              style={{
                width: 'max-content',
                animation: 'scroll 60s linear infinite'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Render all 5 cards multiple times for seamless infinite scroll */}
              {[...Array(3)].map((_, setIndex) => 
                features.map((feature, index) => (
                  <motion.div
                    key={`${feature.title}-${setIndex}`}
                    style={{ width: 'clamp(280px, 20vw, 320px)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: setIndex === 0 ? index * 0.1 : 0,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <EnhancedFeatureCard 
                      feature={feature} 
                      index={index} 
                      setIndex={setIndex}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
          
          {/* Navigation indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-muted-foreground/30"
                whileHover={{ scale: 1.5, backgroundColor: "hsl(var(--primary))" }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">Ready to experience the future of campus transport?</p>
          <button className="inline-flex items-center px-6 py-3 rounded-full font-medium gradient-bg-primary text-white hover:scale-105 transition-all duration-300 glow-primary">
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
