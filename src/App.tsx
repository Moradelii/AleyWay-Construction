import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { CustomHomesPage } from './pages/CustomHomesPage';
import { ProcessPage } from './pages/ProcessPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ArborValleyPage } from './pages/ArborValleyPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { FinancingPage } from './pages/FinancingPage';
import { OpenBookPricingPage } from './pages/OpenBookPricingPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { WichitaPage } from './pages/WichitaPage';
import { ValleyCenterPage } from './pages/ValleyCenterPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { ScheduleConsultationPage } from './pages/ScheduleConsultationPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#07080a] text-[#f5f2eb] antialiased selection:bg-[#c5a880] selection:text-[#0e0f12]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/custom-homes/" element={<CustomHomesPage />} />
            <Route path="/custom-homes" element={<CustomHomesPage />} />
            <Route path="/our-process/" element={<ProcessPage />} />
            <Route path="/our-process" element={<ProcessPage />} />
            <Route path="/process/" element={<Navigate to="/our-process/" replace />} />
            <Route path="/process" element={<Navigate to="/our-process/" replace />} />
            
            {/* Projects & Community */}
            <Route path="/projects/" element={<ProjectsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/arbor-valley/" element={<ArborValleyPage />} />
            <Route path="/projects/arbor-valley" element={<ArborValleyPage />} />
            <Route path="/projects/:slug/" element={<ProjectDetailPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            
            {/* Gallery & Media */}
            <Route path="/gallery/" element={<GalleryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            
            {/* About & Philosophy */}
            <Route path="/about/" element={<AboutPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Financing & Transparency */}
            <Route path="/financing/" element={<FinancingPage />} />
            <Route path="/financing" element={<FinancingPage />} />
            <Route path="/open-book-pricing/" element={<OpenBookPricingPage />} />
            <Route path="/open-book-pricing" element={<OpenBookPricingPage />} />
            
            {/* Service Areas */}
            <Route path="/service-areas/" element={<ServiceAreasPage />} />
            <Route path="/service-areas" element={<ServiceAreasPage />} />
            <Route path="/service-areas/wichita/" element={<WichitaPage />} />
            <Route path="/service-areas/wichita" element={<WichitaPage />} />
            <Route path="/service-areas/valley-center/" element={<ValleyCenterPage />} />
            <Route path="/service-areas/valley-center" element={<ValleyCenterPage />} />
            
            {/* Reviews */}
            <Route path="/reviews/" element={<ReviewsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            
            {/* Resources / Guides */}
            <Route path="/resources/" element={<ResourcesPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug/" element={<ResourceDetailPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            
            {/* Section 35: Initial SEO Content Cluster Direct Routes */}
            <Route path="/how-much-does-it-cost-to-build-a-home-in-wichita/" element={<Navigate to="/resources/how-much-does-it-cost-to-build-a-home-in-wichita/" replace />} />
            <Route path="/how-much-does-it-cost-to-build-a-home-in-wichita" element={<Navigate to="/resources/how-much-does-it-cost-to-build-a-home-in-wichita/" replace />} />
            <Route path="/how-long-does-it-take-to-build-a-custom-home/" element={<Navigate to="/resources/how-long-does-it-take-to-build-a-custom-home/" replace />} />
            <Route path="/how-long-does-it-take-to-build-a-custom-home" element={<Navigate to="/resources/how-long-does-it-take-to-build-a-custom-home/" replace />} />
            <Route path="/how-to-choose-land-for-a-new-home/" element={<Navigate to="/resources/how-to-choose-land-for-a-new-home/" replace />} />
            <Route path="/how-to-choose-land-for-a-new-home" element={<Navigate to="/resources/how-to-choose-land-for-a-new-home/" replace />} />
            <Route path="/slab-vs-basement-foundation/" element={<Navigate to="/resources/slab-vs-basement-foundation/" replace />} />
            <Route path="/slab-vs-basement-foundation" element={<Navigate to="/resources/slab-vs-basement-foundation/" replace />} />
            <Route path="/custom-home-building-process/" element={<Navigate to="/resources/custom-home-building-process/" replace />} />
            <Route path="/custom-home-building-process" element={<Navigate to="/resources/custom-home-building-process/" replace />} />
            <Route path="/construction-loans-for-new-homes/" element={<Navigate to="/resources/construction-loans-for-new-homes/" replace />} />
            <Route path="/construction-loans-for-new-homes" element={<Navigate to="/resources/construction-loans-for-new-homes/" replace />} />

            {/* Contact & Schedule */}
            <Route path="/contact/" element={<ContactPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/schedule-consultation/" element={<ScheduleConsultationPage />} />
            <Route path="/schedule-consultation" element={<ScheduleConsultationPage />} />
            
            {/* Legal */}
            <Route path="/privacy/" element={<PrivacyPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms/" element={<TermsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            
            {/* Internal CRM / Principal Dashboard (Section 62) */}
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
