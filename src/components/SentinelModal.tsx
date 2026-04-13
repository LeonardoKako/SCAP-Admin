import React from 'react';
import { X } from 'lucide-react';

interface SentinelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const SentinelModal: React.FC<SentinelModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children,
  footer 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-start border-b border-slate-50">
          <div>
            <h3 className="text-xl font-headline font-extrabold text-slate-900">{title}</h3>
            {subtitle && <p className="text-sm font-medium text-slate-400 mt-1">{subtitle}</p>}
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {children}
        </div>

        {/* Footer */}
        {footer ? (
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            {footer}
          </div>
        ) : (
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentinelModal;
