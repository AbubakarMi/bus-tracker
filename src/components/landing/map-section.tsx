
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MapPlaceholder } from '@/components/map-placeholder';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Users, 
  Route,
  Bus,
  ArrowRight 
} from 'lucide-react';

// Modern map style that matches our design
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e2e8f0' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#f1f5f9' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#dcfce7' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e2e8f0' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#fef3c7' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#fbbf24' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#dbeafe' }],
  },
];

const routeFeatures = [
  {
    icon: <Route className="h-6 w-6" />,
    title: 'Campus Routes',
    description: '15+ routes covering all major campus locations',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Real-time Updates',
    description: 'Live tracking with accurate arrival times',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Peak Hour Service',
    description: 'Extra buses during high-demand periods',
    color: 'from-purple-500 to-pink-500',
  },
];

const quickStats = [
  { icon: <Bus className="h-5 w-5" />, number: '50+', label: 'Active Buses' },
  { icon: <Route className="h-5 w-5" />, number: '15+', label: 'Routes' },
  { icon: <MapPin className="h-5 w-5" />, number: '100+', label: 'Bus Stops' },
  { icon: <Users className="h-5 w-5" />, number: '5000+', label: 'Daily Riders' },
];

export function MapSection() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <section id="map" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
              🗺️ Route Network
            </span>
          </motion.div>

          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Explore Our{' '}
            <span className="gradient-text">Smart Routes</span>
          </h2>
          
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Discover our comprehensive network of routes designed to connect every corner of 
            ADUSTECH campus with the surrounding community.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center modern-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="flex items-center justify-center mb-3 text-primary">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Map */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="feature-card relative overflow-hidden rounded-3xl p-2 group">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl" />
              
              <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-[1.5rem] bg-muted">
                {apiKey ? (
                  <APIProvider apiKey={apiKey}>
                    <Map
                      defaultCenter={{ lat: 11.8969, lng: 8.4334 }}
                      defaultZoom={13}
                      gestureHandling={'greedy'}
                      disableDefaultUI={true}
                      styles={mapStyle}
                      mapId="swiftroute_landing_map"
                      className="w-full h-full"
                    />
                  </APIProvider>
                ) : (
                  <MapPlaceholder />
                )}
                
                {/* Map Overlay Controls */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <motion.button 
                    className="glass-card p-3 rounded-xl text-primary hover:bg-primary/10 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Navigation className="h-5 w-5" />
                  </motion.button>
                  <motion.button 
                    className="glass-card p-3 rounded-xl text-primary hover:bg-primary/10 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapPin className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Route Features */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-8">
              <h3 className="font-headline text-2xl font-bold text-card-foreground mb-4">
                Route Features
              </h3>
              <p className="text-muted-foreground">
                Experience seamless transportation with our advanced route management system.
              </p>
            </div>

            {routeFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="modern-card p-6 rounded-2xl group hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button 
                className="w-full gradient-bg-primary text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  View All Routes
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
