
'use client';

import { motion } from 'framer-motion';
import { Bus, MapPin, Users, Clock } from 'lucide-react';

export function RoadAnimation() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-primary/5 via-background to-accent/5">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-30"
            style={{
              top: `${10 + (i * 6) % 80}%`,
              left: `${5 + (i * 8) % 90}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Enhanced Road Surface */}
      <div className="absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-muted/60 to-muted/20 perspective-1000">
        {/* Road markings */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-primary/40"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Enhanced Road Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          {[0, 2, 4].map((delay) => (
            <motion.div 
              key={delay}
              className="road-line-animation absolute top-1/2 left-1/2 w-24 h-2 bg-gradient-to-r from-card via-card to-card rounded-full"
              style={{ animationDelay: `${delay}s` }}
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay * 0.5
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Animated Buses */}
      <motion.div 
        className="bus-container animate-drive-right-far"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bus className="h-16 w-16 text-primary/60 drop-shadow-lg" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="bus-container animate-drive-left-near animation-delay-3s"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, -1, 0]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bus className="h-28 w-28 text-primary drop-shadow-2xl" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="bus-container animate-drive-right-mid animation-delay-7s"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          animate={{ 
            y: [0, -6, 0],
            rotate: [0, 0.5, 0]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bus className="h-20 w-20 text-primary/80 drop-shadow-xl" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="bus-container animate-drive-left-far animation-delay-10s"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          animate={{ 
            y: [0, -4, 0],
            rotate: [0, -0.5, 0]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bus className="h-14 w-14 text-primary/50 drop-shadow-md" />
        </motion.div>
      </motion.div>

      {/* Enhanced Info Cards */}
      <motion.div
        className="absolute top-20 right-8 glass-card p-6 rounded-2xl backdrop-blur-xl z-20 max-w-xs"
        initial={{ opacity: 0, x: 50, rotate: 5 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: 0,
          y: [0, -10, 0]
        }}
        transition={{ 
          opacity: { delay: 1, duration: 0.8 },
          x: { delay: 1, duration: 0.8 },
          rotate: { delay: 1, duration: 0.8 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <MapPin className="h-6 w-6 text-primary" />
          </motion.div>
          <h3 className="font-semibold text-card-foreground">Real-time Tracking</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Track your bus location in real-time with precise GPS accuracy
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-8 glass-card p-6 rounded-2xl backdrop-blur-xl z-20 max-w-xs"
        initial={{ opacity: 0, x: -50, rotate: -5 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: 0,
          y: [0, 10, 0]
        }}
        transition={{ 
          opacity: { delay: 1.5, duration: 0.8 },
          x: { delay: 1.5, duration: 0.8 },
          rotate: { delay: 1.5, duration: 0.8 },
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Users className="h-6 w-6 text-accent" />
          </motion.div>
          <h3 className="font-semibold text-card-foreground">5000+ Students</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Join thousands of students using our smart transport system
        </p>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-20 glass-card p-4 rounded-xl backdrop-blur-xl z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          opacity: { delay: 2, duration: 0.6 },
          scale: { delay: 2, duration: 0.6 },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-500" />
          <span className="text-sm font-semibold">24/7 Service</span>
        </div>
      </motion.div>
    </div>
  );
}
