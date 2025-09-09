
import Link from 'next/link';
import { Logo } from './logo';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

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
      <div className="bg-muted/40">
        <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Stay Updated on ADUSTECH Transport
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Subscribe to our newsletter for the latest updates, news, and feature announcements.
              </p>
            </div>
            <form className="flex w-full max-w-md flex-col items-center gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 border-border bg-background"
                aria-label="Email for newsletter"
              />
              <Button type="submit" size="lg" className="w-full sm:w-auto">
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
