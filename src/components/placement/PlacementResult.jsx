import React from "react";
import { assignHouse } from "@/lib/houseLogic";

export default function PlacementResult({ student, indexNumber, onConfirm }) {
  const house = assignHouse(indexNumber, student.residential_status);

  return (
    <div className="space-y-6">
      {/* Confirmation Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-heritage-green/10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/>
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-heritage-slate">Confirm Your Identity</h3>
        <p className="text-sm text-heritage-slate/60 mt-1">Please verify the information below matches your records.</p>
      </div>

      {/* Student Details */}
      <div className="bg-white rounded-xl border border-heritage-green/10 overflow-hidden">
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-dashed border-heritage-green/10">
            <span className="text-sm text-heritage-slate/60">Student Name</span>
            <span className="font-semibold text-heritage-slate">{student.student_name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dashed border-heritage-green/10">
            <span className="text-sm text-heritage-slate/60">Index Number</span>
            <span className="font-mono text-heritage-slate">{indexNumber}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-dashed border-heritage-green/10">
            <span className="text-sm text-heritage-slate/60">Assigned Program</span>
            <span className="font-semibold text-heritage-green">{student.program}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-heritage-slate/60">Residential Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              student.residential_status === "Boarding" 
                ? "bg-heritage-green/10 text-heritage-green"
                : "bg-heritage-gold/10 text-heritage-gold"
            }`}>
              {student.residential_status}
            </span>
          </div>
        </div>
      </div>

      {/* House Preview */}
      <div className="p-4 rounded-lg border-2 text-center" style={{ borderColor: house.color, backgroundColor: house.color + "08" }}>
        <p className="text-sm text-heritage-slate/60 mb-1">Your Assigned House</p>
        <p className="font-heading text-xl font-bold" style={{ color: house.color }}>
          House {house.houseNumber}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onConfirm(house)}
          className="flex-1 py-3 bg-heritage-green text-heritage-cream font-semibold rounded-lg hover:bg-heritage-green/90 transition-colors"
        >
          Confirm — This Is Me
        </button>
      </div>
    </div>
  );
}