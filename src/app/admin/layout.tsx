'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bus,
  Users,
  UserCheck,
  Route,
  MapPin,
  Settings,
  Activity,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  Sparkles,
  Brain,
  Cpu,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Overview & Analytics'
  },
  {
    title: 'Live Tracking',
    href: '/admin/tracking',
    icon: MapPin,
    description: 'Real-time Bus Monitoring',
    badge: 'Live'
  },
  {
    title: 'Bus Fleet',
    href: '/admin/buses',
    icon: Bus,
    description: 'Manage Buses & Seats'
  },
  {
    title: 'Drivers',
    href: '/admin/drivers',
    icon: UserCheck,
    description: 'Driver Management'
  },
  {
    title: 'Routes & Schedules',
    href: '/admin/routes',
    icon: Route,
    description: 'Route Planning'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'Students & Staff'
  },
  {
    title: 'Activity Logs',
    href: '/admin/activity',
    icon: Activity,
    description: 'System Monitoring'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System Configuration'
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Ultra-Advanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-purple-600/20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-violet-400/25 to-fuchsia-400/25 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* EXTREME Futuristic Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 transform transition-all duration-500 ease-in-out lg:translate-x-0 lg:relative lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Sidebar Glass Container */}
          <div className="h-full bg-gradient-to-b from-slate-800/90 via-blue-800/80 to-indigo-800/90 backdrop-blur-2xl border-r border-cyan-400/30 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">

            {/* Animated Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 via-transparent to-blue-400/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 animate-pulse"></div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>

            {/* Sidebar Header - EXTREME */}
            <div className="relative flex items-center justify-between h-20 px-6 border-b border-cyan-400/30">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 transform hover:scale-110 transition-all duration-300">
                    <Bus className="h-7 w-7 text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 to-transparent rounded-2xl animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    ADUSTECH
                  </h1>
                  <p className="text-sm font-semibold text-cyan-300 animate-pulse">COMMAND CENTER</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-cyan-400 hover:bg-cyan-400/20 hover:text-white transition-all duration-300"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Quantum Search */}
            <div className="relative p-6 border-b border-cyan-400/30">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5 animate-pulse" />
                  <Input
                    placeholder="Neural search..."
                    className="pl-12 pr-4 py-3 bg-slate-800/50 border-cyan-400/50 text-cyan-100 placeholder:text-cyan-400/70 focus:bg-slate-800/80 focus:border-cyan-400 transition-all duration-300 rounded-xl backdrop-blur-sm"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* EXTREME Navigation */}
            <nav className="relative flex-1 overflow-y-auto py-6 px-4">
              <ul className="space-y-3">
                {sidebarItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href} style={{ animationDelay: `${index * 50}ms` }}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative flex items-center px-5 py-4 text-sm font-medium rounded-2xl transition-all duration-500 overflow-hidden transform hover:scale-105",
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 text-cyan-100 shadow-2xl shadow-cyan-500/25 border border-cyan-400/30"
                            : "text-slate-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:text-cyan-200 border border-transparent hover:border-cyan-400/20"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/5 to-indigo-400/10 animate-pulse"></div>
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-r-full animate-pulse"></div>
                          </>
                        )}

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-blue-400/0 to-indigo-400/0 group-hover:from-cyan-400/5 group-hover:via-blue-400/5 group-hover:to-indigo-400/5 transition-all duration-500 rounded-2xl"></div>

                        {/* Icon container */}
                        <div className={cn(
                          "relative flex items-center justify-center w-12 h-12 rounded-xl mr-4 transition-all duration-300 group-hover:scale-110",
                          isActive
                            ? "bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-indigo-600/30 shadow-lg shadow-cyan-500/20"
                            : "bg-gradient-to-br from-slate-700/50 to-slate-600/50 group-hover:from-cyan-400/20 group-hover:to-blue-400/20"
                        )}>
                          <Icon className={cn(
                            "h-6 w-6 transition-all duration-300",
                            isActive ? "text-cyan-300 animate-pulse" : "text-slate-400 group-hover:text-cyan-400"
                          )} />
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-xl animate-pulse"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="relative flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={cn(
                              "font-bold truncate transition-all duration-300",
                              isActive ? "text-cyan-100" : "text-slate-200 group-hover:text-cyan-200"
                            )}>
                              {item.title}
                            </span>
                            {item.badge && (
                              <div className="relative">
                                <Badge
                                  className={cn(
                                    "ml-3 text-xs font-bold border transition-all duration-300",
                                    isActive
                                      ? "bg-gradient-to-r from-emerald-400/20 to-green-400/20 text-emerald-300 border-emerald-400/40 animate-pulse"
                                      : "bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-400 border-emerald-400/30 group-hover:from-emerald-400/20 group-hover:to-green-400/20"
                                  )}
                                >
                                  {item.badge}
                                </Badge>
                                {item.badge === 'Live' && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                                )}
                              </div>
                            )}
                          </div>
                          <p className={cn(
                            "text-xs truncate transition-all duration-300",
                            isActive ? "text-cyan-300/80" : "text-slate-400 group-hover:text-cyan-300/70"
                          )}>
                            {item.description}
                          </p>
                        </div>

                        {/* Sparkle effect on hover */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Quantum Footer */}
            <div className="relative p-6 border-t border-cyan-400/30">
              <div className="relative bg-gradient-to-r from-emerald-500/20 via-green-500/10 to-teal-500/20 border border-emerald-400/30 rounded-2xl p-4 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent animate-pulse"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping"></div>
                    </div>
                    <span className="text-sm font-bold text-emerald-300">NEURAL STATUS</span>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-200/80 font-medium">Quantum systems operational • AI monitoring active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EXTREME Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Ultra-Modern Header */}
          <header className="relative bg-slate-800/40 backdrop-blur-2xl border-b border-cyan-400/20 shadow-2xl shadow-cyan-500/10 sticky top-0 z-30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-indigo-400/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 animate-pulse"></div>

            <div className="relative px-8 lg:px-12">
              <div className="flex justify-between items-center h-20">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-cyan-400 hover:bg-cyan-400/20 hover:text-white transition-all duration-300 rounded-xl"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                  <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      NEURAL COMMAND CENTER
                    </h1>
                    <p className="text-lg text-cyan-300/80 font-semibold animate-pulse">Advanced Transportation AI</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Ultra Notifications */}
                  <div className="relative group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-cyan-400/20 hover:to-blue-400/20 text-cyan-400 border border-cyan-400/30 rounded-xl transition-all duration-500 hover:scale-110"
                    >
                      <Bell className="h-6 w-6 animate-pulse" />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full">
                        <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs text-white font-bold animate-bounce bg-transparent border-0">
                          3
                        </Badge>
                      </div>
                    </Button>
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>

                  {/* Ultra Admin Profile */}
                  <div className="flex items-center space-x-4 pl-6 border-l border-cyan-400/30">
                    <div className="text-right hidden sm:block">
                      <p className="text-lg font-bold text-cyan-100">Neural Admin</p>
                      <p className="text-sm text-cyan-300/70">Quantum Controller</p>
                    </div>
                    <div className="relative group">
                      <Avatar className="h-12 w-12 ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-slate-800 transition-all duration-300 group-hover:ring-cyan-400 group-hover:scale-110">
                        <AvatarImage src="/admin-avatar.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 text-white text-lg font-black">
                          NA
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cyan-400 hover:bg-cyan-400/20 hover:text-white transition-all duration-300 rounded-xl"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating particles in header */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${20 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + Math.random()}s`
                  }}
                ></div>
              ))}
            </div>
          </header>

          {/* Quantum Main Content */}
          <main className="flex-1 overflow-hidden relative">
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-cyan-400/50">
              <div className="px-8 lg:px-12 py-12 relative">
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Quantum Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-lg z-40 lg:hidden transition-all duration-500"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Global Quantum Styles */}
      <style jsx global>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }

        @keyframes quantumFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        @keyframes neuralPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes dataFlow {
          0% { transform: translateX(-100%) scaleX(0); }
          50% { transform: translateX(0%) scaleX(1); }
          100% { transform: translateX(100%) scaleX(0); }
        }

        @keyframes quantumShimmer {
          0% {
            background-position: -200% 0;
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            background-position: 200% 0;
            opacity: 0.3;
          }
        }

        @keyframes neuralGlow {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(34, 211, 238, 0.3),
              0 0 40px rgba(34, 211, 238, 0.2),
              inset 0 0 20px rgba(34, 211, 238, 0.1);
          }
          50% {
            box-shadow:
              0 0 40px rgba(34, 211, 238, 0.6),
              0 0 80px rgba(34, 211, 238, 0.4),
              inset 0 0 40px rgba(34, 211, 238, 0.2);
          }
        }

        @keyframes holographicShift {
          0%, 100% {
            background: linear-gradient(45deg,
              rgba(34, 211, 238, 0.1) 0%,
              rgba(59, 130, 246, 0.1) 25%,
              rgba(99, 102, 241, 0.1) 50%,
              rgba(139, 92, 246, 0.1) 75%,
              rgba(34, 211, 238, 0.1) 100%);
          }
          25% {
            background: linear-gradient(45deg,
              rgba(139, 92, 246, 0.1) 0%,
              rgba(34, 211, 238, 0.1) 25%,
              rgba(59, 130, 246, 0.1) 50%,
              rgba(99, 102, 241, 0.1) 75%,
              rgba(139, 92, 246, 0.1) 100%);
          }
          50% {
            background: linear-gradient(45deg,
              rgba(99, 102, 241, 0.1) 0%,
              rgba(139, 92, 246, 0.1) 25%,
              rgba(34, 211, 238, 0.1) 50%,
              rgba(59, 130, 246, 0.1) 75%,
              rgba(99, 102, 241, 0.1) 100%);
          }
          75% {
            background: linear-gradient(45deg,
              rgba(59, 130, 246, 0.1) 0%,
              rgba(99, 102, 241, 0.1) 25%,
              rgba(139, 92, 246, 0.1) 50%,
              rgba(34, 211, 238, 0.1) 75%,
              rgba(59, 130, 246, 0.1) 100%);
          }
        }

        @keyframes particleStream {
          0% {
            transform: translateY(100vh) translateX(-50px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes energyWave {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
            opacity: 0.3;
          }
          50% {
            transform: scaleY(1.2) scaleX(1.1);
            opacity: 0.8;
          }
        }

        @keyframes quantumRipple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-track-slate-800\/50::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        .scrollbar-thumb-cyan-400\/50::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.6), rgba(59, 130, 246, 0.6));
          border-radius: 4px;
          border: 1px solid rgba(34, 211, 238, 0.2);
        }
        .scrollbar-thumb-cyan-400\/50::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.9), rgba(59, 130, 246, 0.9));
        }

        .quantum-glow {
          animation: neuralPulse 2s ease-in-out infinite;
        }

        .neural-float {
          animation: quantumFloat 3s ease-in-out infinite;
        }

        .quantum-shimmer {
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(34, 211, 238, 0.4) 50%,
            transparent 100%);
          background-size: 200% 100%;
          animation: quantumShimmer 3s ease-in-out infinite;
        }

        .neural-glow {
          animation: neuralGlow 4s ease-in-out infinite;
        }

        .holographic-shift {
          animation: holographicShift 8s ease-in-out infinite;
        }

        .particle-stream::before {
          content: '';
          position: absolute;
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.8), transparent);
          animation: particleStream 6s linear infinite;
        }

        .energy-wave {
          animation: energyWave 3s ease-in-out infinite;
        }

        .quantum-ripple {
          animation: quantumRipple 2s ease-out infinite;
        }

        /* Advanced glassmorphism effect */
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Quantum field background */
        .quantum-bg {
          background:
            radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%);
        }

        /* Neural network pattern */
        .neural-pattern {
          background-image:
            radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.2) 1px, transparent 0);
          background-size: 40px 40px;
          animation: gridMove 20s linear infinite;
        }
      `}</style>
    </div>
  );
}