import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Edit2, FileText, CheckSquare, ShieldAlert, CheckCircle2, Save, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { PipelineBar, PipelineState } from '../components/PipelineBar';
import { mockRequest } from '../data/mockData';
import { showToast } from '../components/Toast';
import { useLocalStorage } from '../utils/useLocalStorage';

export const StudioOutput: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  // M-1: Delivery Checklist Persistence
  const [checklist, setChecklist] = useLocalStorage<boolean[]>('deliveryChecklist', Array(6).fill(false));

  const [isEditingBrief, setIsEditingBrief] = useState(false);
  const [briefContent, setBriefContent] = useState(`Project Overview
Vendor: Sharma Furniture Co.
Location: Lucknow Center
Timeline: 2 weeks from PO issuance

Deliverables
- 500 units of standard office chairs
- Delivery and unboxing at Lucknow center
- Removal of all packaging materials

Acceptance Criteria
- All chairs must be free of defects, scratches, or tears.
- Hydraulic lift mechanisms must be tested and functional.
- Delivery must be completed within the agreed 14-day window.

Payment Terms
50% advance upon PO issuance, 50% upon successful delivery and inspection.`);

  const handleChecklistChange = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  const handlePipelineNavigate = (state: PipelineState) => {
    const stateToScreenMap: Record<string, string> = {
      'parsed': 'parsed',
      'discovering': 'discovery',
      'negotiation_ready': 'negotiation',
      'recommended': 'recommendation',
      'awaiting_approval': 'approval',
    };
    if (stateToScreenMap[state]) {
      onNavigate(stateToScreenMap[state]);
    }
  };

  const handleSaveBrief = () => {
    setIsEditingBrief(false);
    showToast('Brief saved successfully');
  };

  const handleDownloadPDF = () => {
    showToast('Generating PDF...');
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text('Vendor Scope Document', 20, 20);
      
      // Add content
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(briefContent, 170);
      doc.text(splitText, 20, 30);
      
      // Save the PDF
      doc.save(`Vendor_Scope_Request_${mockRequest.id}.pdf`);
      showToast('Download complete');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('Failed to generate PDF');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D23]">STUDIO Output</h1>
          <p className="text-gray-500 mt-1 font-mono text-sm">Request #{mockRequest.id}</p>
        </div>
      </div>

      <PipelineBar currentState="recommended" onNavigate={handlePipelineNavigate} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-[#F8F9FA] flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-sm font-semibold text-[#1A1D23] uppercase tracking-wider">Vendor Scope Document</h2>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                AI-Generated
              </span>
            </div>
            <div className="p-6">
              {isEditingBrief ? (
                <textarea
                  value={briefContent}
                  onChange={(e) => setBriefContent(e.target.value)}
                  className="w-full h-96 p-4 text-gray-700 font-mono text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              ) : (
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap font-mono">
                  {briefContent}
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
              {isEditingBrief ? (
                <>
                  <button 
                    onClick={() => setIsEditingBrief(false)}
                    className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </button>
                  <button 
                    onClick={handleSaveBrief}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditingBrief(true)}
                    className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Edit2 className="w-4 h-4 mr-2" /> Edit Brief
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-[#F8F9FA] flex items-center">
              <CheckSquare className="w-4 h-4 text-gray-500 mr-2" />
              <h3 className="text-xs font-semibold text-[#1A1D23] uppercase tracking-wider">Delivery Checklist</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {[
                  "Issue Purchase Order",
                  "Process 50% Advance Payment",
                  "Confirm Delivery Date with Vendor",
                  "Notify Center Manager of Delivery",
                  "Conduct Quality Inspection",
                  "Process Final Payment"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <input 
                      type="checkbox" 
                      id={`checklist-${i}`}
                      checked={checklist[i]}
                      onChange={() => handleChecklistChange(i)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                    <label htmlFor={`checklist-${i}`} className="ml-2 text-sm text-gray-700 cursor-pointer select-none">{item}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-[#F8F9FA] flex items-center">
              <ShieldAlert className="w-4 h-4 text-gray-500 mr-2" />
              <h3 className="text-xs font-semibold text-[#1A1D23] uppercase tracking-wider">QA & Compliance</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-[#1A1D23]">Vendor KYC Verified</h4>
                  <p className="text-xs text-gray-500 mt-0.5">GST and PAN details match records.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 mr-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-[#1A1D23]">Budget Compliant</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Negotiated quote is within approved limits.</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 mr-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-[#1A1D23]">Penalty Clause Missing</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Consider adding a late delivery penalty clause to the PO.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button 
          onClick={() => onNavigate('recommendation')}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Recommendation
        </button>
        <button 
          onClick={() => onNavigate('approval')}
          className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Proceed to Approval <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
