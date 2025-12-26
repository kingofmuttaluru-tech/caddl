
import React, { useState, useEffect } from 'react';
import { DiagnosticCase, StaffMember, TestTemplate, TestResult } from '../types';
import ReportViewer from './ReportViewer';

const TEST_TEMPLATES: TestTemplate[] = [
  {
    name: 'CBP (Complete Blood Picture)',
    parameters: [
      { parameter: 'Hemoglobin (Hb)', unit: 'g/dL', normalRange: '12.0 - 18.0' },
      { parameter: 'Total WBC Count', unit: 'cells/mm3', normalRange: '6,000 - 17,000' },
      { parameter: 'RBC Count', unit: 'million/mm3', normalRange: '5.5 - 8.5' },
      { parameter: 'Platelet Count', unit: 'lakhs/mm3', normalRange: '2.0 - 5.0' },
      { parameter: 'PCV / Hematocrit', unit: '%', normalRange: '37 - 55' },
      { parameter: 'Neutrophils', unit: '%', normalRange: '60 - 77' },
      { parameter: 'Lymphocytes', unit: '%', normalRange: '12 - 30' },
    ]
  },
  {
    name: 'LFT (Liver Function Test)',
    parameters: [
      { parameter: 'ALT (SGPT)', unit: 'U/L', normalRange: '10 - 100' },
      { parameter: 'AST (SGOT)', unit: 'U/L', normalRange: '10 - 50' },
      { parameter: 'ALP (Alk. Phosphatase)', unit: 'U/L', normalRange: '20 - 150' },
      { parameter: 'Total Bilirubin', unit: 'mg/dL', normalRange: '0.1 - 0.4' },
      { parameter: 'Total Protein', unit: 'g/dL', normalRange: '5.2 - 8.2' },
      { parameter: 'Albumin', unit: 'g/dL', normalRange: '2.3 - 4.0' },
      { parameter: 'Globulin', unit: 'g/dL', normalRange: '2.5 - 4.5' },
    ]
  },
  {
    name: 'RFT (Renal Function Test)',
    parameters: [
      { parameter: 'BUN (Blood Urea Nitrogen)', unit: 'mg/dL', normalRange: '7 - 27' },
      { parameter: 'Serum Creatinine', unit: 'mg/dL', normalRange: '0.5 - 1.8' },
      { parameter: 'Urea', unit: 'mg/dL', normalRange: '10 - 45' },
      { parameter: 'Calcium', unit: 'mg/dL', normalRange: '9.0 - 11.3' },
      { parameter: 'Phosphorus', unit: 'mg/dL', normalRange: '2.5 - 6.8' },
    ]
  },
  {
    name: 'Biochemistry (General Profile)',
    parameters: [
      { parameter: 'Glucose (Random)', unit: 'mg/dL', normalRange: '70 - 143' },
      { parameter: 'Cholesterol', unit: 'mg/dL', normalRange: '110 - 320' },
      { parameter: 'Amylase', unit: 'U/L', normalRange: '500 - 1500' },
      { parameter: 'Lipase', unit: 'U/L', normalRange: '200 - 1800' },
      { parameter: 'CPK', unit: 'U/L', normalRange: '10 - 200' },
    ]
  },
  {
    name: 'Microbiology (Culture & Sensitivity)',
    parameters: [
      { parameter: 'Specimen Type', unit: '-', normalRange: 'Varies' },
      { parameter: 'Gram Stain Findings', unit: '-', normalRange: 'No Pathogenic Organisms' },
      { parameter: 'Growth after 24h', unit: '-', normalRange: 'Sterile' },
      { parameter: 'Antibiotic Sensitivity', unit: '-', normalRange: 'As observed' },
    ]
  },
  {
    name: 'Faecal Examination',
    parameters: [
      { parameter: 'Color & Consistency', unit: '-', normalRange: 'Brown/Formed' },
      { parameter: 'Mucus / Blood', unit: '-', normalRange: 'Absent' },
      { parameter: 'Ova / Cysts', unit: '-', normalRange: 'Not Detected' },
      { parameter: 'Protozoal Findings', unit: '-', normalRange: 'Not Detected' },
    ]
  },
  {
    name: 'Skin Scraping',
    parameters: [
      { parameter: 'Mites (Sarcoptes/Demodex)', unit: '-', normalRange: 'Not Detected' },
      { parameter: 'Fungal Hyphae', unit: '-', normalRange: 'Not Detected' },
      { parameter: 'Bacterial Findings', unit: '-', normalRange: 'Normal Flora Only' },
      { parameter: 'Cellular Findings', unit: '-', normalRange: 'Varies' },
    ]
  },
  {
    name: 'Milk Test (Mastitis Screening)',
    parameters: [
      { parameter: 'Appearance (Milk)', unit: '-', normalRange: 'Normal White' },
      { parameter: 'Somatic Cell Count', unit: 'cells/ml', normalRange: '< 2,00,000' },
      { parameter: 'pH Level', unit: '-', normalRange: '6.5 - 6.7' },
      { parameter: 'California Mastitis Test (CMT)', unit: '-', normalRange: 'Negative' },
    ]
  }
];

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'reports' | 'staff' | 'summary'>('reports');
  const [cases, setCases] = useState<DiagnosticCase[]>([]);
  const [staff] = useState<StaffMember[]>([
    { id: '1', name: 'Dr. Sarah Wilson', role: 'Admin', username: 'admin_01', lastLogin: 'Today, 09:15 AM' },
    { id: '2', name: 'James Carter', role: 'Technician', username: 'tech_02', lastLogin: 'Today, 10:30 AM' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingReport, setViewingReport] = useState<DiagnosticCase | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<DiagnosticCase>>({
    animalType: 'Dog',
    gender: 'Male',
    status: 'Pending',
    testResults: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('vetiscan_cases');
    if (saved) setCases(JSON.parse(saved));
  }, []);

  const handleTemplateSelect = (templateName: string) => {
    const template = TEST_TEMPLATES.find(t => t.name === templateName);
    if (template) {
      setFormData({
        ...formData,
        testName: template.name,
        testResults: template.parameters.map(p => ({ ...p, value: '' }))
      });
    }
  };

  const handleValueChange = (index: number, value: string) => {
    const results = [...(formData.testResults || [])];
    results[index].value = value;
    setFormData({ ...formData, testResults: results });
  };

  const handleRangeChange = (index: number, range: string) => {
    const results = [...(formData.testResults || [])];
    results[index].normalRange = range;
    setFormData({ ...formData, testResults: results });
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.testName || formData.testResults?.length === 0) {
      alert("Please select a test template first.");
      return;
    }
    setIsConfirming(true);
  };

  const handleFinalSave = () => {
    const caseData: DiagnosticCase = {
      ...(formData as DiagnosticCase),
      id: 'REP-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Completed'
    };
    const updated = [caseData, ...cases];
    setCases(updated);
    localStorage.setItem('vetiscan_cases', JSON.stringify(updated));
    setShowForm(false);
    setIsConfirming(false);
    setFormData({ animalType: 'Dog', gender: 'Male', status: 'Pending', testResults: [] });
  };

  const filteredCases = cases.filter(c => 
    c.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.mobile.includes(searchTerm) ||
    c.id.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2 border-b border-gray-800">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <i className="fas fa-microscope text-white"></i>
          </div>
          <span className="font-bold text-lg tracking-tight">Staff Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('reports')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'reports' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <i className="fas fa-file-medical"></i> Reports Hub
          </button>
          <button 
             onClick={() => setActiveTab('summary')}
             className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'summary' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <i className="fas fa-chart-pie"></i> Center Summary
          </button>
          <button 
            onClick={() => setActiveTab('staff')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'staff' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <i className="fas fa-users-cog"></i> Staff Mgmt
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={onLogout} className="w-full px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-sm">
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === 'reports' && 'Diagnostic Management'}
              {activeTab === 'staff' && 'Personnel & Access'}
              {activeTab === 'summary' && 'Diagnostic Analytics'}
            </h1>
            <p className="text-gray-500">Center: Innovation District Hub-01</p>
          </div>
          {activeTab === 'reports' && (
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2"
            >
              <i className="fas fa-plus"></i> New Report Entry
            </button>
          )}
        </header>

        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Patient Diagnostic History</h2>
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="Search ID, Mobile or Owner..." 
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none w-80 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-4">Report ID</th>
                  <th className="px-6 py-4">Pet Details</th>
                  <th className="px-6 py-4">Owner Contact</th>
                  <th className="px-6 py-4">Investigation</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">{c.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{c.animalType} ({c.breed})</span>
                        <span className="text-xs text-gray-500">{c.gender}, {c.age}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{c.ownerName}</span>
                        <span className="text-xs text-gray-500">{c.mobile}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                        {c.testName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setViewingReport(c)}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-blue-600 transition-colors"
                      >
                        <i className="fas fa-eye"></i> View/Print
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCases.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-400">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="p-12 text-center text-gray-500">Center Analytics module coming soon.</div>
        )}

        {activeTab === 'staff' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-6 border-b border-gray-100 bg-gray-50 font-bold">Authorized Personnel</div>
             <div className="divide-y divide-gray-100">
                {staff.map(s => (
                  <div key={s.id} className="p-6 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.role} • @{s.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Last seen: {s.lastLogin}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>

      {/* Case Entry Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {isConfirming ? 'Step 3: Confirm and Generate Report' : 'New Investigation Entry'}
              </h2>
              <button onClick={() => { setShowForm(false); setIsConfirming(false); }} className="text-gray-400 hover:text-gray-900">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {!isConfirming ? (
              <form onSubmit={handleReview} className="p-8 space-y-8">
                {/* Step 1: Basic Info */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-black text-blue-600 uppercase text-[10px] tracking-widest border-b pb-2">1. Patient & Owner Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="Owner Name" className="col-span-2 px-4 py-2.5 rounded-xl border border-gray-200" onChange={e => setFormData({...formData, ownerName: e.target.value})} />
                      <input required type="tel" placeholder="Mobile (for result retrieval)" className="col-span-2 px-4 py-2.5 rounded-xl border border-gray-200" onChange={e => setFormData({...formData, mobile: e.target.value})} />
                      <select className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-sm" onChange={e => setFormData({...formData, animalType: e.target.value})}>
                        <option>Dog</option><option>Cat</option><option>Cow</option><option>Buffalo</option><option>Goat/Sheep</option><option>Horse</option><option>Bird</option>
                      </select>
                      <input required type="text" placeholder="Breed" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm" onChange={e => setFormData({...formData, breed: e.target.value})} />
                      <input required type="text" placeholder="Age" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm" onChange={e => setFormData({...formData, age: e.target.value})} />
                      <select className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold" onChange={e => setFormData({...formData, gender: e.target.value as any})}>
                        <option>Male</option><option>Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-black text-blue-600 uppercase text-[10px] tracking-widest border-b pb-2">2. Investigation Selection</h3>
                    <input required type="text" placeholder="Referring Veterinarian" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 mb-4" onChange={e => setFormData({...formData, doctorName: e.target.value})} />
                    
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {TEST_TEMPLATES.map(t => (
                        <button
                          key={t.name}
                          type="button"
                          onClick={() => handleTemplateSelect(t.name)}
                          className={`text-left px-4 py-2 rounded-xl border-2 transition-all font-bold text-xs ${formData.testName === t.name ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 hover:border-blue-200'}`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 2: Dynamic Values Entry */}
                {formData.testResults && formData.testResults.length > 0 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="font-black text-blue-600 uppercase text-[10px] tracking-widest border-b pb-2">3. Enter Observation Values for: {formData.testName}</h3>
                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                      <table className="w-full">
                        <thead className="bg-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                          <tr>
                            <th className="px-6 py-3 text-left">Parameter</th>
                            <th className="px-6 py-3 text-left">Input Value</th>
                            <th className="px-6 py-3 text-left w-1/4">Edit Normal Range (Optional)</th>
                            <th className="px-6 py-3 text-left">Unit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {formData.testResults.map((res, i) => (
                            <tr key={res.parameter}>
                              <td className="px-6 py-3 font-bold text-gray-700 text-sm">{res.parameter}</td>
                              <td className="px-6 py-3">
                                <input 
                                  required
                                  type="text" 
                                  value={res.value}
                                  onChange={e => handleValueChange(i, e.target.value)}
                                  className="w-full px-4 py-2 rounded-lg border-2 border-transparent focus:border-blue-500 bg-white shadow-sm outline-none text-sm font-black text-blue-700 placeholder:text-gray-300 transition-all"
                                  placeholder="Value..."
                                />
                              </td>
                              <td className="px-6 py-3">
                                <input 
                                  type="text" 
                                  value={res.normalRange}
                                  onChange={e => handleRangeChange(i, e.target.value)}
                                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-400 bg-white/50 outline-none text-xs font-mono text-blue-500"
                                  placeholder="Range..."
                                />
                              </td>
                              <td className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase">{res.unit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white pb-4">
                  <button 
                    type="submit" 
                    className="flex-1 px-8 py-4 rounded-xl bg-blue-600 text-white font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform active:scale-[0.98]"
                  >
                    Proceed to Review & Confirm
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 space-y-8 animate-in fade-in duration-300">
                <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                  <h3 className="text-blue-900 font-black mb-6 flex items-center gap-3">
                    <i className="fas fa-clipboard-check text-xl"></i> Final Verification Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div><p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Owner</p><p className="font-bold text-gray-900">{formData.ownerName}</p></div>
                    <div><p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Animal</p><p className="font-bold text-gray-900">{formData.animalType} ({formData.breed})</p></div>
                    <div><p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Investigation</p><p className="font-bold text-blue-600 underline">{formData.testName}</p></div>
                    <div><p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Doctor</p><p className="font-bold text-gray-900">Dr. {formData.doctorName}</p></div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4 text-left">Parameter</th>
                        <th className="px-6 py-4 text-left">Reported Value</th>
                        <th className="px-6 py-4 text-left">Reference Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.testResults?.map((res) => (
                        <tr key={res.parameter}>
                          <td className="px-6 py-4 font-bold text-gray-700 text-sm">{res.parameter}</td>
                          <td className="px-6 py-4 font-black text-blue-700 text-lg">{res.value} <span className="text-[10px] text-gray-400 uppercase">{res.unit}</span></td>
                          <td className="px-6 py-4 text-xs font-mono font-bold text-gray-400">{res.normalRange}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setIsConfirming(false)} className="px-8 py-4 rounded-xl border-2 border-gray-100 font-black text-gray-400 hover:bg-gray-50 transition-colors">Edit Values</button>
                  <button 
                    onClick={handleFinalSave} 
                    className="flex-1 px-8 py-4 rounded-xl bg-green-600 text-white font-black shadow-xl shadow-green-200 hover:bg-green-700 transition-all"
                  >
                    Confirm & Generate Final Report ID
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {viewingReport && (
        <ReportViewer report={viewingReport} onClose={() => setViewingReport(null)} />
      )}
    </div>
  );
};

export default Dashboard;
