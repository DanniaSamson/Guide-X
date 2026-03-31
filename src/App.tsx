/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Drone, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  Zap, 
  Clock, 
  Navigation, 
  Activity, 
  Battery, 
  ChevronRight, 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Instagram,
  AlertCircle,
  CheckCircle2,
  Cpu
} from 'lucide-react';

// --- Types ---
type DeliveryTime = 'now' | '15min' | 'later';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Drone className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">SkyServe<span className="text-orange-500">Kerala</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#features" className="hover:text-orange-500 transition-colors">Features</a>
          <a href="#dashboard" className="hover:text-orange-500 transition-colors">AI Dashboard</a>
          <a href="#tracking" className="hover:text-orange-500 transition-colors">Tracking</a>
          <a href="#safety" className="hover:text-orange-500 transition-colors">Safety</a>
          <button className="bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all">
            Launch App
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#features" className="text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#dashboard" className="text-white text-lg" onClick={() => setMobileMenuOpen(false)}>AI Dashboard</a>
            <a href="#tracking" className="text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Tracking</a>
            <a href="#safety" className="text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Safety</a>
            <button className="bg-orange-500 text-white px-5 py-3 rounded-xl font-bold">
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3" /> AI-Powered Urban Mobility
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
            FAST. SMART.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">SKY DELIVERY.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-lg mb-10 leading-relaxed">
            Revolutionizing last-mile food delivery in Kerala with autonomous drones and AI-driven route optimization. Bypass traffic, save time.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-orange-500/20 flex items-center gap-2">
              Order Now <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
              Track Delivery
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <p className="text-white font-bold">5,000+ Active Users</p>
              <p className="text-white/40">Across Kochi & Trivandrum</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Animated Drone Graphic */}
          <div className="relative aspect-square">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="relative w-80 h-80 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full flex items-center justify-center p-8 border border-white/5">
                <Drone className="w-48 h-48 text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.5)]" />
                
                {/* Propellers */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -left-4 w-20 h-1 bg-white/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-20 h-1 bg-white/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-20 h-1 bg-white/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -right-4 w-20 h-1 bg-white/20 rounded-full"
                />
              </div>
            </motion.div>

            {/* Floating Info Cards */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-10 right-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Status</p>
                  <p className="text-sm text-white font-bold">Optimal Route</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-20 left-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">ETA</p>
                  <p className="text-sm text-white font-bold">08:42 Mins</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LocationPermission = () => {
  const [status, setStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');

  const requestLocation = () => {
    setStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      () => setStatus('granted'),
      () => setStatus('denied')
    );
  };

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[40px] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          
          <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-orange-500/20">
            <MapPin className="w-10 h-10 text-orange-500" />
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Smart Delivery Optimization</h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Grant location access to allow our AI to calculate the fastest drone flight path to your doorstep.
          </p>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={requestLocation}
              disabled={status === 'granted'}
              className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 ${
                status === 'granted' 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-white text-black hover:bg-orange-500 hover:text-white'
              }`}
            >
              {status === 'granted' ? (
                <><CheckCircle2 className="w-6 h-6" /> Location Secured</>
              ) : status === 'requesting' ? (
                'Requesting...'
              ) : (
                <><Navigation className="w-6 h-6" /> Enable Live Location</>
              )}
            </button>

            <div className="flex flex-col gap-3 items-center">
              <div className="flex items-center gap-2 text-green-500/80 text-sm font-medium">
                <ShieldCheck className="w-4 h-4" />
                Your location is protected and used only for delivery optimization.
              </div>
              <div className="flex items-center gap-2 text-white/30 text-xs italic">
                <Lock className="w-3 h-3" />
                Your location and personal data are end-to-end encrypted and never shared with third parties.
              </div>
            </div>
          </div>

          {/* Security Shield Graphics */}
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <ShieldCheck className="w-40 h-40 text-white" />
          </div>
          <div className="absolute -top-10 -left-10 opacity-10">
            <Lock className="w-40 h-40 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TrafficDashboard = () => {
  return (
    <section id="dashboard" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Cpu className="w-3 h-3" /> Real-time Intelligence
          </div>
          <h2 className="text-5xl font-bold text-white tracking-tight mb-4">AI Traffic Analysis</h2>
          <p className="text-white/40 text-xl max-w-2xl">
            Our neural network analyzes urban density and road traffic in real-time to carve out safe, high-speed aerial corridors.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden min-h-[500px]">
            <div className="absolute top-6 left-6 z-10">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-bold">Region</span>
                  <span className="text-sm text-white font-bold">Kochi Metro Area</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-bold">Traffic Density</span>
                  <span className="text-sm text-red-500 font-bold">High (84%)</span>
                </div>
              </div>
            </div>

            {/* Mock Map Visualization */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <svg width="100%" height="100%" viewBox="0 0 800 500" className="w-full h-full">
                {/* City Grid */}
                <path d="M0 100 H800 M0 200 H800 M0 300 H800 M0 400 H800" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                <path d="M100 0 V500 M200 0 V500 M300 0 V500 M400 0 V500 M500 0 V500 M600 0 V500 M700 0 V500" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                
                {/* Traffic Zones (Heatmap) */}
                <circle cx="200" cy="150" r="80" fill="url(#redGradient)" opacity="0.6" />
                <circle cx="500" cy="350" r="120" fill="url(#redGradient)" opacity="0.4" />
                <circle cx="650" cy="150" r="60" fill="url(#redGradient)" opacity="0.5" />

                {/* Drone Route */}
                <motion.path 
                  d="M100 400 Q 300 300, 400 100 T 700 50" 
                  stroke="#f97316" 
                  strokeWidth="4" 
                  fill="none" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle 
                  r="6" 
                  fill="#f97316"
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ offsetPath: "path('M100 400 Q 300 300, 400 100 T 700 50')" }}
                />

                <defs>
                  <radialGradient id="redGradient">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Aerial Corridor', value: 'Clear', color: 'text-green-500' },
                { label: 'Wind Speed', value: '12 km/h', color: 'text-white' },
                { label: 'Signal Strength', value: '98%', color: 'text-white' },
                { label: 'AI Confidence', value: '99.4%', color: 'text-orange-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl">
                  <p className="text-[10px] text-white/40 uppercase font-bold mb-1">{stat.label}</p>
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex-1">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-orange-500" /> Optimal Routes
              </h3>
              <div className="space-y-4">
                {[
                  { from: 'MG Road', to: 'Kakkanad', time: '12m', traffic: 'Heavy' },
                  { from: 'Marine Drive', to: 'Edappally', time: '8m', traffic: 'Critical' },
                  { from: 'Vytilla', to: 'Fort Kochi', time: '15m', traffic: 'Moderate' },
                ].map((route, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white font-medium">{route.from} → {route.to}</span>
                      <span className="text-xs text-orange-500 font-bold">{route.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-3/4" />
                      </div>
                      <span className="text-[10px] text-white/40 uppercase font-bold">Road Traffic</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-500 rounded-[32px] p-8 text-black">
              <h3 className="text-xl font-bold mb-2">AI ETA Prediction</h3>
              <p className="text-black/60 text-sm mb-6 font-medium">Based on current atmospheric conditions and urban density.</p>
              <div className="text-5xl font-black mb-2 tracking-tighter">09:12</div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Minutes Average</p>
              <div className="mt-8 pt-8 border-t border-black/10 flex items-center justify-between">
                <span className="text-xs font-bold">Accuracy: 99.8%</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-4 bg-black/20 rounded-full" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DroneStatusTicker = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const statuses = [
    { text: 'Drone approaching destination', icon: Navigation, color: 'text-orange-500' },
    { text: 'Obstacle detected, rerouting', icon: AlertCircle, color: 'text-red-500' },
    { text: 'Delivery successful', icon: CheckCircle2, color: 'text-green-500' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = statuses[statusIndex].icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={statusIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex items-center gap-4 w-full"
      >
        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${statuses[statusIndex].color}`}>
          <CurrentIcon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Live Feedback</p>
          <p className="text-sm text-white font-bold">{statuses[statusIndex].text}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const FlightTelemetry = () => {
  const [telemetry, setTelemetry] = useState({
    altitude: 120,
    speed: 45,
    battery: 82
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        altitude: Math.max(100, Math.min(150, prev.altitude + (Math.random() * 4 - 2))),
        speed: Math.max(40, Math.min(50, prev.speed + (Math.random() * 2 - 1))),
        battery: Math.max(0, prev.battery - 0.01)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
        <Navigation className="w-4 h-4 text-blue-500 mb-1" />
        <p className="text-[8px] text-white/40 uppercase font-bold mb-1">Altitude</p>
        <p className="text-sm font-bold text-white">{telemetry.altitude.toFixed(1)}m</p>
      </div>
      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
        <Zap className="w-4 h-4 text-orange-500 mb-1" />
        <p className="text-[8px] text-white/40 uppercase font-bold mb-1">Speed</p>
        <p className="text-sm font-bold text-white">{telemetry.speed.toFixed(1)} km/h</p>
      </div>
      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
        <Battery className="w-4 h-4 text-green-500 mb-1" />
        <p className="text-[8px] text-white/40 uppercase font-bold mb-1">Battery</p>
        <p className="text-sm font-bold text-white">{Math.floor(telemetry.battery)}%</p>
      </div>
    </div>
  );
};

const OrderSection = () => {
  const [selectedTime, setSelectedTime] = useState<DeliveryTime>('now');
  const [isTracking, setIsTracking] = useState(false);

  return (
    <section id="tracking" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-5xl font-bold text-white tracking-tight mb-8">Delivery Schedule</h2>
          <div className="space-y-4">
            {[
              { 
                id: 'now', 
                title: 'Deliver Now', 
                desc: 'Immediate dispatch via express drone.', 
                icon: Zap,
                details: 'Priority: Ultra-High. Drone: Express-X1. ETA: 8-12 mins. Direct flight path guaranteed.'
              },
              { 
                id: '15min', 
                title: 'Within 15 Minutes', 
                desc: 'Optimized for peak efficiency.', 
                icon: Clock,
                details: 'Priority: High. Drone: Standard-S2. ETA: 15-20 mins. Batch delivery optimization active.'
              },
              { 
                id: 'later', 
                title: 'Schedule for Later', 
                desc: 'Pick your preferred time slot.', 
                icon: Activity,
                details: 'Priority: Scheduled. Drone: Eco-E3. Flexible delivery windows available throughout the day.'
              },
            ].map((option) => (
              <div
                key={option.id}
                className={`w-full rounded-3xl border transition-all overflow-hidden ${
                  selectedTime === option.id 
                  ? 'bg-orange-500 border-orange-500 text-black shadow-lg shadow-orange-500/20' 
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <button
                  onClick={() => setSelectedTime(option.id as DeliveryTime)}
                  className="w-full text-left p-6 flex items-center gap-6"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${selectedTime === option.id ? 'bg-black/10' : 'bg-orange-500/10'}`}>
                    <option.icon className={`w-7 h-7 ${selectedTime === option.id ? 'text-black' : 'text-orange-500'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{option.title}</h3>
                    <p className={`text-sm ${selectedTime === option.id ? 'text-black/60' : 'text-white/40'}`}>{option.desc}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedTime === option.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className={`w-6 h-6 ${selectedTime === option.id ? 'text-black' : 'text-white/20'}`} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {selectedTime === option.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-0 ml-20">
                        <div className={`h-px w-full mb-4 ${selectedTime === option.id ? 'bg-black/10' : 'bg-white/10'}`} />
                        <p className={`text-sm font-medium leading-relaxed ${selectedTime === option.id ? 'text-black/80' : 'text-white/60'}`}>
                          {option.details}
                        </p>
                        {option.id === 'later' && (
                          <div className="mt-4 flex gap-2">
                            {['12:00', '14:00', '16:00', '18:00'].map(time => (
                              <div key={time} className="px-3 py-1 rounded-lg bg-black/10 text-[10px] font-bold">
                                {time}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsTracking(true)}
            className="w-full mt-10 py-5 bg-white text-black rounded-3xl font-black text-xl hover:bg-orange-500 hover:text-white transition-all shadow-2xl shadow-white/5"
          >
            Confirm & Track
          </button>
        </div>

        <div className="relative">
          <div className={`bg-white/5 border border-white/10 rounded-[40px] p-8 transition-all duration-700 ${isTracking ? 'opacity-100 translate-y-0' : 'opacity-40 blur-sm pointer-events-none'}`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">Live Tracking</h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> In Transit
              </div>
            </div>

            {/* Tracking Map Container */}
            <div className="aspect-video bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden mb-6">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              
              {/* Animated Drone on Map */}
              <motion.div 
                animate={{ 
                  x: [50, 250],
                  y: [150, 50]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute z-20"
              >
                <div className="relative">
                  <Drone className="w-10 h-10 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-orange-500/40 blur-sm rounded-full" />
                </div>
              </motion.div>

              {/* Destination */}
              <div className="absolute top-10 right-10">
                <MapPin className="w-8 h-8 text-white" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-white/20 blur-md rounded-full" />
              </div>

              {/* Radar Effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full border border-white/5 rounded-full animate-ping opacity-10" />
              </div>
            </div>

            {/* Real-time Status Feedback */}
            <AnimatePresence mode="wait">
              {isTracking && (
                <motion.div
                  key="status-feedback"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 mb-8"
                >
                  <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-4">
                    <DroneStatusTicker />
                  </div>
                  <FlightTelemetry />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">Progress</p>
                  <p className="text-2xl font-bold text-white">64% Complete</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">Signal</p>
                  <div className="flex items-center gap-2 text-blue-500 font-bold">
                    <Activity className="w-5 h-5" /> Strong
                  </div>
                </div>
              </div>

              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '64%' }}
                  className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                />
              </div>
            </div>
          </div>

          {!isTracking && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-orange-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl">
                Confirm order to see live tracking
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const PrivacySection = () => {
  return (
    <section id="safety" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white tracking-tight mb-4">Privacy & Data Safety</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">
            Your security is our priority. We use military-grade encryption to ensure your data stays yours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Lock, 
              title: 'End-to-End Encryption', 
              desc: 'All customer data, location details, and order history are securely encrypted from end to end.' 
            },
            { 
              icon: ShieldCheck, 
              title: 'No Data Leaks', 
              desc: 'Our proprietary AI ensures no location data is leaked or accessible by unauthorized third parties.' 
            },
            { 
              icon: CheckCircle2, 
              title: 'Complete Privacy', 
              desc: 'We never sell your data. Your delivery history is automatically anonymized after 30 days.' 
            },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20 group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Drone className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">SkyServe<span className="text-orange-500">Kerala</span></span>
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              The future of food delivery is here. AI-powered, drone-assisted, and traffic-free. Serving the urban landscape of Kerala.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-orange-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-orange-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-orange-500 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-orange-500 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Safety Assurance</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Drone Fleet</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Data Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs">
            © 2026 SkyServe Kerala. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Hackathon Edition</span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Built for Innovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-orange-500 selection:text-white font-sans">
      {/* Custom Font Import */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}} />

      <Navbar />
      
      <main>
        <Hero />
        <LocationPermission />
        <TrafficDashboard />
        <OrderSection />
        <PrivacySection />
      </main>

      <Footer />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/40">
          <Drone className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
