const Tooltip = ({ text, children }) => {
  return (
    <span className="relative group cursor-help">
      <span className="underline decoration-dotted decoration-slate-400">
        {children}
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[min(260px,calc(100vw-2rem))] whitespace-normal break-words rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-50">
        {text}
      </span>
    </span>
  );
};

export default Tooltip;
