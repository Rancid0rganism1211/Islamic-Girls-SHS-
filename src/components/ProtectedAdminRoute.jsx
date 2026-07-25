import { Outlet, Navigate } from 'react-router-dom';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const AdminLoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-[#123E30] rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-600 font-medium">Verifying administrative privileges...</p>
    </div>
  </div>
);

export default function ProtectedAdminRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      setIsAuthorized(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsLoading(false);
        setIsAuthorized(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <AdminLoadingFallback />;
  }

  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
