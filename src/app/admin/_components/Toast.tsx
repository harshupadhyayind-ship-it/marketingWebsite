"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export type ToastState = { message: string; type: "success" | "error" } | null;

export function Toast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white text-sm font-medium transition-all ${
        toast.type === "success" ? "bg-[#1A5C2A]" : "bg-[#8B0000]"
      }`}
    >
      {toast.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
      {toast.message}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <X size={13} />
      </button>
    </div>
  );
}
