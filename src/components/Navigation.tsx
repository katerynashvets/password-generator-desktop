'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationType from '../../enums/NavigationType.enum';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const pathname = usePathname();
  const { isDark, setIsDark } = useTheme();

  const active =
    pathname.replace(/\/+$/, '') === '/settings'
      ? NavigationType.settings
      : NavigationType.generator;

  return (
    <div className='w-[25%] xl:w-[20%] bg-[var(--background-navi)] flex flex-col items-center justify-between'>
      <div className='w-full flex flex-col items-center'>
        <div className='flex w-[80%] gap-5 items-center my-10'>
          <div className='bg-[var(--background-navi-secondary)] rounded-lg p-3 text-[var(--text-active)]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-lock-keyhole-icon lucide-lock-keyhole'
            >
              <circle cx='12' cy='16' r='1' />
              <rect x='3' y='10' width='18' height='12' rx='2' />
              <path d='M7 10V7a5 5 0 0 1 10 0v3' />
            </svg>
          </div>
          <span className='text-xl text-[var(--text-primary)]'>
            Password Generator
          </span>
        </div>
        <div className='w-full flex flex-col items-center text-[var(--text-primary)]'>
          <Link
            href='/'
            className={`flex gap-4 w-[90%] px-5 py-5 ${active === NavigationType.generator ? 'bg-[var(--background-navi-secondary)] text-[var(--text-active)] rounded-xl' : ''}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-wand-sparkles-icon lucide-wand-sparkles'
            >
              <path d='m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72' />
              <path d='m14 7 3 3' />
              <path d='M5 6v4' />
              <path d='M19 14v4' />
              <path d='M10 2v2' />
              <path d='M7 8H3' />
              <path d='M21 16h-4' />
              <path d='M11 3H9' />
            </svg>
            <span className='text-lg'>Generator</span>
          </Link>
          <Link
            className={`flex gap-4 w-[90%] px-5 py-5 ${active === NavigationType.settings ? 'bg-[var(--background-navi-secondary)] text-[var(--text-active)] rounded-xl' : ''}`}
            href='/settings'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-settings-icon lucide-settings'
            >
              <path d='M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915' />
              <circle cx='12' cy='12' r='3' />
            </svg>
            <span className='text-lg'>Settings</span>
          </Link>
        </div>
      </div>
      <div className='w-[90%] flex flex-col mb-10 gap-10'>
        <div className='bg-[var(--background-navi-secondary)] rounded-lg px-5 py-4'>
          <div className='flex items-center gap-2 mb-2'>
            <div className='bg-[var(--background-selected)] text-[#5153d5] rounded-lg py-2 px-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-shield-check-icon lucide-shield-check'
              >
                <path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' />
                <path d='m9 12 2 2 4-4' />
              </svg>
            </div>
            <span className='text-xl text-[var(--text-primary)]'>Tip</span>
          </div>
          <div className='text-[var(--text-primary)]'>
            A longer password with a mix of characters is stronger and more
            secure.
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div
            className={`flex bg-[var(--background-navi-secondary)] rounded-lg text-[#64687b] ${isDark ? 'border-1 border-[#727282]' : ''}`}
          >
            <button
              className={`py-2 px-3 ${isDark ? 'bg-[var(--background-selected)] text-[#5b66db] rounded-l-lg border-r-1 border-r-[#727282]' : ' text-[var(--text-primary)]'}`}
              onClick={() => setIsDark(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-moon-star-icon lucide-moon-star'
              >
                <path d='M18 5h4' />
                <path d='M20 3v4' />
                <path d='M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401' />
              </svg>
            </button>
            <button
              className={`py-2 px-3 ${isDark ? 'text-[var(--text-primary)] bg-[var(--background-navi)] rounded-r-lg' : 'bg-[var(--background-navi)] text-[#5b66db] rounded-r-lg border-1 border-[#e6e7f7]'} `}
              onClick={() => setIsDark(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-sun-medium-icon lucide-sun-medium'
              >
                <circle cx='12' cy='12' r='4' />
                <path d='M12 3v1' />
                <path d='M12 20v1' />
                <path d='M3 12h1' />
                <path d='M20 12h1' />
                <path d='m18.364 5.636-.707.707' />
                <path d='m6.343 17.657-.707.707' />
                <path d='m5.636 5.636.707.707' />
                <path d='m17.657 17.657.707.707' />
              </svg>
            </button>
          </div>
          <div className='text-[#979bae]'>v1.0.0</div>
        </div>
      </div>
    </div>
  );
}
