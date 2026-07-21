import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dbEntities } from '@/lib/firestore';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ placements: 0, announcements: 0, events: 0, timetable: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dbEntities.Placement.list(undefined, 1).then((r) => r.length),
      dbEntities.Announcement.filter({ is_active: true }).then((r) => r.length),
      dbEntities.SchoolEvent.filter({ is_active: true }).then((r) => r.length),
      dbEntities.Timetable.list(undefined, 1).then((r) => r.length),
    ]).then(([placements, announcements, events, timetable]) => {
      setStats({ placements, announcements, events, timetable });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Placement Records", count: stats.placements > 0 ? "Active" : "No Data", path: "/admin/placements", color: "bg-heritage-green", desc: "Upload and manage student placement data" },
    { label: "Announcements", count: stats.announcements, path: "/admin/announcements", color: "bg-heritage-gold", desc: "Manage school announcements" },
    { label: "School Events", count: stats.events, path: "/admin/events", color: "bg-blue-600", desc: "Upcoming events and calendar" },
    { label: "Timetable Entries", count: stats.timetable > 0 ? "Active" : "No Data", path: "/admin/timetable", color: "bg-purple-600", desc: "Academic timetable management" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mt-1">Here's an overview of your school's management panel.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-heritage-green rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Link key={c.label} to={c.path} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${c.color} rounded-lg flex items-center justify-center mb-3`}>
                <span className="text-white text-lg font-bold">{String(c.count).charAt(0)}</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{c.count}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">{c.label}</p>
              <p className="text-xs text-gray-400 mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link to="/admin/placements" className="flex items-center gap-3 p-3 rounded-lg bg-heritage-green/5 hover:bg-heritage-green/10 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span className="text-sm font-medium text-heritage-green">Upload Placement Data</span>
          </Link>
          <Link to="/admin/announcements" className="flex items-center gap-3 p-3 rounded-lg bg-heritage-gold/5 hover:bg-heritage-gold/10 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span className="text-sm font-medium text-heritage-gold">New Announcement</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09"/></svg>
            <span className="text-sm font-medium text-gray-600">Site Settings</span>
          </Link>
          <Link to="/admin/prospectus" className="flex items-center gap-3 p-3 rounded-lg bg-heritage-green/5 hover:bg-heritage-green/10 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2"><path d="M9 2h6a2 2 0 012 2v1h2a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2V4a2 2 0 012-2z"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>
            <span className="text-sm font-medium text-heritage-green">Edit Prospectus</span>
          </Link>
          <Link to="/admin/students" className="flex items-center gap-3 p-3 rounded-lg bg-heritage-gold/5 hover:bg-heritage-gold/10 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
            <span className="text-sm font-medium text-heritage-gold">Student Master List</span>
          </Link>
        </div>
      </div>
    </div>
  );
}