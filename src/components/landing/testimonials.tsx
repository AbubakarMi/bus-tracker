'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Amina Hassan',
    role: 'Computer Science Student',
    department: 'ADUSTECH',
    image: 'https://picsum.photos/seed/student1/100/100',
    rating: 5,
    content: 'This bus tracking system has completely transformed my daily commute. I no longer have to wait endlessly at bus stops wondering when the next bus will arrive. The real-time tracking is incredibly accurate!',
  },
  {
    id: 2,
    name: 'Ibrahim Musa',
    role: 'Engineering Student',
    department: 'ADUSTECH',
    image: 'https://picsum.photos/seed/student2/100/100',
    rating: 5,
    content: 'The seat booking feature is a game-changer! I can reserve my seat from my hostel and never worry about overcrowded buses. The digital tickets make everything so convenient.',
  },
  {
    id: 3,
    name: 'Fatima Ahmed',
    role: 'Biology Student',
    department: 'ADUSTECH',
    image: 'https://picsum.photos/seed/student3/100/100',
    rating: 5,
    content: 'As someone who commutes daily from town, the instant notifications have saved me so much time. I get alerts when my bus is approaching and can plan my departure perfectly.',
  },
  {
    id: 4,
    name: 'Yusuf Abdullahi',
    role: 'Mathematics Student',
    department: 'ADUSTECH',
    image: 'https://picsum.photos/seed/student4/100/100',
    rating: 5,
    content: 'The AI route insights help me choose the best routes based on traffic and timing. The interface is intuitive and the support team is always helpful.',
  },
  {
    id: 5,
    name: 'Khadija Garba',
    role: 'Chemistry Student',
    department: 'ADUSTECH',
    image: 'https://picsum.photos/seed/student5/100/100',
    rating: 5,
    content: 'Security and reliability are top-notch. I feel safe knowing my payment information is protected, and the system never fails when I need it most.',
  },
  {
    id: 6,
    name: 'Musa Usman',
    role: 'Physics Student',
    department: 'ADUSTECH',
    image: 'https://picsum.photos/seed/student6/100/100',
    rating: 5,
    content: 'The best part is how it integrates with my campus life. I can see campus events, check my schedule, and book transport all in one place. Truly innovative!',
  },
];

const SpectacularTestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const cardColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500', 
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-blue-500'
  ];
  
  const cardColor = cardColors[index % cardColors.length];
  
  return (
    <motion.div
      className="flex-shrink-0 w-full max-w-sm mx-4"
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -10,
        rotateY: 5,
        scale: 1.02
      }}
    >
      <div className="feature-card relative h-full overflow-hidden rounded-3xl cursor-pointer group perspective-1000">
        {/* Dynamic Background Gradient */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${cardColor}`}
          animate={{ 
            opacity: isHovered ? 0.12 : 0.06,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.7 }}
        />
        
        {/* Animated Mesh Background */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, currentColor 0%, transparent 50%)`
          }}
          animate={{ 
            opacity: isHovered ? 0.1 : 0.05,
            rotate: isHovered ? 2 : 0
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Floating Quote Icon */}
        <motion.div 
          className="absolute -top-8 -right-8 z-0"
          animate={{ 
            opacity: isHovered ? 0.15 : 0.05,
            rotate: isHovered ? 15 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.8 }}
        >
          <Quote className="h-32 w-32 text-current" style={{ color: `hsl(var(--primary))` }} />
        </motion.div>

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${cardColor}`}
              style={{
                top: `${20 + i * 15}%`,
                right: `${10 + i * 12}%`,
              }}
              animate={{
                opacity: isHovered ? [0, 1, 0] : 0,
                y: isHovered ? [0, -30, -60] : 0,
                scale: isHovered ? [0, 1.5, 0] : 0,
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
                repeat: isHovered ? Infinity : 0,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Enhanced Rating */}
          <motion.div 
            className="flex items-center justify-center gap-1 mb-6"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -5 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: isHovered ? [0, 360] : 0,
                  scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 2
                }}
              >
                <Star className={`h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-lg`} />
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Quote Content */}
          <motion.blockquote 
            className="text-card-foreground leading-relaxed mb-8 relative z-10 text-center font-medium"
            animate={{ 
              color: isHovered ? "hsl(var(--primary))" : "hsl(var(--card-foreground))"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              animate={{ 
                backgroundSize: isHovered ? "100% 100%" : "0% 100%"
              }}
              transition={{ duration: 0.6 }}
              style={{
                background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0% 100%",
              }}
            >
              "{testimonial.content}"
            </motion.span>
          </motion.blockquote>

          {/* Enhanced Author Section */}
          <motion.div 
            className="mt-auto"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${cardColor} blur-md opacity-50`} />
                <div className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-white/20 shadow-xl">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Status indicator */}
                <motion.div 
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r ${cardColor} ring-2 ring-white shadow-lg`}
                  animate={{ 
                    scale: isHovered ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: isHovered ? Infinity : 0 
                  }}
                />
              </motion.div>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="font-bold text-lg text-card-foreground mb-1"
                animate={{ 
                  color: isHovered ? "hsl(var(--primary))" : "hsl(var(--card-foreground))"
                }}
                transition={{ duration: 0.3 }}
              >
                {testimonial.name}
              </motion.div>
              <motion.div 
                className="text-sm text-muted-foreground"
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {testimonial.role} • {testimonial.department}
              </motion.div>
            </div>

            {/* Interactive Badge */}
            <motion.div
              className="flex justify-center mt-4"
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${cardColor} text-white shadow-lg`}>
                ⭐ Verified Student
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Glow Effect */}
        <motion.div 
          className={`absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t ${cardColor} blur-xl`}
          animate={{ 
            opacity: isHovered ? 0.2 : 0,
            scale: isHovered ? 1.3 : 1
          }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </motion.div>
  );
};

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-secondary opacity-50" />
      
      <div className="container relative max-w-7xl px-4">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-0 left-1/4 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full opacity-20"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-10 right-1/3 w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full opacity-30"
              animate={{
                y: [0, 15, 0],
                scale: [1, 0.8, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute -top-5 right-1/4 w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-40"
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.span 
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 text-primary mb-8 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                ⭐ Student Success Stories
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  💫
                </motion.div>
              </span>
            </motion.span>
          </motion.div>

          <motion.h2 
            className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Hear From Our</span>
            <span className="block">
              <span className="animate-gradient-text">Amazing Students</span>
              <motion.span
                className="inline-block ml-4 text-6xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🎓
              </motion.span>
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-4xl text-lg md:text-xl text-muted-foreground leading-relaxed relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="relative z-10">
              Discover how our innovative transport system has transformed the daily commute for 
              thousands of ADUSTECH students, making campus life more convenient, efficient, and enjoyable.
            </span>
          </motion.p>

          {/* Animated divider */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { number: '5000+', label: 'Happy Students' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '50K+', label: 'Trips Booked' },
            { number: '99%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>


        {/* Spectacular Testimonials Display */}
        <div className="relative">
          {/* Infinite Carousel for All Devices */}
          <div
            className="group/container relative w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            {/* Pause indicator overlay */}
            <motion.div 
              className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover/container:opacity-100 transition-opacity duration-500" 
            />
            
            <motion.div 
              className="flex items-stretch gap-8 group-hover/container:[animation-play-state:paused]"
              style={{
                width: 'max-content',
                animation: 'scroll 80s linear infinite'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {/* Render testimonials multiple times for seamless infinite scroll */}
              {[...Array(3)].map((_, setIndex) => 
                testimonials.map((testimonial, index) => (
                  <SpectacularTestimonialCard 
                    key={`${testimonial.id}-${setIndex}`} 
                    testimonial={testimonial} 
                    index={index} 
                  />
                ))
              )}
            </motion.div>
          </div>
          
          {/* Enhanced Navigation Dots */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30 transition-all duration-300 hover:bg-primary/50" />
                <motion.div
                  className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-muted-foreground mb-6">Ready to join thousands of satisfied students?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg gradient-bg-primary text-white hover:scale-105 transition-all duration-300 glow-primary">
              Start Your Journey
            </button>
            <button className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg border border-border bg-card hover:bg-muted transition-all duration-300">
              Read More Reviews
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}