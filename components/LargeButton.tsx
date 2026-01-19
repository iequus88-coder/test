
import React from 'react';

interface LargeButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({ 
  label, 
  onClick, 
  icon, 
  variant = 'primary',
  className = ""
}) => {
  const baseStyles = "flex flex-col items-center justify-center w-full rounded-2xl shadow-xl transition-all active:scale-95 border-b-4";
  const sizeStyles = "min-h-[120px] p-4"; // 120px height for extreme touch target
  
  const variantStyles = {
    primary: "bg-yellow-400 text-slate-900 border-yellow-600 font-black",
    secondary: "bg-slate-700 text-white border-slate-900 font-bold",
    danger: "bg-red-500 text-white border-red-700 font-bold"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && <div className="mb-3 text-4xl">{icon}</div>}
      <span className="text-xl md:text-2xl break-keep text-center">{label}</span>
    </button>
  );
};

export default LargeButton;
