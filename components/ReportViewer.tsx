
import React from 'react';
import { DiagnosticCase } from '../types';

interface ReportViewerProps {
  report: DiagnosticCase;
  onClose: () => void;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ report, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:block overflow-y-auto">
      {/* Container simulating A4 sheet on screen */}
      <div className="bg-white w-full max-w-4xl h-fit min-h-[90vh] print:min-h-0 rounded-3xl shadow-2xl flex flex-col print:shadow-none print:rounded-none print:overflow-visible a4-screen-simulation a4-container animate-in zoom-in-95 duration-200">
        
        {/* Floating Toolbar (Screen only) */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm sticky top-0 z-20 print:hidden rounded-t-3xl">
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <i className="fas fa-print"></i> Download/Print A4 PDF
            </button>
            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
              <i className="fas fa-share-alt"></i> Send to Owner
            </button>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-100 transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Clinical Report Sheet */}
        <div className="p-10 md:p-14 flex-1 print:p-0 bg-white" id="printable-report">
          
          {/* 1. LAB DETAILS (HEADER) */}
          <div className="flex justify-between items-start border-b-4 border-gray-900 pb-8 mb-8">
            <div className="flex items-center gap-5">
              <div className="bg-gray-900 p-4 rounded-xl flex items-center justify-center">
                <i className="fas fa-microscope text-white text-4xl"></i>
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">VetiScan<span className="text-blue-600">AI</span></h1>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mt-2">Laboratory & Diagnostic Centre</p>
                <div className="mt-3 text-[10px] text-gray-500 font-medium space-y-0.5">
                  <p className="font-bold text-gray-700">Registration No: VET-LAB-2025-X01</p>
                  <p>123 Vet Med Parkway, Innovation District, CA 90210</p>
                  <p>Tel: +1 (555) 123-4567 | Email: clinical@vetiscan.ai</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded mb-4">
                CERTIFIED LABORATORY REPORT
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono font-bold text-blue-600">Report #: {report.id}</p>
                <p className="text-xs font-mono font-bold text-gray-600">Sample ID: {report.sampleId}</p>
              </div>
            </div>
          </div>

          {/* 2. OWNER & ANIMAL INFORMATION */}
          <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-xl overflow-hidden mb-8">
            <div className="p-5 border-r border-gray-300">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <i className="fas fa-user-alt text-[8px]"></i> Owner Details
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase text-[9px]">Owner Name:</span><span className="font-black text-gray-900">{report.ownerName}</span></div>
                <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase text-[9px]">Mobile No:</span><span className="font-bold text-gray-900">{report.mobile}</span></div>
                <div className="flex flex-col mt-2 pt-2 border-t border-gray-100">
                  <span className="text-gray-400 font-bold uppercase text-[9px] mb-1">Address:</span>
                  <span className="text-gray-800 font-medium leading-tight">{report.ownerAddress || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="p-5 bg-gray-50/50">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <i className="fas fa-dog text-[8px]"></i> Animal Details
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div className="flex flex-col"><span className="text-gray-400 font-bold uppercase text-[9px]">Pet Name</span><span className="font-black text-gray-900">{report.petName}</span></div>
                <div className="flex flex-col"><span className="text-gray-400 font-bold uppercase text-[9px]">Animal Type</span><span className="font-black text-gray-900">{report.animalType}</span></div>
                <div className="flex flex-col"><span className="text-gray-400 font-bold uppercase text-[9px]">Breed</span><span className="font-bold text-gray-900">{report.breed}</span></div>
                <div className="flex flex-col"><span className="text-gray-400 font-bold uppercase text-[9px]">Age / Sex</span><span className="font-bold text-gray-900">{report.age} / {report.gender}</span></div>
                <div className="flex flex-col col-span-2 mt-1 pt-1 border-t border-gray-100"><span className="text-gray-400 font-bold uppercase text-[9px]">Weight</span><span className="font-black text-blue-700">{report.weight} KG</span></div>
              </div>
            </div>
          </div>

          {/* 3. REPORT METADATA */}
          <div className="grid grid-cols-4 gap-6 mb-8 text-[9px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-6">
            <div className="flex flex-col gap-1">
              <span>Collection Date/Time</span>
              <span className="text-gray-900 text-[11px]">{report.collectionDateTime}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>Report Date/Time</span>
              <span className="text-gray-900 text-[11px]">{report.reportDateTime}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>Sample Type</span>
              <span className="text-gray-900 text-[11px]">{report.sampleType}</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span>Referred By</span>
              <span className="text-blue-600 text-[11px]">DR. {report.doctorName}</span>
            </div>
          </div>

          {/* 4. TEST RESULTS TABLE */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                {report.testName}
              </h3>
              <div className="text-[10px] font-bold text-gray-400">Values in Metric Standard Units</div>
            </div>
            
            <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                    <th className="px-6 py-4 border-b border-gray-300">Test Parameter</th>
                    <th className="px-6 py-4 border-b border-gray-300">Observed Value</th>
                    <th className="px-6 py-4 border-b border-gray-300">Unit</th>
                    <th className="px-6 py-4 border-b border-gray-300 text-right">Biological Reference</th>
                    <th className="px-6 py-4 border-b border-gray-300 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {report.testResults.map((res, i) => (
                    <tr key={i} className={`${res.status === 'Abnormal' ? 'bg-red-50/50' : 'bg-white'} transition-colors`}>
                      <td className="px-6 py-4">
                        <div className="font-black text-gray-800 text-sm">{res.parameter}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-base font-black ${res.status === 'Abnormal' ? 'text-red-600' : 'text-gray-900'}`}>{res.value}</span>
                      </td>
                      <td className="px-6 py-4 text-[10px] text-gray-500 font-black uppercase">{res.unit}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs font-mono font-bold text-gray-500">{res.normalRange}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase inline-flex items-center gap-1 ${res.status === 'Abnormal' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                          {res.status === 'Abnormal' && <i className="fas fa-exclamation-triangle"></i>}
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. DOCTOR SECTION */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="col-span-2 space-y-4">
              <div>
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="fas fa-notes-medical"></i> Doctor Remarks & Interpretation
                </h4>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-xs leading-relaxed text-gray-700 italic min-h-[100px]">
                  {report.doctorRemarks || "Observations correlate with species-specific baseline. Clinical correlation advised. Review after 48 hours if symptomatic progression occurs."}
                </div>
              </div>
              
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                <p className="text-[9px] text-blue-800 font-bold leading-relaxed">
                  <span className="font-black uppercase tracking-widest mr-2 underline">Disclaimer:</span> 
                  This is a laboratory diagnostic report. Results should be interpreted by a licensed veterinarian in conjunction with full clinical history. Laboratory error risk is minimized via automated calibration but not zero.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-end text-center">
              <div className="mb-2">
                <img 
                  src="https://cdn.pixabay.com/photo/2014/11/09/08/06/signature-523237_1280.png" 
                  alt="Signature" 
                  className="h-16 w-auto mix-blend-multiply opacity-80"
                />
              </div>
              <div className="w-full border-b-2 border-gray-900 mb-2"></div>
              <p className="text-sm font-black text-gray-900">DR. SARAH WILSON</p>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Chief Clinical Pathologist</p>
              <p className="text-[8px] text-gray-400 font-bold">Reg: VET-PATH-12903</p>
            </div>
          </div>

          {/* 6. FOOTER */}
          <div className="mt-auto pt-6 border-t border-gray-200 flex justify-between items-center text-gray-400">
            <div className="text-[8px] font-black uppercase tracking-[0.2em] space-y-1">
              <p>VetiScan AI Laboratory Management System (LMS) v2.5</p>
              <p className="text-gray-300 italic">This is a software-generated diagnostic document. No physical seal is required for clinical validity.</p>
            </div>
            <div className="flex items-center gap-4 grayscale opacity-30">
              <i className="fas fa-qrcode text-3xl"></i>
              <div className="text-right">
                <p className="text-[7px] font-black">VALIDATE</p>
                <p className="text-[7px] font-black">AUTHENTICITY</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <span className="text-[9px] text-gray-300 font-black uppercase tracking-[0.5em]">End of Diagnostic Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;
