
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle, Users, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      duration: 0.6,
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      delay: 1,
    },
  },
};

const trustPoints = [
  { icon: <Users className="h-4 w-4" />, text: "5000+ Students" },
  { icon: <Clock className="h-4 w-4" />, text: "24/7 Support" },
  { icon: <Shield className="h-4 w-4" />, text: "100% Secure" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/modern-campus/1920/1080"
          alt="A modern university campus with students"
          data-ai-hint="modern campus students"
          fill
          className="object-cover animate-zoom-in"
          priority
        />
      </div>
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* Animated Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
            style={{
              top: `${20 + (i * 7) % 60}%`,
              left: `${10 + (i * 11) % 80}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Enhanced Floating Icons */}
        <motion.div 
          className="absolute top-20 left-10 glass-card rounded-2xl p-6 backdrop-blur-xl"
          initial={{ opacity: 0, x: -50, rotate: -10 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            rotate: 0,
            y: [-5, 5, -5]
          }}
          transition={{ 
            opacity: { delay: 1.5, duration: 0.8 },
            x: { delay: 1.5, duration: 0.8 },
            rotate: { delay: 1.5, duration: 0.8 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Users className="h-8 w-8 text-white" />
          </motion.div>
          <div className="text-xs text-white/80 mt-2 font-semibold">5000+ Users</div>
        </motion.div>
        
        <motion.div 
          className="absolute top-32 right-20 glass-card rounded-2xl p-6 backdrop-blur-xl"
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            rotate: 0,
            y: [5, -5, 5]
          }}
          transition={{ 
            opacity: { delay: 2, duration: 0.8 },
            x: { delay: 2, duration: 0.8 },
            rotate: { delay: 2, duration: 0.8 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Clock className="h-8 w-8 text-white" />
          </motion.div>
          <div className="text-xs text-white/80 mt-2 font-semibold">24/7 Service</div>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-20 glass-card rounded-2xl p-6 backdrop-blur-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            x: [-3, 3, -3]
          }}
          transition={{ 
            opacity: { delay: 2.5, duration: 0.8 },
            y: { delay: 2.5, duration: 0.8 },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="h-8 w-8 text-white" />
          </motion.div>
          <div className="text-xs text-white/80 mt-2 font-semibold">100% Secure</div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="container max-w-5xl text-center text-white"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Trust Indicators */}
          <motion.div
            className="mb-6 flex flex-wrap justify-center gap-4 text-sm"
            variants={itemVariants}
          >
            {trustPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2 glass-card px-3 py-1 rounded-full">
                {point.icon}
                <span className="text-white/90">{point.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6"
            variants={itemVariants}
          >
            <span className="block">Smart Transport</span>
            <span className="block gradient-text">for ADUSTECH</span>
          </motion.h1>

          {/* Enhanced Description */}
          <motion.p
            className="mx-auto max-w-[800px] text-lg text-gray-200 md:text-xl lg:text-2xl leading-relaxed mb-8"
            variants={itemVariants}
          >
            Experience the future of campus transportation with{' '}
            <span className="font-semibold text-accent">real-time tracking</span>,{' '}
            <span className="font-semibold text-accent">instant booking</span>, and{' '}
            <span className="font-semibold text-accent">smart notifications</span>{' '}
            for ADUSTECH students and staff.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            className="mb-10 flex flex-wrap justify-center gap-4 text-sm"
            variants={itemVariants}
          >
            {[
              "Live GPS Tracking",
              "Seat Reservations", 
              "Digital Tickets",
              "Route Optimization"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Enhanced CTAs */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center mb-8"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              asChild 
              className="btn-interactive glow-primary gradient-bg-primary text-white font-semibold px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
            >
              <Link href="/register">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="glass-card text-white border-white/30 font-semibold px-8 py-4 text-lg hover:scale-105 hover:bg-white/10 transition-all duration-300"
            >
              <Link href="/dashboard" className="flex items-center">
                <Play className="mr-2 h-4 w-4" />
                View Demo
              </Link>
            </Button>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            variants={statsVariants}
          >
            {[
              { number: "5000+", label: "Active Students" },
              { number: "50+", label: "Daily Routes" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-4 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
}
