
'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Bus, Users, Shield, Clock, MapPin, Zap, Heart, Trophy, Star, Target, ChevronRight } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';

const title = "About Our Transport Service";
const subtitle = "Revolutionizing Campus Transportation with Innovation & Care";

const stats = [
  { icon: Users, number: "5000+", label: "Happy Students", color: "text-blue-500" },
  { icon: Bus, number: "50+", label: "Active Buses", color: "text-green-500" },
  { icon: MapPin, number: "25+", label: "Bus Stops", color: "text-purple-500" },
  { icon: Clock, number: "24/7", label: "Service Hours", color: "text-orange-500" }
];

const features = [
  {
    icon: Zap,
    title: "Real-Time Tracking",
    description: "Live GPS tracking for all campus buses with precise arrival predictions",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Enhanced safety protocols with emergency contacts and route monitoring",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    icon: Heart,
    title: "Student-Centric",
    description: "Designed by students, for students, with accessibility at its core",
    gradient: "from-pink-400 to-rose-500"
  },
  {
    icon: Target,
    title: "Mission Driven",
    description: "Committed to reducing wait times and improving campus mobility",
    gradient: "from-blue-400 to-indigo-500"
  }
];

const achievements = [
  { icon: Trophy, label: "Best Campus Innovation 2024" },
  { icon: Star, label: "4.9/5 Student Rating" },
  { icon: Users, label: "Featured in Tech Today" }
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,theme(colors.primary/10),transparent_50%)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.accent/8),transparent_50%)]" />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"
            style={{
              top: `${10 + (i * 8) % 80}%`,
              left: `${5 + (i * 13) % 90}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4" ref={ref}>
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-accent p-4 shadow-2xl">
              <Bus className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.h2 
            className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-300% animate-gradient-text">
              {title}
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-2xl text-center group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              viewport={{ once: false, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
              
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
              </motion.div>
              
              <motion.div
                className={`text-3xl font-bold mb-2 ${stat.color}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.number}
              </motion.div>
              
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Main Content Grid */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Enhanced Content Side */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Background decoration */}
            <div className="absolute -left-8 -top-8 -bottom-8 w-3/4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 blur-sm" />
            
            <div className="relative z-10 space-y-8 rounded-2xl bg-card/80 backdrop-blur-sm p-8 lg:p-12 shadow-2xl border border-border/50">
              {/* Mission Statement */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    🚀
                  </motion.span>
                  Our Mission
                </h3>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  Born from the need to modernize campus transportation at ADUSTECH, Wudil, our mission is to provide 
                  students and staff with a <span className="font-semibold text-primary">reliable, efficient, and user-friendly</span> platform 
                  that transforms their daily commute experience.
                </p>
              </motion.div>

              {/* Vision Statement */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🎯
                  </motion.span>
                  Our Vision
                </h3>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  By leveraging <span className="font-semibold text-accent">real-time technology</span> and student-centric design, 
                  we aim to reduce uncertainty, improve safety, and create a more connected campus community. 
                  This project is dedicated to enhancing the student experience at the Aliko Dangote University of 
                  Science and Technology, <span className="font-semibold text-primary">one ride at a time</span>.
                </p>
              </motion.div>

              {/* Achievements */}
              <motion.div
                className="pt-6 border-t border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <div className="flex flex-wrap gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                    >
                      <achievement.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground/90">
                        {achievement.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Image Side */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-60" />
              
              <motion.div
                className="relative z-10 h-80 w-full lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Image
                  src="https://picsum.photos/seed/university-campus/800/600"
                  alt="ADUSTECH University Campus - Modern Transportation Hub"
                  data-ai-hint="modern university campus with buses and students"
                  fill
                  className="object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Floating info cards */}
                <motion.div
                  className="absolute top-6 right-6 glass-card p-4 rounded-xl"
                  initial={{ opacity: 0, y: -20 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0,
                    rotate: [0, 2, -2, 0]
                  } : { opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.6,
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">Live Tracking Active</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-6 left-6 glass-card p-4 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0,
                    rotate: [0, -2, 2, 0]
                  } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.8,
                    rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">5000+ Happy Students</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Features Grid */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center mb-12">
            <motion.h3 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              Why Choose Our Service?
            </motion.h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl group relative overflow-hidden hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </motion.div>
                  
                  <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h4>
                  
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  <motion.div
                    className="flex items-center gap-2 mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
