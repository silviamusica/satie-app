import { useState, useRef, useEffect } from "react";

const Tooltip = ({ text, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const margin = 8;

    let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    if (left < margin) left = margin;
    if (left + tooltipRect.width > viewportWidth - margin) {
      left = viewportWidth - margin - tooltipRect.width;
    }
    const top = triggerRect.bottom + 8;

    setCoords({ top, left });
  }, [isOpen]);

  return (
    <span
      className="relative inline-block"
      ref={triggerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <span className="underline decoration-dotted decoration-slate-400 cursor-help">
        {children}
      </span>
      {isOpen && (
        <span
          ref={tooltipRef}
          className="fixed w-[min(260px,calc(100vw-2rem))] whitespace-normal wrap-break-word rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-sm p-3 shadow-xl z-[9999]"
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
