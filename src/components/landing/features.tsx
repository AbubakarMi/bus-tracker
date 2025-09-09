
'use client';

import * as React from 'react';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, Map, ShieldCheck, Ticket, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Real-Time Bus Tracking',
    description: 'See exactly where your bus is on a live map, with accurate ETA predictions to your stop.',
  },
  {
    icon: <Ticket className="h-8 w-8 text-primary" />,
    title: 'Seamless Seat Booking',
    description: 'Book your seat in advance with a visual seat map and download your digital ticket instantly.',
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: 'Instant Notifications',
    description: 'Receive timely alerts for booking confirmations, departure times, and potential delays.',
  },
   {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Route Insights',
    description: 'Get smart summaries of routes, including key stops and points of interest, to plan your travel better.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Safe and Secure',
    description: 'Built with role-based access and security-first principles to protect your data.',
  },
];

const FeatureCard = ({ feature, index }: { feature: (typeof features)[0], index: number }) => (
    <div className="mx-4 flex-shrink-0" style={{ width: 'clamp(20rem, 30vw, 24rem)'}}>
      <Card className="card-glow h-full text-center flex flex-col transform transition-transform duration-300 hover:!scale-105">
        <CardHeader className="flex-grow">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <div className="animate-icon-pulse" style={{ animationDelay: `${index * 250}ms` }}>
              {feature.icon}
            </div>
          </div>
          <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
          <CardDescription className="pt-2">{feature.description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
);


export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="container max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Everything You Need for a Smooth Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From live tracking to easy booking, SwiftRoute simplifies your daily commute.
          </p>
        </div>
        <div className="mt-12">
            <div
              className="group relative w-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              }}
            >
              <div className="animate-scroll flex w-max items-stretch group-hover:[animation-play-state:paused]">
                {/* Render cards twice for a seamless loop */}
                {features.map((feature, index) => (
                    <FeatureCard key={feature.title} feature={feature} index={index} />
                ))}
                 {features.map((feature, index) => (
                    <FeatureCard key={`${feature.title}-duplicate`} feature={feature} index={index} aria-hidden="true"/>
                ))}
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
