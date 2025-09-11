
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
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              💬 Get in Touch
            </span>
          </motion.div>

          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            We&apos;re Here to{' '}
            <span className="gradient-text">Help You</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Have questions or feedback? Our dedicated support team is ready to assist you 
            with any inquiries about our transport services.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center glass-card p-4 rounded-xl">
              <div className="flex items-center justify-center mb-2 text-primary">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
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

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 50%), 
                                   radial-gradient(circle at 80% 70%, hsl(var(--accent)) 0%, transparent 50%)`
                }} />
              </div>

              <div className="relative z-10 p-8 lg:p-12">
                <div className="mb-8">
                  <h3 className="font-headline text-2xl md:text-3xl font-bold text-card-foreground mb-3">
                    Send us a Message
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                </div>

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

        {/* FAQ Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="font-headline text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-muted-foreground mb-6">
            Check out our comprehensive FAQ section for quick answers to common questions.
          </p>
          <Button variant="outline" className="hover:scale-105 transition-all duration-300">
            View FAQ
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
