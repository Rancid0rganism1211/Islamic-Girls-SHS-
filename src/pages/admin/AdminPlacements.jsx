import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { dbEntities } from '@/lib/firestore';
import { useToast } from "@/components/ui/use-toast";

export default function AdminPlacements() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const loadPlacements = () => {
    setLoading(true);
    dbEntities.Placement.list("-created_date", 50)
      .then(setPlacements)
      .catch(() => toast({ title: "Error", description: "Failed to load placements", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  useEffect(loadPlacements, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

      if (jsonData.length === 0) {
        toast({ title: "No Data", description: "No records found in the uploaded file.", variant: "destructive" });
        setUploading(false);
        return;
      }

      // Map the data to expected format
      const records = jsonData.map(row => ({
        index_number: row['Index Number'] || row['index_number'] || '',
        student_name: row['Student Name'] || row['student_name'] || '',
        program: row['Program'] || row['program'] || '',
        residential_status: row['Residential Status'] || row['residential_status'] || '',
        guardian_contact: row['Guardian Contact'] || row['guardian_contact'] || ''
      }));

      // Show preview of first 5 rows
      setPreview(records);
      setUploading(false);
    } catch (err) {
      toast({ title: "Upload Failed", description: "Could not process the file. Please try again.", variant: "destructive" });
      setUploading(false);
    }
    e.target.value = "";
  };

  const confirmUpload = async () => {
    if (!preview) return;
    setUploading(true);
    try {
      // Delete all existing placements
      await dbEntities.Placement.deleteMany({});

      // Normalize and batch insert
      const normalized = preview.map((r) => ({
        index_number: String(r.index_number || "").trim(),
        student_name: String(r.student_name || "").trim(),
        program: normalizeProgram(String(r.program || "").trim()),
        residential_status: String(r.residential_status || "").toLowerCase().includes("board") ? "Boarding" : "Day",
        guardian_contact: String(r.guardian_contact || "").trim(),
      })).filter((r) => r.index_number && r.student_name);

      // Batch create in chunks of 50
      for (let i = 0; i < normalized.length; i += 50) {
        await dbEntities.Placement.bulkCreate(normalized.slice(i, i + 50));
      }

      toast({ title: "Success!", description: `${normalized.length} placement records imported.` });
      setPreview(null);
      loadPlacements();
    } catch (err) {
      toast({ title: "Import Failed", description: "An error occurred during import.", variant: "destructive" });
    }
    setUploading(false);
  };

  const filtered = placements.filter((p) =>
    !searchTerm || p.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.index_number?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-gray-800">Placement Data</h2>
          <p className="text-sm text-gray-500">Upload Excel/CSV files with student placement records.</p>
        </div>
        <label className={`px-5 py-2.5 bg-heritage-green text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-heritage-green/90 transition-colors flex items-center gap-2 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          {uploading ? "Processing..." : "Upload File"}
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Pre-flight Preview */}
      {preview && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Pre-flight Check — Preview First 5 Rows</h3>
          <p className="text-sm text-gray-500 mb-4">
            Total records found: <span className="font-semibold text-heritage-green">{preview.length}</span>. 
            This will <span className="text-red-600 font-semibold">replace all existing data</span>.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Index Number</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Student Name</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Program</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {preview.slice(0, 5).map((r, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 px-3 font-mono text-xs">{r.index_number}</td>
                    <td className="py-2 px-3">{r.student_name}</td>
                    <td className="py-2 px-3">{r.program}</td>
                    <td className="py-2 px-3">{r.residential_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={confirmUpload} disabled={uploading} className="px-5 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90 disabled:opacity-50">
              {uploading ? "Importing..." : `Confirm & Import ${preview.length} Records`}
            </button>
            <button onClick={() => setPreview(null)} className="px-5 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or index number..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-3 border-gray-200 border-t-heritage-green rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No placement records found</p>
            <p className="text-sm mt-1">Upload an Excel or CSV file to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Index Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Student Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Program</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-mono text-xs">{p.index_number}</td>
                    <td className="py-2.5 px-4 font-medium">{p.student_name}</td>
                    <td className="py-2.5 px-4">{p.program}</td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.residential_status === "Boarding" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>{p.residential_status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function normalizeProgram(p) {
  const lower = p.toLowerCase();
  if (lower.includes("science")) return "Science";
  if (lower.includes("art")) return "General Arts";
  if (lower.includes("home") || lower.includes("econ")) return "Home Economics";
  if (lower.includes("business") || lower.includes("busi")) return "Business";
  return p;
}