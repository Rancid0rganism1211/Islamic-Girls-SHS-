const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { useProspectus } from "@/lib/prospectusContext";
import logo from "@/assets/images/logo.png";

export default function ProspectusDocument({ student, indexNumber, house }) {
  const { prospectus } = useProspectus();
  const items = prospectus[student.program] || [];

  return (
    <div className="print-document fixed inset-0 z-50 bg-white p-8 overflow-auto">
      <div className="max-w-2xl mx-auto admission-card">
        {/* Header */}
        <div className="text-center border-b-2 border-heritage-green pb-6 mb-6">
          <img src={logo} alt="IGSHS Crest" className="w-20 h-20 mx-auto mb-3 object-contain" />
          <h1 className="font-heading text-2xl font-bold text-heritage-green uppercase tracking-wider">
            Islamic Girls Senior High School
          </h1>
          <p className="text-sm text-heritage-slate/70 mt-1">Suhum, Eastern Region, Ghana</p>
          <div className="golden-thread max-w-32 mx-auto mt-4" />
          <h2 className="font-heading text-lg font-semibold text-heritage-gold mt-4 uppercase tracking-widest">
            Program Prospectus — {student.program}
          </h2>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p className="text-xs text-heritage-slate/50 uppercase tracking-wider">Student Name</p>
            <p className="font-semibold text-heritage-slate text-lg border-b border-dotted border-heritage-green/30 pb-1">
              {student.student_name}
            </p>
          </div>
          <div>
            <p className="text-xs text-heritage-slate/50 uppercase tracking-wider">Index Number</p>
            <p className="font-mono font-semibold text-heritage-slate text-lg border-b border-dotted border-heritage-green/30 pb-1">
              {indexNumber}
            </p>
          </div>
          <div>
            <p className="text-xs text-heritage-slate/50 uppercase tracking-wider">Assigned Program</p>
            <p className="font-semibold text-heritage-green text-lg border-b border-dotted border-heritage-green/30 pb-1">
              {student.program}
            </p>
          </div>
          <div>
            <p className="text-xs text-heritage-slate/50 uppercase tracking-wider">Assigned House</p>
            <p className="font-semibold text-lg border-b border-dotted border-heritage-green/30 pb-1" style={{ color: house.color }}>
              House {house.houseNumber}
            </p>
          </div>
        </div>

        {/* Items List */}
        <h3 className="font-heading font-semibold text-heritage-slate mb-4">
          Required Items &amp; Materials for {student.program}
        </h3>
        <ol className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 border-b border-dotted border-heritage-green/20 pb-2">
              <span className="font-semibold text-heritage-green w-6 shrink-0">{i + 1}.</span>
              <span className="flex-1 text-heritage-slate">{item}</span>
              <span className="w-32 border-b border-heritage-slate/30 self-end pb-1 text-right text-xs text-heritage-slate/40">____________</span>
            </li>
          ))}
          {items.length === 0 && (
            <li className="text-sm text-heritage-slate/50 italic">No items configured for this program.</li>
          )}
        </ol>

        {/* Footer */}
        <div className="mt-10 pt-4 border-t border-heritage-green/20 text-center">
          <p className="text-xs text-heritage-slate/50">
            Please bring all listed items on the reopening date.
          </p>
          <p className="text-xs text-heritage-slate/40 mt-1">
            Generated on {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}