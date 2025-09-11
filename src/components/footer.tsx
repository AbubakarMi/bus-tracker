
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
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%),
                           radial-gradient(circle at 50% 0%, hsl(var(--primary)) 0%, transparent 60%)`
        }} />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-20"
            style={{
              top: `${10 + (i * 12) % 80}%`,
              left: `${5 + (i * 15) % 90}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-border/50">
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl gradient-bg-primary p-8 text-white shadow-2xl md:p-16 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-700">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>

            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent via-white to-accent opacity-20 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    top: `${20 + i * 15}%`,
                    right: `${10 + i * 10}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h2 
                  className="font-headline text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="block">Stay Connected with</span>
                  <span className="block relative">
                    <span className="text-accent">ADUSTECH Transport</span>
                    <motion.span
                      className="inline-block ml-4 text-4xl"
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      🚌
                    </motion.span>
                  </span>
                </motion.h2>
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

              {/* Enhanced Quick Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {quickStats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center glass-card p-6 rounded-2xl group hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-accent/10 opacity-0 group-hover:opacity-100 rounded-2xl"
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            top: `${30 + i * 20}%`,
                            right: `${20 + i * 15}%`,
                          }}
                          animate={{
                            y: [0, -20, -40],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.3,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10">
                      <motion.div 
                        className="flex items-center justify-center mb-3 text-accent"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -10, 10, 0]
                        }}
                        transition={{ 
                          scale: { type: "spring", stiffness: 400, damping: 10 },
                          rotate: { duration: 0.6 }
                        }}
                      >
                        <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                          {stat.icon}
                        </div>
                      </motion.div>
                      <motion.div 
                        className="font-bold text-white mb-2 text-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {stat.label}
                      </motion.div>
                      <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        {stat.description}
                      </div>
                    </div>
                  </motion.div>
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
                <motion.h3 
                  className="text-sm font-semibold tracking-wider uppercase text-foreground mb-6 relative"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Follow Us
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "40%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </motion.h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 5
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={social.href}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary/10 shadow-lg hover:shadow-xl ${social.color} group relative overflow-hidden`}
                        aria-label={social.label}
                      >
                        {/* Hover shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">{social.icon}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Enhanced App Download */}
              <div>
                <motion.h3 
                  className="text-sm font-semibold tracking-wider uppercase text-foreground mb-6 relative"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Download App
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "50%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </motion.h3>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden"
                      asChild
                    >
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Hover shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="flex items-center gap-3 relative z-10">
                          <motion.div 
                            className="text-2xl"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            📱
                          </motion.div>
                          <div className="text-left">
                            <div className="text-xs text-muted-foreground">Download on the</div>
                            <div className="font-semibold">App Store</div>
                          </div>
                        </div>
                      </motion.div>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden"
                      asChild
                    >
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Hover shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="flex items-center gap-3 relative z-10">
                          <motion.div 
                            className="text-2xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            🤖
                          </motion.div>
                          <div className="text-left">
                            <div className="text-xs text-muted-foreground">Get it on</div>
                            <div className="font-semibold">Google Play</div>
                          </div>
                        </div>
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Enhanced Bottom Section */}
          <motion.div
            className="mt-20 border-t border-border/50 pt-12 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-center sm:text-left"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  &copy; {new Date().getFullYear()} ADUSTECH Transport Solutions. All rights reserved.
                </p>
                <motion.p 
                  className="text-xs text-muted-foreground/70"
                  whileHover={{ color: "hsl(var(--primary))" }}
                  transition={{ duration: 0.2 }}
                >
                  Made with ❤️ for ADUSTECH students
                </motion.p>
              </motion.div>

              <motion.div
                className="flex items-center gap-8 text-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {[
                  { href: "/", label: "Privacy" },
                  { href: "/", label: "Terms" },
                  { href: "/", label: "Cookies" }
                ].map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Final decorative touch */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
