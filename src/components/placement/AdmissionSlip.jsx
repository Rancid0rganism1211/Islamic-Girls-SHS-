const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";

export default function AdmissionSlip({ student, indexNumber, house }) {
  return (
    <div className="admission-card print-only fixed inset-0 z-50 bg-white p-8 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center border-b-2 border-heritage-green pb-6 mb-6">
          <img 
            src="https://media.db.com/images/public/6a4e755512eb97a4fb0799c6/820a2436b_generated_b8b55bb9.png" 
            alt="IGSHS School Crest" 
            className="w-24 h-24 mx-auto mb-3 object-contain"
          />
          <h1 className="font-heading text-2xl font-bold text-heritage-green uppercase tracking-wider">
            Islamic Girls Senior High School
          </h1>
          <p className="text-sm text-heritage-slate/70 mt-1">Suhum, Eastern Region, Ghana</p>
          <p className="text-xs text-heritage-slate/50 mt-0.5">Established 1999 • P.O. Box 45</p>
          <div className="golden-thread max-w-32 mx-auto mt-4" />
          <h2 className="font-heading text-lg font-semibold text-heritage-gold mt-4 uppercase tracking-widest">
            Admission & Clearance Slip
          </h2>
        </div>

        {/* Student Details */}
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-heritage-slate/50 uppercase tracking-wider">Assigned Program</p>
              <p className="font-semibold text-heritage-green text-lg border-b border-dotted border-heritage-green/30 pb-1">
                {student.program}
              </p>
            </div>
            <div>
              <p className="text-xs text-heritage-slate/50 uppercase tracking-wider">Residential Status</p>
              <p className="font-semibold text-heritage-slate text-lg border-b border-dotted border-heritage-green/30 pb-1">
                {student.residential_status}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-heritage-slate/50 uppercase tracking-wider">Assigned Dormitory / House</p>
            <p className="font-heading font-bold text-xl border-b border-dotted border-heritage-green/30 pb-1" style={{ color: house.color }}>
              House {house.houseNumber}
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-heritage-cream p-4 rounded-lg border border-heritage-green/10 mb-8">
          <h3 className="font-semibold text-sm text-heritage-green mb-2">IMPORTANT NOTICE</h3>
          <ul className="text-xs text-heritage-slate/70 space-y-1 list-disc list-inside">
            <li>Report to school with this admission slip on the designated reopening date.</li>
            <li>Bring original BECE certificate and four passport-sized photographs.</li>
            <li>All fees must be paid before clearance and registration.</li>
            <li>School uniforms and items list will be provided upon arrival.</li>
          </ul>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <div className="border-b border-heritage-green/30 mb-2 h-12" />
            <p className="text-xs text-heritage-slate/60">Student&rsquo;s Signature</p>
          </div>
          <div className="text-center">
            <div className="border-b border-heritage-green/30 mb-2 h-12" />
            <p className="text-xs text-heritage-slate/60">Headmistress&rsquo;s Signature & Stamp</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-heritage-slate/40">This document is valid for the current academic year only.</p>
          <p className="text-xs text-heritage-slate/40 mt-1">Generated on {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </div>
    </div>
  );
}