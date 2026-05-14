import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  ChevronDown, 
  ArrowRight,
  ExternalLink,
  Bot,
  Warehouse,
  Thermometer,
  ShieldCheck,
  Zap,
  Phone
} from "lucide-react";
import { chatWithGemini, notifyLogistics, Message } from "../services/api";

const WA_LINK = "https://wa.me/971522933852";
const WA_MSG = "Hello Port Khalid Cold Stores, I would like to inquire about cold storage services.";

const FAQ_CHIPS = [
  "Storage Rates",
  "Temperature Zones",
  "Facility Location",
  "Daily Operations"
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to Port Khalid Cold Stores. I am the AI Logistics Assistant. How may I assist your business today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInquirySummary, setShowInquirySummary] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const data = await chatWithGemini([...messages, userMsg]);
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
      
      // Heuristic for lead capture completion
      if (data.content.toLowerCase().includes("whatsapp") || messages.length > 6) {
        setShowInquirySummary(true);
        // Silently notify the backend to send an email if it's a long conversation
        notifyLogistics({ summary: [...messages, userMsg, { role: "assistant", content: data.content }].map(m => `${m.role}: ${m.content}`).join("\n") });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I encountered a technical error. Please reach us at +971 6 528 1796 for immediate support." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    window.open(`${WA_LINK}?text=${encodeURIComponent(WA_MSG)}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto bg-white w-full sm:w-[380px] h-[550px] max-h-[80vh] rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-slate-100"
          >
            {/* Enterprise Header */}
            <div className="bg-[#0D2B3E] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00A3B5] rounded-xl flex items-center justify-center text-white shadow-xl shadow-[#00A3B5]/20">
                  <Warehouse size={22} />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-[0.2em] leading-none mb-1">PKCS Assistant</h3>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Active Ops</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
                aria-label="Minimize"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed font-medium shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#0D2B3E] text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              {showInquirySummary && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#00A3B5]/5 border border-[#00A3B5]/20 p-5 rounded-2xl space-y-4"
                >
                  <div className="flex items-center gap-2 text-[#00A3B5]">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Inquiry Registered</span>
                  </div>
                  <p className="text-xs font-bold text-[#0D2B3E] leading-relaxed">
                    A technical specialist is monitoring this session. For instant coordination, please escalate to our WhatsApp Business desk.
                  </p>
                  <button 
                    onClick={handleWhatsAppRedirect}
                    className="w-full bg-[#00A3B5] hover:bg-[#0D2B3E] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00A3B5]/20"
                  >
                    <ExternalLink size={14} />
                    Continue on WhatsApp
                  </button>
                </motion.div>
              )}
            </div>

            {/* Quick Chips */}
            <div className="px-6 py-3 bg-white border-t border-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
              {FAQ_CHIPS.map(chip => (
                <button
                  key={chip}
                  disabled={isTyping}
                  onClick={() => handleSend(chip)}
                  className="whitespace-nowrap px-3 py-1.5 bg-slate-50 hover:bg-[#00A3B5]/10 text-slate-500 hover:text-[#00A3B5] border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-6 bg-white border-t border-slate-100">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex gap-2"
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire about logistics..."
                  className="flex-1 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-xs font-bold outline-none focus:border-[#00A3B5] transition-colors"
                  disabled={isTyping}
                />
                <button 
                   type="submit"
                   disabled={!input.trim() || isTyping}
                   className="bg-[#0D2B3E] hover:bg-[#00A3B5] text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-16 h-16 rounded-[2rem] bg-[#0D2B3E] text-white shadow-2xl flex items-center justify-center transition-all hover:bg-[#00A3B5] relative group"
        aria-label="Toggle Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
           <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00A3B5] rounded-full border-2 border-[#0D2B3E] animate-pulse" />
        )}

        <div className="absolute right-full mr-4 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
           <span className="text-[10px] font-black uppercase tracking-widest text-[#0D2B3E]">Chat with AI Desk</span>
        </div>
      </motion.button>
    </div>
  );
};
