import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

const Modal = ({ isOpen, onClose, title, children }) => {
  // Mencegah scroll pada body saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Overlay Gelap
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Kotak Modal */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
