import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbEntities } from '@/lib/firestore';

import SectionHeader from "@/components/shared/SectionHeader";
import AnnouncementBlock from "@/components/shared/AnnouncementBlock";
import EventsTicker from "@/components/shared/EventsTicker";
import PremiumImage from "@/components/shared/PremiumImage";
import { SCHOOL_IMAGES, SCHOOL_INFO } from "@/lib/schoolImages";

const programs = [
  { name: "General Science", icon: "🔬", desc: "Biology, Chemistry, Physics & Agric Science for future scientists and medical professionals." },
  { name: "Business", icon: "📊", desc: "Accounting, Economics and Business Management for tomorrow's entrepreneurs." },
  { name: "Home Economics", icon: "🏠", desc: "Food & Nutrition, Clothing & Textiles and Management in Living." },
  { name: "General Arts", icon: "📖", desc: "Literature, Government, History and Islamic Studies for well-rounded thinkers." },
  { name: "Visual Art", icon: "🎨", desc: "Creative expression through visual arts, design and practical artistry." },
];

const stats = [
  { num: "1999", label: "Year Established" },
  { num: "5", label: "Learning Areas" },
  { num: "25+", label: "Years of Service" },
  { num: "1st Sat", label: "Visiting Day" },
];

export default function Home() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    dbEntities.SiteSetting.list()
      .then((items) => {
        const map = {};
        items.forEach((s) => { map[s.setting_key] = s.setting_value; });
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <EventsTicker />

      {/* Hero Section — Entrance background */}
      <section className="relative w-full min-h-[550px] overflow-hidden">
        <img
          src={SCHOOL_IMAGES.entrance}
          alt="IGSHS Main Entrance"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 to-emerald-900/75 backdrop-blur-[1px]" />
        <div className="relative z-10 min-h-[550px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <p className="text-heritage-gold text-sm font-semibold tracking-widest uppercase mb-4">IGSHS since 1999 · Suhum, Eastern Region</p>
              <h1 className="font-heading text-3xl md:text-5xl text-heritage-cream font-bold leading-tight">
                Moulding Girls to be Globally Competitive in a Conducive Learning Environment with Islamic Tenets
              </h1>
              <div className="golden-thread max-w-20 mt-6 mb-6" />
              <p className="text-heritage-cream/80 text-lg leading-relaxed">
                {settings.welcome_message || "Welcome to Islamic Girls Senior High School, Suhum. Giving every girl holistic education for a meaningful adult life."}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/academics" className="px-7 py-3.5 bg-heritage-gold text-heritage-green font-semibold rounded-lg hover:bg-heritage-gold/90 transition-all hover:shadow-lg">
                  Explore Programs
                </Link>
                <Link to="/contact" className="px-7 py-3.5 border-2 border-heritage-cream/40 text-heritage-cream font-medium rounded-lg hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-heritage-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-heritage-green">{s.num}</p>
                <p className="text-sm text-heritage-slate/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Heritage & Background */}
      <section className="py-16 md:py-24 geo-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <SectionHeader title="Our History & Background" centered={false} />
              <p className="text-heritage-slate/70 leading-relaxed mb-4">
                Islamic Girls Senior High School was established in the year 1999 with a student population of just seven girls. Founded by the Suhum Muslim community, the school was created to support the government in promoting secular education for the Muslim girl child within Suhum and beyond.
              </p>
              <p className="text-heritage-slate/70 leading-relaxed mb-6">
                From those humble beginnings, IGSHS has grown into a vibrant institution offering five academic programmes, with modern classrooms, science laboratories, an ICT centre and secure boarding facilities — all grounded in our motto: <span className="font-semibold text-heritage-gold">"True Knowledge & Character."</span>
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-heritage-green font-semibold hover:text-heritage-gold transition-colors">
                Read Our Full Story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
            <div className="h-[480px] overflow-hidden rounded-2xl shadow-lg">
              <img
                src={SCHOOL_IMAGES.signboard}
                alt="IGSHS Signboard with official programmes and contact"
                className="w-full h-full object-cover object-top scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Vision, Mission & Core Values" subtitle="The guiding principles behind everything we do." />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, title: "Our Vision", text: "Moulding girls to be globally competitive in a conducive learning environment with Islamic tenets." },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: "Our Mission", text: "Give every girl holistic education for a meaningful adult life." },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/></svg>, title: "Core Values", text: "Piety, Hardwork, Integrity, Innovation, and Academic Excellence." },
            ].map((card) => (
              <div key={card.title} className="p-8 bg-heritage-cream rounded-2xl border-2 border-heritage-green/15 hover:border-heritage-gold/40 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-heritage-gold/15 rounded-full flex items-center justify-center mb-4">{card.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-heritage-green mb-3">{card.title}</h3>
                <p className="text-heritage-slate/70 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-16 md:py-24 bg-heritage-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Learning Areas" subtitle="Providing strong academic foundations across diverse fields of study." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {programs.map((p) => (
              <div key={p.name} className="group p-6 bg-white rounded-xl border border-heritage-green/5 hover:border-heritage-gold/30 hover:shadow-lg transition-all">
                <span className="text-3xl block mb-4">{p.icon}</span>
                <h3 className="font-heading text-lg font-semibold text-heritage-slate mb-2">{p.name}</h3>
                <p className="text-sm text-heritage-slate/60 leading-relaxed">{p.desc}</p>
                <Link to="/academics" className="inline-flex items-center gap-1 text-sm text-heritage-green font-medium mt-4 group-hover:text-heritage-gold transition-colors">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Infrastructure */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Growing Campus Infrastructure" subtitle="Investing in modern spaces for teaching and learning." />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Card A — 12 Unit Classroom */}
            <div>
              <div className="w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl shadow-xl border border-emerald-950/10">
                <img
                  src={SCHOOL_IMAGES.classroom12Unit}
                  alt="Modern 12-Unit Classroom Block"
                  className="w-full h-full object-cover object-center scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]"
                />
              </div>
              <div className="mt-6">
                <span className="inline-block px-3 py-1 bg-heritage-green/10 text-heritage-green text-xs font-semibold rounded-full mb-3">Newly Completed</span>
                <h3 className="font-heading text-xl font-semibold text-heritage-slate mb-2">Modern 12-Unit Classroom Block</h3>
                <p className="text-heritage-slate/70 leading-relaxed">
                  Our newly completed academic block, built to offer spacious, comfortable learning environments for our students.
                </p>
              </div>
            </div>
            {/* Card B — Ongoing 18 Unit */}
            <div>
              <div className="h-[450px] overflow-hidden rounded-2xl shadow-xl border border-emerald-950/10">
                <img
                  src={SCHOOL_IMAGES.classroom18Unit}
                  alt="Ongoing 18-Unit Academic Complex"
                  className="w-full h-full object-cover object-center scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]"
                />
              </div>
              <div className="mt-6">
                <span className="inline-block px-3 py-1 bg-heritage-gold/15 text-heritage-gold text-xs font-semibold rounded-full mb-3">Ongoing Project</span>
                <h3 className="font-heading text-xl font-semibold text-heritage-slate mb-2">Ongoing 18-Unit Academic Complex</h3>
                <p className="text-heritage-slate/70 leading-relaxed">
                  An expansive multi-story classroom project currently under construction to meet the needs of our growing student body.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Discipline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Instilling Discipline and Leadership" subtitle="Building confident, responsible young women through our cadet corps." />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <PremiumImage src={SCHOOL_IMAGES.cadet1} alt="IGSHS cadet leader" containerClassName="h-[400px]" />
              <div className="mt-6">
                <h3 className="font-heading text-xl font-semibold text-heritage-green mb-2">Individual Leadership</h3>
                <p className="text-heritage-slate/70 leading-relaxed">
                  Our Cadet leadership structures cultivate personal responsibility, resilience, and confidence in our young women.
                </p>
              </div>
            </div>
            <div>
              <PremiumImage src={SCHOOL_IMAGES.cadet} alt="IGSHS cadet battalion" containerClassName="h-[400px]" />
              <div className="mt-6">
                <h3 className="font-heading text-xl font-semibold text-heritage-green mb-2">The Battalion</h3>
                <p className="text-heritage-slate/70 leading-relaxed">
                  Through coordinated drill execution, our student cadet corps builds a strong sense of unity, teamwork, and civic pride.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Block */}
      <div className="bg-heritage-cream">
        <AnnouncementBlock />
      </div>

      {/* Placement CTA Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={SCHOOL_IMAGES.entrance} alt="IGSHS Campus" className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-heritage-cream font-bold mb-3">Ready to Begin Your Journey?</h2>
            <p className="text-heritage-cream/70 mb-6 max-w-lg mx-auto">Check your CSSPS placement and take the first step towards a transformative education at IGSHS.</p>
            <Link to="/admissions#placement" className="px-8 py-3.5 bg-heritage-gold text-heritage-green font-semibold rounded-lg hover:bg-heritage-gold/90 transition-all inline-block">
              Check Placement Now
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Get In Touch" subtitle="We'd love to hear from you. Reach out with any questions about admissions or school life." />
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Visit Us", value: "Suhum, Eastern Region, Ghana" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>, label: "Email Us", value: SCHOOL_INFO.email },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, label: "Call Us", value: SCHOOL_INFO.phone },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>, label: "GPS Address", value: SCHOOL_INFO.gps },
            ].map((c) => (
              <div key={c.label} className="text-center p-6 rounded-xl bg-heritage-cream/50">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-heritage-green/10 flex items-center justify-center">{c.icon}</div>
                <p className="font-heading font-semibold text-heritage-slate">{c.label}</p>
                <p className="text-sm text-heritage-slate/60 mt-1 break-words">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}