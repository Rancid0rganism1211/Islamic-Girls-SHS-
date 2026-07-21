import React, { useState, useEffect } from "react";
import { dbEntities } from '@/lib/firestore';
import { useToast } from "@/components/ui/use-toast";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const FORMS = ["Form 1", "Form 2", "Form 3"];
const PROGRAMS = ["General Arts", "Science", "Home Economics", "Business"];

const emptyEntry = { day_of_week: "Monday", time_slot: "", form_level: "Form 1", program: "General Arts", subject_name: "" };

export default function AdminTimetable() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyEntry });
  const [filterDay, setFilterDay] = useState("");
  const [filterForm, setFilterForm] = useState("");
  const { toast } = useToast();

  const loadEntries = () => {
    setLoading(true);
    dbEntities.Timetable.list("-created_date", 200)
      .then(setEntries)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(loadEntries, []);

  const handleSave = async () => {
    if (!form.time_slot || !form.subject_name) {
      toast({ title: "Missing fields", description: "Please fill in time slot and subject.", variant: "destructive" });
      return;
    }
    try {
      if (editing) {
        await dbEntities.Timetable.update(editing, form);
        toast({ title: "Updated", description: "Timetable entry updated." });
      } else {
        await dbEntities.Timetable.create(form);
        toast({ title: "Created", description: "Timetable entry added." });
      }
      setEditing(null);
      setForm({ ...emptyEntry });
      loadEntries();
    } catch {
      toast({ title: "Error", description: "Could not save entry.", variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this timetable entry?")) return;
    await dbEntities.Timetable.delete(id);
    toast({ title: "Deleted" });
    loadEntries();
  };

  const filtered = entries.filter((e) =>
    (!filterDay || e.day_of_week === filterDay) && (!filterForm || e.form_level === filterForm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-gray-800">Academic Timetable</h2>
        <p className="text-sm text-gray-500">Manage class schedules for all programs and form levels.</p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">{editing ? "Edit Entry" : "Add New Entry"}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <select value={form.day_of_week} onChange={(e) => setForm({...form, day_of_week: e.target.value})} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green">
            {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <input type="text" value={form.time_slot} onChange={(e) => setForm({...form, time_slot: e.target.value})} placeholder="e.g. 8:00 - 9:00 AM" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green" />
          <select value={form.form_level} onChange={(e) => setForm({...form, form_level: e.target.value})} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green">
            {FORMS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select value={form.program} onChange={(e) => setForm({...form, program: e.target.value})} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green">
            {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input type="text" value={form.subject_name} onChange={(e) => setForm({...form, subject_name: e.target.value})} placeholder="Subject name" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green" />
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} className="px-5 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90">
            {editing ? "Update" : "Add Entry"}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm({ ...emptyEntry }); }} className="px-5 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
          <option value="">All Days</option>
          {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterForm} onChange={(e) => setFilterForm(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
          <option value="">All Forms</option>
          {FORMS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-3 border-gray-200 border-t-heritage-green rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No timetable entries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Day</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Time Slot</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Form</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Program</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4">{e.day_of_week}</td>
                    <td className="py-2.5 px-4 text-xs font-mono">{e.time_slot}</td>
                    <td className="py-2.5 px-4">{e.form_level}</td>
                    <td className="py-2.5 px-4">{e.program}</td>
                    <td className="py-2.5 px-4 font-medium">{e.subject_name}</td>
                    <td className="py-2.5 px-4 text-right space-x-2">
                      <button onClick={() => { setEditing(e.id); setForm({ day_of_week: e.day_of_week, time_slot: e.time_slot, form_level: e.form_level, program: e.program, subject_name: e.subject_name }); }} className="text-heritage-green hover:text-heritage-gold text-xs font-medium">Edit</button>
                      <button onClick={() => handleDelete(e.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
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