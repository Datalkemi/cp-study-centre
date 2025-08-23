// src/context/EnquiryModalContext.jsx
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const Ctx = createContext(null);

export function EnquiryModalProvider({ children }) {
    const [isOpen, setOpen] = useState(false);
    const [prefill, setPrefill] = useState(null);

    const open = useCallback((initialValues = null) => {
        setPrefill(initialValues);
        setOpen(true);
    }, []);
    const close = useCallback(() => setOpen(false), []);

    const value = useMemo(() => ({ isOpen, open, close, prefill }), [isOpen, open, close, prefill]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEnquiryModal() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useEnquiryModal must be used within EnquiryModalProvider");
    return ctx;
}
