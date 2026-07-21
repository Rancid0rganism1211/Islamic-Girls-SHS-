import React, { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 bg-heritage-green geo-pattern flex items-center justify-center text-center px-4">
        <div className="relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl text-heritage-cream font-bold">Contact Us</h1>
          <div className="golden-thread max-w-24 mx-auto my-4" />
          <p className="text-heritage-cream/70 max-w-lg mx-auto">We&rsquo;re here to help. Reach out with any questions about admissions, academics, or school life.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <SectionHeader title="Get In Touch" centered={false} />
              <div className="space-y-5">
                {[
                  { 
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                    label: "Address", value: "P.O. Box 45, Suhum\nEastern Region, Ghana"
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                    label: "Phone", value: "+233 24 400 0000", href: "tel:+233244000000"
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
                    label: "Email", value: "igshs1999@gmail.com", href: "mailto:igshs1999@gmail.com"
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
                    label: "GPS Address", value: "GD-ES0142-4816"
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-heritage-green/5">
                    <div className="w-10 h-10 rounded-full bg-heritage-green/10 flex items-center justify-center shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-heritage-slate">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-heritage-green hover:text-heritage-gold transition-colors">{c.value}</a>
                      ) : (
                        <p className="text-sm text-heritage-slate/60 whitespace-pre-line">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Hours */}
              <div className="p-5 bg-heritage-gold/5 rounded-xl border border-heritage-gold/20">
                <h3 className="font-heading font-semibold text-heritage-slate mb-3">Office Hours</h3>
                <div className="space-y-1.5 text-sm text-heritage-slate/70">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium text-heritage-slate">8:00 AM – 4:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-medium text-heritage-slate">9:00 AM – 12:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-heritage-slate/40">Closed</span></div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-heritage-green/5 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-heritage-green/10 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-heritage-slate">Message Sent!</h3>
                    <p className="text-heritage-slate/60 mt-2">Thank you for reaching out. We'll get back to you soon.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="mt-6 px-6 py-2.5 bg-heritage-green text-heritage-cream rounded-lg text-sm font-medium hover:bg-heritage-green/90 transition-colors">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading text-xl font-semibold text-heritage-slate mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-heritage-slate mb-1.5">Full Name</label>
                          <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 border border-heritage-green/15 rounded-lg focus:outline-none focus:border-heritage-gold focus:ring-1 focus:ring-heritage-gold/30 bg-heritage-cream/50" placeholder="Your full name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-heritage-slate mb-1.5">Email Address</label>
                          <input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 border border-heritage-green/15 rounded-lg focus:outline-none focus:border-heritage-gold focus:ring-1 focus:ring-heritage-gold/30 bg-heritage-cream/50" placeholder="your@email.com" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-heritage-slate mb-1.5">Subject</label>
                        <input type="text" required value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} className="w-full px-4 py-2.5 border border-heritage-green/15 rounded-lg focus:outline-none focus:border-heritage-gold focus:ring-1 focus:ring-heritage-gold/30 bg-heritage-cream/50" placeholder="What is this about?" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-heritage-slate mb-1.5">Message</label>
                        <textarea required rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full px-4 py-2.5 border border-heritage-green/15 rounded-lg focus:outline-none focus:border-heritage-gold focus:ring-1 focus:ring-heritage-gold/30 bg-heritage-cream/50 resize-none" placeholder="Type your message here..." />
                      </div>
                      <button type="submit" className="w-full py-3 bg-heritage-green text-heritage-cream font-semibold rounded-lg hover:bg-heritage-green/90 transition-colors">
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-64 md:h-80 bg-heritage-green/5 flex items-center justify-center">
        <div className="text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="1.5" className="mx-auto mb-3 opacity-30">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <p className="text-heritage-slate/40 text-sm">Suhum, Eastern Region, Ghana</p>
        </div>
      </section>
    </>
  );
}