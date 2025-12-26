
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
              <i className="fas fa-print"></i> Print as PDF / A4
            </button>
            <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
              <i className="fas fa-file-export"></i> Export CSV
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
        <div className="p-10 md:p-16 flex-1 print:p-0 bg-white" id="printable-report">
          
          {/* Top Header - Clinical Brand */}
          <div className="flex justify-between items-start border-b-2 border-gray-900 pb-8 mb-10">
            <div className="flex items-center gap-6">
              <div className="bg-gray-900 p-4 rounded-2xl">
                <i className="fas fa-microscope text-white text-4xl"></i>
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">VetiScan<span className="text-blue-600">AI</span></h1>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mt-2">Laboratory & Diagnostic Centre</p>
                <div className="mt-3 text-[10px] text-gray-500 font-medium space-y-0.5">
                  <p>ISO 9001:2015 Certified Diagnostic Facility</p>
                  <p>123 Vet Med Parkway, Innovation District, CA 90210</p>
                  <p>Web: www.vetiscan.ai | Tel: +1 (800) VETI-SCAN</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded mb-4 border border-blue-100">
                Final Pathological Report
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">CLINICAL RECORD</h2>
              <p className="text-xs font-mono font-bold text-blue-600 tracking-tight">SID: {report.id}</p>
              <p className="text-[10px] text-gray-400 mt-1 font-bold">Reported on {report.createdAt}</p>
            </div>
          </div>

          {/* Identification Block */}
          <div className="grid grid-cols-2 gap-12 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 border-b border-blue-100 pb-1">Patient Demographics</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="text-gray-500 font-bold uppercase">Patient ID</span>
                <span className="text-gray-900 font-black">PET-{Math.floor(Math.random() * 90000)}</span>
                
                <span className="text-gray-500 font-bold uppercase">Species/Breed</span>
                <span className="text-gray-900 font-black">{report.animalType} / {report.breed}</span>
                
                <span className="text-gray-500 font-bold uppercase">Age / Sex</span>
                <span className="text-gray-900 font-black">{report.age} / {report.gender}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 border-b border-blue-100 pb-1">Referral Information</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="text-gray-500 font-bold uppercase">Client Name</span>
                <span className="text-gray-900 font-black">{report.ownerName}</span>
                
                <span className="text-gray-500 font-bold uppercase">Contact No</span>
                <span className="text-gray-900 font-black">{report.mobile}</span>
                
                <span className="text-gray-500 font-bold uppercase">Referring Vet</span>
                <span className="text-gray-900 font-black">Dr. {report.doctorName}</span>
              </div>
            </div>
          </div>

          {/* Test Investigation Body */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-1.5 bg-blue-600 rounded-full"></div>
              <h3 className="text-lg font-black text-gray-900">
                Investigation: {report.testName}
              </h3>
            </div>
            
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                    <th className="px-6 py-4 border-b border-gray-200">Biochemical Parameter</th>
                    <th className="px-6 py-4 border-b border-gray-200">Result / Unit</th>
                    <th className="px-6 py-4 border-b border-gray-200 text-right">Reference Interval</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {report.testResults.map((res, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-800 text-sm">{res.parameter}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-black text-gray-900 text-base">{res.value}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{res.unit}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-xs font-mono font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          {res.normalRange}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pathologist's Interpretation */}
          <div className="grid grid-cols-3 gap-8 items-start mb-12">
            <div className="col-span-2 bg-blue-50/30 p-6 rounded-2xl border border-blue-100">
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">Clinical Interpretation & Advice</h4>
              <p className="text-xs text-blue-900 leading-relaxed font-medium italic">
                Test results indicate standard biological variations for {report.animalType}. 
                Correlate findings with physical examination and complete anamnesis. 
                Values highlighted as outside reference intervals may require immediate re-evaluation 
                or specialized imaging. This report is strictly for veterinary professional use.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
              <i className="fas fa-qrcode text-4xl text-gray-300 mb-2"></i>
              <p className="text-[8px] text-gray-400 font-bold text-center uppercase tracking-widest">Scan to Verify Result Authenticity</p>
            </div>
          </div>

          {/* Signatures Footer */}
          <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-end">
            <div className="text-center group">
              <div className="w-40 h-16 bg-[url('https://cdn.pixabay.com/photo/2014/11/09/08/06/signature-523237_1280.png')] bg-contain bg-no-repeat bg-center opacity-40 mix-blend-multiply mb-1 transition-opacity group-hover:opacity-100"></div>
              <div className="w-48 border-b-2 border-gray-900 mb-3"></div>
              <p className="text-sm font-black text-gray-900">Dr. Sarah Wilson, DVM, PhD</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Senior Pathologist (Reg No: 12903-A)</p>
            </div>

            <div className="text-right">
              <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.5em] mb-4">Official Diagnostic Document</p>
              <div className="flex items-center gap-3 justify-end opacity-20 grayscale">
                <i className="fas fa-certificate text-2xl"></i>
                <i className="fas fa-vials text-2xl"></i>
                <i className="fas fa-shield-virus text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Final Footer Line */}
          <div className="mt-12 text-center">
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.5em] border-t border-gray-50 pt-4">
              End of Report • VetiScan AI • System Timestamp: {new Date().getTime()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;