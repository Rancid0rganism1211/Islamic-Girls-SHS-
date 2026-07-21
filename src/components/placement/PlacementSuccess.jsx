import React, { useState } from "react";
import { useProspectus } from "@/lib/prospectusContext";

export default function PlacementSuccess({ student, indexNumber, house, onPrint, onDownloadProspectus, onReset }) {
  const { prospectus } = useProspectus();
  const [showList, setShowList] = useState(false);
  const items = prospectus[student.program] || [];

  const handleDownload = () => {
    setShowList(true);
    onDownloadProspectus();
  };

  return (
    <div className="space-y-6 text-center">
      {/* Congratulations Banner */}
      <div className="py-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: house.color + "15" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={house.color} strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-heritage-slate">
          Congratulations!
        </h2>
        <p className="text-heritage-slate/60 mt-2">
          Welcome to the IGSHS family, <span className="font-semibold text-heritage-green">{student.student_name}</span>
        </p>
      </div>

      {/* House Assignment Card */}
      <div className="p-6 rounded-2xl border-2" style={{ borderColor: house.color, backgroundColor: house.color + "08" }}>
        <p className="text-sm uppercase tracking-wider text-heritage-slate/50 mb-2">Your Dormitory Assignment</p>
        <h3 className="font-heading text-3xl md:text-4xl font-bold mb-1" style={{ color: house.color }}>
          House {house.houseNumber}
        </h3>
        <span className="inline-block w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: house.color }} />
        <span className="text-sm font-medium text-heritage-slate/70">Official IGSHS House System</span>
      </div>

      {/* Details Summary */}
      <div className="bg-white rounded-xl border border-heritage-green/10 p-5 text-left">
        <h4 className="font-heading text-sm font-semibold text-heritage-slate/50 uppercase tracking-wider mb-3">Placement Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-heritage-slate/60">Program</span>
            <span className="text-sm font-semibold text-heritage-green">{student.program}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-heritage-slate/60">Status</span>
            <span className="text-sm font-medium">{student.residential_status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-heritage-slate/60">Index Number</span>
            <span className="text-sm font-mono">{indexNumber}</span>
          </div>
        </div>
      </div>

      {/* Prospectus Preview */}
      {showList && items.length > 0 && (
        <div className="bg-white rounded-xl border border-heritage-green/10 p-5 text-left no-print">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <h4 className="font-heading text-sm font-semibold text-heritage-slate/50 uppercase tracking-wider">
              Required Items — {student.program}
            </h4>
          </div>
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-heritage-slate/70">
                <span className="text-heritage-green mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-heritage-slate/40 mt-3">
            A printer-friendly version of this list has been prepared. Use the print dialog to save or print it.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 no-print">
        <button
          onClick={onPrint}
          className="flex-1 py-3 bg-heritage-green text-heritage-cream font-semibold rounded-lg hover:bg-heritage-green/90 transition-colors flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Admission Slip
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 py-3 bg-heritage-gold text-heritage-green font-semibold rounded-lg hover:bg-heritage-gold/90 transition-colors flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Prospectus
        </button>
      </div>
      <button
        onClick={onReset}
        className="w-full py-3 border-2 border-heritage-green/20 text-heritage-green font-semibold rounded-lg hover:bg-heritage-green/5 transition-colors no-print"
      >
        Check Another Student
      </button>
    </div>
  );
}