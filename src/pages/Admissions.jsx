import React, { useState, useEffect, useRef } from "react";
import { dbEntities } from '@/lib/firestore';

import SectionHeader from "@/components/shared/SectionHeader";
import PlacementForm from "@/components/placement/PlacementForm";
import PlacementResult from "@/components/placement/PlacementResult";
import PlacementSuccess from "@/components/placement/PlacementSuccess";
import AdmissionSlip from "@/components/placement/AdmissionSlip";
import ProspectusDocument from "@/components/placement/ProspectusDocument";

export default function Admissions() {
  const [step, setStep] = useState("input");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [indexNumber, setIndexNumber] = useState("");
  const [houseData, setHouseData] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [showProspectusPrint, setShowProspectusPrint] = useState(false);
  const [settings, setSettings] = useState({});
  const portalRef = useRef(null);

  useEffect(() => {
    dbEntities.SiteSetting.list()
      .then((items) => {
        const map = {};
        items.forEach((s) => { map[s.setting_key] = s.setting_value; });
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (window.location.hash === "#placement" && portalRef.current) {
      setTimeout(() => portalRef.current.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, []);

  const handleLookup = async (idx) => {
    setIsLoading(true);
    setError("");
    setIndexNumber(idx);
    try {
      const results = await dbEntities.Placement.filter({ index_number: idx });
      if (results.length === 0) {
        setError("No placement record found for this index number. Please verify and try again.");
        setStep("input");
      } else {
        // Data minimization: only use student_name, program, residential_status
        const { student_name, program, residential_status } = results[0];
        setStudentData({ student_name, program, residential_status });
        setStep("confirm");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
    setIsLoading(false);
  };

  const handleConfirm = (house) => {
    setHouseData(house);
    setStep("success");
  };

  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => window.print(), 300);
    setTimeout(() => setShowPrint(false), 1000);
  };

  const handleProspectusPrint = () => {
    setShowProspectusPrint(true);
    setTimeout(() => window.print(), 300);
    setTimeout(() => setShowProspectusPrint(false), 1000);
  };

  const handleReset = () => {
    setStep("input");
    setStudentData(null);
    setHouseData(null);
    setIndexNumber("");
    setError("");
  };

  return (
    <>
      {/* Print Overlay */}
      {showPrint && studentData && houseData && (
        <AdmissionSlip student={studentData} indexNumber={indexNumber} house={houseData} />
      )}

      {showProspectusPrint && studentData && houseData && (
        <ProspectusDocument student={studentData} indexNumber={indexNumber} house={houseData} />
      )}

      {/* Hero */}
      <section className="relative h-64 md:h-80 bg-heritage-green geo-pattern flex items-center justify-center text-center px-4">
        <div className="relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl text-heritage-cream font-bold">Admissions</h1>
          <div className="golden-thread max-w-24 mx-auto my-4" />
          <p className="text-heritage-cream/70 max-w-lg mx-auto">Join the IGSHS family — check your placement and begin your journey.</p>
        </div>
      </section>

      {/* Admissions Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="How to Enrol" subtitle="Follow these steps to secure your place at IGSHS Suhum." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { step: "01", title: "CSSPS Placement", desc: "Receive your CSSPS placement to IGSHS through the Ghana Education Service." },
              { step: "02", title: "Check Placement", desc: "Use our portal below to verify your name, program, and house assignment." },
              { step: "03", title: "Print Admission Slip", desc: "Download and print your admission slip with all required details." },
              { step: "04", title: "Report to School", desc: "Arrive on reopening day with your slip, certificates, and required items." },
            ].map((s) => (
              <div key={s.step} className="relative p-6 bg-white rounded-xl border border-heritage-green/5">
                <span className="font-heading text-4xl font-bold text-heritage-green/10 absolute top-4 right-4">{s.step}</span>
                <h3 className="font-heading text-lg font-semibold text-heritage-slate mb-2">{s.title}</h3>
                <p className="text-sm text-heritage-slate/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Key Info */}
          {(settings.school_fees || settings.reopening_date) && (
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {settings.school_fees && (
                <div className="p-6 bg-heritage-gold/5 rounded-xl border border-heritage-gold/20">
                  <h3 className="font-heading text-lg font-semibold text-heritage-slate mb-2">School Fees</h3>
                  <p className="text-heritage-slate/70">{settings.school_fees}</p>
                </div>
              )}
              {settings.reopening_date && (
                <div className="p-6 bg-heritage-green/5 rounded-xl border border-heritage-green/20">
                  <h3 className="font-heading text-lg font-semibold text-heritage-slate mb-2">Reopening Date</h3>
                  <p className="text-heritage-slate/70">{settings.reopening_date}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Placement Portal */}
      <section ref={portalRef} id="placement" className="py-16 md:py-24 bg-heritage-green geo-pattern relative">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-heritage-cream font-bold">Freshers Placement Portal</h2>
            <p className="text-heritage-cream/60 mt-2">Enter your CSSPS Index Number to find your placement details.</p>
            <div className="golden-thread max-w-24 mx-auto mt-4" />
          </div>

          <div className="bg-heritage-cream rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {["Input", "Confirm", "Success"].map((label, i) => {
                const stepKeys = ["input", "confirm", "success"];
                const currentIdx = stepKeys.indexOf(step);
                const isActive = i === currentIdx;
                const isDone = i < currentIdx;
                return (
                  <React.Fragment key={label}>
                    {i > 0 && <div className={`w-8 h-px ${isDone ? "bg-heritage-green" : "bg-heritage-green/20"}`} />}
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      isActive ? "bg-heritage-green text-heritage-cream" : isDone ? "bg-heritage-green/10 text-heritage-green" : "bg-heritage-green/5 text-heritage-slate/40"
                    }`}>
                      {isDone ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <span>{i + 1}</span>
                      )}
                      <span className="hidden sm:inline">{label}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Steps */}
            {step === "input" && <PlacementForm onSubmit={handleLookup} isLoading={isLoading} />}
            {step === "confirm" && studentData && (
              <PlacementResult student={studentData} indexNumber={indexNumber} onConfirm={handleConfirm} />
            )}
            {step === "success" && studentData && houseData && (
              <PlacementSuccess student={studentData} indexNumber={indexNumber} house={houseData} onPrint={handlePrint} onDownloadProspectus={handleProspectusPrint} onReset={handleReset} />
            )}
          </div>
        </div>
      </section>

      {/* Required Items */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Items Required for Admission" subtitle="Please prepare the following before reporting to school." />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-heritage-cream border border-heritage-green/5">
              <h3 className="font-heading text-lg font-semibold text-heritage-slate mb-4">Documents</h3>
              <ul className="space-y-2 text-sm text-heritage-slate/70">
                <li className="flex items-start gap-2"><span className="text-heritage-green mt-0.5">✓</span> Printed Admission Slip</li>
                <li className="flex items-start gap-2"><span className="text-heritage-green mt-0.5">✓</span> Original BECE Certificate</li>
                <li className="flex items-start gap-2"><span className="text-heritage-green mt-0.5">✓</span> BECE Result Slip</li>
                <li className="flex items-start gap-2"><span className="text-heritage-green mt-0.5">✓</span> Four (4) Passport Photos</li>
                <li className="flex items-start gap-2"><span className="text-heritage-green mt-0.5">✓</span> Medical Report Form</li>
                <li className="flex items-start gap-2"><span className="text-heritage-green mt-0.5">✓</span> Birth Certificate</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-heritage-gold/5 border border-heritage-gold/20 flex flex-col justify-center">
              <h3 className="font-heading text-lg font-semibold text-heritage-slate mb-2">Programme-Specific Prospectus</h3>
              <p className="text-sm text-heritage-slate/70 leading-relaxed">
                Once you check your placement, you will automatically receive a personalised prospectus listing the exact items required for your assigned academic programme. You can download it directly from the placement portal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}