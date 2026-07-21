const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from "react";

const priorityStyles = {
  high: "border-l-red-500 bg-red-50",
  medium: "border-l-heritage-gold bg-heritage-gold/5",
  low: "border-l-heritage-green bg-heritage-green/5",
};

export default function AnnouncementBlock() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    db.entities.Announcement.filter({ is_active: true }, "-created_date", 5)
      .then(setAnnouncements)
      .catch(() => {});
  }, []);

  if (announcements.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#123E30" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <h2 className="font-heading text-2xl md:text-3xl text-heritage-slate font-semibold">Announcements</h2>
        </div>
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className={`border-l-4 p-4 md:p-5 rounded-r-lg ${priorityStyles[a.priority] || priorityStyles.medium}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-heritage-slate">{a.title}</h3>
                  <p className="text-sm text-heritage-slate/70 mt-1 leading-relaxed">{a.content}</p>
                </div>
                {a.priority === "high" && (
                  <span className="shrink-0 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Urgent</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}