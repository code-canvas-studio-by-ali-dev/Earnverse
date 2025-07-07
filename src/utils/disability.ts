"use client"
import { useEffect } from "react";

export const DisableInspectRightClick = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            // Disable right-click
            document.addEventListener('contextmenu', (e) => e.preventDefault());

            // Disable DevTools shortcuts
            document.addEventListener('keydown', (e) => {
                if (
                    e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                    (e.ctrlKey && e.key === 'U')
                ) {
                    e.preventDefault();
                }
            });
        }

        return () => {
            document.removeEventListener('contextmenu', () => { });
            document.removeEventListener('keydown', () => { });
        };
    }, [])

    return null;
}