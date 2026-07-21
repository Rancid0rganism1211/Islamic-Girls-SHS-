const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";

const DEFAULT_SETTINGS = [
  { setting_key: "school_fees", setting_label: "Current School Fees", setting_value: "" },
  { setting_key: "reopening_date", setting_label: "Reopening Date", setting_value: "" },
  { setting_key: "welcome_message", setting_label: "Headmistress Welcome Message", setting_value: "" },
  { setting_key: "admission_notice", setting_label: "Admission Notice", setting_value: "" },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const existing = await db.entities.SiteSetting.list();
      
      // Ensure default settings exist
      const existingKeys = existing.map((s) => s.setting_key);
      const toCreate = DEFAULT_SETTINGS.filter((d) => !existingKeys.includes(d.setting_key));
      
      if (toCreate.length > 0) {
        await db.entities.SiteSetting.bulkCreate(toCreate);
        const updated = await db.entities.SiteSetting.list();
        setSettings(updated);
      } else {
        setSettings(existing);
      }
    } catch {
      toast({ title: "Error loading settings", variant: "destructive" });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpdate = async (id, value) => {
    setSaving(true);
    try {
      await db.entities.SiteSetting.update(id, { setting_value: value });
      toast({ title: "Saved" });
    } catch {
      toast({ title: "Error saving", variant: "destructive" });
    }
    setSaving(false);
  };

  const handleAddCustom = async () => {
    if (!newKey || !newLabel) return;
    try {
      await db.entities.SiteSetting.create({ setting_key: newKey.toLowerCase().replace(/\s+/g, "_"), setting_label: newLabel, setting_value: "" });
      setNewKey("");
      setNewLabel("");
      load();
      toast({ title: "Setting added" });
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this setting?")) return;
    await db.entities.SiteSetting.delete(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-gray-800">Site Settings</h2>
        <p className="text-sm text-gray-500">Manage global site content like fees, dates, and messages without changing code.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-3 border-gray-200 border-t-heritage-green rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {settings.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{s.setting_label}</label>
                  <p className="text-xs text-gray-400 mb-2">Key: {s.setting_key}</p>
                  {s.setting_key === "welcome_message" || s.setting_key === "admission_notice" ? (
                    <textarea
                      rows={3}
                      defaultValue={s.setting_value}
                      onBlur={(e) => handleUpdate(s.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green resize-none"
                      placeholder={`Enter ${s.setting_label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type="text"
                      defaultValue={s.setting_value}
                      onBlur={(e) => handleUpdate(s.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green"
                      placeholder={`Enter ${s.setting_label.toLowerCase()}...`}
                    />
                  )}
                </div>
                {!DEFAULT_SETTINGS.find((d) => d.setting_key === s.setting_key) && (
                  <button onClick={() => handleDelete(s.id)} className="text-xs text-red-500 hover:text-red-700 mt-6">Remove</button>
                )}
              </div>
            </div>
          ))}

          {/* Add Custom Setting */}
          <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-5">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">Add Custom Setting</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <input type="text" value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="Setting key (e.g. principal_name)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green bg-white" />
              <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Display label" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green bg-white" />
              <button onClick={handleAddCustom} disabled={!newKey || !newLabel} className="px-5 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90 disabled:opacity-50">
                Add Setting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}