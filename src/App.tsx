/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Anchor, 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  CheckCircle2, 
  Warehouse, 
  Scale, 
  Thermometer, 
  Snowflake, 
  Wind, 
  Package,
  Target,
  ShieldCheck,
  Zap, 
  TrendingUp,
  Activity,
  FileText,
  Search,
  Info,
  AlertCircle,
  Check,
  ExternalLink
} from "lucide-react";
import React, { useState } from "react";
import { WhatsAppButton } from "./components/WhatsAppButton";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

const Logo = ({ className = "", invertText = true, tagline = false }: { className?: string, invertText?: boolean, tagline?: boolean }) => {
  const navy = "#0D2B3E";
  const teal = "#00A3B5";
  
  return (
    <div className={`flex items-center gap-4 md:gap-6 ${className}`}>
      {/* Official Logo Symbol - Scaled for 44px mobile / 60px desktop */}
      <div className="relative w-[44px] h-[44px] md:w-[60px] md:h-[60px] flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Hexagon Background */}
          <path 
            d="M50 8 L88 30 L88 70 L50 92 L12 70 L12 30 Z" 
            fill={navy} 
          />
          
          {/* Snowflake centerpiece */}
          <g stroke="white" strokeWidth="2.5" strokeLinecap="round">
            {/* Main arms */}
            <line x1="50" y1="25" x2="50" y2="75" />
            <line x1="28" y1="38" x2="72" y2="62" />
            <line x1="28" y1="62" x2="72" y2="38" />
            
            {/* Snowflake branches */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <g key={angle} transform={`rotate(${angle} 50 50)`}>
                <line x1="50" y1="28" x2="44" y2="35" />
                <line x1="50" y1="28" x2="56" y2="35" />
              </g>
            ))}
          </g>

          {/* Ship Bow/Hull Silhouette (White accent) */}
          <path d="M45 70 L50 85 L55 70 Z" fill="white" className="opacity-20" />

          {/* Teal Base / Anchor / Waves */}
          <path 
            d="M8 58 Q8 95 50 98 Q92 95 92 58 L84 58 Q84 88 50 90 Q16 88 16 58 Z" 
            fill={teal} 
          />
          {/* Arrow tips for anchor effect */}
          <path d="M4 62 L8 48 L12 62 Z" fill={teal} />
          <path d="M88 62 L92 48 L96 62 Z" fill={teal} />
        </svg>
      </div>

      {/* Official Logo Text */}
      <div className="flex flex-col">
        <div className="flex flex-col mb-1">
          <span className={`${invertText ? 'text-white' : 'text-[#0D2B3E]'} font-black text-2xl md:text-3xl tracking-tighter leading-none whitespace-nowrap font-sans`}>
            PORT KHALID
          </span>
          <span className="text-[#00A3B5] font-black text-[10px] md:text-[13px] tracking-[0.45em] leading-tight uppercase font-sans">
            COLD STORES
          </span>
        </div>
        {tagline && (
          <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] italic border-t border-white/10 pt-2">
            Dockside Cold Chain Excellence Since 1985
          </span>
        )}
      </div>
    </div>
  );
};

const FormField = ({ 
  label, 
  name, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  tooltip, 
  options,
  required = false
}: { 
  label: string, 
  name: string, 
  type?: string, 
  placeholder?: string, 
  value: any, 
  onChange: (e: any) => void, 
  error?: string, 
  tooltip?: string,
  options?: string[],
  required?: boolean
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const errorId = `${name}-error`;
  const tooltipId = `${name}-tooltip`;

  return (
    <div className="space-y-3 relative">
      <div className="flex items-center justify-between">
        <label 
          htmlFor={name}
          className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2"
        >
          {label} {required && <span className="text-brand-secondary" aria-hidden="true">*</span>}
          {tooltip && (
            <div className="relative inline-block ml-1">
              <button
                type="button"
                aria-label={`Information about ${label}`}
                aria-describedby={showTooltip ? tooltipId : undefined}
                className="text-slate-400 cursor-help hover:text-brand-secondary transition-colors focus:outline-none focus:text-brand-secondary"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              >
                <Info size={12} />
              </button>
              {showTooltip && (
                <div 
                  id={tooltipId}
                  role="tooltip"
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black text-white text-[9px] font-medium leading-relaxed uppercase tracking-wider z-50 shadow-2xl"
                >
                  {tooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
                </div>
              )}
            </div>
          )}
        </label>
        {value && !error && required && <Check size={14} className="text-teal-500" aria-label="Valid" />}
      </div>
      
      {type === "select" ? (
        <div className="relative group">
          <select 
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full bg-slate-50 border ${error ? 'border-red-500 bg-red-50/10' : 'border-slate-100 group-hover:border-slate-300'} p-4 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none font-bold transition-all appearance-none cursor-pointer`}
          >
            <option value="">{placeholder || "Select Option"}</option>
            {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
            <ArrowRight size={16} className="rotate-90" />
          </div>
        </div>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full bg-slate-50 border ${error ? 'border-red-500 bg-red-50/10' : 'border-slate-100 hover:border-slate-300'} p-4 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none font-bold transition-all resize-none placeholder:text-slate-300`}
        />
      ) : (
        <input 
          id={name}
          name={name}
          type={type} 
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full bg-slate-50 border ${error ? 'border-red-500 bg-red-50/10' : 'border-slate-100 hover:border-slate-300'} p-4 focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 outline-none font-bold transition-all placeholder:text-slate-300 ${type === 'date' ? 'uppercase' : ''}`} 
          placeholder={placeholder}
        />
      )}

      {error && (
        <motion.div 
          id={errorId}
          role="alert"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-[9px] font-black uppercase text-red-500 tracking-widest mt-2"
        >
          <AlertCircle size={10} />
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    commodity: "",
    tempRange: "",
    volume: "",
    startDate: "",
    services: [] as string[],
    notes: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.companyName) newErrors.companyName = "Legal entity name required";
    if (!formState.contactPerson) newErrors.contactPerson = "Primary contact required";
    if (!formState.email) {
      newErrors.email = "Communication channel required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formState.phone) newErrors.phone = "Direct line required";
    if (!formState.commodity) newErrors.commodity = "Classification required";
    if (!formState.tempRange) newErrors.tempRange = "Temperature spec required";
    if (!formState.volume) newErrors.volume = "Quantity estimation required";
    if (!formState.startDate) newErrors.startDate = "Provisioning date required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const toggleService = (service: string) => {
    setFormState(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after success
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-secondary selection:text-black">
      {/* Decorative background element */}
      <div className="fixed bottom-[-50px] left-[-30px] text-[20vw] font-black text-white/5 select-none pointer-events-none tracking-tighter italic whitespace-nowrap z-0">
        COLD CARGO
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-primary/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-container-max mx-auto px-10 h-24 flex items-center justify-between">
          <Logo className="scale-100 origin-left" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {["About Us", "Services", "Facility", "Compliance"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white text-[11px] uppercase tracking-[0.2em] font-black hover:text-brand-secondary transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="text-white text-[11px] uppercase tracking-[0.2em] font-black border-b-2 border-brand-secondary pb-1">
              Contact
            </a>
            
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            
            <button className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 cursor-not-allowed flex items-center gap-2 group">
              <span className="w-2 h-2 rounded-full bg-white/20"></span>
              Client Portal
              <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded ml-1">Phase 2</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-brand-primary/95 backdrop-blur-xl border-b border-white/10 px-10 py-10"
          >
            <Logo className="mb-12" />
            <div className="flex flex-col gap-6">
              {["About Us", "Services", "Facility", "Compliance", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-white text-2xl font-black uppercase tracking-tighter hover:text-brand-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-24">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-secondary/5 to-transparent pointer-events-none opacity-50"></div>
          
          <div className="max-w-container-max mx-auto px-10 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-0"
            >
              <p className="text-brand-secondary font-black uppercase tracking-[0.5em] text-xs mb-6">
                Premier Supply Chain Hub
              </p>
              <h1 className="text-[clamp(3.5rem,12vw,9rem)] leading-[0.8] font-black tracking-tighter uppercase mb-2">
                Port Khalid<br/>
                <span className="text-stroke-white opacity-90 inline-block mt-2">Cold Stores</span>
              </h1>
            </motion.div>

            {/* Stats Grid Overlay */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 mt-24 border-t border-white/10 pt-16">
              {[
                { value: "5,000", label: "Pallet Capacity", accent: true },
                { value: "-18°C", label: "Deep Freeze capability" },
                { value: "SHJ", label: "Port Side Access" },
                { value: "24/7", label: "Customs Clearance" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="space-y-2"
                >
                  <div className={`text-5xl md:text-6xl font-black ${stat.accent ? 'text-brand-secondary' : 'text-white'}`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-32 bg-brand-primary" id="about-us">
          <div className="max-w-container-max mx-auto px-10">
            <motion.div 
              {...fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Vision Card */}
              <div className="border border-white/10 p-12 md:p-16 hover:border-brand-secondary transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-brand-secondary/10 transition-colors"></div>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 text-white relative z-10">
                  Our <span className="text-brand-secondary">About Us</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed relative z-10 italic">
                  With over 40 years of cold storage expertise, we operate as a foundational dockside facility at Berths 9 & 10, Sharjah Port. We have been serving the UAE maritime logistics sector since 1985.
                </p>
              </div>

              {/* Mission Card */}
              <div className="border border-white/10 p-12 md:p-16 hover:border-brand-secondary transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-brand-secondary/10 transition-colors"></div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 text-white relative z-10">
                  Our <span className="text-brand-secondary">Mission</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                  To deliver uncompromising, precision temperature-controlled solutions through four decades of operational expertise and our 5,000 MT dockside facility at Port Khalid. We safeguard our clients' assets, optimize their supply chain efficiency and foster enduring commercial partnerships built on absolute transparency and zero hidden charges.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-32 bg-white text-black border-y border-slate-100">
          <div className="max-w-container-max mx-auto px-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                Our <span className="text-brand-secondary">Core Values</span>
              </h2>
              <p className="text-slate-500 font-medium text-lg uppercase tracking-widest">
                The pillars of our maritime operational excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
              {[
                {
                  title: "Unyielding Commercial Integrity",
                  desc: "Absolute transparency in all operations and pricing. No hidden charges, ever.",
                  icon: <Scale size={32} className="text-brand-secondary" />
                },
                {
                  title: "Precision & Excellence",
                  desc: "Meticulous execution, prompt responses, efficient cargo transfers across our 7-room network.",
                  icon: <Target size={32} className="text-brand-secondary" />
                },
                {
                  title: "Paramount Asset Safety",
                  desc: "Every pallet treated as a vital commodity. Stringent hygiene protocols. Unbroken temperature control.",
                  icon: <ShieldCheck size={32} className="text-brand-secondary" />
                },
                {
                  title: "Adaptive Agility",
                  desc: "Continuously evolving our infrastructure and services to meet the dynamic demands of international maritime trade.",
                  icon: <Zap size={32} className="text-brand-secondary" />
                }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 hover:bg-slate-50 transition-colors group"
                >
                  <div className="mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-black mb-4 leading-tight group-hover:text-brand-secondary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Storage Environments */}
        <section className="bg-white text-black" id="services">
          <div className="max-w-container-max mx-auto border-x border-slate-100">
            <div className="p-10 md:p-20 text-center border-b border-slate-100">
               <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Temperature Controlled Warehouse UAE</h2>
               <p className="text-slate-500 font-medium max-w-2xl mx-auto">Providing frozen, chilled and ambient cold storage in Sharjah with temperatures ranging from -18°C to +15°C across 7 dedicated rooms.</p>
            </div>
            {/* Card 1: Ultra-Low & Deep Frozen */}
            <motion.div 
              {...fadeIn}
              className="grid grid-cols-1 lg:grid-cols-2 border-b border-slate-100"
            >
              <div className="p-10 md:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="text-xs font-black uppercase tracking-[0.5em] text-brand-secondary mb-6">Thermal Level 01</div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9]">
                  Ultra-Low & <br/>
                  <span className="text-stroke-cyan">Deep Frozen</span>
                </h2>
                <div className="flex items-center gap-4 text-3xl font-black">
                  <Snowflake size={32} className="text-brand-secondary" />
                  Upto -18°C
                </div>
              </div>
              <div className="p-10 md:p-20 bg-slate-50 flex flex-col justify-center space-y-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-secondary/60 mb-4">Strategic Asset Focus</h4>
                  <p className="text-3xl font-black leading-[1.1] tracking-tighter">Imported poultry, meat, seafood and frozen commodities</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-4">Operational Features</h4>
                  <ul className="space-y-4 text-slate-600 font-medium leading-relaxed">
                    <li>• Independent redundant refrigeration circuits.</li>
                    <li>• Temperature fluctuations entirely prevented even during peak loading.</li>
                    <li className="text-brand-secondary/80 italic">• UAE is among the world's largest consumers of meat and seafood — robust frozen infrastructure is non-negotiable.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Chilled & Refrigerated */}
            <motion.div 
              {...fadeIn}
              className="grid grid-cols-1 lg:grid-cols-2 border-b border-slate-100"
            >
              <div className="p-10 md:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100 lg:order-2">
                <div className="text-xs font-black uppercase tracking-[0.5em] text-brand-secondary mb-6">Thermal Level 02</div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9]">
                  Chilled & <br/>
                  <span className="text-stroke-cyan">Refrigerated</span>
                </h2>
                <div className="flex items-center gap-4 text-3xl font-black">
                  <Thermometer size={32} className="text-brand-secondary" />
                  0°C to +5°C
                </div>
              </div>
              <div className="p-10 md:p-20 flex flex-col justify-center space-y-10 lg:order-1">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-secondary/60 mb-4">Strategic Asset Focus</h4>
                  <p className="text-3xl font-black leading-[1.1] tracking-tighter">Dairy products, fresh fruits, vegetables, pharmaceutical goods</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-4">Operational Features</h4>
                  <ul className="space-y-4 text-slate-600 font-medium leading-relaxed">
                    <li>• Dual cascade evaporator systems.</li>
                    <li>• Precise humidity control prevents product desiccation and extends shelf life.</li>
                    <li className="text-brand-secondary/80 italic">• Chilled storage is the leading revenue segment in the UAE cold chain market.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Ambient & Buffer */}
            <motion.div 
              {...fadeIn}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="p-10 md:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="text-xs font-black uppercase tracking-[0.5em] text-brand-secondary mb-6">Thermal Level 03</div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9]">
                  Ambient & <br/>
                  <span className="text-stroke-cyan">Buffer Storage</span>
                </h2>
                <div className="flex items-center gap-4 text-3xl font-black">
                  <Wind size={32} className="text-brand-secondary" />
                  Up to +15°C
                </div>
              </div>
              <div className="p-10 md:p-20 bg-slate-50 flex flex-col justify-center space-y-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-secondary/60 mb-4">Strategic Asset Focus</h4>
                  <p className="text-3xl font-black leading-[1.1] tracking-tighter">Medical supplies, cosmetics, confectionery, dry foodstuffs</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-4">Operational Features</h4>
                  <ul className="space-y-4 text-slate-600 font-medium leading-relaxed">
                    <li>• Vital thermal buffer zones.</li>
                    <li>• Eliminates thermal shock during goods transfer.</li>
                    <li className="text-brand-secondary/80 italic">• Prevents packaging condensation and degradation during outbound transport.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value Added Solutions Section */}
        <section className="py-32 bg-slate-50 text-black border-y border-slate-100" id="facility">
          <div className="max-w-container-max mx-auto px-10">
            <div className="max-w-4xl mb-24">
              <motion.div {...fadeIn}>
                <h3 className="text-xs uppercase tracking-[0.5em] font-black text-brand-secondary mb-10">3PL Cold Chain UAE</h3>
                <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
                  Value Added <br/>
                  <span className="text-stroke-cyan italic">Logistics Sharjah</span>
                </h2>
                <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-3xl">
                  Modern maritime logistics demands more than passive warehousing. Port Khalid Cold Store operates as a dynamic extension of your supply chain — offering a comprehensive suite of value-added services designed to accelerate speed to market, reduce secondary handling costs and ensure full regulatory compliance.
                </p>
              </motion.div>
            </div>

            <div className="space-y-6">
              <div className="hidden lg:grid grid-cols-12 gap-8 px-12 py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] border-l-8 border-black shadow-xl relative z-10">
                <div className="col-span-3">Operational Service</div>
                <div className="col-span-6">Capability & Methodology</div>
                <div className="col-span-3">Strategic Result</div>
              </div>
              {[
                { 
                  service: "Rapid Cross-Docking", 
                  what: "Direct transfer of cargo from inbound vessels to outbound transport systems, bypassing long-term storage to maximize velocity.", 
                  benefit: "Reduces warehousing overhead & minimizes transit times for fast-moving goods." 
                },
                { 
                  service: "Order Picking & Kitting", 
                  what: "Precision consolidation of multiple SKUs into retail-ready, wholesale, or distribution-center-optimized pallets.", 
                  benefit: "Maximizes cubic utilization & significantly reduces downstream labor costs." 
                },
                { 
                  service: "Co-Packing & Localization", 
                  what: "Arabic ingredient labeling, barcode generation, and promotional bundling curated for regional market entry.", 
                  benefit: "Ensures UAE municipality compliance & prevents customs delays at the border." 
                },
                { 
                  service: "Inventory Management", 
                  what: "Strict FIFO and FEFO rotation protocols utilizing proprietary tracking systems for absolute stock integrity.", 
                  benefit: "Eliminates spoilage risk & maximizes shelf-life for the end consumer." 
                },
              ].map((row, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 15 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 lg:px-12 py-12 bg-white border border-slate-200 border-l-8 border-l-brand-secondary hover:shadow-2xl transition-all group relative items-center"
                >
                  <div className="col-span-1 lg:col-span-3">
                    <h4 className="text-2xl font-black group-hover:text-brand-secondary transition-colors tracking-tighter uppercase">{row.service}</h4>
                  </div>
                  <div className="col-span-1 lg:col-span-6 lg:border-l lg:border-slate-100 lg:pl-10">
                    <p className="text-slate-500 font-medium leading-relaxed">{row.what}</p>
                  </div>
                  <div className="col-span-1 lg:col-span-3 lg:border-l lg:border-slate-100 lg:pl-10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-secondary mb-3 opacity-50">Strategic Result</div>
                    <p className="text-sm font-black text-black leading-snug">{row.benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality & Compliance Section */}
        <section className="py-32 bg-white text-black" id="compliance">
          <div className="max-w-container-max mx-auto px-10">
            <div className="text-center max-w-4xl mx-auto mb-24">
              <motion.div {...fadeIn}>
                <h3 className="text-xs uppercase tracking-[0.5em] font-black text-brand-secondary mb-8">Food Safety Cold Storage UAE</h3>
                <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
                  HACCP Compliant <br/>
                  <span className="text-stroke-cyan">Safety & Hygiene</span>
                </h2>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                  Our cold chain solutions for F&B, pharma and floral are continuously monitored, ensuring HACCP-aligned processes and full traceability across all 7 cold rooms at Port Khalid.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: "Continuous Environmental Monitoring",
                  desc: "All 7 storage chambers are equipped with advanced sensor networks that log temperature and humidity data in real time — providing a complete, auditable trail of unbroken cold chain integrity for every pallet under our stewardship.",
                  icon: <Activity size={32} />
                },
                {
                  title: "Pest Control & Sanitation Protocols",
                  desc: "Multi-layered pest management and rigorous scheduled sanitation enforced throughout the entire facility — ensuring full compliance with UAE municipality requirements and international food safety mandates.",
                  icon: <ShieldCheck size={32} />
                },
                {
                  title: "Process-Driven Operations (ISO / HACCP Aligned)",
                  desc: "Standard operating procedures designed to align with ISO management system principles and HACCP methodology — removing human error from the handling equation at every stage from dock receipt to final dispatch.",
                  icon: <FileText size={32} />
                },
                {
                  title: "Auditable Traceability & Quarantine Management",
                  desc: "Complete systemic inventory transparency. In the event of a product recall or quality hold, specific batches are instantly identified, physically isolated in dedicated quarantine zones and managed with speed and accuracy.",
                  icon: <Search size={32} />
                }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="p-12 border border-slate-100 bg-slate-50 hover:border-brand-secondary hover:bg-white hover:shadow-2xl transition-all group"
                >
                  <div className="w-16 h-16 bg-white flex items-center justify-center text-brand-secondary mb-8 border border-slate-100 group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-6 leading-tight group-hover:text-brand-secondary transition-colors">{card.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Section */}
        <section className="py-32 bg-slate-100 text-black border-b border-slate-200" id="inquiry">
          <div className="max-w-container-max mx-auto px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-4">
                <motion.div {...fadeIn}>
                  <h3 className="text-xs uppercase tracking-[0.5em] font-black text-brand-secondary mb-10">Procurement Inquiry</h3>
                  <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
                    Storage <br/>
                    <span className="text-stroke-cyan">Reservation</span>
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed mb-10">
                    Utilize our technical inquiry system to request volume allocations and value-added service integrations. Our logistics architects will respond with a tailored supply chain optimization plan.
                  </p>
                  <div className="p-8 border border-slate-200 bg-white">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Official Documentation</div>
                    <div className="flex items-center gap-4 text-sm font-black text-black mb-1 underline hover:text-brand-secondary transition-colors cursor-pointer capitalize">
                      <FileText size={18} />
                      Company Profile.pdf
                    </div>
                    <div className="flex items-center gap-4 text-sm font-black text-black underline hover:text-brand-secondary transition-colors cursor-pointer capitalize">
                      <FileText size={18} />
                      Standard Terms.pdf
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-slate-200 shadow-2xl p-10 md:p-16 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-secondary/5 rotate-45 -mr-12 -mt-12"></div>
                  
                  <form className="space-y-12" onSubmit={handleSubmit}>
                    {isSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-20 text-center space-y-6"
                      >
                        <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-teal-500/20">
                          <Check size={40} strokeWidth={3} />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black uppercase tracking-tighter">Inquiry Transmitted</h3>
                          <p className="text-slate-500 font-medium mt-2">Logistics architect will review your technical specs shortly.</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setIsSubmitted(false)}
                          className="text-[10px] uppercase font-black tracking-widest text-brand-secondary underline underline-offset-4"
                        >
                          Submit Another Specification
                        </button>
                      </motion.div>
                    ) : (
                      <>
                        {/* Step 1: Corporate Details */}
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">01</span>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-secondary">Corporate Identification</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField 
                              label="Corporate Entity Name"
                              name="companyName"
                              placeholder="Enter Legal Name"
                              value={formState.companyName}
                              onChange={handleInputChange}
                              error={errors.companyName}
                              required
                              tooltip="Exact name as registered on Trade License for compliance checks."
                            />
                            <FormField 
                              label="Primary Contact Person"
                              name="contactPerson"
                              placeholder="Enter Full Name"
                              value={formState.contactPerson}
                              onChange={handleInputChange}
                              error={errors.contactPerson}
                              required
                            />
                            <FormField 
                              label="Direct Email"
                              name="email"
                              type="email"
                              placeholder="email@company.ae"
                              value={formState.email}
                              onChange={handleInputChange}
                              error={errors.email}
                              required
                            />
                            <FormField 
                              label="Phone Number"
                              name="phone"
                              type="tel"
                              placeholder="+971"
                              value={formState.phone}
                              onChange={handleInputChange}
                              error={errors.phone}
                              required
                            />
                          </div>
                        </div>

                        {/* Step 2: Technical Specs */}
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">02</span>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-secondary">Cargo Specifications</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField 
                              label="Commodity Classification"
                              name="commodity"
                              type="select"
                              placeholder="Select Category"
                              options={["Meat / Poultry", "Dairy Products", "Fresh Produce", "Pharmaceuticals", "Ambient / Dry Goods", "Other"]}
                              value={formState.commodity}
                              onChange={handleInputChange}
                              error={errors.commodity}
                              required
                              tooltip="Influences room allocation and cross-contamination protocols."
                            />
                            <FormField 
                              label="Required Temperature Range"
                              name="tempRange"
                              type="select"
                              placeholder="Select Range"
                              options={["Deep Freeze (-18°C or lower)", "Chilled (0°C to +5°C)", "Ambient (Up to +15°C)", "Custom Requirement"]}
                              value={formState.tempRange}
                              onChange={handleInputChange}
                              error={errors.tempRange}
                              required
                              tooltip="Specify based on product sensitivity requirements."
                            />
                            <FormField 
                              label="Estimated Volume (MT / Pallets)"
                              name="volume"
                              type="number"
                              placeholder="Input Value"
                              value={formState.volume}
                              onChange={handleInputChange}
                              error={errors.volume}
                              required
                            />
                            <FormField 
                              label="Operational Start Date"
                              name="startDate"
                              type="date"
                              value={formState.startDate}
                              onChange={handleInputChange}
                              error={errors.startDate}
                              required
                            />
                          </div>

                          <div className="space-y-4" role="group" aria-labelledby="services-label">
                            <label id="services-label" className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Value Added Services Needed</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {["Cross-Docking", "Co-Packing", "Order Kitting", "Reverse Logistics"].map(service => (
                                <div 
                                  key={service} 
                                  tabIndex={0}
                                  role="checkbox"
                                  aria-checked={formState.services.includes(service)}
                                  onClick={() => toggleService(service)}
                                  onKeyDown={(e) => {
                                    if (e.key === ' ' || e.key === 'Enter') {
                                      e.preventDefault();
                                      toggleService(service);
                                    }
                                  }}
                                  className={`flex items-center gap-3 p-4 border transition-all cursor-pointer group select-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 outline-none ${
                                    formState.services.includes(service) 
                                      ? 'bg-black border-black text-white' 
                                      : 'bg-slate-50 border-slate-100 hover:border-brand-secondary text-slate-500'
                                  }`}
                                >
                                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                                    formState.services.includes(service) ? 'border-brand-secondary bg-brand-secondary' : 'border-slate-300 bg-white'
                                  }`}>
                                    {formState.services.includes(service) && <Check size={12} className="text-black" strokeWidth={4} />}
                                  </div>
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                                    formState.services.includes(service) ? 'text-white' : 'group-hover:text-black'
                                  }`}>{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Step 3: Additional */}
                        <div className="space-y-8">
                          <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">03</span>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-secondary">Strategic Notes</h4>
                          </div>
                          <FormField 
                            label="Additional Instructions or Operational Constraints"
                            name="notes"
                            type="textarea"
                            placeholder="Enter Details..."
                            value={formState.notes}
                            onChange={handleInputChange}
                          />
                        </div>

                        <motion.button 
                          disabled={isSubmitting}
                          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                          className={`w-full p-8 font-black uppercase tracking-[0.3em] text-sm transition-all flex items-center justify-center gap-6 group ${
                            isSubmitting ? 'bg-slate-100 text-slate-400 cursor-wait' : 'bg-black text-white hover:bg-brand-secondary hover:text-black'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-slate-400 border-t-brand-secondary animate-spin rounded-full"></div>
                              Transmitting Inquiry...
                            </>
                          ) : (
                            <>
                              Transmit Storage Inquiry
                              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </>
                          )}
                        </motion.button>
                      </>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-40 bg-brand-bg relative overflow-hidden" id="contact">
          <div className="max-w-container-max mx-auto px-10 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="max-w-2xl text-left">
                  <motion.div {...fadeIn}>
                    <h3 className="text-xs uppercase tracking-[0.4em] font-black mb-10 text-brand-secondary">Strategic Infrastructure</h3>
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-10 leading-[0.8]">
                      Get in <br/> <span className="text-stroke-white italic">Touch</span>
                    </h2>
                  </motion.div>
                  
                  <div className="space-y-12 mt-16">
                    <div className="flex items-start gap-8 group">
                      <div className="w-14 h-14 border border-white/20 flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-black transition-all duration-500">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Gateway Location</div>
                        <p className="text-white text-xl font-bold leading-tight">
                          Layyah Street, Al Layyeh Suburb,<br/>
                          Near Berth 9 & 10, Sharjah Port, UAE
                        </p>
                        <p className="text-brand-secondary/60 text-sm mt-3 font-black tracking-widest">P.O. BOX: 7097, SHARJAH</p>
                      </div>
                    </div>
  
                    <div className="flex items-start gap-8 group">
                      <div className="w-14 h-14 border border-white/20 flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-black transition-all duration-500">
                        <Phone size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Direct Terminal Lines</div>
                        <p className="text-white text-2xl font-black tracking-tight">+971 6 528 1796</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Fax / Line 2</span>
                          <p className="text-white/60 font-bold">+971 6 528 4820</p>
                        </div>
                      </div>
                    </div>
  
                    <div className="flex items-start gap-8 group">
                      <div className="w-14 h-14 border border-white/20 flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-black transition-all duration-500">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Inquiry Desk</div>
                        <p className="text-white text-xl font-bold group-hover:text-brand-secondary transition-colors cursor-pointer">
                          info@portkhalidcoldstore.ae
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="space-y-10">
                  <motion.div {...fadeIn} className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-brand-secondary font-black uppercase tracking-[0.4em] text-xs">Our Location</h3>
                      <p className="text-white/70 font-medium leading-relaxed">
                        Strategically located at Port Khalid, Sharjah for direct dockside cold chain operations and rapid cargo handling access.
                      </p>
                    </div>
                    
                    <div className="relative w-full aspect-video lg:aspect-square bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.353386348825!2d55.3718!3d25.3598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5bc02c46f687%3A0xb3679c669f59f976!2sPort%20Khalid%20Cold%20Stores!5e0!3m2!1sen!2sae!4v1715760000000!5m2!1sen!2sae"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        title="Port Khalid Cold Stores Location"
                      ></iframe>
                    </div>
  
                    <div className="space-y-6">
                      <div className="text-white/90 font-black text-sm uppercase tracking-wider leading-relaxed">
                        Port Khalid Cold Stores Co. Private Limited<br/>
                        Layyah Street, Near Berth 9 & 10<br/>
                        Sharjah Port, UAE
                      </div>
                      
                      <a 
                        href="https://maps.app.goo.gl/Kx13xVajqkn9f8BB6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-brand-secondary hover:bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] px-8 py-4 rounded-lg transition-all shadow-xl shadow-brand-secondary/20 group"
                      >
                        Open in Google Maps
                        <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
  
                  <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                    <Logo className="mb-8 scale-75 origin-left" invertText={true} />
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-secondary mb-6 italic">Corporate Identity</div>
                    <h4 className="text-white font-black text-xl leading-tight tracking-tighter uppercase mb-2">
                      Port Khalid Cold Stores Co.<br/>
                      Private Limited
                    </h4>
                    <div className="h-1 w-20 bg-brand-secondary mt-6"></div>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-primary border-t border-white/5 py-24 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 border-b border-white/5 pb-20 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <Logo className="mb-10" tagline={true} />
              <p className="text-white/40 text-lg font-medium max-w-md leading-relaxed">
                A frontline guardian of public health and brand reputation, providing strategic cold chain infrastructure in the UAE for over four decades.
              </p>
            </div>
            
            <div>
              <h5 className="text-white text-[10px] uppercase tracking-[0.5em] font-black mb-10 opacity-30 italic">Navigation</h5>
              <ul className="space-y-4 text-sm font-black text-white/50">
                <li><a href="#about-us" className="hover:text-brand-secondary transition-all hover:pl-2">Our Vision</a></li>
                <li><a href="#services" className="hover:text-brand-secondary transition-all hover:pl-2">Services</a></li>
                <li><a href="#facility" className="hover:text-brand-secondary transition-all hover:pl-2">Solutions</a></li>
                <li><a href="#compliance" className="hover:text-brand-secondary transition-all hover:pl-2">Compliance</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white text-[10px] uppercase tracking-[0.5em] font-black mb-10 opacity-30 italic">HQ Office</h5>
              <p className="text-white/60 text-sm font-bold leading-loose mb-6">
                Sharjah Port, UAE<br/>
                P.O. Box 7097<br/>
                United Arab Emirates
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-brand-secondary hover:text-brand-secondary cursor-pointer transition-all">
                  <Mail size={14} />
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-brand-secondary hover:text-brand-secondary cursor-pointer transition-all">
                  <Phone size={14} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-black text-white/20">
            <div>© 2026 Port Khalid Cold Stores Co. Private Limited. All Rights Reserved.</div>
            <div className="hidden md:block w-px h-3 bg-white/10"></div>
            <a href="#" className="hover:text-brand-secondary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}

