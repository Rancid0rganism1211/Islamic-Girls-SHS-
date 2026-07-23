import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit as limitFn,
  writeBatch,
  deleteField
} from 'firebase/firestore';

// Demo mode fallback when Firebase is not configured
const demoMode = !db;

export const entities = {
  list: async (collectionName, orderByField = null, limit = 50) => {
    if (demoMode) return [];
    
    const colRef = collection(db, collectionName);
    let q = colRef;
    
    if (orderByField) {
      const isDesc = orderByField.startsWith('-');
      const field = isDesc ? orderByField.slice(1) : orderByField;
      q = query(colRef, orderBy(field, isDesc ? 'desc' : 'asc'));
    }
    
    if (limit) {
      q = query(q, limitFn(limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  filter: async (collectionName, filterObj) => {
    if (demoMode) return [];
    
    const colRef = collection(db, collectionName);
    const constraints = Object.entries(filterObj).map(([key, value]) => 
      where(key, '==', value)
    );
    const q = query(colRef, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  get: async (collectionName, id) => {
    if (demoMode) return null;
    
    const docRef = doc(db, collectionName, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  },

  create: async (collectionName, data) => {
    if (demoMode) return { id: 'demo-' + Date.now(), ...data };
    
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, {
      ...data,
      created_date: new Date().toISOString()
    });
    return { id: docRef.id, ...data };
  },

  update: async (collectionName, id, data) => {
    if (demoMode) return { id, ...data };
    
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updated_date: new Date().toISOString()
    });
    return { id, ...data };
  },

  delete: async (collectionName, id) => {
    if (demoMode) return;
    
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },

  deleteMany: async (collectionName, filterObj = {}) => {
    if (demoMode) return;
    
    const colRef = collection(db, collectionName);
    let q = colRef;
    
    if (Object.keys(filterObj).length > 0) {
      const constraints = Object.entries(filterObj).map(([key, value]) => 
        where(key, '==', value)
      );
      q = query(colRef, ...constraints);
    }
    
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  },

  bulkCreate: async (collectionName, dataArray) => {
    if (demoMode) return dataArray.map((data, i) => ({ id: 'demo-' + i, ...data }));
    
    const colRef = collection(db, collectionName);
    const batch = writeBatch(db);
    const results = [];
    
    dataArray.forEach(data => {
      const newDocRef = doc(colRef);
      batch.set(newDocRef, {
        ...data,
        created_date: new Date().toISOString()
      });
      results.push({ id: newDocRef.id, ...data });
    });
    
    await batch.commit();
    return results;
  }
};

export const dbEntities = {
  Placement: {
    list: (orderBy, limit) => entities.list('placements', orderBy, limit),
    filter: (filter) => entities.filter('placements', filter),
    get: (id) => entities.get('placements', id),
    create: (data) => entities.create('placements', data),
    update: (id, data) => entities.update('placements', id, data),
    delete: (id) => entities.delete('placements', id),
    deleteMany: (filter) => entities.deleteMany('placements', filter),
    bulkCreate: (data) => entities.bulkCreate('placements', data)
  },
  Announcement: {
    list: (orderBy, limit) => entities.list('announcements', orderBy, limit),
    filter: (filter) => entities.filter('announcements', filter),
    get: (id) => entities.get('announcements', id),
    create: (data) => entities.create('announcements', data),
    update: (id, data) => entities.update('announcements', id, data),
    delete: (id) => entities.delete('announcements', id)
  },
  SchoolEvent: {
    list: (orderBy, limit) => entities.list('school_events', orderBy, limit),
    filter: (filter) => entities.filter('school_events', filter),
    get: (id) => entities.get('school_events', id),
    create: (data) => entities.create('school_events', data),
    update: (id, data) => entities.update('school_events', id, data),
    delete: (id) => entities.delete('school_events', id)
  },
  Timetable: {
    list: (orderBy, limit) => entities.list('timetables', orderBy, limit),
    filter: (filter) => entities.filter('timetables', filter),
    get: (id) => entities.get('timetables', id),
    create: (data) => entities.create('timetables', data),
    update: (id, data) => entities.update('timetables', id, data),
    delete: (id) => entities.delete('timetables', id)
  },
  SiteSetting: {
    list: (orderBy, limit) => entities.list('site_settings', orderBy, limit),
    filter: (filter) => entities.filter('site_settings', filter),
    get: (id) => entities.get('site_settings', id),
    create: (data) => entities.create('site_settings', data),
    update: (id, data) => entities.update('site_settings', id, data),
    delete: (id) => entities.delete('site_settings', id),
    bulkCreate: (data) => entities.bulkCreate('site_settings', data)
  }
};
