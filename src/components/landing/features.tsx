import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell, Map, ShieldCheck, Ticket } from 'lucide-react';

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
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Safe and Secure',
    description: 'Built with role-based access and security-first principles to protect your data.',
  },
];

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
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
