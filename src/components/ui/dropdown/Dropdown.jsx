
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";


export const Dropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const [position, setPosition] = useState(
    null
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !(event.target).closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", onClose, true); // Close on scroll to prevent detachment issues
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", onClose, true);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const parent = triggerRef.current.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollX = window.scrollX || document.documentElement.scrollLeft;

        setPosition({
          top: rect.bottom + scrollY + 8,
          right: window.innerWidth - rect.right,
        });
      }
    }
  }, [isOpen]);

  // Always render a hidden trigger div to hold the ref position
  const anchor = <div ref={triggerRef} className="hidden" />;

  if (!isOpen) return anchor;

  return (
    <>
      {anchor}
      {position &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              top: `${position.top}px`,
              right: `${position.right}px`,
              position: "absolute",
            }}
            className={`z-[99999] rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
};
