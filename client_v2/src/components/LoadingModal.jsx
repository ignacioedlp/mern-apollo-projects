import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity bg-gray-900 opacity-50"></div>
        <div className="flex flex-col items-center justify-center p-6 mx-auto bg-white rounded-lg shadow-lg">
          <FaSpinner className="w-6 h-6 animate-spin" />
          <p className="mt-4 text-lg font-medium text-gray-900">Cargando...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;