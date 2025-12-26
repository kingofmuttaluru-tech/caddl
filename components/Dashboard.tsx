
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
    ]
  },
  {
    name: 'RFT (Renal Function Test)',
    parameters: [
      { parameter: 'BUN (Blood Urea Nitrogen)', unit: 'mg/dL', normalRange: '7 - 27' },
      { parameter: 'Serum Creatinine', unit: 'mg/dL', normalRange: '0.5 - 1.8' },
      { parameter: 'Urea', unit: 'mg/dL', normalRange: '10 - 45' },
    ]
  },
  {
    name: 'Biochemistry (General)',
    parameters: [
      { parameter: 'Glucose (Random)', unit: 'mg/dL', normalRange: '70 - 143' },
      { parameter: 'Cholesterol', unit: 'mg/dL', normalRange: '110 - 320' },
      { parameter: 'Calcium', unit: 'mg/dL', normalRange: '9.0 - 11.3' },
    ]
  },
  {
    name: 'Faecal Examination',
    parameters: [
      { parameter: 'Color & Consistency', unit: '-', normalRange: 'Brown/Formed' },
      { parameter: 'Ova / Cysts', unit: '-', normalRange: 'Not Detected' },
      { parameter: 'Occult Blood', unit: '-', normalRange: 'Negative' },
    ]
  },
  {
    name: 'Skin Scraping',
    parameters: [
      { parameter: 'Ectoparasites', unit: '-', normalRange: 'Not Detected' },
      { parameter: 'Fungal Culture', unit: '-', normalRange: 'No Growth' },
    ]
  },
  {
    name: 'Milk Test',
    parameters: [
      { parameter: 'Somatic Cell Count', unit: 'cells/ml', normalRange: '< 2,00,000' },
      { parameter: 'CMT', unit: '-', normalRange: 'Negative' },
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
  
  const [formData, setFormData] = useState<Partial<DiagnosticCase>>({
    animalType: 'Dog',
    gender: 'Male',
    status: 'Pending',
    sampleType: 'Whole Blood (EDTA)',
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
        testResults: template.parameters.map(p => ({ ...p, value: '', status: 'Normal' }))
      });
    }
  };

  const handleValueChange = (index: number, value: string) => {
    const results = [...(formData.testResults || [])];
    results[index].value = value;
    const range = results[index].normalRange;
    if (range.includes(' - ')) {
      const [min, max] = range.split(' - ').map(Number);
      const val = Number(value);
      if (!isNaN(min) && !isNaN(max) && !isNaN(val)) {
        results[index].status = (val < min || val > max) ? 'Abnormal' : 'Normal';
      }
    }
    setFormData({ ...formData, testResults: results });
  };

  const handleStatusChange = (index: number, status: 'Normal' | 'Abnormal') => {
    const results = [...(formData.testResults || [])];
    results[index].status = status;
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
    const now = new Date();
    const formattedDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const caseData: DiagnosticCase = {
      ...(formData as DiagnosticCase),
      id: 'REP-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      sampleId: 'SID-' + Math.floor(100000 + Math.random() * 900000),
      collectionDateTime: formattedDate,
      reportDateTime: formattedDate,
      createdAt: formattedDate,
      status: 'Completed'
    };
    
    const updated = [caseData, ...cases];
    setCases(updated);
    localStorage.setItem('vetiscan_cases', JSON.stringify(updated));
    setShowForm(false);
    setIsConfirming(false);
    setFormData({ animalType: 'Dog', gender: 'Male', status: 'Pending', sampleType: 'Whole Blood (EDTA)', testResults: [] });
  };

  const filteredCases = cases.filter(c => 
    c.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.mobile.includes(searchTerm) ||
    c.id.includes(searchTerm) ||
    c.petName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2 border-b border-gray-800">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <i className="fas fa-microscope text-white"></i>
          </div>
          <span className="font-bold text-lg tracking-tight">Staff Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('reports')} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'reports' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
            <i className="fas fa-file-medical"></i> Reports Hub
          </button>
          <button onClick={() => setActiveTab('summary')} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'summary' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
            <i className="fas fa-chart-pie"></i> Center Summary
          </button>
          <button onClick={() => setActiveTab('staff')} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'staff' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
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
            <p className="text-gray-500">Innovation District Hub-01</p>
          </div>
          {activeTab === 'reports' && (
            <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2">
              <i className="fas fa-plus"></i> New Investigation
            </button>
          )}
        </header>

        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Patient History</h2>
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="text" placeholder="Search Pet, ID, Mobile or Owner..." className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none w-80 text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                        <span className="font-bold text-gray-900">{c.petName} <span className="text-gray-400 font-medium">({c.animalType})</span></span>
                        <span className="text-xs text-gray-500">{c.gender}, {c.age}, {c.weight}kg</span>
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
                      <button onClick={() => setViewingReport(c)} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-blue-600 transition-colors">
                        <i className="fas fa-eye"></i> View Report
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
      </main>

      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {isConfirming ? 'Step 3: Verify Clinical Data' : 'Clinical Entry Form'}
              </h2>
              <button onClick={() => { setShowForm(false); setIsConfirming(false); }} className="text-gray-400 hover:text-gray-900">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {!isConfirming ? (
              <form onSubmit={handleReview} className="p-8 space-y-10">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-black text-blue-600 uppercase text-[10px] tracking-widest border-b pb-2">1. Owner Information</h3>
                    <input required type="text" placeholder="Full Name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200" value={formData.ownerName || ''} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
                    <input required type="tel" placeholder="Mobile" className="w-full px-4 py-2.5 rounded-xl border border-gray-200" value={formData.mobile || ''} onChange={e => setFormData({...formData, mobile: e.target.value})} />
                    <textarea placeholder="Residential Address" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 h-24" value={formData.ownerAddress || ''} onChange={e => setFormData({...formData, ownerAddress: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-black text-blue-600 uppercase text-[10px] tracking-widest border-b pb-2">2. Animal Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input required type="text" placeholder="Pet Name" className="col-span-2 px-4 py-2.5 rounded-xl border border-gray-200" value={formData.petName || ''} onChange={e => setFormData({...formData, petName: e.target.value})} />
                      <select className="px-4 py-2.5 rounded-xl border border-gray-200" value={formData.animalType} onChange={e => setFormData({...formData, animalType: e.target.value})}>
                        <option>Dog</option><option>Cat</option><option>Cow</option><option>Buffalo</option><option>Goat</option><option>Sheep</option>
                      </select>
                      <input required type="text" placeholder="Breed" className="px-4 py-2.5 rounded-xl border border-gray-200" value={formData.breed || ''} onChange={e => setFormData({...formData, breed: e.target.value})} />
                      <input required type="text" placeholder="Age" className="px-4 py-2.5 rounded-xl border border-gray-200" value={formData.age || ''} onChange={e => setFormData({...formData, age: e.target.value})} />
                      <input required type="text" placeholder="Weight (kg)" className="px-4 py-2.5 rounded-xl border border-gray-200" value={formData.weight || ''} onChange={e => setFormData({...formData, weight: e.target.value})} />
                      <select className="col-span-2 px-4 py-2.5 rounded-xl border border-gray-200" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as any})}>
                        <option>Male</option><option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-black text-blue-600 uppercase text-[10px] tracking-widest border-b pb-2">3. Sample & Referral</h3>
                    <input required type="text" placeholder="Referring Doctor Name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200" value={formData.doctorName || ''} onChange={e => setFormData({...formData, doctorName: e.target.value})} />
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200" value={formData.sampleType} onChange={e => setFormData({...formData, sampleType: e.target.value})}>
                      <option>Whole Blood (EDTA)</option><option>Serum</option><option>Plasma</option><option>Urine</option><option>Faecal Sample</option><option>Skin Scraping</option><option>Milk</option>
                    </select>
                    <label className="block text-xs font-bold text-gray-500 uppercase mt-4">Select Template</label>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border p-2 rounded-xl">
                      {TEST_TEMPLATES.map(t => (
                        <button key={t.name} type="button" onClick={() => handleTemplateSelect(t.name)} className={`text-left px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${formData.testName === t.name ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100'}`}>
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {formData.testResults && formData.testResults.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-black text-blue-600 uppercase text-[10px] tracking-widest border-b pb-2">4. Findings for {formData.testName}</h3>
                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-[10px] font-black uppercase text-gray-400">
                          <tr>
                            <th className="px-6 py-3 text-left">Parameter</th>
                            <th className="px-6 py-3 text-left w-1/4">Value</th>
                            <th className="px-6 py-3 text-left w-1/4">Normal Range</th>
                            <th className="px-6 py-3 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {formData.testResults.map((res, i) => (
                            <tr key={i}>
                              <td className="px-6 py-3 font-bold">{res.parameter} <span className="text-[10px] text-gray-400">({res.unit})</span></td>
                              <td className="px-6 py-3"><input required type="text" value={res.value} onChange={e => handleValueChange(i, e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" /></td>
                              <td className="px-6 py-3"><input type="text" value={res.normalRange} onChange={e => handleRangeChange(i, e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs" /></td>
                              <td className="px-6 py-3"><select value={res.status} onChange={e => handleStatusChange(i, e.target.value as any)} className={`px-2 py-1 rounded font-bold text-xs ${res.status === 'Abnormal' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                <option>Normal</option><option>Abnormal</option>
                              </select></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Doctor's Remarks</h4>
                      <textarea placeholder="Enter clinical observations or interpretations..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 h-24" value={formData.doctorRemarks || ''} onChange={e => setFormData({...formData, doctorRemarks: e.target.value})} />
                    </div>
                  </div>
                )}
                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-xl shadow-xl hover:bg-blue-700 transition-all">Generate Clinical Summary</button>
              </form>
            ) : (
              <div className="p-8 space-y-10">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 grid grid-cols-3 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Owner</p>
                    <p className="font-bold text-gray-900">{formData.ownerName}</p>
                    <p className="text-xs text-gray-500">{formData.mobile}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Patient</p>
                    <p className="font-bold text-gray-900">{formData.petName} ({formData.animalType})</p>
                    <p className="text-xs text-gray-500">{formData.breed} • {formData.weight}kg</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Investigation</p>
                    <p className="font-bold text-blue-600">{formData.testName}</p>
                    <p className="text-xs text-gray-500">{formData.sampleType}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <tr><th className="px-6 py-4 text-left">Parameter</th><th className="px-6 py-4 text-left">Result</th><th className="px-6 py-4 text-left">Range</th><th className="px-6 py-4 text-left">Flag</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.testResults?.map((res, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 font-bold">{res.parameter}</td>
                          <td className="px-6 py-4 font-black text-blue-700">{res.value} {res.unit}</td>
                          <td className="px-6 py-4 text-xs font-mono">{res.normalRange}</td>
                          <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${res.status === 'Abnormal' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>{res.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsConfirming(false)} className="px-8 py-4 rounded-xl border-2 border-gray-100 font-black text-gray-400">Edit Data</button>
                  <button onClick={handleFinalSave} className="flex-1 px-8 py-4 rounded-xl bg-green-600 text-white font-black shadow-xl shadow-green-200 hover:bg-green-700 transition-all">Authorize & Sign Final Report</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {viewingReport && <ReportViewer report={viewingReport} onClose={() => setViewingReport(null)} />}
    </div>
  );
};

export default Dashboard;
