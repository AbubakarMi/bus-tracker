
import Link from 'next/link';
import { Logo } from './logo';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { AnimatedText } from './ui/animated-text';

const footerSections = [
  {
    title: 'Product',
    links: [
      { href: '#features', label: 'Features' },
      { href: '/register', label: 'Register' },
      { href: '/login', label: 'Login' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#about', label: 'About Us' },
      { href: '#contact', label: 'Contact' },
      { href: '/', label: 'Careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/', label: 'Privacy Policy' },
      { href: '/', label: 'Terms of Service' },
    ],
  },
];

const socialLinks = [
  { href: '#', icon: <Facebook className="h-5 w-5" />, label: 'Facebook' },
  { href: '#', icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
  { href: '#', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-2xl animate-fade-in-up md:p-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Stay Updated on ADUSTECH Transport
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Subscribe to our newsletter for the latest updates, news, and feature announcements.
              </p>
              <form className="mt-8 flex w-full max-w-lg mx-auto flex-col items-center gap-2 sm:flex-row">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 flex-1 border-border bg-background/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-background/30"
                    aria-label="Email for newsletter"
                />
                <Button type="submit" size="lg" variant="secondary" className="w-full sm:w-auto">
                    Subscribe
                </Button>
              </form>
            </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          
          <div className="space-y-4 md:col-span-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Modern transport solutions for a connected campus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-5 md:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-foreground transition-colors hover:text-primary hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-3">
             <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-base text-muted-foreground">
            &copy; {new Date().getFullYear()} ADUSTECH Transport. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
