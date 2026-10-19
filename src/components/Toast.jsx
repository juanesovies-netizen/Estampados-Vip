import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-amber-500/30 text-white shadow-2xl backdrop-blur-md animate-bounce-short">
      {toastMessage.type === 'info' ? (
        <Info className="w-5 h-5 text-sky-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
      )}
      <span className="text-sm font-medium pr-2">{toastMessage.message}</span>
    </div>
  );
}
