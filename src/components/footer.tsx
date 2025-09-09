import Link from 'next/link';
import { Logo } from './logo';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Facebook, Twitter, Linkedin, Send } from 'lucide-react';

const footerSections = [
  {
    title: 'Product',
    links: [
      { href: '#features', label: 'Features' },
      { href: '/register', label: 'Register' },
      { href: '/login', label: 'Login' },
      { href: '/dashboard', label: 'Dashboard' },
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
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Modern transport solutions for a connected campus.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-foreground">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-4">
             <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-foreground">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                aria-label="Email for newsletter"
              />
              <Button type="submit" size="icon" aria-label="Subscribe to newsletter">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ADUSTECH Transport. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
