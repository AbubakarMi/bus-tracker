'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Star, CheckCircle, Crown, Award, Zap, Heart, Globe, Shield, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { type UserData, getDashboardPath } from '@/lib/auth-utils';

interface WorldClassWelcomePopupProps {
  user: UserData;
  isVisible: boolean;
  onClose: () => void;
  onContinue: () => void;
  isNewUser?: boolean; // true for registration, false for login
}

export function WorldClassWelcomePopup({
  user,
  isVisible,
  onClose,
  onContinue,
  isNewUser = false
}: WorldClassWelcomePopupProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Confetti particles animation
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
    color: ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 6)]
  }));

  // Get role-specific content
  const getRoleContent = () => {
    switch (user.role) {
      case 'student':
        return {
          icon: '🎓',
          title: isNewUser ? 'Welcome to ADUSTECH!' : 'Welcome Back!',
          subtitle: isNewUser ? 'Your Academic Journey Begins' : 'Ready for Another Day',
          description: isNewUser
            ? 'You\'ve successfully joined our smart campus transportation system! Get ready to experience seamless bus tracking, easy booking, and stress-free campus travel.'
            : 'Great to see you again! Your personalized dashboard is ready with real-time bus updates and travel information.',
          features: ['📍 Real-time Bus Tracking', '🎫 Easy Seat Booking', '📱 Smart Notifications', '🕐 Schedule Management'],
          primaryColor: 'from-blue-500 to-indigo-600',
          bgGradient: 'from-blue-50 to-indigo-50'
        };
      case 'staff':
        return {
          icon: '👨‍🏫',
          title: isNewUser ? 'Welcome, Faculty Member!' : 'Welcome Back, Staff!',
          subtitle: isNewUser ? 'Professional Excellence Awaits' : 'Your Workspace Awaits',
          description: isNewUser
            ? 'You\'ve joined our advanced staff transportation system! Enjoy priority booking, detailed travel reports, and professional-grade campus mobility solutions.'
            : 'Ready for another productive day! Your staff dashboard includes travel reports, booking history, and priority services.',
          features: ['⭐ Priority Booking', '📊 Travel Reports', '💼 Business Travel', '🛡️ Staff Benefits'],
          primaryColor: 'from-green-500 to-emerald-600',
          bgGradient: 'from-green-50 to-emerald-50'
        };
      case 'admin':
        return {
          icon: '👑',
          title: isNewUser ? 'Admin Access Granted!' : 'Welcome Back, Admin!',
          subtitle: isNewUser ? 'Full System Control' : 'Command Center Ready',
          description: isNewUser
            ? 'You have complete administrative access to the ADUSTECH transportation system. Manage users, monitor operations, and ensure smooth campus mobility.'
            : 'Your admin dashboard is loaded with real-time system insights, user management tools, and operational controls.',
          features: ['🎛️ System Management', '👥 User Control', '📈 Analytics', '⚙️ Configuration'],
          primaryColor: 'from-purple-500 to-violet-600',
          bgGradient: 'from-purple-50 to-violet-50'
        };
      case 'driver':
        return {
          icon: '🚌',
          title: isNewUser ? 'Welcome, Driver!' : 'Welcome Back, Driver!',
          subtitle: isNewUser ? 'Your Route Awaits' : 'Ready to Drive',
          description: isNewUser
            ? 'You\'re now part of our professional driver network! Access your routes, manage passenger information, and deliver exceptional campus transportation service.'
            : 'Your driver dashboard is ready with today\'s routes, passenger information, and operational updates.',
          features: ['🗺️ Route Management', '👥 Passenger Lists', '📍 GPS Tracking', '⏰ Schedule Updates'],
          primaryColor: 'from-orange-500 to-red-600',
          bgGradient: 'from-orange-50 to-red-50'
        };
      default:
        return {
          icon: '🌟',
          title: isNewUser ? 'Welcome!' : 'Welcome Back!',
          subtitle: isNewUser ? 'Your Journey Begins' : 'Ready to Continue',
          description: 'Welcome to the ADUSTECH smart transportation system!',
          features: ['🚀 Smart Features', '🔒 Secure Access', '📱 Mobile Ready', '⚡ Lightning Fast'],
          primaryColor: 'from-gray-500 to-slate-600',
          bgGradient: 'from-gray-50 to-slate-50'
        };
    }
  };

  const roleContent = getRoleContent();

  const handleContinue = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onContinue();
      const dashboardPath = getDashboardPath(user.role);
      router.push(dashboardPath);
    }, 1000);
  };

  // Animated welcome steps
  const welcomeSteps = [
    {
      title: `Hi ${user.name?.split(' ')[0] || 'there'}! ${roleContent.icon}`,
      content: roleContent.title,
      delay: 0
    },
    {
      title: roleContent.subtitle,
      content: roleContent.description,
      delay: 2000
    },
    {
      title: "What's Available",
      content: roleContent.features,
      delay: 4000
    }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 2000);

    const timer2 = setTimeout(() => {
      setCurrentStep(2);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60"
          onClick={onClose}
        />

        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: particle.color,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -500],
                rotation: [0, particle.rotation * 4],
                scale: [particle.scale, 0],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 2,
              }}
            />
          ))}
        </div>

        {/* Main Modal */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 100 }}
          animate={{
            scale: isAnimating ? 1.1 : 1,
            opacity: 1,
            y: 0,
            rotateY: isAnimating ? [0, 360] : 0
          }}
          exit={{ scale: 0.7, opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: isAnimating ? 1 : 0.7
          }}
          className={cn(
            "relative w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden",
            "border-2 border-transparent bg-gradient-to-br",
            roleContent.bgGradient
          )}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </motion.button>

          {/* Header with gradient */}
          <div className={cn(
            "relative px-8 pt-12 pb-8 text-white bg-gradient-to-br",
            roleContent.primaryColor
          )}>
            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {[Sparkles, Star, Crown, Award, Heart, Trophy].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 2) * 60}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="h-4 w-4 text-white/30" />
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <div className="relative text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                {roleContent.icon}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {welcomeSteps[currentStep]?.title || roleContent.title}
                  </h1>
                  <p className="text-white/90 text-lg">
                    {typeof welcomeSteps[currentStep]?.content === 'string'
                      ? welcomeSteps[currentStep]?.content
                      : roleContent.subtitle
                    }
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {currentStep === 2 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    What's Available for You
                  </h3>

                  <div className="grid gap-3">
                    {roleContent.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-100"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Globe className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                  </motion.div>
                  <p className="text-gray-600 text-lg">
                    {roleContent.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* User Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 p-4 bg-white rounded-xl shadow-lg border-2 border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br",
                  roleContent.primaryColor
                )}>
                  {user.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                  <p className="text-sm text-gray-600">
                    {user.role === 'student' && user.regNumber}
                    {user.role === 'staff' && user.staffId}
                    {user.role === 'admin' && 'System Administrator'}
                    {user.role === 'driver' && 'Professional Driver'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r",
                      roleContent.primaryColor
                    )}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <Shield className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Maybe Later
              </Button>

              <motion.div className="flex-2">
                <Button
                  onClick={handleContinue}
                  disabled={isAnimating}
                  className={cn(
                    "w-full h-12 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
                    "bg-gradient-to-r hover:scale-[1.02] disabled:opacity-70",
                    roleContent.primaryColor
                  )}
                >
                  {isAnimating ? (
                    <motion.div
                      className="flex items-center gap-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Zap className="h-5 w-5" />
                      Loading Dashboard...
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Continue to Dashboard
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </span>
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center text-sm text-gray-500 mt-6"
            >
              Powered by ADUSTECH Smart Transportation System
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}