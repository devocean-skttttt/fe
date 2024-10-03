'use client';

import Link from 'next/link';
import ICON from '@/constants/ICON';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const BOTTOM_MENU = [
  { path: '/', text: '홈', icon: ICON.nav.home },
  { path: '/upload', text: '등록하기', icon: ICON.nav.upload },
  { path: '/mypage', text: '마이페이지', icon: ICON.nav.mypage },
] as const;

function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className="flex w-full items-center h-12 justify-around fixed bottom-0 bg-white max-w-mobile text-center">
        {BOTTOM_MENU.map(({ path, text, icon }) => {
          const isActiveItem = isActive(path);
          const activeClass = isActiveItem
            ? 'text-[#330218]'
            : 'text-[#999999]';
          const iconColor = isActiveItem ? '#330218' : '#999999';

          return (
            <Link href={path} key={path}>
              <div className="w-20 flex flex-col items-center">
                {icon && (
                  <Image
                    src={icon}
                    alt="icon"
                    width={24}
                    height={24}
                    style={{ color: iconColor }}
                  />
                )}
                {text && <p className={`text-xs ${activeClass}`}>{text}</p>}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="h-[54px]" />
    </>
  );
}

export default BottomNavigation;
