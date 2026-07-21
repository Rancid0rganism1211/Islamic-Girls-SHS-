import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SCHOOL_IMAGES, SCHOOL_INFO } from "@/lib/schoolImages";

const milestones = [
  { year: "1999", event: "School established by the Suhum Muslim community with seven girls." },
  { year: "Early 2000s", event: "Expanded boarding facilities and introduced new academic programmes." },
  { year: "2008", event: "Science laboratory and ICT centre commissioned." },
  { year: "2017", event: "Broadened the curriculum to include Visual Art alongside four core programmes." },
  { year: "2026", event: "12-Unit classroom block completed; 18-Unit academic complex under construction." },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={SCHOOL_IMAGES.entrance} alt="IGSHS Entrance" className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-heritage-cream font-bold">About IGSHS</h1>
            <p className="text-heritage-cream/70 mt-3 max-w-lg mx-auto">Nurturing excellence through faith, knowledge and character since 1999.</p>
          </div>
        </div>
      </section>

      {/* Our History & Background */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <SectionHeader title="Our History & Background" centered={false} />
              <div className="space-y-4 text-heritage-slate/70 leading-relaxed">
                <p>
                  Islamic Girls Senior High School was established in the year 1999 with a student population of just seven girls. Founded by the Suhum Muslim community, the school was created to support the government in promoting secular education for the Muslim girl child within Suhum and beyond.
                </p>
                <p>
                  What began in a few modest classrooms has grown into a thriving institution offering five academic programmes — General Science/Agric, Business, Home Economics, General Arts and Visual Art — supported by science laboratories, an ICT centre, a mosque, a clinic and secure boarding facilities.
                </p>
                <p>
                  Guided by our motto <span className="font-semibold text-heritage-gold">"True Knowledge & Character"</span>, we continue to mould confident, knowledgeable and morally upright young women prepared for higher education and meaningful adult life.
                </p>
              </div>
            </div>
            <div className="h-[480px] overflow-hidden rounded-2xl shadow-lg">
              <img src={SCHOOL_IMAGES.signboard} alt="IGSHS Signboard" className="w-full h-full object-cover object-top scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values */}
      <section className="py-16 md:py-24 geo-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Vision, Mission & Core Values" subtitle="The principles that guide everything we do at IGSHS." />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, title: "Our Vision", text: "Moulding girls to be globally competitive in a conducive learning environment with Islamic tenets." },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: "Our Mission", text: "Give every girl holistic education for a meaningful adult life." },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"/></svg>, title: "Core Values", text: "Piety, Hardwork, Integrity, Innovation, and Academic Excellence." },
            ].map((card) => (
              <div key={card.title} className="p-8 bg-white rounded-2xl border-2 border-heritage-green/15 hover:border-heritage-gold/40 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-heritage-gold/15 rounded-full flex items-center justify-center mb-4">{card.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-heritage-green mb-3">{card.title}</h3>
                <p className="text-heritage-slate/70 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crest & Motto */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-heritage-cream p-8 rounded-2xl shadow-lg border border-heritage-green/5">
            <img src={SCHOOL_IMAGES.logo} alt="IGSHS School Crest" className="w-28 h-28 mx-auto object-contain mb-4" />
            <h3 className="font-heading text-xl font-semibold text-heritage-green">School Motto</h3>
            <p className="text-heritage-gold font-heading text-xl italic mt-2">"True Knowledge & Character"</p>
            <p className="text-sm text-heritage-slate/50 mt-3">Established 1999 · Suhum, Eastern Region, Ghana</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-heritage-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Journey" subtitle="Key milestones in the growth of IGSHS Suhum." />
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-heritage-green flex items-center justify-center text-heritage-cream text-xs font-bold shrink-0">
                    {m.year.slice(-2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-heritage-green/20 my-1" />}
                </div>
                <div className="pb-8">
                  <p className="text-sm font-semibold text-heritage-gold">{m.year}</p>
                  <p className="text-heritage-slate/70 mt-1">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}