'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarLink = ({ href, icon: Icon, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses = `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200`;
  const activeClasses = 'bg-white/10 text-white border-l-4 border-white';
  const inactiveClasses = 'text-cyan-100 hover:bg-white/5';

  // Jika ada onClick, render tombol
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${inactiveClasses} w-full text-left`}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
      </button>
    );
  }

  // Default: link
  return (
    <Link
      href={href}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </Link>
  );
};

export default SidebarLink;
