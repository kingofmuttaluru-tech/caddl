
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AIAssistant from './components/AIAssistant';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ReportViewer from './components/ReportViewer';
import { AppView, DiagnosticCase } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('public');
  const [searchQuery, setSearchQuery] = useState('');
  const [foundReport, setFoundReport] = useState<DiagnosticCase | null>(null);
  const [searchError, setSearchError] = useState('');

  const handleSearchReport = () => {
    setSearchError('');
    if (!searchQuery.trim()) return;

    const saved = localStorage.getItem('vetiscan_cases');
    if (saved) {
      const cases: DiagnosticCase[] = JSON.parse(saved);
      const report = cases.find(c => c.id === searchQuery || c.mobile === searchQuery);
      if (report) {
        setFoundReport(report);
      } else {
        setSearchError('No report found for the provided ID or Mobile Number.');
      }
    } else {
      setSearchError('System database is currently empty.');
    }
  };

  if (view === 'auth') {
    return <Auth onLogin={() => setView('dashboard')} onBack={() => setView('public')} />;
  }

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('public')} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onStaffClick={() => setView('auth')} />
      <main className="flex-grow">
        <Hero />
        
        {/* Quick Report Finder */}
        <section id="find-report" className="bg-blue-50 py-16 border-y border-blue-100 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center justify-center gap-4">
              <i className="fas fa-file-medical text-blue-600"></i>
              Patient Report Retrieval
            </h2>
            <div className="bg-white p-4 rounded-[2rem] shadow-2xl flex flex-col sm:flex-row gap-4 border border-blue-100">
              <input 
                type="text" 
                placeholder="Enter Mobile Number (10 digits) or Report ID (REP-XXXXXX)" 
                className="flex-grow px-8 py-5 rounded-2xl border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchReport()}
              />
              <button 
                onClick={handleSearchReport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 transform active:scale-95"
              >
                Access Report <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            {searchError && (
              <p className="mt-4 text-sm font-bold text-red-500 bg-red-50 inline-block px-4 py-2 rounded-lg border border-red-100">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {searchError}
              </p>
            )}
            <div className="mt-8 flex justify-center gap-8 text-xs font-black text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><i className="fas fa-shield-alt text-blue-600"></i> Secure Access</span>
              <span className="flex items-center gap-2"><i className="fas fa-clock text-blue-600"></i> Lifetime History</span>
              <span className="flex items-center gap-2"><i className="fas fa-mobile-alt text-blue-600"></i> Result SMS</span>
            </div>
          </div>
        </section>

        <Services />
        <AIAssistant />
        
        {/* About Section */}
        <section id="about" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full -z-10 blur-3xl"></div>
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg mt-8" alt="Clinic" />
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-lg" alt="Equipment" />
                </div>
              </div>
              <div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Our Commitment</span>
                <h2 className="text-4xl font-black text-gray-900 mb-6">Pioneering Veterinary Care through Advanced Technology.</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Founded with a vision to bridge the gap between human-grade diagnostics and veterinary medicine, VetiScan AI offers a specialized hub for pet health monitoring. We don't just provide data; we provide clarity.
                </p>
                <div className="space-y-4">
                  {[
                    "Board-certified Radiologists & Pathologists",
                    "AI-enhanced pattern recognition for rare conditions",
                    "Transparent pricing and referral-friendly systems"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 text-gray-900 font-bold">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]">
                        <i className="fas fa-check"></i>
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <AppointmentForm />
      </main>
      <Footer />
      
      {/* Report Finder Modal (Public) */}
      {foundReport && (
        <ReportViewer report={foundReport} onClose={() => setFoundReport(null)} />
      )}

      {/* Floating Emergency Action */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="tel:+1800VETISCAN"
          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full shadow-2xl shadow-red-200 transition-all transform hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <i className="fas fa-ambulance"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider">Emergency?</span>
            <span className="text-sm font-bold">Call Now</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default App;
