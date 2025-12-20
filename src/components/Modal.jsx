import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-3xl" }) => {
  const titleId = useId();
  const panelRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
        if (!focusable || focusable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const initial = panelRef.current?.querySelector(FOCUSABLE_SELECTOR);
    if (initial) initial.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (lastFocusedRef.current && lastFocusedRef.current.focus) {
        lastFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : "Finestra modale"}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className={`w-full ${maxWidth} my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-slate-700 bg-slate-900">
          {title ? (
            <h3 id={titleId} className="text-base sm:text-lg font-semibold text-slate-100">
              {title}
            </h3>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold px-3 py-1 rounded hover:bg-slate-800"
            aria-label="Chiudi finestra"
          >
            <X className="w-4 h-4" />
            Chiudi
          </button>
        </div>
        <div className="p-5 max-h-[calc(90vh-8rem)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
