'use client';

import AdPlaceholder from "@/components/ui/AdPlaceholder";
import { motion } from 'framer-motion';

export default function Advertisment() {
    return (
        <motion.div
            className="absolute top-0 right-0 flex-col items-center justify-center bg-base-100 h-[90vh] gap-10 my-10 p-10 z-50"
            initial={{ width: 0, display: 'none' }}
            animate={{ width: '30vw', display: 'flex' }}
            transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: 3
            }}
        >
            <div className="size-full">
                <AdPlaceholder />
            </div>
            <div className="size-full">
                <AdPlaceholder />
            </div>
        </motion.div>
    )
}