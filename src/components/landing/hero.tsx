
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroAnimation } from './hero-animation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
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
    },
  },
};

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background dark:bg-black">
       <HeroAnimation />
       <div className="relative z-10 flex h-full items-center justify-center">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container mx-auto max-w-7xl px-4"
        >
            <div className="grid items-center md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                     <motion.div
                        variants={itemVariants}
                        className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:text-primary-foreground mb-4"
                    >
                       A new era of campus mobility is here.
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl"
                    >
                        Intelligent Transport for ADUSTECH
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground md:mx-0"
                    >
                        Reliable, real-time bus tracking and seamless seat booking for the Aliko Dangote University of Science and Technology, Wudil.
                    </motion.p>
                     <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start"
                    >
                        <Button size="lg" asChild className="w-full sm:w-auto shadow-lg shadow-primary/30 transition-transform hover:scale-105">
                            <Link href="/register">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="w-full sm:w-auto transition-transform hover:scale-105">
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                    </motion.div>
                </div>
                 <motion.div 
                    variants={itemVariants}
                    className="hidden md:block"
                 >
                     <div className="relative h-[500px] w-full">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                        <div 
                            className="absolute inset-8 rounded-2xl bg-background/80 p-6 shadow-2xl backdrop-blur-xl"
                        >
                           <div className="h-full w-full rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center">
                                <p className="text-center text-muted-foreground">Visual representation of the app</p>
                           </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
       </div>
    </section>
  );
}
