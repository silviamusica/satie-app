import { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="underline decoration-dotted decoration-slate-400 cursor-help bg-transparent border-none p-0 text-inherit font-inherit inline"
      >
        {children}
      </button>
      {isOpen && (
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[min(260px,calc(100vw-2rem))] whitespace-normal break-words rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-sm p-3 shadow-xl z-50">
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
