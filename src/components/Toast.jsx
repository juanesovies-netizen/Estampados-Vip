import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-xl backdrop-blur-md animate-toast-in">
      {toastMessage.type === 'info' ? (
        <Info className="w-5 h-5 text-blue-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
      )}
      <span className="text-xs sm:text-sm font-semibold pr-2">{toastMessage.message}</span>
    </div>
  );
}
