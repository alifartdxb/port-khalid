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

const Logo = ({ className = "", invertText = true, showText = true }: { className?: string, invertText?: boolean, showText?: boolean }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative w-auto h-11 md:h-14 flex-shrink-0">
        <img 
          src="/logo.png" 
          alt="Port Khalid Cold Store Logo" 
          className="h-full w-auto object-contain"
          onError={(e) => {
            // Fallback to SVG if image is missing
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              svg.setAttribute("viewBox", "0 0 100 100");
              svg.setAttribute("class", "w-11 h-11 md:w-14 md:h-14");
              svg.innerHTML = `
                <path d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" fill="#0D2B3E" />
                <g stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="50" y1="20" x2="50" y2="80" />
                  <line x1="24" y1="35" x2="76" y2="65" />
                  <line x1="24" y1="65" x2="76" y2="35" />
                </g>
                <path d="M10 55 Q10 95 50 98 Q90 95 90 55 L82 55 Q82 85 50 88 Q18 85 18 55 Z" fill="#00A3B5" />
              `;
              parent.appendChild(svg);
            }
          }}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${invertText ? 'text-white' : 'text-[#0D2B3E]'} font-black text-2xl md:text-3xl tracking-tighter leading-none whitespace-nowrap font-sans uppercase`}>
            Port Khalid
          </span>
          <span className="text-[#00A3B5] font-black text-[9px] md:text-[12px] tracking-[0.45em] md:tracking-[0.87em] leading-tight uppercase font-sans -mt-0.5">
            Cold Stores
          </span>
        </div>
      )}
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
          <Logo className="origin-left" />

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
            <div className="mb-10 pb-6 border-b border-white/10">
              <Logo invertText={true} />
            </div>
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

      <main className="relative z-10 industrial-grid">
        {/* Premium Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg z-0"></div>
          <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-brand-secondary/10 blur-[120px] rounded-full z-0"></div>
          
          <div className="max-w-container-max mx-auto px-10 w-full relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-brand-secondary/30 bg-brand-secondary/5 rounded-full mb-10 overflow-hidden group">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-brand-secondary"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-brand-secondary text-[10px] uppercase font-black tracking-[0.3em]">
                  Dockside Excellence Since 1985
                </span>
                <div className="ml-4 w-px h-3 bg-brand-secondary/20 group-hover:h-5 transition-all"></div>
                <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">
                  Berths 9 & 10 • Sharjah Port
                </span>
              </div>

              <h1 className="text-[clamp(3rem,10vw,7.5rem)] leading-[0.85] font-black tracking-tighter uppercase mb-10">
                Precision <br/>
                <span className="text-stroke-white opacity-90 block">Cold Chain</span>
                <span className="text-brand-secondary">Infrastructure</span>
              </h1>
              
              <p className="text-white/60 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed mb-12">
                5,000 MT capacity across seven specialized temperature zones. Providing seamless dockside logistics and sovereign-grade storage solutions in the heart of maritime Sharjah.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-10 py-6 bg-brand-secondary text-black font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 glow-cyan hover:bg-white transition-all shadow-2xl shadow-brand-secondary/20"
                >
                  Start Storage Inquiry
                  <ArrowRight size={20} />
                </motion.a>
                
                <motion.a 
                  href="https://wa.me/97165282241"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-10 py-6 glass-card text-white font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 hover:bg-brand-secondary/10 transition-all"
                >
                  WhatsApp Support
                  <Phone size={18} className="text-brand-secondary" />
                </motion.a>
              </div>
            </motion.div>

            {/* Floating Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute right-10 bottom-1/4 hidden xl:block"
            >
              <div className="glass-card p-8 flex flex-col gap-8 rotate-1">
                <div className="space-y-1">
                  <div className="text-5xl font-black text-brand-secondary">5.0k</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-white/40 leading-none">Metric Tonnes Capacity</div>
                </div>
                <div className="w-full h-px bg-white/10"></div>
                <div className="space-y-1">
                  <div className="text-5xl font-black text-white">07</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-white/40 leading-none">Dedicated Thermal Rooms</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="w-px h-12 bg-gradient-to-b from-brand-secondary to-transparent"></div>
          </div>
        </section>

        {/* Global Statistics & Trust Bar */}
        <section className="py-20 bg-brand-surface relative z-10">
          <div className="max-w-container-max mx-auto px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center text-center">
              {[
                { label: "Founded", value: "1985" },
                { label: "ISO Certified", value: "22000" },
                { label: "Dockside Berths", value: "09 & 10" },
                { label: "Customs Hub", value: "24/7" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2 group">
                  <div className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em] group-hover:text-brand-secondary transition-colors">{stat.label}</div>
                  <div className="text-3xl md:text-5xl font-black text-white group-hover:scale-110 transition-transform">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 02: Operational Excellence & The Journey */}
        <section className="py-32 bg-brand-bg relative overflow-hidden" id="about-us">
          <div className="max-w-container-max mx-auto px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeIn}>
                <h3 className="text-xs uppercase tracking-[0.5em] font-black text-brand-secondary mb-10">Operational Excellence</h3>
                <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter uppercase whitespace-pre-line">
                  40 Years of<br/>
                  <span className="text-stroke-white italic">Dockside Integrity</span>
                </h2>
                <div className="space-y-8 text-white/60 text-lg font-medium leading-relaxed">
                  <p>
                    Established in 1985 at Sharjah Port Berths 9 & 10, Port Khalid Cold Stores has evolved into a sovereign-grade cold chain hub. Our facility doesn't just store cargo; it protects the integrity of the regional food supply.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="glass-card p-6 border-l-4 border-l-brand-secondary">
                      <h4 className="text-white text-sm font-black uppercase mb-2">Zero-Leak Integrity</h4>
                      <p className="text-xs">Unyielding commercial transparency with zero hidden charges.</p>
                    </div>
                    <div className="glass-card p-6 border-l-4 border-l-brand-secondary">
                      <h4 className="text-white text-sm font-black uppercase mb-2">Maritime Agility</h4>
                      <p className="text-xs">Direct dockside access for reduced handling and thermal shock risk.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-secondary/20 blur-[100px] rounded-full group-hover:bg-brand-secondary/30 transition-all"></div>
                <div className="relative glass-card p-1 items-center justify-center flex aspect-square">
                  <div className="w-full h-full industrial-grid opacity-30 absolute inset-0"></div>
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <Logo showText={false} className="scale-[2]" />
                    <div className="text-center">
                      <div className="text-[10px] font-black tracking-[0.5em] text-brand-secondary uppercase">Center of Excellence</div>
                      <div className="text-3xl font-black text-white px-10">SHARJAH MARITIME GATEWAY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Service Bento Grid */}
        <section className="py-32 bg-white text-black" id="services">
          <div className="max-w-container-max mx-auto px-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase whitespace-pre-line">
                Strategic<br/>
                <span className="text-brand-secondary">Storage Infrastructure</span>
              </h2>
              <p className="text-slate-500 font-medium text-lg uppercase tracking-widest leading-relaxed">
                Seven specialized thermal zones engineered for absolute cold chain reliability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[1000px]">
              {/* Deep Freeze */}
              <div className="md:col-span-8 md:row-span-1 bg-slate-50 border border-slate-100 p-12 group hover:border-brand-secondary transition-all relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-xs font-black text-brand-secondary mb-4 uppercase tracking-[0.3em]">Thermal Level 01</div>
                  <h3 className="text-4xl md:text-6xl font-black mb-6 leading-none">ULTRA-LOW & <br/><span className="text-stroke-cyan italic">DEEP FROZEN</span></h3>
                  <div className="flex items-center gap-4 text-3xl font-black mb-8">
                    <Snowflake size={32} className="text-brand-secondary" />
                    Upto -18°C
                  </div>
                  <p className="text-slate-500 font-medium max-w-md">Dedicated infrastructure for imported poultry, meat, and seafood. Dual-redundant refrigeration prevents any thermal fluctuation.</p>
                </div>
                <div className="absolute bottom-[-20px] right-[-20px] text-[15rem] font-black text-black/5 select-none pointer-events-none italic">
                  -18
                </div>
              </div>

              {/* Stats Small */}
              <div className="md:col-span-4 md:row-span-1 bg-black text-white p-12 flex flex-col justify-center gap-10">
                <div>
                  <div className="text-4xl font-black text-brand-secondary">ISO 22000</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Food Safety Managed</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white">HACCP</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Certified Compliance</div>
                </div>
              </div>

              {/* Chilled Card */}
              <div className="md:col-span-4 md:row-span-2 bg-slate-900 text-white p-12 group hover:border-brand-secondary border border-transparent transition-all flex flex-col justify-between">
                <div>
                  <div className="text-xs font-black text-brand-secondary mb-4 uppercase tracking-[0.3em]">Thermal Level 02</div>
                  <h3 className="text-4xl font-black mb-6">CHILLED <br/>REFRIGERATED</h3>
                  <div className="flex items-center gap-4 text-3xl font-black mb-8">
                    <Thermometer size={32} className="text-brand-secondary" />
                    0°C to +5°C
                  </div>
                </div>
                <p className="text-white/40 text-sm font-medium">Precision moisture control for dairy, produce, and premium pharmaceuticals. Prevents product desiccation.</p>
              </div>

              {/* Value Add */}
              <div className="md:col-span-8 md:row-span-2 bg-brand-secondary p-12 flex flex-col justify-between group overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-6xl font-black text-black leading-none mb-6">VALUE ADDED <br/><span className="text-white italic">PORT SERVICES</span></h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                    {[
                      { title: "Cross-Docking", icon: <TrendingUp size={20} /> },
                      { title: "Co-Packing", icon: <Package size={20} /> },
                      { title: "Inventory Sync", icon: <Activity size={20} /> },
                      { title: "Kitting", icon: <CheckCircle2 size={20} /> }
                    ].map(item => (
                      <div key={item.title} className="flex items-center gap-4 text-black font-black uppercase tracking-widest text-xs">
                        {item.icon}
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-12">
                  <a href="#facility" className="inline-flex items-center gap-4 text-sm font-black text-black uppercase tracking-[0.2em] border-b-2 border-black pb-2">
                    Explore Facility Capabilities
                    <ArrowRight size={18} />
                  </a>
                </div>
                <div className="absolute top-1/2 right-[-100px] text-[20rem] font-black text-white/10 select-none pointer-events-none -translate-y-1/2 rotate-12">
                  3PL
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Process Flow */}
        <section className="py-32 bg-brand-bg relative overflow-hidden" id="facility">
          <div className="max-w-container-max mx-auto px-10">
            <div className="text-center mb-24">
              <h3 className="text-xs uppercase tracking-[0.5em] font-black text-brand-secondary mb-10">The Cold Chain Journey</h3>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase">
                Optimized <span className="text-stroke-white italic">Throughput</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  step: "01", 
                  title: "Dockside Receipt", 
                  desc: "Direct port-side handling at Berths 9 & 10. Cargo is immediately transitioned to temperature-controlled loading bays to prevent thermal shock.",
                  icon: <Anchor size={32} />
                },
                { 
                  step: "02", 
                  title: "Technical Storage", 
                  desc: "Allocation to one of 7 specialized rooms. Continuous environmental logging ensures absolute compliance with storage specifications.",
                  icon: <Warehouse size={32} />
                },
                { 
                  step: "03", 
                  title: "Managed Dispatch", 
                  desc: "Last-mile ready consolidation and value-added kitting. Rapid release systems ensure your assets reach the market in peak condition.",
                  icon: <Zap size={32} />
                }
              ].map((process, i) => (
                <div key={i} className="glass-card p-12 relative group hover:border-brand-secondary transition-all">
                  <div className="absolute top-10 right-10 text-6xl font-black text-white/5 italic group-hover:text-brand-secondary/10 transition-colors">
                    {process.step}
                  </div>
                  <div className="w-16 h-16 bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-10 group-hover:bg-brand-secondary group-hover:text-black transition-colors">
                    {process.icon}
                  </div>
                  <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{process.title}</h4>
                  <p className="text-white/40 font-medium leading-relaxed">{process.desc}</p>
                </div>
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

        {/* Section 06: Trust Signals & Client Reach */}
        <section className="py-24 bg-brand-surface/50 border-y border-white/5 overflow-hidden">
          <div className="max-w-container-max mx-auto px-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xs">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-secondary mb-2">Network Velocity</div>
                <h3 className="text-white text-2xl font-black uppercase tracking-tighter">TRUSTED BY GLOBAL MARITIME LEADERS</h3>
              </div>
              
              <div className="flex-1 overflow-hidden relative grayscale opacity-40">
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-bg to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-bg to-transparent z-10"></div>
                
                <motion.div 
                  initial={{ x: 0 }}
                  animate={{ x: "-50%" }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="flex items-center gap-20 whitespace-nowrap"
                >
                  {/* Placeholder Logos as stylized text/icons for premium industrial look */}
                  {[
                    "MARSK LOGISTICS", "GLOBAL TRADERS", "EMIRATES FOODS", "GULF MARITIME", "SHARJAH PORTS", 
                    "MARSK LOGISTICS", "GLOBAL TRADERS", "EMIRATES FOODS", "GULF MARITIME", "SHARJAH PORTS"
                  ].map((logo, idx) => (
                    <div key={idx} className="text-xl font-black tracking-[0.3em] text-white/50 hover:text-brand-secondary transition-colors cursor-default">
                      {logo}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Final Conversion Section */}
        <section className="py-32 bg-brand-secondary relative overflow-hidden group">
          <div className="absolute inset-0 industrial-grid opacity-20"></div>
          <div className="max-w-container-max mx-auto px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-xs uppercase tracking-[0.4em] font-black text-black mb-10">Operational Provisioning</h3>
                <h2 className="text-6xl md:text-8xl font-black text-black leading-[0.8] tracking-tighter uppercase mb-10">
                  Secure Your <br/>
                  <span className="text-white italic">Capacity</span>
                </h2>
                <p className="text-black/70 text-xl font-medium leading-relaxed max-w-lg mb-12">
                  Our facility is currently processing peak-season allocations. Connect with our technical team today to reserve your thermal zone at Berths 9 & 10.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <motion.a 
                    href="#inquiry"
                    whileHover={{ scale: 1.05 }}
                    className="px-10 py-6 bg-black text-white font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 shadow-2xl"
                  >
                    Request Technical Proposal
                    <ArrowRight size={20} />
                  </motion.a>
                </div>
              </div>
              
              <div className="hidden lg:block relative">
                <div className="glass-card bg-black/10 border-black/10 p-12 -rotate-3 scale-110">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Real-Time Capacity</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Live Update</div>
                    </div>
                    <div className="h-px bg-black/5"></div>
                    <div className="space-y-4">
                      {["Room 01: Deep Freeze", "Room 04: Chilled", "Room 07: Ambient"].map((room, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-black font-black uppercase text-xs tracking-widest">{room}</span>
                          <span className="text-black/40 text-[10px] font-black uppercase tracking-widest">Available</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                              <motion.div 
                                animate={{ rotate: 360 }} 
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-6 h-6 flex items-center justify-center"
                              >
                                <img src="/logo.png" alt="" className="w-full h-full object-contain opacity-50" />
                              </motion.div>
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
  
                  <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col items-start gap-6">
                    <Logo invertText={true} showText={false} className="scale-125 origin-left" />
                    <div className="space-y-2">
                      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-secondary italic">Corporate Identity</div>
                      <h4 className="text-white font-black text-xl leading-tight tracking-tighter uppercase">
                        Port Khalid Cold Stores Co.<br/>
                        Private Limited
                      </h4>
                    </div>
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
              <Logo className="mb-6 scale-90 origin-left" />
              <p className="text-brand-secondary text-[10px] uppercase font-black tracking-[0.3em] mb-4">
                Dockside Cold Chain Excellence Since 1985
              </p>
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

