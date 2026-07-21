import React, { useState, useEffect } from "react";
import { dbEntities } from '@/lib/firestore';
import moment from "moment";

export default function EventsTicker() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    dbEntities.SchoolEvent.filter({ is_active: true })
      .then((results) => results.slice(0, 10))
      .then(setEvents)
      .catch(() => {});
  }, []);

  if (events.length === 0) return null;

  return (
    <div className="bg-heritage-green text-heritage-cream py-2.5 overflow-hidden no-print">
      <div className="flex items-center gap-4">
        <span className="shrink-0 px-4 py-1 bg-heritage-gold text-heritage-green text-xs font-semibold uppercase tracking-wider">
          Upcoming
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker whitespace-nowrap flex gap-12">
            {events.map((ev) => (
              <span key={ev.id} className="inline-flex items-center gap-2 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="text-heritage-gold font-medium">{moment(ev.event_date).format("MMM D")}</span>
                <span>{ev.title}</span>
                {ev.location && <span className="text-heritage-cream/60">• {ev.location}</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}