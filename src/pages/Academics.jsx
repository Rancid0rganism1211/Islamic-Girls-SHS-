import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SCHOOL_IMAGES } from "@/lib/schoolImages";

const programs = [
  {
    name: "General Science",
    icon: "🔬",
    color: "#123E30",
    img: SCHOOL_IMAGES.scienceLab,
    subjects: ["Biology", "Chemistry", "Physics", "Elective Mathematics", "Agric Science", "ICT"],
    description: "Our General Science programme equips students with analytical and laboratory skills for the sciences. With well-equipped labs and dedicated faculty, students are prepared for competitive university science and agricultural programmes.",
    careers: ["Medicine", "Engineering", "Pharmacy", "Agriculture", "Research", "Technology"]
  },
  {
    name: "Business",
    icon: "📊",
    color: "#d63031",
    img: SCHOOL_IMAGES.ictLab,
    subjects: ["Financial Accounting", "Business Management", "Economics", "Cost Accounting", "Elective Mathematics"],
    description: "Our Business programme develops future entrepreneurs and financial leaders. Students master accounting, economics and business strategy, building the foundation for success in commerce and industry.",
    careers: ["Accounting", "Banking", "Entrepreneurship", "Business Management", "Economics"]
  },
  {
    name: "Home Economics",
    icon: "🏠",
    color: "#C5A059",
    img: SCHOOL_IMAGES.scienceStudents,
    subjects: ["Food & Nutrition", "Clothing & Textiles", "Management in Living", "General Knowledge in Art", "Chemistry"],
    description: "Home Economics combines practical skills with scientific knowledge. Students learn nutrition science, textile design and resource management, preparing them for careers in hospitality, food science and fashion.",
    careers: ["Nutrition & Dietetics", "Hospitality", "Fashion Design", "Food Science", "Catering"]
  },
  {
    name: "General Arts",
    icon: "📖",
    color: "#0984e3",
    img: SCHOOL_IMAGES.ictLabPic,
    subjects: ["Literature in English", "Government", "History", "Islamic Studies", "Economics", "Elective Mathematics"],
    description: "Our General Arts programme develops critical thinkers and articulate communicators. Students explore humanities, social sciences and Islamic scholarship, preparing them for careers in law, journalism, education and public service.",
    careers: ["Law", "Journalism", "Education", "Diplomacy", "Social Work"]
  },
  {
    name: "Visual Art",
    icon: "🎨",
    color: "#e84393",
    img: SCHOOL_IMAGES.classroom12Unit,
    subjects: ["Graphic Design", "Picture Making", "Ceramics", "Sculpture", "General Knowledge in Art"],
    description: "Our Visual Art programme nurtures creative expression and design thinking. Students develop technical skills across multiple media, building portfolios for careers in fine art, design, advertising and creative industries.",
    careers: ["Graphic Design", "Fine Art", "Architecture", "Advertising", "Creative Industry"]
  }
];

const facilities = [
  { name: "Science Laboratories", desc: "Fully equipped biology, chemistry, and physics labs for practical learning." },
  { name: "ICT Center", desc: "Modern computer lab with internet access for digital literacy." },
  { name: "School Library", desc: "Well-stocked library with textbooks, references, and reading materials." },
  { name: "Boarding Facilities", desc: "Clean, secure dormitories with house parent supervision." },
  { name: "Sports Grounds", desc: "Dedicated fields and courts for physical education and recreation." },
  { name: "Mosque & Prayer Hall", desc: "Beautiful mosque for daily prayers and Islamic education." },
];

export default function Academics() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={SCHOOL_IMAGES.scienceStudents} alt="IGSHS students in lab coats" className="absolute inset-0 w-full h-full object-cover filter contrast-[1.02] saturate-[1.03] brightness-[0.98]" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-heritage-cream font-bold">Academic Programmes</h1>
            <p className="text-heritage-cream/70 mt-3 max-w-lg mx-auto">Five pathways to your future, grounded in excellence and guided by faith.</p>
          </div>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {programs.map((p, i) => (
            <div key={p.name} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
              <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{p.icon}</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heritage-slate">{p.name}</h2>
                </div>
                <div className="golden-thread max-w-16 mb-6" />
                <p className="text-heritage-slate/70 leading-relaxed mb-6">{p.description}</p>

                {/* Subjects */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-heritage-slate/50 uppercase tracking-wider mb-3">Core & Elective Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {p.subjects.map((s) => (
                      <span key={s} className="px-3 py-1.5 text-sm rounded-full border" style={{ borderColor: p.color + "30", color: p.color, backgroundColor: p.color + "08" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Careers */}
                <div>
                  <h4 className="text-sm font-semibold text-heritage-slate/50 uppercase tracking-wider mb-3">Career Pathways</h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {p.careers.map((c) => (
                      <span key={c} className="text-sm text-heritage-slate/60">• {c}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual Card */}
              <div className={`rounded-2xl overflow-hidden border-2 ${i % 2 !== 0 ? "lg:order-1" : ""}`} style={{ borderColor: p.color + "20" }}>
                <div className="h-48 md:h-56 relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.name} programme`}
                    className="w-full h-full object-cover filter contrast-[1.02] saturate-[1.03] brightness-[0.98] transition-all duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0" style={{ backgroundColor: p.color + "20" }} />
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-sm font-semibold" style={{ color: p.color }}>{p.name}</span>
                  </div>
                  <p className="text-sm text-heritage-slate/60">
                    {p.subjects.length} subjects • Multiple career paths • WASSCE preparation
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facility Spotlights */}
      <section className="py-16 md:py-24 bg-heritage-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Facilities" subtitle="Modern resources to support your academic journey." />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-xl border border-emerald-950/10">
                <img src={SCHOOL_IMAGES.scienceLab} alt="Science laboratory" className="w-full h-full object-cover object-center scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]" />
              </div>
              <p className="text-heritage-slate/70 mt-4 text-center italic">"Hands-on practical training in our General Science laboratory."</p>
            </div>
            <div>
              <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-xl border border-emerald-950/10">
                <img src={SCHOOL_IMAGES.ictLab} alt="ICT laboratory" className="w-full h-full object-cover object-center scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98]" />
              </div>
              <p className="text-heritage-slate/70 mt-4 text-center italic">"Modern digital literacy and computing center."</p>
            </div>
          </div>

          {/* Additional Facilities */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {facilities.map((f) => (
              <div key={f.name} className="p-6 bg-white rounded-xl border border-heritage-green/5">
                <h3 className="font-heading text-lg font-semibold text-heritage-green mb-2">{f.name}</h3>
                <p className="text-sm text-heritage-slate/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}