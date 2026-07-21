const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const ProspectusContext = createContext();

const buildMaps = (items) => {
  const sorted = [...items].sort(
    (a, b) => new Date(a.created_date) - new Date(b.created_date)
  );
  const pMap = {};
  const rMap = {};
  sorted.forEach((r) => {
    if (!pMap[r.programme]) {
      pMap[r.programme] = [];
      rMap[r.programme] = [];
    }
    pMap[r.programme].push(r.item);
    rMap[r.programme].push({ id: r.id, item: r.item });
  });
  return { pMap, rMap };
};

export function ProspectusProvider({ children }) {
  const [prospectus, setProspectus] = useState({});
  const [records, setRecords] = useState({});
  const [loaded, setLoaded] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    const load = async () => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        const items = await db.entities.ProspectusItem.list();
        const { pMap, rMap } = buildMaps(items);
        setProspectus(pMap);
        setRecords(rMap);
      } catch {
        setProspectus({});
      } finally {
        setLoaded(true);
        loadingRef.current = false;
      }
    };
    load();
  }, []);

  const addItem = (programme, item) => {
    const value = item.trim();
    if (!value) return;
    setProspectus((prev) => ({
      ...prev,
      [programme]: [...(prev[programme] || []), value],
    }));
    db.entities.ProspectusItem.create({ programme, item: value }).then((rec) => {
      setRecords((prev) => ({
        ...prev,
        [programme]: [...(prev[programme] || []), { id: rec.id, item: value }],
      }));
    });
  };

  const updateItem = (programme, index, value) => {
    const rec = (records[programme] || [])[index];
    setProspectus((prev) => {
      const list = [...(prev[programme] || [])];
      list[index] = value;
      return { ...prev, [programme]: list };
    });
    if (rec) {
      db.entities.ProspectusItem.update(rec.id, { item: value });
      setRecords((prev) => {
        const list = [...(prev[programme] || [])];
        list[index] = { ...list[index], item: value };
        return { ...prev, [programme]: list };
      });
    }
  };

  const deleteItem = (programme, index) => {
    const rec = (records[programme] || [])[index];
    setProspectus((prev) => ({
      ...prev,
      [programme]: (prev[programme] || []).filter((_, i) => i !== index),
    }));
    setRecords((prev) => ({
      ...prev,
      [programme]: (prev[programme] || []).filter((_, i) => i !== index),
    }));
    if (rec) db.entities.ProspectusItem.delete(rec.id);
  };

  const addProgram = (programme) => {
    const name = programme.trim();
    if (!name) return;
    setProspectus((prev) => (prev[name] ? prev : { ...prev, [name]: [] }));
    setRecords((prev) => (prev[name] ? prev : { ...prev, [name]: [] }));
  };

  const deleteProgram = (programme) => {
    setProspectus((prev) => {
      const n = { ...prev };
      delete n[programme];
      return n;
    });
    setRecords((prev) => {
      const n = { ...prev };
      delete n[programme];
      return n;
    });
    db.entities.ProspectusItem.deleteMany({ programme });
  };

  return (
    <ProspectusContext.Provider
      value={{ prospectus, addItem, updateItem, deleteItem, addProgram, deleteProgram, loaded }}
    >
      {children}
    </ProspectusContext.Provider>
  );
}

export const useProspectus = () => useContext(ProspectusContext);