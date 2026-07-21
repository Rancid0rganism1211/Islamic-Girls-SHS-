import React, { useState, useEffect } from "react";
import { dbEntities } from '@/lib/firestore';
import { useToast } from "@/components/ui/use-toast";

const emptyForm = { title: "", description: "", event_date: "", event_time: "", location: "", is_active: true };

export default function AdminEvents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const { toast } = useToast();

  const load = () => {
    setLoading(true);
    dbEntities.SchoolEvent.list("-event_date", 50)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async () => {
    if (!form.title || !form.event_date) {
      toast({ title: "Missing fields", description: "Title and date are required.", variant: "destructive" });
      return;
    }
    try {
      if (editing) {
        await dbEntities.SchoolEvent.update(editing, form);
        toast({ title: "Updated" });
      } else {
        await dbEntities.SchoolEvent.create(form);
        toast({ title: "Created" });
      }
      setEditing(null);
      setForm({ ...emptyForm });
      load();
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    await dbEntities.SchoolEvent.delete(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-gray-800">School Events</h2>
        <p className="text-sm text-gray-500">Manage upcoming events shown on the website ticker.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">{editing ? "Edit Event" : "Add New Event"}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Event title" className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green" />
          <input type="date" value={form.event_date} onChange={(e) => setForm({...form, event_date: e.target.value})} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green" />
          <input type="text" value={form.event_time} onChange={(e) => setForm({...form, event_time: e.target.value})} placeholder="e.g. 9:00 AM" className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green" />
          <input type="text" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} placeholder="Location" className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green" />
          <textarea rows={2} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Description (optional)" className="sm:col-span-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green resize-none" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({...form, is_active: e.target.checked})} className="rounded" />
            Show on website
          </label>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} className="px-5 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90">
            {editing ? "Update" : "Add Event"}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm({ ...emptyForm }); }} className="px-5 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-3 border-gray-200 border-t-heritage-green rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No events yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Event</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((e) => (
                  <tr key={e.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium">{e.title}</td>
                    <td className="py-2.5 px-4 text-xs">{e.event_date}</td>
                    <td className="py-2.5 px-4 text-xs">{e.event_time || "—"}</td>
                    <td className="py-2.5 px-4 text-xs">{e.location || "—"}</td>
                    <td className="py-2.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${e.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {e.is_active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right space-x-2">
                      <button onClick={() => { setEditing(e.id); setForm({ title: e.title, description: e.description || "", event_date: e.event_date, event_time: e.event_time || "", location: e.location || "", is_active: e.is_active }); }} className="text-xs text-heritage-green hover:text-heritage-gold">Edit</button>
                      <button onClick={() => handleDelete(e.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
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