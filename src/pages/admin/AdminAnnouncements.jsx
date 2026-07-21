const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";

const emptyForm = { title: "", content: "", priority: "medium", is_active: true };

export default function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const { toast } = useToast();

  const load = () => {
    setLoading(true);
    db.entities.Announcement.list("-created_date", 50)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast({ title: "Missing fields", description: "Title and content are required.", variant: "destructive" });
      return;
    }
    try {
      if (editing) {
        await db.entities.Announcement.update(editing, form);
        toast({ title: "Updated" });
      } else {
        await db.entities.Announcement.create(form);
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
    if (!confirm("Delete this announcement?")) return;
    await db.entities.Announcement.delete(id);
    load();
  };

  const toggleActive = async (item) => {
    await db.entities.Announcement.update(item.id, { is_active: !item.is_active });
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-gray-800">Announcements</h2>
        <p className="text-sm text-gray-500">Create and manage school announcements displayed on the website.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">{editing ? "Edit Announcement" : "New Announcement"}</h3>
        <div className="space-y-4">
          <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Announcement title" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green" />
          <textarea rows={3} value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} placeholder="Announcement content..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green resize-none" />
          <div className="flex gap-4 items-center">
            <select value={form.priority} onChange={(e) => setForm({...form, priority: e.target.value})} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({...form, is_active: e.target.checked})} className="rounded" />
              Active
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-5 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90">
              {editing ? "Update" : "Publish"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setForm({ ...emptyForm }); }} className="px-5 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-3 border-gray-200 border-t-heritage-green rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">No announcements yet.</div>
        ) : items.map((item) => (
          <div key={item.id} className={`bg-white rounded-xl border p-4 ${item.is_active ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.priority === "high" ? "bg-red-100 text-red-700" : item.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
                  }`}>{item.priority}</span>
                  {!item.is_active && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">Inactive</span>}
                </div>
                <p className="text-sm text-gray-600">{item.content}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleActive(item)} className="text-xs text-gray-500 hover:text-heritage-green">
                  {item.is_active ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => { setEditing(item.id); setForm({ title: item.title, content: item.content, priority: item.priority, is_active: item.is_active }); }} className="text-xs text-heritage-green hover:text-heritage-gold">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}