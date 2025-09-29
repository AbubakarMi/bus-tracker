'use client';

import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Users, Bus, Route, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { realTimeSync, type SystemUpdate } from '@/lib/real-time-sync';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'booking' | 'bus' | 'route' | 'activity';
  title: string;
  message: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
  isRead: boolean;
}

export function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Subscribe to all real-time updates
    const unsubscribe = realTimeSync.subscribeToAll((update: SystemUpdate) => {
      const notification = createNotificationFromUpdate(update);
      if (notification) {
        setNotifications(prev => {
          const newNotifications = [notification, ...prev].slice(0, 50); // Keep only last 50
          return newNotifications;
        });
        setUnreadCount(prev => prev + 1);

        // Auto-show notification for 3 seconds
        setIsOpen(true);
        setTimeout(() => {
          if (!isOpen) setIsOpen(false);
        }, 3000);
      }
    });

    return unsubscribe;
  }, []);

  const createNotificationFromUpdate = (update: SystemUpdate): Notification | null => {
    const timestamp = new Date().toISOString();
    const id = `notification_${Date.now()}_${Math.random()}`;

    switch (update.type) {
      case 'booking_created':
        return {
          id,
          type: 'booking',
          title: '🎫 New Booking Created',
          message: `${update.data.passengerName} booked seat ${update.data.seatNumber} on ${update.data.busPlateNumber}`,
          timestamp,
          icon: <Calendar className="w-4 h-4" />,
          color: 'bg-green-500',
          isRead: false
        };

      case 'booking_updated':
        const status = update.data.status;
        let statusMessage = 'updated';
        let color = 'bg-blue-500';

        if (status === 'cancelled') {
          statusMessage = 'cancelled';
          color = 'bg-red-500';
        } else if (status === 'completed') {
          statusMessage = 'completed';
          color = 'bg-green-500';
        }

        return {
          id,
          type: 'booking',
          title: `📝 Booking ${statusMessage.charAt(0).toUpperCase() + statusMessage.slice(1)}`,
          message: `Booking for ${update.data.passengerName} on ${update.data.busPlateNumber} was ${statusMessage}`,
          timestamp,
          icon: <CheckCircle className="w-4 h-4" />,
          color,
          isRead: false
        };

      case 'bus_created':
        return {
          id,
          type: 'bus',
          title: '🚌 New Bus Added',
          message: `Bus ${update.data.plateNumber} (${update.data.capacity} seats) has been added to the fleet`,
          timestamp,
          icon: <Bus className="w-4 h-4" />,
          color: 'bg-blue-500',
          isRead: false
        };

      case 'bus_updated':
        return {
          id,
          type: 'bus',
          title: '🔧 Bus Updated',
          message: `Bus ${update.data.plateNumber} information has been updated`,
          timestamp,
          icon: <AlertCircle className="w-4 h-4" />,
          color: 'bg-yellow-500',
          isRead: false
        };

      case 'route_created':
        return {
          id,
          type: 'route',
          title: '🛣️ New Route Added',
          message: `Route "${update.data.name}" from ${update.data.startPoint} to ${update.data.endPoint} has been created`,
          timestamp,
          icon: <Route className="w-4 h-4" />,
          color: 'bg-purple-500',
          isRead: false
        };

      case 'route_updated':
        return {
          id,
          type: 'route',
          title: '🗺️ Route Updated',
          message: `Route "${update.data.name}" has been updated`,
          timestamp,
          icon: <Info className="w-4 h-4" />,
          color: 'bg-indigo-500',
          isRead: false
        };

      default:
        return null;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const formatTime = (timestamp: string) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(new Date(timestamp));
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-80 max-w-sm z-50"
          >
            <Card className="shadow-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <h3 className="font-semibold text-sm">Live Updates</h3>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {notifications.length > 0 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs px-2 py-1 h-6"
                        >
                          Mark all read
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAll}
                          className="text-xs px-2 py-1 h-6"
                        >
                          Clear
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="p-1 h-6 w-6"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications yet</p>
                      <p className="text-xs text-gray-400 mt-1">
                        You'll see live updates here when actions occur
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                            !notification.isRead ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-1.5 rounded-full ${notification.color} text-white flex-shrink-0`}>
                              {notification.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm truncate">
                                  {notification.title}
                                </p>
                                <time className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                  {formatTime(notification.timestamp)}
                                </time>
                              </div>
                              <p className="text-xs text-gray-600 mt-1 leading-tight">
                                {notification.message}
                              </p>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Hook for components that want to show notification count
export function useNotificationCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = realTimeSync.subscribeToAll(() => {
      setCount(prev => prev + 1);
    });

    return unsubscribe;
  }, []);

  const resetCount = () => setCount(0);

  return { count, resetCount };
}