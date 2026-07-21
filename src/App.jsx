import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import PageNotFound from './lib/PageNotFound';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Public pages
import PublicLayout from '@/components/layout/PublicLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Academics from '@/pages/Academics';
import Admissions from '@/pages/Admissions';
import Contact from '@/pages/Contact';

// Auth pages
import Login from '@/pages/Login';

// Admin pages
import AdminLayout from '@/components/layout/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminPlacements from '@/pages/admin/AdminPlacements';
import AdminTimetable from '@/pages/admin/AdminTimetable';
import AdminAnnouncements from '@/pages/admin/AdminAnnouncements';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminProspectus from '@/pages/admin/AdminProspectus';
import AdminStudents from '@/pages/admin/AdminStudents';
import AdminEnrollment from '@/pages/admin/AdminEnrollment';
import { ProspectusProvider } from '@/lib/prospectusContext';

const AuthenticatedApp = () => {
  const { isLoadingPublicSettings } = useAuth();

  if (isLoadingPublicSettings) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-heritage-cream">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-heritage-green/20 border-t-heritage-green rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-heritage-slate/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public pages with shared layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />

      {/* Admin routes - protected */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/placements" element={<AdminPlacements />} />
          <Route path="/admin/prospectus" element={<AdminProspectus />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/enrollment" element={<AdminEnrollment />} />
          <Route path="/admin/timetable" element={<AdminTimetable />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <ProspectusProvider>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </ProspectusProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App