"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Updated to use next/navigation

function BottomNavigation() {
  const pathname = usePathname(); // Get the current path using usePathname

  // Check if the current path is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full px-6 fixed bottom-0 left-0 flex justify-between items-center bg-white border-t border-gray-200">
      <Link href="/">
        <div className="w-12 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer">
          <div
            className={`text-center text-[10px] font-['SF Pro'] ${
              isActive('/mypage') ? 'text-[#330218]' : 'text-[#999999]'
            }`}
          >
            홈
          </div>
        </div>
      </Link>

      <Link href="/upload">
        <div className="w-12 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer">
          <div
            className={`text-center text-[10px] font-['SF Pro'] ${
              isActive('/register') ? 'text-[#330218]' : 'text-[#999999]'
            }`}
          >
            등록하기
          </div>
        </div>
      </Link>

      <Link href="/mypage">
        <div className="w-12 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer">
          <div
            className={`text-center text-[10px] font-['SF Pro'] ${
              isActive('/menu') ? 'text-[#330218]' : 'text-[#999999]'
            }`}
          >
            마이페이지
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BottomNavigation;