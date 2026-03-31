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
  Clock as ClockIcon, 
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
  Cpu,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Smartphone,
  Calendar as CalendarIcon,
  MessageSquare,
  Search,
  ChevronDown,
  Info,
  QrCode,
  ChevronLeft
} from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type DeliveryTime = 'now' | '15min' | 'later';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  restaurant: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'dispatched' | 'in-transit' | 'approaching' | 'delivered';
  time: DeliveryTime;
  scheduledTime?: string;
  paymentMethod?: string;
}

const RESTAURANTS = [
  { id: 'r1', name: 'Malabar Spice', rating: 4.8, type: 'Traditional Kerala' },
  { id: 'r2', name: 'Coastal Cravings', rating: 4.5, type: 'Seafood' },
  { id: 'r3', name: 'The Curry Leaf', rating: 4.7, type: 'South Indian' },
  { id: 'r4', name: 'Sky Burger Hub', rating: 4.6, type: 'Burgers' },
];

const FOOD_ITEMS: FoodItem[] = [
  { id: 'f1', name: 'Malabar Chicken Biryani', price: 280, restaurant: 'Malabar Spice', description: 'Authentic Thalassery biryani with premium kaima rice.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80' },
  { id: 'f2', name: 'Karimeen Pollichathu', price: 450, restaurant: 'Coastal Cravings', description: 'Pearl spot fish marinated in spices and grilled in banana leaf.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80' },
  { id: 'f3', name: 'Appam with Stew', price: 180, restaurant: 'The Curry Leaf', description: 'Fluffy rice pancakes served with creamy vegetable stew.', image: 'https://images.unsplash.com/photo-1626132646529-5003375a9b12?auto=format&fit=crop&w=800&q=80' },
  { id: 'f4', name: 'Kerala Parotta (3pcs)', price: 60, restaurant: 'Malabar Spice', description: 'Layered flaky flatbread, best with beef roast.', image: 'https://images.unsplash.com/photo-1626132646529-5003375a9b12?auto=format&fit=crop&w=800&q=80' },
  { id: 'f5', name: 'Prawn Mango Curry', price: 380, restaurant: 'Coastal Cravings', description: 'Spicy and tangy prawn curry with raw mango.', image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=800&q=80' },
  { id: 'f6', name: 'Premium Sky Burger', price: 240, restaurant: 'Sky Burger Hub', description: 'Double patty beef burger with caramelized onions and cheddar.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-black/80 backdrop-blur-md py-3 border-b border-white/10" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Drone className="text-white w-6 h-6" />
            </motion.div>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">Sky Serve<span className="text-orange-500">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#features" className="hover:text-orange-500 transition-colors">Features</a>
          <a href="#dashboard" className="hover:text-orange-500 transition-colors">AI Dashboard</a>
          <a href="#tracking" className="hover:text-orange-500 transition-colors">Tracking</a>
          <a href="#safety" className="hover:text-orange-500 transition-colors">Safety</a>
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-white hover:text-orange-500 transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all"
          >
            Track Order
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-white"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
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

const Hero = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
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
            <button 
              onClick={onOpenMenu}
              className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-orange-500/20 flex items-center gap-2"
            >
              Order Food <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center"
            >
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
              <p className="text-white/40">Across Ottapalam & Vadavannoor</p>
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
                  <ClockIcon className="w-4 h-4 text-orange-500" />
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

const LocationPermission = ({ onLocationUpdate }: { onLocationUpdate: (loc: string) => void }) => {
  const [status, setStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('granted');
  const [currentLoc, setCurrentLoc] = useState<string>('Ottapalam, Vadavannoor');

  const requestLocation = () => {
    setStatus('requesting');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we'd reverse geocode. Here we simulate.
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // Simulation for Ottapalam/Vadavannoor as requested
          const simulatedLoc = "Ottapalam, Vadavannoor";
          setCurrentLoc(simulatedLoc);
          onLocationUpdate(simulatedLoc);
          setStatus('granted');
        },
        () => setStatus('denied')
      );
    } else {
      setStatus('denied');
    }
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
              className={cn(
                "px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3",
                status === 'granted' 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-white text-black hover:bg-orange-500 hover:text-white'
              )}
            >
              {status === 'granted' ? (
                <><CheckCircle2 className="w-6 h-6" /> {currentLoc}</>
              ) : status === 'requesting' ? (
                'Detecting...'
              ) : (
                <><Navigation className="w-6 h-6" /> Enable Live Location</>
              )}
            </button>

            {status === 'granted' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-500/20 border border-orange-500/30 p-4 rounded-2xl max-w-md"
              >
                <div className="flex items-center gap-3 text-orange-500 font-bold mb-1">
                  <AlertCircle className="w-5 h-5" />
                  Heavy Traffic Detected
                </div>
                <p className="text-sm text-white/70">
                  Ground traffic in {currentLoc} is currently high. Drone delivery is recommended for 12m faster arrival.
                </p>
              </motion.div>
            )}

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

const TrafficDashboard = ({ location }: { location: string }) => {
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
                  <span className="text-sm text-white font-bold">{location || 'Ottapalam Metro Area'}</span>
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
                <Navigation className="w-5 h-5 text-orange-500" /> Optimal Routes (Ottapalam Area)
              </h3>
              <div className="space-y-4">
                {[
                  { from: 'Ottapalam Town', to: 'Vadavannoor', time: '12m', traffic: 'Moderate', fuel: 'Sufficient', familiarity: 'High' },
                  { from: 'Cherpulassery', to: 'Vadavannoor', time: '18m', traffic: 'Low', fuel: 'Sufficient', familiarity: 'Medium' },
                  { from: 'Shoranur', to: 'Vadavannoor', time: '22m', traffic: 'Moderate', fuel: 'Sufficient', familiarity: 'High' },
                ].map((route, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white font-medium">{route.from} → {route.to}</span>
                      <span className="text-xs text-orange-500 font-bold">{route.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-1 text-green-500">
                        <Zap className="w-3 h-3" /> {route.fuel} Fuel
                      </div>
                      <div className="flex items-center gap-1 text-blue-500">
                        <MapPin className="w-3 h-3" /> Familiarity: {route.familiarity}
                      </div>
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
    { text: 'Sufficient fuel confirmed for route', icon: Zap, color: 'text-green-500' },
    { text: 'Pilot familiar with Ottapalam corridor', icon: MapPin, color: 'text-blue-500' },
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
    fuel: 82
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        altitude: Math.max(100, Math.min(150, prev.altitude + (Math.random() * 4 - 2))),
        speed: Math.max(40, Math.min(50, prev.speed + (Math.random() * 2 - 1))),
        fuel: Math.max(0, prev.fuel - 0.01)
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
        <p className="text-[8px] text-white/40 uppercase font-bold mb-1">Fuel/Energy</p>
        <p className="text-sm font-bold text-white">{Math.floor(telemetry.fuel)}%</p>
      </div>
    </div>
  );
};

const OrderSection = ({ 
  activeOrder, 
  setActiveOrder, 
  cart, 
  setCart,
  cartTotal 
}: { 
  activeOrder: Order | null, 
  setActiveOrder: (order: Order | null) => void,
  cart: CartItem[],
  setCart: (cart: CartItem[]) => void,
  cartTotal: number
}) => {
  const [selectedTime, setSelectedTime] = useState<DeliveryTime>('now');
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUPIOptions, setShowUPIOptions] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState('12:00 PM');

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;
    
    if (paymentMethod === 'upi' && !showUPIOptions) {
      setShowUPIOptions(true);
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        items: [...cart],
        total: cartTotal,
        status: 'pending',
        time: selectedTime,
        paymentMethod: paymentMethod,
        scheduledTime: selectedTime === 'later' ? `${format(scheduledDate, 'MMM dd')} at ${scheduledTimeSlot}` : undefined
      };
      setActiveOrder(newOrder);
      setCart([]);
      setIsProcessing(false);
      setShowUPIOptions(false);
      
      // Simulate drone status updates
      setTimeout(() => setActiveOrder({ ...newOrder, status: 'dispatched' }), 5000);
      setTimeout(() => setActiveOrder({ ...newOrder, status: 'in-transit' }), 15000);
    }, 2000);
  };

  return (
    <section id="tracking" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        {!activeOrder && cart.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-[40px]">
            <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-12 h-12 text-orange-500" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">No Active Orders</h2>
            <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
              You haven't placed any orders yet. Browse our menu to start your first sky delivery!
            </p>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              {activeOrder ? (
                <div className="space-y-8">
                  <div className="bg-orange-500/10 border border-orange-500/20 p-8 rounded-[40px]">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-white">Order Summary</h3>
                      <span className="text-orange-500 font-mono font-bold">{activeOrder.id}</span>
                    </div>
                    <div className="space-y-4 mb-8">
                      {activeOrder.items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-white/60">{item.quantity}x {item.name}</span>
                          <span className="text-white font-bold">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                      <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Total Paid</span>
                      <span className="text-3xl font-black text-white tracking-tighter">₹{activeOrder.total}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Delivery Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Method</p>
                        <p className="text-white font-bold">Drone Express</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Payment</p>
                        <p className="text-white font-bold uppercase">{activeOrder.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-5xl font-bold text-white tracking-tight mb-8">Checkout</h2>
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
                          icon: ClockIcon,
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
                                  <p className={`text-sm font-medium leading-relaxed mb-4 ${selectedTime === option.id ? 'text-black/80' : 'text-white/60'}`}>
                                    {option.details}
                                  </p>
                                  {option.id === 'later' && (
                                    <button 
                                      onClick={() => setIsCalendarOpen(true)}
                                      className={cn(
                                        "px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2",
                                        selectedTime === 'later' 
                                        ? "bg-black text-white hover:bg-black/80" 
                                        : "bg-orange-500 text-white hover:bg-orange-600"
                                      )}
                                    >
                                      <CalendarIcon className="w-4 h-4" />
                                      {scheduledDate ? `${format(scheduledDate, 'MMM dd')} at ${scheduledTimeSlot}` : 'Select Date & Time'}
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isCalendarOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
                      >
                        <motion.div
                          initial={{ scale: 0.9, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0.9, y: 20 }}
                          className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-[40px] p-8 shadow-2xl relative"
                        >
                          <button 
                            onClick={() => setIsCalendarOpen(false)}
                            className="absolute top-6 right-6 text-white/40 hover:text-white"
                          >
                            <X className="w-6 h-6" />
                          </button>

                          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <CalendarIcon className="text-orange-500" /> Schedule Delivery
                          </h3>

                          <div className="space-y-8">
                            <div>
                              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-4">Select Date</p>
                              <div className="grid grid-cols-4 gap-2">
                                {[0, 1, 2, 3, 4, 5, 6, 7].map(days => {
                                  const date = addDays(new Date(), days);
                                  const isSelected = format(date, 'yyyy-MM-dd') === format(scheduledDate, 'yyyy-MM-dd');
                                  return (
                                    <button
                                      key={days}
                                      onClick={() => setScheduledDate(date)}
                                      className={cn(
                                        "p-3 rounded-2xl border transition-all flex flex-col items-center",
                                        isSelected 
                                        ? "bg-orange-500 border-orange-500 text-black" 
                                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                      )}
                                    >
                                      <span className="text-[10px] uppercase font-bold opacity-60">{format(date, 'EEE')}</span>
                                      <span className="text-lg font-black">{format(date, 'dd')}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-4">Select Time Slot</p>
                              <div className="grid grid-cols-3 gap-2">
                                {['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map(slot => (
                                  <button
                                    key={slot}
                                    onClick={() => setScheduledTimeSlot(slot)}
                                    className={cn(
                                      "py-3 rounded-xl border text-xs font-bold transition-all",
                                      scheduledTimeSlot === slot 
                                      ? "bg-orange-500 border-orange-500 text-black" 
                                      : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    )}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button 
                              onClick={() => setIsCalendarOpen(false)}
                              className="w-full py-4 bg-white text-black rounded-2xl font-bold text-lg hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-white/5"
                            >
                              Confirm Slot
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Payment Method</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'upi', name: 'UPI', icon: Smartphone },
                        { id: 'card', name: 'Card', icon: CreditCard },
                        { id: 'credit', name: 'Credit', icon: Activity },
                      ].map(method => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            "p-6 rounded-3xl border transition-all flex flex-col items-center gap-3",
                            paymentMethod === method.id 
                            ? "bg-orange-500 border-orange-500 text-black" 
                            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                          )}
                        >
                          <method.icon className="w-6 h-6" />
                          <span className="text-xs font-bold">{method.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-[10px] text-white/20 text-center font-bold uppercase tracking-widest">
                      Cash on delivery is not available for drone deliveries.
                    </p>
                  </div>

                  <button 
                    onClick={handleConfirmOrder}
                    disabled={isProcessing || (showUPIOptions && paymentMethod === 'upi' && !upiId && false)} // Allow QR scan too
                    className="w-full py-5 bg-white text-black rounded-3xl font-black text-xl hover:bg-orange-500 hover:text-white transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>{showUPIOptions ? 'Verify & Pay' : `Confirm & Pay ₹${cartTotal}`}</>
                    )}
                  </button>

                  <AnimatePresence>
                    {showUPIOptions && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
                      >
                        <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-blue-500" />
                          
                          <button 
                            onClick={() => setShowUPIOptions(false)}
                            className="absolute top-6 right-6 text-white/40 hover:text-white"
                          >
                            <X className="w-6 h-6" />
                          </button>

                          <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                              <Smartphone className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">UPI Payment</h3>
                            <p className="text-white/40 text-sm">Select your preferred UPI method</p>
                          </div>

                          <div className="space-y-8">
                            <div className="flex flex-col items-center gap-4">
                              <div className="p-4 bg-white rounded-3xl">
                                {/* Simulated QR Code */}
                                <div className="w-40 h-40 bg-white flex items-center justify-center border-4 border-black/5">
                                  <QrCode className="w-32 h-32 text-black" />
                                </div>
                              </div>
                              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Scan QR to Pay</p>
                            </div>

                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5"></div>
                              </div>
                              <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0a0a0a] px-4 text-white/20 font-bold">Or Enter UPI ID</span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="relative">
                                <input 
                                  type="text" 
                                  placeholder="username@upi"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500 transition-colors"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                  <CheckCircle2 className={cn("w-5 h-5 transition-colors", upiId.includes('@') ? "text-green-500" : "text-white/10")} />
                                </div>
                              </div>

                              <button 
                                onClick={handleConfirmOrder}
                                disabled={isProcessing}
                                className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3"
                              >
                                {isProcessing ? (
                                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                  <>Pay ₹{cartTotal}</>
                                )}
                              </button>
                            </div>
                          </div>

                          <p className="mt-8 text-[10px] text-white/20 text-center font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            <ShieldCheck className="w-3 h-3" /> Secure UPI Transaction
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="relative">
              <div className={`bg-white/5 border border-white/10 rounded-[40px] p-8 transition-all duration-700 ${activeOrder ? 'opacity-100 translate-y-0' : 'opacity-40 blur-sm pointer-events-none'}`}>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-white">Live Tracking</h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> {activeOrder?.status || 'In Transit'}
                  </div>
                </div>

                {/* Tracking Map Container */}
                <div className="aspect-video bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                  
                  {/* Animated Drone on Map */}
                  {activeOrder && (
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
                  )}

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
                  {activeOrder && (
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
                      <p className="text-2xl font-bold text-white">{activeOrder ? '64%' : '0%'} Complete</p>
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
                      animate={{ width: activeOrder ? '64%' : '0%' }}
                      className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                    />
                  </div>
                </div>
              </div>

              {!activeOrder && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-orange-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl">
                    {cart.length > 0 ? 'Complete payment to track' : 'No active delivery'}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};


const PrivacySection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const items = [
    { 
      icon: Lock, 
      title: 'End-to-End Encryption', 
      desc: 'All customer data, location details, and order history are securely encrypted from end to end.',
      details: 'We use AES-256 bit encryption for all data at rest and TLS 1.3 for data in transit. This ensures that even in the unlikely event of a breach, your information remains unreadable to unauthorized parties.'
    },
    { 
      icon: ShieldCheck, 
      title: 'Zero Data Leaks', 
      desc: 'Our proprietary AI ensures no location data is leaked or accessible by unauthorized third parties.',
      details: 'Our infrastructure is built on a zero-trust architecture. Every request is authenticated and authorized. We perform regular penetration testing and vulnerability scans to maintain our high security standards.'
    },
    { 
      icon: CheckCircle2, 
      title: 'Privacy First Standards', 
      desc: 'We never sell your data. Your delivery history is automatically anonymized after 30 days.',
      details: 'Our privacy standards exceed GDPR and CCPA requirements. We implement data minimization principles, only collecting what is strictly necessary for delivery. Your personal identity is separated from your delivery patterns.'
    },
    { 
      icon: Cpu, 
      title: 'Secure Infrastructure', 
      desc: 'Data is stored on ISO 27001 certified servers with full complete protection.',
      details: 'Our servers are located in highly secure, Tier 4 data centers with 24/7 physical monitoring. We utilize redundant storage systems and automated backups to ensure 99.99% data durability and availability.'
    }
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={cn(
                "bg-white/5 border border-white/10 p-8 rounded-[40px] transition-all cursor-pointer group",
                expanded === i ? "bg-white/10 border-orange-500/50" : "hover:bg-white/8"
              )}
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20 group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/40 leading-relaxed mb-4">{item.desc}</p>
              
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-white/60 pt-4 border-t border-white/10 italic">
                      {item.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mt-4 flex justify-center">
                <ChevronDown className={cn("w-5 h-5 text-white/20 transition-transform", expanded === i && "rotate-180")} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FoodMenu = ({ onClose, onAddToCart, cart }: { onClose: () => void, onAddToCart: (item: FoodItem) => void, cart: CartItem[] }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Traditional', 'Seafood', 'South Indian', 'Burgers'];

  const filteredItems = activeCategory === 'All' 
    ? FOOD_ITEMS 
    : FOOD_ITEMS.filter(item => {
        const restaurant = RESTAURANTS.find(r => r.name === item.restaurant);
        return restaurant?.type.includes(activeCategory) || item.restaurant.includes(activeCategory);
      });

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl max-h-[90vh] rounded-[40px] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Sky Serve Menu</h2>
            <p className="text-white/40 text-sm">Premium drone delivery from Kerala's finest kitchens.</p>
          </div>
          <div className="flex items-center gap-4">
            {cart.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  onClose();
                  document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hidden md:flex items-center gap-3 px-6 py-3 bg-orange-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform"
              >
                <ShoppingBag className="w-4 h-4" /> Checkout ₹{cartTotal}
              </motion.button>
            )}
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-orange-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                  activeCategory === cat 
                  ? "bg-orange-500 text-white" 
                  : "bg-white/5 text-white/40 hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const cartItem = cart.find(i => i.id === item.id);
              return (
                <motion.div 
                  layout
                  key={item.id}
                  className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden group hover:border-orange-500/30 transition-colors"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-orange-500 font-bold text-xs">
                      ₹{item.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest mb-1">{item.restaurant}</p>
                    <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-xs text-white/40 mb-6 line-clamp-2">{item.description}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onAddToCart(item)}
                        className={cn(
                          "flex-1 py-3 border rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                          cartItem 
                          ? "bg-orange-500 border-orange-500 text-white" 
                          : "bg-white/5 border-white/10 text-white hover:bg-orange-500 hover:border-orange-500"
                        )}
                      >
                        <Plus className="w-4 h-4" /> 
                        {cartItem ? `Add More (${cartItem.quantity})` : 'Add to Cart'}
                      </button>
                      {cartItem && (
                        <button 
                          onClick={() => {
                            onClose();
                            document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-4 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center"
                          title="Checkout Now"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {cart.length > 0 && (
          <div className="p-6 bg-white/5 border-t border-white/5 md:hidden">
            <button
              onClick={() => {
                onClose();
                document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20"
            >
              <ShoppingBag className="w-5 h-5" /> Checkout ₹{cartTotal}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const CartDrawer = ({ 
  cart, 
  onClose, 
  onUpdateQty, 
  onRemove, 
  total,
  onCheckout
}: { 
  cart: CartItem[], 
  onClose: () => void, 
  onUpdateQty: (id: string, delta: number) => void,
  onRemove: (id: string) => void,
  total: number,
  onCheckout: () => void
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-[#0a0a0a] h-full shadow-2xl flex flex-col border-l border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShoppingBag className="text-orange-500" /> Your Cart
          </h2>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-white/10" />
              </div>
              <p className="text-white font-bold mb-2">Your cart is empty</p>
              <p className="text-white/40 text-sm">Add some delicious food to get started!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                    <p className="text-[10px] text-white/40 mb-3">{item.restaurant}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-orange-500">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500/50 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-white/5 border-t border-white/5">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/40 font-bold">Total Amount</span>
              <span className="text-2xl font-black text-white tracking-tighter">₹{total}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-orange-500/20"
            >
              Checkout Now
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
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
              <span className="text-xl font-bold tracking-tighter text-white">Sky Serve<span className="text-orange-500">.</span></span>
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              Sky Serve is Kerala's premier AI-powered drone delivery network. We bridge the gap between restaurants and your doorstep, bypassing urban congestion.
            </p>
            <div className="space-y-2 mb-8">
              <p className="text-sm text-white/60 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" /> 12/456, Drone Hub, Ottapalam, Vadavannoor, Kerala
              </p>
              <p className="text-sm text-white/60 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-orange-500" /> +91 98765 43210
              </p>
              <p className="text-sm text-white/60 flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-500" /> Health Center: +91 98765 00000
              </p>
            </div>
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
              <li><a href="#" className="hover:text-orange-500 transition-colors">Help & Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Data Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs">
            © 2026 Sky Serve. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Hackathon Edition</span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Secure & Encrypted</span>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Built for Innovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [location, setLocation] = useState<string>('Ottapalam, Vadavannoor');

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-orange-500 selection:text-white font-sans">
      {/* Custom Font Import */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}} />

      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero onOpenMenu={() => setIsMenuOpen(true)} />
        <LocationPermission onLocationUpdate={setLocation} />
        <TrafficDashboard location={location} />
        <OrderSection 
          activeOrder={activeOrder} 
          setActiveOrder={setActiveOrder} 
          cart={cart} 
          setCart={setCart}
          cartTotal={cartTotal}
        />
        <PrivacySection />
      </main>

      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {isMenuOpen && (
          <FoodMenu 
            onClose={() => setIsMenuOpen(false)} 
            onAddToCart={addToCart} 
            cart={cart}
          />
        )}
        {isCartOpen && (
          <CartDrawer 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onUpdateQty={updateQuantity}
            onRemove={removeFromCart}
            total={cartTotal}
            onCheckout={() => {
              setIsCartOpen(false);
              // Scroll to order section or open checkout modal
              document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/40"
        >
          <Drone className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
