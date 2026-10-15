import React, { useState } from 'react';
import { 
  X, 
  ClipboardList, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Plus, 
  Edit3, 
  Printer, 
  Search 
} from 'lucide-react';
import { ProjectInquiry } from '../types';

interface InquiriesDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: ProjectInquiry[];
  onUpdateStatus: (id: string, status: ProjectInquiry['status'], notes?: string) => void;
  onDeleteInquiry: (id: string) => void;
}

export const InquiriesDashboardModal: React.FC<InquiriesDashboardModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  onUpdateStatus,
  onDeleteInquiry,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');

  if (!isOpen) return null;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    const matchesSearch = 
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search) ||
      inq.service.toLowerCase().includes(search.toLowerCase()) ||
      inq.details.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStartEditNotes = (inq: ProjectInquiry) => {
    setActiveEditingId(inq.id);
    setEditingNotes(inq.notes || '');
  };

  const handleSaveNotes = (inq: ProjectInquiry) => {
    onUpdateStatus(inq.id, inq.status, editingNotes);
    setActiveEditingId(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  FAHIM TRADERS — Orders & Inquiries Desk
                </h3>
                <span className="font-mono-numbers px-2 py-0.5 text-xs font-bold text-amber-500 bg-amber-500/10 rounded">
                  {inquiries.length} Inquiries
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Track customer inquiries, quotes, fabrication jobs, and materials delivery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Inquiries Report"
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-neutral-800/80 bg-neutral-950 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {['all', 'New', 'Contacted', 'Quoted', 'In Fabrication', 'Delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  filterStatus === st
                    ? 'bg-amber-500 text-neutral-950'
                    : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
                }`}
              >
                {st === 'all' ? 'All Inquiries' : st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search phone, name, details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Content Table / List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-xs">
              No inquiries match the current filter.
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-numbers text-xs font-bold text-amber-500">
                      {inq.id}
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {inq.name}
                    </span>
                    <span className="text-xs text-neutral-400">
                      via {inq.preferredContact}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Selector */}
                    <select
                      value={inq.status}
                      onChange={(e) => onUpdateStatus(inq.id, e.target.value as any, inq.notes)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                        inq.status === 'New' 
                          ? 'bg-amber-950/40 text-amber-400 border-amber-800/60'
                          : inq.status === 'In Fabrication'
                          ? 'bg-blue-950/40 text-blue-400 border-blue-800/60'
                          : inq.status === 'Delivered'
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                      }`}
                    >
                      <option value="New">Status: New</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Quoted">Status: Quoted</option>
                      <option value="In Fabrication">Status: In Fabrication</option>
                      <option value="Delivered">Status: Delivered</option>
                    </select>

                    <button
                      onClick={() => onDeleteInquiry(inq.id)}
                      className="text-neutral-600 hover:text-red-400 p-1 text-xs transition-colors"
                      title="Delete record"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Details & Scope */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  <div className="md:col-span-8 space-y-2">
                    <div>
                      <span className="text-neutral-500 uppercase font-semibold text-[10px]">Service & Scope:</span>
                      <p className="text-white font-medium">{inq.service} — {inq.scope}</p>
                    </div>

                    <div>
                      <span className="text-neutral-500 uppercase font-semibold text-[10px]">Project Details / Requirements:</span>
                      <p className="text-neutral-300 leading-relaxed bg-neutral-950 p-2.5 rounded-lg border border-neutral-850">
                        "{inq.details}"
                      </p>
                    </div>

                    {/* Notes block */}
                    {activeEditingId === inq.id ? (
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={editingNotes}
                          onChange={(e) => setEditingNotes(e.target.value)}
                          placeholder="Add shop notes (e.g. 14ga steel cut, site visit at 3pm)..."
                          className="flex-1 px-2.5 py-1.5 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white"
                        />
                        <button
                          onClick={() => handleSaveNotes(inq)}
                          className="px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold rounded-lg text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setActiveEditingId(null)}
                          className="px-2 py-1.5 text-neutral-400 hover:text-white text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-neutral-400 pt-1">
                        <span>Notes: {inq.notes || 'No internal notes added.'}</span>
                        <button
                          onClick={() => handleStartEditNotes(inq)}
                          className="text-[11px] text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Notes</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-4 bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-500">Contact Details</div>
                      <div className="mt-1 flex items-center gap-1.5 text-white font-mono-numbers font-medium">
                        <Phone className="w-3.5 h-3.5 text-amber-500" />
                        <span>{inq.phone}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-neutral-300 truncate">
                        <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{inq.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-neutral-800">
                      <a
                        href={`tel:${inq.phone}`}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                      <button
                        onClick={() => {
                          const text = encodeURIComponent(`Hello ${inq.name}! This is Fahim Traders regarding your project inquiry for ${inq.service}.`);
                          window.open(`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 font-mono-numbers">
                  Logged on {new Date(inq.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Fahim Traders Admin Desk · Direct Hotline: <span className="text-white font-mono-numbers font-semibold">0300-0127565</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Close Desk
          </button>
        </div>

      </div>
    </div>
  );
};
