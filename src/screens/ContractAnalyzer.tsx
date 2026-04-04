import React from 'react';
import { FileText, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { showToast } from '../components/Toast';

export const ContractAnalyzer: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1D23]">Contract Analyzer</h1>
        <p className="text-gray-500 mt-2 text-lg">Review MSAs and SOWs for compliance and risk.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center border-dashed border-2">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Contract Document</h3>
            <p className="text-sm text-gray-500 mb-6">Drag and drop your PDF or Word document here, or click to browse.</p>
            <button 
              onClick={() => showToast('File upload simulation started')}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Select File
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#1A1D23]">Recent Analyses</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { name: 'MSA_Sharma_Furniture_v2.pdf', risk: 'Low', date: '2026-04-03' },
                { name: 'SOW_TechCorp_Q3.docx', risk: 'High', date: '2026-04-01' },
                { name: 'NDA_GlobalLogistics.pdf', risk: 'Medium', date: '2026-03-28' }
              ].map((doc, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">Analyzed on {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {doc.risk === 'Low' && <CheckCircle className="w-4 h-4 text-green-500 mr-1" />}
                    {doc.risk === 'Medium' && <AlertTriangle className="w-4 h-4 text-amber-500 mr-1" />}
                    {doc.risk === 'High' && <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />}
                    <span className={`text-xs font-medium ${
                      doc.risk === 'Low' ? 'text-green-700' : 
                      doc.risk === 'Medium' ? 'text-amber-700' : 'text-red-700'
                    }`}>
                      {doc.risk} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Analysis Criteria</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                <span className="text-sm text-gray-600">Payment Terms (Net 30/60)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                <span className="text-sm text-gray-600">Liability Caps & Indemnification</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                <span className="text-sm text-gray-600">Termination Clauses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                <span className="text-sm text-gray-600">Data Privacy & Security (GDPR/CCPA)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                <span className="text-sm text-gray-600">SLA Commitments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
