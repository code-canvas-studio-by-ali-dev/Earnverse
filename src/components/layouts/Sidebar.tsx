'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { RxDashboard } from "react-icons/rx";
import { TbDropletDollar } from "react-icons/tb";
import { FaAudioDescription } from "react-icons/fa6";
import clsx from 'clsx';
import Logo from '@/components/ui/Logo';
import { useStore } from '@/store/dashboardStore';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export default function Sidebar() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { currentPage } = useStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      icon: <RxDashboard size={26} />,
    },
    {
      name: 'Droplets',
      path: 'droplets',
      icon: <TbDropletDollar size={26} />,
    },
    {
      name: 'Surf Ads',
      path: 'surf_ads',
      icon: <FaAudioDescription size={26} />,
    },
  ];

  // Handle mouse enter/leave to expand/collapse sidebar
  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  // Handle click outside to collapse sidebar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={sidebarRef}
      className="h-screen bg-base-100 space-y-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ width: '5rem' }}
      animate={{ width: expanded ? '16rem' : '5rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <ul className="menu w-full">
        <li onClick={() => router.push('/')}>
          <Logo text={expanded} className='[&>*]:first:text-4xl text-xl p-4' />
        </li>
      </ul>

      {/* Navigation Menu */}
      <ul className="menu w-full gap-2.5">
        {navItems.map((item) => {
          const isActive = currentPage === item.path;
          

          return (
            <li key={item.path} className={clsx("rounded-box", { "bg-base-300 hover:bg-none": isActive })}>
              <Link href={item.path} className='flex justify-start items-center gap-5 h-14 p-5'>

                {item.icon}
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg"
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}