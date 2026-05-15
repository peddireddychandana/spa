import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Hair Styling", icon: "✂️", desc: "Expert cuts & colour treatments", price: "From AED 150" },
  { name: "Makeup & Beauty", icon: "✨", desc: "Flawless looks for every occasion", price: "From AED 250" },
  { name: "Spa & Massage", icon: "💆", desc: "Therapeutic massages & relaxation", price: "From AED 350" },
  { name: "Skincare", icon: "🧴", desc: "Advanced facials & skin rituals", price: "From AED 300" },
  { name: "Nail Care", icon: "💅", desc: "Luxurious manicure & pedicure", price: "From AED 120" },
  { name: "Bridal Packages", icon: "💍", desc: "Complete bridal transformations", price: "From AED 800" },
];

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "K+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Expert Therapists" },
  { value: 200, suffix: "+", label: "Services Offered" },
];

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    gsap.to(ref.current, {
      innerText: value,
      duration: 2,
      ease: "power2.out",
      snap: { innerText: 1 },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(Number(ref.current.textContent || "0")).toString();
        }
      },
    });
  }, [inView, value]);

  return <span ref={ref}>0</span>;
}

function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(titleRef.current, { y: 80, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.2 })
      .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .fromTo(ctaRef.current?.children ?? [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 }, "-=0.4");
    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2000)", opacity: 0.35 }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-3xl">
          <p className="text-amber-400 tracking-[0.3em] text-sm font-medium mb-6">SPA PRDTR</p>
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-white leading-[1.1] mb-6">
            Where Luxury
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Meets Serenity</span>
          </h1>
          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
            Indulge in world-class treatments crafted to rejuvenate your body, mind, and spirit.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-full text-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300">
              Book Appointment
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full text-lg hover:bg-white/10 transition-all duration-300">
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-400 tracking-[0.2em] text-sm font-medium mb-4"
          >
            OUR SERVICES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Premium Spa & Beauty
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            From revitalising facials to expert hairstyling, every treatment is tailored to you.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.06] hover:border-amber-500/30 transition-all duration-500"
            >
              <span className="text-4xl block mb-4">{s.icon}</span>
              <h3 className="text-xl font-semibold text-white mb-2">{s.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{s.desc}</p>
              <span className="text-amber-400 font-medium text-sm">{s.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
              <AnimatedCounter value={s.value} />
              <span>{s.suffix}</span>
            </div>
            <p className="text-gray-400 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  { text: "The best spa experience I've ever had. The attention to detail was incredible.", name: "Sarah M.", role: "Regular Client" },
  { text: "My wedding hair and makeup were absolutely flawless. Thank you for making my day perfect!", name: "Priya K.", role: "Bride" },
  { text: "Their massage therapy transformed my chronic back pain. I'm a believer for life.", name: "Ahmed R.", role: "Fitness Enthusiast" },
];

function TestimonialsSection() {
  return (
    <section className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-400 tracking-[0.2em] text-sm font-medium mb-4"
          >
            TESTIMONIALS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            What Our Clients Say
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8"
            >
              <p className="text-gray-300 mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-amber-400 tracking-[0.3em] text-sm font-medium mb-2">SPA PRDTR</p>
        <p className="text-gray-500 text-sm">Experience the art of relaxation.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
