
'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from './logo';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Bus,
  Clock,
  Shield,
  ArrowRight,
  Star
} from 'lucide-react';

const footerSections = [
  {
    title: 'Services',
    links: [
      { href: '#features', label: 'Real-time Tracking' },
      { href: '#features', label: 'Seat Booking' },
      { href: '#features', label: 'Route Planning' },
      { href: '#features', label: 'Mobile App' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '#contact', label: 'Help Center' },
      { href: '#contact', label: 'Contact Support' },
      { href: '/', label: 'Student Guide' },
      { href: '/', label: 'FAQ' },
    ],
  },
  {
    title: 'University',
    links: [
      { href: 'https://adustech.edu.ng', label: 'ADUSTECH Portal' },
      { href: '/', label: 'Academic Calendar' },
      { href: '/', label: 'Campus Map' },
      { href: '/', label: 'Student Life' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/', label: 'Privacy Policy' },
      { href: '/', label: 'Terms of Service' },
      { href: '/', label: 'Cookie Policy' },
      { href: '/', label: 'Accessibility' },
    ],
  },
];

const socialLinks = [
  { href: '#', icon: <Facebook className="h-5 w-5" />, label: 'Facebook', color: 'hover:text-blue-500' },
  { href: '#', icon: <Twitter className="h-5 w-5" />, label: 'Twitter', color: 'hover:text-sky-500' },
  { href: '#', icon: <Instagram className="h-5 w-5" />, label: 'Instagram', color: 'hover:text-pink-500' },
  { href: '#', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', color: 'hover:text-blue-600' },
  { href: '#', icon: <Youtube className="h-5 w-5" />, label: 'YouTube', color: 'hover:text-red-500' },
];

const quickStats = [
  { icon: <Bus className="h-5 w-5" />, label: '50+ Routes', description: 'Daily coverage' },
  { icon: <Clock className="h-5 w-5" />, label: '24/7 Service', description: 'Always available' },
  { icon: <Shield className="h-5 w-5" />, label: '100% Secure', description: 'Safe & reliable' },
  { icon: <Star className="h-5 w-5" />, label: '4.9/5 Rating', description: 'Student satisfaction' },
];

const contactInfo = [
  { icon: <Mail className="h-4 w-4" />, label: 'support@adustech.edu.ng' },
  { icon: <Phone className="h-4 w-4" />, label: '+234 123 456 7890' },
  { icon: <MapPin className="h-4 w-4" />, label: 'ADUSTECH, Wudil, Kano' },
];

export function Footer() {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="relative border-t bg-background text-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%)`
        }} />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-border/50">
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl gradient-bg-primary p-8 text-white shadow-2xl md:p-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                  Stay Connected with{' '}
                  <span className="text-accent">ADUSTECH Transport</span>
                </h2>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Get the latest updates on new routes, service improvements, and campus transport news delivered to your inbox.
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleNewsletterSubmit}
                className="flex w-full max-w-md mx-auto flex-col items-center gap-4 sm:flex-row mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your student email"
                  required
                  className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-white/40"
                  aria-label="Email for newsletter"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="secondary" 
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold px-8"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.form>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-center mb-2 text-accent">
                      {stat.icon}
                    </div>
                    <div className="font-bold text-white mb-1">{stat.label}</div>
                    <div className="text-xs text-white/70">{stat.description}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Company Info */}
            <motion.div 
              className="space-y-6 lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Logo />
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Revolutionizing campus transportation at ADUSTECH with smart, reliable, 
                and student-focused transport solutions. Making every journey seamless and efficient.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {contact.icon}
                    </div>
                    <span>{contact.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:grid-cols-4">
              {footerSections.map((section, sectionIndex) => (
                <motion.div 
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
                >
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary hover:translate-x-1 duration-200 block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Social Links & App Download */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-4">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all duration-200 hover:scale-110 hover:bg-primary/10 ${social.color}`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>

              {/* App Download */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-4">
                  Download App
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">📱</div>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Download on the</div>
                        <div className="font-semibold">App Store</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">🤖</div>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Get it on</div>
                        <div className="font-semibold">Google Play</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Section */}
          <motion.div
            className="mt-16 border-t border-border/50 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} ADUSTECH Transport Solutions. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link href="/" className="hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link href="/" className="hover:text-primary transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
