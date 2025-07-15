"use client"

import { useEffect } from "react";
import { useStore } from "@/store/dashboardStore";

export function SetRoleEffect({ role, page }: { role: string, page: string }) {
    const { setCurrentPage, setRole } = useStore();

    useEffect(() => {
        setCurrentPage(page);
        setRole(role);
    }, [role, page, setCurrentPage, setRole]);

    return null; // This component is only for side-effects
}
