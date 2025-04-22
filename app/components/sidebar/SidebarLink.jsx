'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarLink = ({ href, icon: Icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-white/10 text-white border-l-4 border-white'
          : 'text-cyan-100 hover:bg-white/5'
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </Link>
  );
};

export default SidebarLink;
