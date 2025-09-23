'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Star,
  Coffee,
  Briefcase,
  GraduationCap,
  Crown,
  Users,
  ArrowRight,
  Heart,
  Zap
} from 'lucide-react';
import { type UserData } from '@/lib/auth-utils';

interface WelcomePopupProps {
  user: UserData;
  isVisible: boolean;
  onClose: () => void;
  isFirstTime?: boolean; // true for registration, false for login
}

export function WelcomePopup({ user, isVisible, onClose, isFirstTime = false }: WelcomePopupProps) {
  const [currentTime] = useState(new Date());

  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();

    if (hour >= 5 && hour < 12) {
      return {
        greeting: "Good Morning",
        message: "Ready to start your day with a smooth journey?",
        icon: Sunrise,
        gradient: "from-orange-400 via-yellow-400 to-amber-500",
        bgGradient: "from-orange-50 via-yellow-50 to-amber-50",
        emoji: "🌅"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: "Good Afternoon",
        message: "Hope your day is going wonderfully!",
        icon: Sun,
        gradient: "from-yellow-400 via-orange-400 to-red-500",
        bgGradient: "from-yellow-50 via-orange-50 to-red-50",
        emoji: "☀️"
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        greeting: "Good Evening",
        message: "Time to head home safely and comfortably!",
        icon: Sunset,
        gradient: "from-purple-400 via-pink-400 to-red-500",
        bgGradient: "from-purple-50 via-pink-50 to-red-50",
        emoji: "🌇"
      };
    } else {
      return {
        greeting: "Good Night",
        message: "Safe travels during your late journey!",
        icon: Moon,
        gradient: "from-blue-400 via-indigo-400 to-purple-500",
        bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
        emoji: "🌙"
      };
    }
  };

  const getRoleIcon = () => {
    switch (user.role) {
      case 'student':
        return GraduationCap;
      case 'staff':
        return Briefcase;
      case 'admin':
        return Crown;
      case 'driver':
        return Users;
      default:
        return Users;
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'student':
        return 'from-blue-500 to-indigo-600';
      case 'staff':
        return 'from-green-500 to-emerald-600';
      case 'admin':
        return 'from-purple-500 to-violet-600';
      case 'driver':
        return 'from-orange-500 to-amber-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  const timeGreeting = getTimeBasedGreeting();
  const RoleIcon = getRoleIcon();
  const TimeIcon = timeGreeting.icon;

  const getWelcomeMessage = () => {
    if (isFirstTime) {
      return {
        title: "🎉 Welcome to the Family!",
        subtitle: `${timeGreeting.greeting}, ${user.name}!`,
        message: `Congratulations! Your registration was successful. ${timeGreeting.message}`,
        actionText: "Start My Journey"
      };
    } else {
      return {
        title: `${timeGreeting.emoji} ${timeGreeting.greeting}!`,
        subtitle: `Welcome back, ${user.name}!`,
        message: `Great to see you again! ${timeGreeting.message}`,
        actionText: "Continue to Dashboard"
      };
    }
  };

  const welcomeContent = getWelcomeMessage();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          {/* Background blur overlay */}
          <div className="absolute inset-0 backdrop-blur-sm" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 10,
                }}
                animate={{
                  y: -10,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main popup */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.6
            }}
            className="relative z-10 max-w-md w-full mx-auto"
          >
            <div className={`bg-gradient-to-br ${timeGreeting.bgGradient} backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden`}>

              {/* Header with time-based gradient */}
              <div className={`bg-gradient-to-r ${timeGreeting.gradient} p-6 text-white relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      damping: 10,
                      stiffness: 200
                    }}
                    className="flex justify-center mb-4"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"
                      />
                      <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <TimeIcon className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold mb-2"
                  >
                    {welcomeContent.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-lg opacity-90"
                  >
                    {welcomeContent.subtitle}
                  </motion.p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* User info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${getRoleColor()} shadow-lg`}>
                    <RoleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getRoleColor()} text-white`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                      {user.regNumber && (
                        <span className="text-sm text-gray-600">{user.regNumber}</span>
                      )}
                      {user.staffId && (
                        <span className="text-sm text-gray-600">{user.staffId}</span>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Welcome message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="text-center"
                >
                  <p className="text-gray-700 leading-relaxed">
                    {welcomeContent.message}
                  </p>
                </motion.div>

                {/* Features preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="grid grid-cols-3 gap-3"
                >
                  {[
                    { icon: Zap, label: "Fast Booking", color: "text-yellow-600" },
                    { icon: Heart, label: "Safe Travel", color: "text-red-500" },
                    { icon: Sparkles, label: "Premium Experience", color: "text-purple-600" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-3 bg-white/50 rounded-xl"
                    >
                      <feature.icon className={`h-6 w-6 mx-auto mb-1 ${feature.color}`} />
                      <p className="text-xs font-medium text-gray-700">{feature.label}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Action button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="pt-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={onClose}
                      className={`w-full h-12 text-lg font-semibold bg-gradient-to-r ${timeGreeting.gradient} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {welcomeContent.actionText}
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}