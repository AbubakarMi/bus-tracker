import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-[calc(100vh-4rem)] w-full">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="A bus on an open road"
        data-ai-hint="bus road"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container max-w-4xl px-4 text-white">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Intelligent Transport for the Modern Student
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-lg text-gray-200 md:text-xl">
            SwiftRoute provides reliable, real-time bus tracking and seamless seat booking. Never miss your ride again.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/login">Login to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
