import React, { useState } from "react";
import { useProspectus } from "@/lib/prospectusContext";

export default function ProspectusManager() {
  const { prospectus, addItem, updateItem, deleteItem, addProgram, deleteProgram, loaded } = useProspectus();
  const [newItems, setNewItems] = useState({});
  const [newProgram, setNewProgram] = useState("");
  const [showAddProgram, setShowAddProgram] = useState(false);

  const programs = Object.keys(prospectus);

  const handleAdd = (program) => {
    const val = (newItems[program] || "").trim();
    if (!val) return;
    addItem(program, val);
    setNewItems({ ...newItems, [program]: "" });
  };

  const handleAddProgram = () => {
    const name = newProgram.trim();
    if (!name) return;
    addProgram(name);
    setNewProgram("");
    setShowAddProgram(false);
  };

  if (!loaded) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-heritage-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-gray-800">Manage Prospectus</h3>
          <p className="text-sm text-gray-500">
            Create and edit a distinct required-items list for each academic programme. Students receive the list matching their placed programme.
          </p>
        </div>
        {!showAddProgram ? (
          <button
            onClick={() => setShowAddProgram(true)}
            className="px-4 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90 flex items-center gap-1.5 self-start"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Programme
          </button>
        ) : (
          <div className="flex gap-2 self-start">
            <input
              type="text"
              autoFocus
              value={newProgram}
              onChange={(e) => setNewProgram(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleAddProgram(); }}
              placeholder="New programme name..."
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green"
            />
            <button
              onClick={handleAddProgram}
              className="px-4 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90"
            >
              Create
            </button>
            <button
              onClick={() => { setShowAddProgram(false); setNewProgram(""); }}
              className="px-3 py-2 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {programs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-500 mb-3">No programmes yet. Create your first programme to start building its prospectus.</p>
          <button
            onClick={() => setShowAddProgram(true)}
            className="px-4 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90"
          >
            Add Programme
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div key={program} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-heading text-base font-semibold text-heritage-green">{program}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{(prospectus[program] || []).length} items</span>
                  <button
                    onClick={() => deleteProgram(program)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    title="Delete this programme list"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {(prospectus[program] || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <span className="text-gray-300 text-xs w-5 shrink-0">{i + 1}.</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateItem(program, i, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green"
                    />
                    <button
                      onClick={() => deleteItem(program, i)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      title="Delete item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
                {(prospectus[program] || []).length === 0 && (
                  <p className="text-sm text-gray-400 italic py-2">No items yet. Add one below.</p>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <input
                  type="text"
                  value={newItems[program] || ""}
                  onChange={(e) => setNewItems({ ...newItems, [program]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === "Enter") handleAdd(program); }}
                  placeholder="Add new item..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-heritage-green"
                />
                <button
                  onClick={() => handleAdd(program)}
                  className="px-4 py-2 bg-heritage-green text-white text-sm font-medium rounded-lg hover:bg-heritage-green/90 flex items-center gap-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-400 bg-green-50 border border-green-100 rounded-lg p-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        All changes are saved to the school database. Students will see the list for their placed programme immediately.
      </div>
    </div>
  );
}