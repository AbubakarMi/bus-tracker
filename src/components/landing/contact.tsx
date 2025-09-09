import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactInfo = [
    { icon: <Mail className="h-6 w-6 text-primary" />, title: 'Email Us', value: 'contact@adustech.edu.ng' },
    { icon: <Phone className="h-6 w-6 text-primary" />, title: 'Call Us', value: '+234 123 456 7890' },
    { icon: <MapPin className="h-6 w-6 text-primary" />, title: 'Visit Us', value: 'Wudil, Kano State, Nigeria' },
];


export function Contact() {
  return (
    <section id="contact" className="bg-muted py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 overflow-hidden rounded-2xl bg-card shadow-2xl lg:grid-cols-2 lg:gap-0">
          <div className="relative flex flex-col justify-center bg-foreground p-8 text-background lg:p-12">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
             <div className="relative z-10">
                <h3 className="font-headline text-2xl font-bold text-white">Contact Information</h3>
                <p className="mt-4 text-lg text-muted-foreground">
                    Our team is here to help. Reach out to us through any of the channels below.
                </p>
                <div className="mt-8 space-y-6">
                    {contactInfo.map((info) => (
                        <div key={info.title} className="flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                {info.icon}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white">{info.title}</h4>
                                <p className="text-muted-foreground">{info.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
          <div className="p-8 lg:p-12">
            <h3 className="font-headline text-2xl font-bold text-foreground">Send us a message</h3>
             <form className="mt-6 space-y-6">
              <div className="space-y-2">
                <Input id="name" placeholder="Your Name" required className="h-12 bg-muted/50 focus:bg-background"/>
              </div>
              <div className="space-y-2">
                <Input id="email" type="email" placeholder="Your Email" required className="h-12 bg-muted/50 focus:bg-background"/>
              </div>
              <div className="space-y-2">
                <Textarea id="message" placeholder="Your Message" required className="min-h-[150px] bg-muted/50 focus:bg-background" />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
