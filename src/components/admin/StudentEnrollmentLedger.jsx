import React, { useState, useEffect } from "react";
import { dbEntities } from '@/lib/firestore';
import { assignHouse } from "@/lib/houseLogic";
import { SCHOOL_IMAGES } from "@/lib/schoolImages";

const HOUSE_OPTIONS = ["All", "House 1", "House 2", "House 3", "House 4", "House 5"];
const houseLabel = (num) => `House ${num}`;

export default function StudentEnrollmentLedger() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [houseFilter, setHouseFilter] = useState("All");
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    dbEntities.Placement.list("-created_date", 500)
      .then((records) => {
        const withHouses = records.map((r) => {
          const house = assignHouse(r.index_number, r.residential_status);
          return { ...r, houseNumber: house.houseNumber, houseName: houseLabel(house.houseNumber), houseColor: house.color };
        });
        setStudents(withHouses);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = houseFilter === "All" ? students : students.filter((s) => s.houseName === houseFilter);

  const handleDownload = () => {
    if (filtered.length === 0) return;
    const header = ["#", "Index Number", "Student Name", "Program", "Residential Status", "House"];
    const rows = filtered.map((s, i) => [i + 1, s.index_number, s.student_name, s.program, s.residential_status, s.houseName]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `IGSHS_Student_List_${houseFilter.replace(/\s/g, "_")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (filtered.length === 0) return;
    setPrinting(true);
    setTimeout(() => window.print(), 300);
    setTimeout(() => setPrinting(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold text-gray-800">Student Enrollment Ledger</h3>
          <p className="text-sm text-gray-500">Registered students grouped and filterable by House (1–5).</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <label className="text-sm text-gray-500">Filter by House:</label>
          <select
            value={houseFilter}
            onChange={(e) => setHouseFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-heritage-green"
          >
            {HOUSE_OPTIONS.map((h) => (
              <option key={h} value={h}>{h === "All" ? "All Houses" : h}</option>
            ))}
          </select>
          <button
            onClick={handleDownload}
            disabled={filtered.length === 0}
            className="px-4 py-2 bg-heritage-gold text-heritage-green text-sm font-medium rounded-lg hover:bg-heritage-gold/90 flex items-center gap-2 no-print disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Student List
          </button>
          <button
            onClick={handlePrint}
            disabled={filtered.length === 0}
            className="px-4 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90 flex items-center gap-2 no-print disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print Student List
          </button>
        </div>
      </div>

      {/* On-screen table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden no-print">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-4 border-gray-200 border-t-heritage-green rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No students found for this house.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Index Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Student Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Program</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">House</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 text-gray-400">{i + 1}</td>
                    <td className="py-2.5 px-4 font-mono text-xs">{s.index_number}</td>
                    <td className="py-2.5 px-4 font-medium text-gray-800">{s.student_name}</td>
                    <td className="py-2.5 px-4 text-gray-600">{s.program}</td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.residential_status === "Boarding" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>{s.residential_status}</span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.houseColor }} />
                        <span className="font-medium" style={{ color: s.houseColor }}>{s.houseName}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && (
        <p className="text-sm text-gray-400 no-print">
          Showing {filtered.length} of {students.length} students
        </p>
      )}

      {/* Print Document */}
      {printing && (
        <div className="print-document fixed inset-0 z-50 bg-white p-8 overflow-auto">
          <div className="max-w-3xl mx-auto admission-card">
            <div className="text-center border-b-2 border-heritage-green pb-4 mb-6">
              <img src={SCHOOL_IMAGES.logo} alt="IGSHS Crest" className="w-16 h-16 mx-auto mb-2 object-contain" />
              <h1 className="font-heading text-xl font-bold text-heritage-green uppercase tracking-wider">
                Islamic Girls Senior High School
              </h1>
              <p className="text-sm text-heritage-slate/70 mt-1">Suhum, Eastern Region, Ghana</p>
              <div className="golden-thread max-w-32 mx-auto mt-3" />
              <h2 className="font-heading text-base font-semibold text-heritage-gold mt-3 uppercase tracking-widest">
                Student Enrollment Ledger — {houseFilter === "All" ? "All Houses" : houseFilter}
              </h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-heritage-green">
                  <th className="text-left py-2 px-2 font-semibold text-heritage-green">#</th>
                  <th className="text-left py-2 px-2 font-semibold text-heritage-green">Index No.</th>
                  <th className="text-left py-2 px-2 font-semibold text-heritage-green">Student Name</th>
                  <th className="text-left py-2 px-2 font-semibold text-heritage-green">Program</th>
                  <th className="text-left py-2 px-2 font-semibold text-heritage-green">Status</th>
                  <th className="text-left py-2 px-2 font-semibold text-heritage-green">House</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className="border-b border-gray-200">
                    <td className="py-1.5 px-2">{i + 1}</td>
                    <td className="py-1.5 px-2 font-mono text-xs">{s.index_number}</td>
                    <td className="py-1.5 px-2 font-medium">{s.student_name}</td>
                    <td className="py-1.5 px-2">{s.program}</td>
                    <td className="py-1.5 px-2">{s.residential_status}</td>
                    <td className="py-1.5 px-2">{s.houseName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center mt-6 text-xs text-heritage-slate/40">
              Total: {filtered.length} students • Generated on {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}