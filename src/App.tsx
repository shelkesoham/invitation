import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Volume2, VolumeX, MapPin, Calendar, Clock, Share2, 
  Download, Heart, MessageCircle, Navigation, Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas-pro';

const SECTIONS = [
  { id: 'home', label: 'मुख्यपृष्ठ' },
  { id: 'invitation', label: 'निमंत्रण' },
  { id: 'schedule', label: 'कार्यक्रम' },
];

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveInvitation = async () => {
    if (!cardRef.current) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1c1917',
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'ganpati-invitation.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Image save failed', err);
      alert('फोटो जतन करताना अडचण आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    // Confetti on load
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFA500', '#FFD700', '#FF4500']
    });

    // Countdown Logic (Target: Approx next Ganesh Chaturthi)
    const targetDate = new Date('2026-09-14T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      if (isMuted) audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="bg-stone-900 text-stone-100 min-h-screen font-sans selection:bg-amber-500/30">
      {/* Audio Element */}
      <audio ref={audioRef} loop muted={isMuted}>
        {/* Placeholder for actual Aarti audio */}
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Audio Toggle */}
      <button 
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/50 text-amber-500 hover:bg-amber-500/40 transition-all"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-950/80 backdrop-blur-xl border border-amber-900/50 px-6 py-3 rounded-full flex gap-6">
        {SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`} className="text-amber-200/60 hover:text-amber-400 transition-colors text-sm uppercase tracking-widest font-medium">
            {s.label}
          </a>
        ))}
      </nav>

      {/* 1. Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-stone-900/90 z-10 pointer-events-none" />
        
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay" />

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-20 text-center px-6"
        >
          <div className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-8 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.3)] overflow-hidden">
             <img
               src="/ganpati-bappa.jpg"
               alt="श्री गणेश"
               className="w-full h-full object-cover"
             />
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-600 mb-6 font-serif">
            गणपती बाप्पा मोरया!
          </h1>
          <p className="text-lg md:text-2xl text-amber-100/80 font-light tracking-wide max-w-2xl mx-auto">
            श्री गणेशाच्या आशीर्वादासाठी आपणास सादर आमंत्रण
          </p>
        </motion.div>

        {/* Floating Petals Animation */}
        <FloatingPetals />
      </section>

      {/* 2. Invitation Card Section */}
      <section id="invitation" className="relative py-24 px-6 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full mx-auto relative"
        >
          {/* Glassmorphism Card */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-red-900/10 blur-3xl -z-10" />
          <div ref={cardRef} className="bg-stone-900/40 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-8 md:p-16 text-center shadow-2xl">

            <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-amber-500/50 overflow-hidden">
               <img src="/host-image.jpeg" alt="यजमान" className="w-full h-full object-cover" />
            </div>
            
            <p className="text-amber-500 uppercase tracking-widest text-sm font-semibold mb-2">यजमान</p>
            <h2 className="text-3xl md:text-4xl text-amber-50 mb-8 font-serif">श्री जनार्दन शेळके व परिवार</h2>

            <div className="w-24 h-[1px] bg-amber-500/30 mx-auto mb-8" />

            <p className="text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl mx-auto font-light mb-12">
              अत्यंत आनंदाने आणि भक्तिभावाने,<br />
              आम्ही आपणास व आपल्या परिवारास<br />
              श्री गणेशाच्या आशीर्वादासाठी<br />
              आमच्या गणेशोत्सव सोहळ्यात<br />
              सहभागी होण्याचे सादर निमंत्रण देत आहोत.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-amber-100/80">
              <div className="flex flex-col items-center gap-3">
                <Calendar className="text-amber-500" size={28} />
                <span>१४ सप्टेंबर २०२६</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Clock className="text-amber-500" size={28} />
                <span>सकाळची पूजा: सकाळी ९:००</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <MapPin className="text-amber-500" size={28} />
                <span>शेळके निवास, मुंबई</span>
              </div>
            </div>

            <div data-html2canvas-ignore className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 px-6 py-3 rounded-full font-medium transition-colors">
                <MapPin size={18} /> नकाशात पहा
              </button>
              <button
                onClick={saveInvitation}
                disabled={isSaving}
                className="flex items-center gap-2 border border-amber-500/50 hover:bg-amber-500/10 text-amber-500 px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50"
              >
                <Download size={18} /> {isSaving ? 'जतन करत आहे...' : 'फोटो जतन करा'}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 border-y border-amber-900/30 bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl text-amber-500 mb-10 font-serif">बाप्पाच्या आगमनाची प्रतीक्षा</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center w-20 md:w-28">
                <div className="text-4xl md:text-6xl font-light text-amber-100 mb-2 font-mono">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-amber-600/80">{({ days: 'दिवस', hours: 'तास', minutes: 'मिनिटे', seconds: 'सेकंद' } as Record<string, string>)[unit]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Program Schedule */}
      <section id="schedule" className="py-24 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-amber-400 mb-16">कार्यक्रम पत्रिका</h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-amber-500/30 before:to-transparent">
            {[
              { time: "सकाळी ९:००", title: "पूजा", desc: "भक्तिभावाने दिवसाची सुरुवात." },
              { time: "दुपारी १:००", title: "आरती", desc: "मध्यान्ह आरती." },
              { time: "दुपारी १:३०", title: "भोजन", desc: "महाप्रसादाचा लाभ घ्या." },
              { time: "सायंकाळी ६:००", title: "आरती", desc: "सायंकाळची आरती." },
              { time: "रात्री ९:००", title: "भजन", desc: "भक्तिगीतांची स्वरमयी संध्या." },
            ].map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
              >
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-stone-900 bg-amber-500 text-stone-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Clock size={16} />
                </div>
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-stone-900/50 backdrop-blur-sm border border-amber-900/30 p-6 rounded-2xl hover:border-amber-500/50 transition-colors">
                  <div className="text-amber-500 text-sm font-bold mb-1">{event.time}</div>
                  <h4 className="text-xl text-stone-100 font-medium mb-2">{event.title}</h4>
                  <p className="text-stone-400 text-sm">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-amber-900/30 text-center bg-stone-950 pb-24 md:pb-12">
        <h2 className="text-2xl font-serif text-amber-500 mb-4">गणपती बाप्पा मोरया!</h2>
        <p className="text-stone-500 text-sm flex items-center justify-center gap-2">
          उत्सवासाठी <Heart size={14} className="text-red-500" /> ने बनवले
        </p>
      </footer>
    </div>
  );
}

// Simple floating petals background component
function FloatingPetals() {
  const petals = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            rotate: 0,
            opacity: Math.random() * 0.5 + 0.3
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            x: `calc(${Math.random() * 100}vw)`,
            rotate: 360
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-4 h-4 bg-red-500/40 rounded-full blur-[1px]"
          style={{
            borderRadius: '0 50% 50% 50%',
            transformOrigin: 'center'
          }}
        />
      ))}
    </div>
  );
}
