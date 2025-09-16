
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Check, Clock, MessageCircle, Users, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const contactInfo = [
  { 
    icon: <Mail className="h-6 w-6" />, 
    title: 'Email Us', 
    value: 'contact@adustech.edu.ng',
    description: 'Get in touch via email',
    color: 'from-blue-500 to-cyan-500',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    action: 'Send Email'
  },
  { 
    icon: <Phone className="h-6 w-6" />, 
    title: 'Call Us', 
    value: '+234 123 456 7890',
    description: '24/7 support available',
    color: 'from-green-500 to-emerald-500',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
    action: 'Call Now'
  },
  { 
    icon: <MapPin className="h-6 w-6" />, 
    title: 'Visit Us', 
    value: 'Wudil, Kano State, Nigeria',
    description: 'ADUSTECH Campus',
    color: 'from-purple-500 to-pink-500',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
    action: 'Get Directions'
  },
];

const stats = [
  { icon: <MessageCircle className="h-5 w-5" />, number: '24/7', label: 'Support' },
  { icon: <Clock className="h-5 w-5" />, number: '<1hr', label: 'Response Time' },
  { icon: <Users className="h-5 w-5" />, number: '5000+', label: 'Students Helped' },
  { icon: <Check className="h-5 w-5" />, number: '99%', label: 'Satisfaction' },
];

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-secondary opacity-30" />
      
      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Enhanced Header */}
        <motion.div
          className="mx-auto max-w-4xl text-center mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-8 left-1/4 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full opacity-20"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.7, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-16 right-1/3 w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full opacity-30"
              animate={{
                y: [0, 15, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute top-4 right-1/4 w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-40"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.span 
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 text-primary mb-8 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  💬
                </motion.div>
                Get in Touch
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.div>
              </span>
            </motion.span>
          </motion.div>

          <motion.h2 
            className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">We&apos;re Here to</span>
            <span className="block">
              <span className="animate-gradient-text">Help You</span>
              <motion.span
                className="inline-block ml-4 text-6xl"
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
                🤝
              </motion.span>
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Have questions or feedback? Our dedicated support team is ready to assist you 
            with any inquiries about our transport services. We&apos;re committed to providing 
            <span className="font-semibold text-primary"> exceptional support</span> and 
            <span className="font-semibold text-accent"> quick responses</span>.
          </motion.p>

          {/* Animated divider */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="h-1 w-32 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
          </motion.div>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center feature-card p-6 rounded-2xl group hover:scale-105 transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
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
                  className="flex items-center justify-center mb-4 text-primary"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ 
                    scale: { type: "spring", stiffness: 400, damping: 10 },
                    rotate: { duration: 0.6 }
                  }}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                    {stat.icon}
                  </div>
                </motion.div>
                <motion.div 
                  className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </div>
              </div>

              {/* Bottom glow effect */}
              <motion.div
                className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl"
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Contact Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="feature-card group relative overflow-hidden rounded-3xl p-8 hover:scale-105"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                {/* Custom Background Pattern */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: info.bgPattern }}
                />
                
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
                
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <div className={`w-3 h-3 bg-gradient-to-r ${info.color} rounded-full animate-pulse`}></div>
                </div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className="mb-6"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${info.color} text-white shadow-xl group-hover:shadow-2xl transition-all duration-500`}>
                      {info.icon}
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="mb-6">
                    <h4 className="font-headline text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">{info.description}</p>
                    <p className="font-semibold text-lg text-card-foreground break-all">{info.value}</p>
                  </div>
                  
                  {/* Action Button */}
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${info.color} bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 group/btn`}>
                      {info.action}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-card border border-border/50 shadow-2xl group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {/* Enhanced Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 50%), 
                                   radial-gradient(circle at 80% 70%, hsl(var(--accent)) 0%, transparent 50%),
                                   radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 80%)`
                }} />
              </div>

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20 group-hover:opacity-40 rounded-3xl blur-xl"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating decorative elements */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{
                      top: `${20 + i * 20}%`,
                      right: `${10 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 p-8 lg:p-12">
                <motion.div 
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.h3 
                    className="font-headline text-3xl md:text-4xl font-bold text-card-foreground mb-4 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="relative">
                      Send us a Message
                      <motion.div
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </span>
                  </motion.h3>
                  <p className="text-muted-foreground text-lg">
                    Fill out the form below and we&apos;ll get back to you as soon as possible. 
                    <span className="font-semibold text-primary"> Our response time is typically under 1 hour!</span>
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 bg-muted/30 border-border/50 focus:bg-background focus:border-primary transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 bg-muted/30 border-border/50 focus:bg-background focus:border-primary transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-12 bg-muted/30 border-border/50 focus:bg-background focus:border-primary transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-muted/30 border-border/50 focus:bg-background focus:border-primary transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={cn(
                      "w-full h-12 font-semibold text-lg transition-all duration-300",
                      isSubmitted 
                        ? "bg-green-500 hover:bg-green-500" 
                        : "gradient-bg-primary glow-primary hover:scale-105"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : isSubmitted ? (
                      <div className="flex items-center">
                        <Check className="h-5 w-5 mr-2" />
                        Message Sent!
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced FAQ Section */}
        <motion.div
          className="mt-24 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-0 left-1/3 w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full opacity-30"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-8 right-1/4 w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full opacity-40"
              animate={{
                y: [0, 15, 0],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.span 
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 text-primary mb-6 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ❓
                </motion.div>
                Quick Help
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ⚡
                </motion.div>
              </span>
            </motion.span>
          </motion.div>

          <motion.h3 
            className="font-headline text-3xl md:text-4xl font-bold mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="block">Frequently Asked</span>
            <span className="animate-gradient-text">Questions</span>
          </motion.h3>

          <motion.p
            className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Check out our comprehensive FAQ section for quick answers to common questions. 
            <span className="font-semibold text-primary"> Most answers are found instantly!</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.button 
              className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg gradient-bg-primary text-white hover:scale-105 transition-all duration-300 glow-primary shadow-xl group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                View FAQ
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </span>
            </motion.button>
            
            <motion.button 
              className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg border border-border bg-card hover:bg-muted transition-all duration-300 hover:scale-105 shadow-lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                Live Chat
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  💬
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="h-1 w-40 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
