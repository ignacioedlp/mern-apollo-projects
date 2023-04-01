import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center" >
      <FaSpinner className="animate-spin mr-2 w-7 h-7 text-[#DE38A6]" />
      <span className='text-[#DE38A6] text-lg'>Cargando...</span>
    </div>
  );
};

export default Spinner;




