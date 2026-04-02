import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }) {
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) {
      elRef.current = document.createElement("div");
      document.body.appendChild(elRef.current);
    }
    return () => {
      if (elRef.current) {
        document.body.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(children, elRef.current || document.body);
}
