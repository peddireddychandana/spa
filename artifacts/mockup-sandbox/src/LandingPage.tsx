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

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
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
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2 },
    )
      .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .fromTo(ctaRef.current?.children ?? [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 }, "-=0.4")
      .fromTo(imageRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 }, "-=1.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      <div ref={imageRef} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2000)", opacity: 0.35 }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-3xl">
          <p className="text-amber-400 tracking-[0.3em] text-sm font-medium mb-6" style={{ opacity: 0 }}>SPA PRDTR</p>
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-amber-400 tracking-[0.2em] text-sm font-medium mb-4">OUR SERVICES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience Excellence</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From revitalizing facials to expert styling, every service is crafted with precision and passion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] rounded-3xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-500"
            >
              <span className="text-4xl mb-5 block">{s.icon}</span>
              <h3 className="text-xl font-semibold text-white mb-2">{s.name}</h3>
              <p className="text-gray-400 mb-4 text-sm">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-semibold">{s.price}</span>
                <span className="text-white/30 group-hover:text-amber-400 transition-colors duration-300 text-sm">Learn more →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#111] to-[#0d0d0d]" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, #f59e0b 0%, transparent 50%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
                {s.suffix}
              </div>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    { text: "Absolutely divine experience. The attention to detail and the serene atmosphere made my day unforgettable.", name: "Sarah M.", title: "Bridal Client" },
    { text: "Best facial I've ever had. My skin has never looked this radiant. The therapists are true artists.", name: "Layla K.", title: "Regular Client" },
    { text: "From the moment I walked in, I felt like royalty. The bridal package exceeded every expectation.", name: "Aisha R.", title: "Bridal Client" },
  ];

  return (
    <section className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400 tracking-[0.2em] text-sm font-medium mb-4">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">What Our Clients Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/[0.04] rounded-3xl p-8 border border-white/10"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content > *",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-black to-amber-900/20" />
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1540555700478-4be289fbec6d?q=80&w=2000)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center cta-content">
        <p className="text-amber-400 tracking-[0.2em] text-sm font-medium mb-4">BEGIN YOUR JOURNEY</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to Indulge?</h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          Book your appointment today and discover the art of true relaxation.
        </p>
        <button className="px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-full text-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300">
          Book Now
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="text-amber-400 font-bold text-lg mb-4">SPA PRDTR</p>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed">
            Where luxury meets serenity. Experience world-class treatments in an atmosphere of pure tranquility.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold mb-4 text-sm">Quick Links</p>
          <div className="space-y-2">
            {["Services", "Bridal", "Gallery", "Contact"].map((l) => (
              <p key={l} className="text-gray-500 text-sm hover:text-amber-400 cursor-pointer transition-colors">{l}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-white font-semibold mb-4 text-sm">Contact</p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>📞 +971 9000243600</p>
            <p>✉️ hello@spaprdtr.ae</p>
            <p>📍 Dubai, UAE</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
        © 2026 Spa PRDTR. All rights reserved.
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
