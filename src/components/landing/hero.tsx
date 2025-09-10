
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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
      damping: 15,
      stiffness: 100,
    },
  },
};

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <motion.div
          className="container max-w-4xl px-4 text-white"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            Intelligent Transport for ADUSTECH
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-[700px] text-lg text-gray-200 md:text-xl"
            variants={itemVariants}
          >
            Reliable, real-time bus tracking and seamless seat booking for the Aliko Dangote University of Science and Technology, Wudil.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            variants={itemVariants}
          >
            <Button size="lg" asChild className="shadow-lg shadow-primary/30 transition-transform hover:scale-105">
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent text-white transition-transform hover:scale-105 hover:bg-white/10 hover:text-white">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
